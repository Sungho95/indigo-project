package codestates.frogroup.indiego.domain.show.controller;

import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.domain.member.service.MemberService;
import codestates.frogroup.indiego.domain.show.dto.ShowCommentDto;
import codestates.frogroup.indiego.domain.show.dto.ShowDto;
import codestates.frogroup.indiego.domain.show.dto.ShowReservationDto;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.ShowComment;
import codestates.frogroup.indiego.domain.show.mapper.ShowCommentMapper;
import codestates.frogroup.indiego.domain.show.repository.ShowCommentRepository;
import codestates.frogroup.indiego.domain.show.repository.ShowRepository;
import codestates.frogroup.indiego.domain.show.service.ShowCommentService;
import codestates.frogroup.indiego.domain.show.service.ShowService;
import codestates.frogroup.indiego.global.dto.MultiResponseDto;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.security.auth.loginresolver.LoginMemberId;
import codestates.frogroup.indiego.global.stub.StubData;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.common.util.impl.Log;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/shows")
@Valid
@RequiredArgsConstructor
public class ShowCommentController {

    private final ShowCommentRepository showCommentRepository;
    private final ShowCommentMapper showCommentMapper;
    private final ShowCommentService showCommentService;
    private final ShowService showService;
    private final MemberService memberService;


    @PostMapping("/{show-id}/comments")
    public ResponseEntity postComment(@PathVariable("show-id") Long showId,
                                      @LoginMemberId Long memberId,
                                      @Valid @RequestBody ShowCommentDto.Post showPostDto){
        Show show = showService.findShow(showId);
        Member member = memberService.findVerifiedMember(memberId);
        ShowComment showComment = showCommentMapper.commentDtoToComment(showPostDto);
        ShowComment saveShowComment = showCommentService.createShowComment(showComment,show,member);
        ShowCommentDto.Response showCommentResponse = showCommentMapper.commentToResponseDto(saveShowComment);

        return new ResponseEntity<>(new SingleResponseDto<>(showCommentResponse),HttpStatus.CREATED);
    }

    @PatchMapping("/{show-id}/comments/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("show-id") Long showId,
                                       @PathVariable("comment-id") Long commentId,
                                       @LoginMemberId Long memberId,
                                       @Valid @RequestBody ShowCommentDto.Patch showPatchDto){
        Show show = showService.findShow(showId);
        Member member = memberService.findVerifiedMember(memberId);
        ShowComment findShowComment = showCommentService.findShowComment(commentId);
        ShowComment showComment = showCommentMapper.commentDtoToComment(showPatchDto);
        ShowComment updateShowComment = showCommentService.updateShowComment(showComment,findShowComment,show,member);
        ShowCommentDto.Response showCommentResponse = showCommentMapper.commentToResponseDto(updateShowComment);
        return new ResponseEntity<>(new SingleResponseDto<>(showCommentResponse),HttpStatus.OK);
    }

    @DeleteMapping("/{show-id}/comments/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("show-id") Long showId,
                                        @PathVariable("comment-id") Long commentId,
                                        @LoginMemberId Long memberId) {
        Show show = showService.findShow(showId);
        showCommentService.deleteShowComment(commentId,memberId,show);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("{show-id}/comments")
    public ResponseEntity getComments(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size,
                                      @PathVariable("show-id") long showId){

        Page<ShowComment> showCommentPage = showCommentService.findShowComment(showId,page-1,size);
        List<ShowComment> showCommentList = showCommentPage.getContent();
        List<ShowCommentDto.Response> responses = showCommentMapper.commentListToResponseDtoList(showCommentList);
        return new ResponseEntity<>(new MultiResponseDto<>(responses,showCommentPage), HttpStatus.OK);
    }


}
