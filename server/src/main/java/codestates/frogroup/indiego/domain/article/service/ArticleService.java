package codestates.frogroup.indiego.domain.article.service;

import codestates.frogroup.indiego.domain.article.dto.ArticleListResponseDto;
import codestates.frogroup.indiego.domain.article.entity.Article;
import codestates.frogroup.indiego.domain.article.entity.ArticleLike;
import codestates.frogroup.indiego.domain.article.dto.ArticleDto;
import codestates.frogroup.indiego.domain.article.mapper.ArticleMapper;
import codestates.frogroup.indiego.domain.article.repository.ArticleLikeRepository;
import codestates.frogroup.indiego.domain.article.repository.ArticleRepository;
import codestates.frogroup.indiego.domain.common.utils.CustomBeanUtils;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.service.MemberService;
import codestates.frogroup.indiego.global.exception.BusinessLogicException;
import codestates.frogroup.indiego.global.exception.ExceptionCode;
import codestates.frogroup.indiego.global.fileupload.AwsS3Path;
import codestates.frogroup.indiego.global.fileupload.AwsS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleLikeRepository articleLikeRepository;
    private final ArticleMapper mapper;
    private final MemberService memberService;
    private final AwsS3Service awsS3Service;
    private final CustomBeanUtils<Article> beanUtils;

    /**
     * 게시글 작성
     */
    @Transactional
    public ArticleDto.Response createArticle(Article article, Long memberId) {

        Member member = memberService.findVerifiedMember(memberId);

        article.setMember(member);

        Article savedArticle = articleRepository.save(article);

        return getResponse(savedArticle);
    }

    /**
     * 게시글 수정
     */
    @Transactional
    public ArticleDto.Response updateArticle(Article article, Long articleId, Long memberId) {

        Article findArticle = findVerifiedArticle(articleId);

        if (findArticle.getMember().getId().equals(memberId)) {

//            changeArticle(article, findArticle);
            Article updateArticle = beanUtils.copyNonNullProperties(article, findArticle);
            Article savedArticle = articleRepository.save(updateArticle);

            return getResponse(savedArticle);
        }

        throw new BusinessLogicException(ExceptionCode.MEMBER_NO_PERMISSION);
    }

    /**
     * 게시글 전체 조회
     */
    public Page<ArticleListResponseDto> findArticles(String category, String search, String status, Pageable pageable) {

        pageable = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize());

        if (Objects.isNull(category) && Objects.isNull(search)) {
            return articleRepository.findAllBasic(status, pageable);
        }

        return articleRepository.findAllSearch(category, search, status, pageable);
    }

    public List<ArticleListResponseDto> findPopularArticles(String category) {

        if (Objects.isNull(category)) {
            throw new BusinessLogicException(ExceptionCode.ARTICLE_GET_BAD_REQUEST);
        }

        return articleRepository.findLikeCountDesc(category);
    }

    /**
     * 게시글 단일 조회
     * TODO: 게시글 조회는 읽기만 하고 조회수를 증가시키는 방법은 없을까?
     */
//    @Transactional // TODO: @Transactional 조금 더 알아보기
    public ArticleDto.Response findArticle(Long articleId) {
        Article findArticle = findVerifiedArticle(articleId);

        Long viewCount = articleRepository.findViewCountFromRedis(articleId);
        log.info("viewCount1={}", viewCount);
        if (viewCount == null) {
            viewCount = articleRepository.findView(articleId);
            log.info("viewCount2={}", viewCount);
            articleRepository.saveViewCountToRedis(articleId, viewCount);
        }

        viewCount = articleRepository.incrementViewCount(articleId);
        log.info("viewCount3={}", viewCount);
        ArticleDto.Response response = getResponse(findArticle);
        response.setView(viewCount);

        return response;
    }

    /**
     * 게시글 삭제
     */
    @Transactional
    public void deleteArticle(Long articleId, Long memberId) {
        Long findMemberId = findVerifiedArticle(articleId).getMember().getId();

        if (findMemberId.equals(memberId)) {

            articleRepository.delete(findVerifiedArticle(articleId));
        }

        throw new BusinessLogicException(ExceptionCode.MEMBER_NO_PERMISSION);
    }

    /**
     * 게시글 좋아요
     */
    @Transactional
    public HttpStatus articleLike(Long articleId, Long memberId) {
        Article findArticle = findVerifiedArticle(articleId);

        // TODO: 리팩토링 memberService에서 사용하자
        Member findMember = memberService.findVerifiedMember(memberId);

        ArticleLike findArticleLike = articleLikeRepository.findByMemberId(findMember.getId());

        return findArticleLike == null ? createArticleLike(findArticle, findMember) : deleteArticleLike(findArticleLike);
    }

    /**
     * 게시글 이미지 업로드
     */
    @Transactional
    public String uploadArticleImage(MultipartFile file, Long memberId) {
        memberService.findVerifiedMember(memberId);

        return awsS3Service.StoreImage(file, AwsS3Path.ARTICLES);
    }

    /**
     * Response 처리 메서드
     */
    private ArticleDto.Response getResponse(Article article) {

        log.info("nickname = {}, image = {}", article.getMember().getProfile().getNickname(),
                article.getMember().getProfile().getImage());

        ArticleDto.Response response = mapper.articleToArticleResponse(article);
        long likeCount = articleLikeRepository.countByArticleId(article.getId());
        response.setLikeCount(likeCount);

        return response;
    }

    /**
     * 게시글 조회 검증
     */
    private Article findVerifiedArticle(Long articleId) {

        return articleRepository.findById(articleId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND));
    }

    /**
     * 좋아요
     */
    private HttpStatus createArticleLike(Article findArticle, Member findMember) {

        articleLikeRepository.save(
                ArticleLike.builder()
                        .article(findArticle)
                        .member(findMember)
                        .build());

        return HttpStatus.CREATED;
    }

    /**
     * 좋아요 취소
     */
    private HttpStatus deleteArticleLike(ArticleLike findArticleLike) {
        articleLikeRepository.delete(findArticleLike);

        return HttpStatus.NO_CONTENT;
    }

    /**
     * 조회수 증가
     */
    @Transactional
    public void updateView(Long articleId) {
        findVerifiedArticle(articleId).updateView();
    }

    /**
     * 게시글 수정 메서드
     */
    private static void changeArticle(Article article, Article findArticle) {

        Optional.ofNullable(article.getBoard().getTitle())
                .ifPresent(title -> findArticle.getBoard().setTitle(title));

        Optional.ofNullable(article.getBoard().getContent())
                .ifPresent(content -> findArticle.getBoard().setContent(content));

        Optional.ofNullable(article.getBoard().getImage())
                .ifPresent(image -> findArticle.getBoard().setImage(image));

        Optional.ofNullable(article.getBoard().getCategory())
                .ifPresent(category -> findArticle.getBoard().setCategory(category));

    }

}
