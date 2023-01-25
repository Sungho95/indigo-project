import { primary, sub, secondary, mbFontSize } from "../../../styles/mixins.js";
import { PageWrapper, ContentWrapper } from "./BoardList.jsx";
import breakpoint from "../../../styles/breakpoint.js";
import Aside from "../Aside/Aside.jsx";
import OKButton from "../../../Components/Board/BoardList/OKButton.jsx";
import Editor from "../../../Components/Board/BoardCreate/Editor.jsx";
import instance from "../../../api/core/default.js";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import React, { useState } from "react";
import styled from "styled-components";
import CreateDropdown from "../../../Components/Board/BoardCreate/CreateDropdown.jsx";
import { useMutation } from "@tanstack/react-query";
import useBoardStore from "../../../store/useBoardStore.js";

export const PostWrapper = styled(ContentWrapper)`
  width: 70vw;
  padding-right: 10px;
  height: max-content;
  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 87%;
  }
`;

export const PostBoard = styled.div`
  width: 100%;
  height: 1000px;
  background-color: ${sub.sub200};
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 60px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }

  .postDiv {
    font-size: ${mbFontSize.large};
    font-weight: 700;
    color: ${primary.primary500};
    text-align: left;
  }
`;

const ClassificationDiv = styled.div`
  text-align: left;
  margin-bottom: 80px;
`;

export const TitleInputDiv = styled.div`
  padding-top: 10px;
  text-align: left;
  margin-bottom: 50px;

  .titleInput {
    width: 100%;
    height: 35px;
    border: 1px solid ${sub.sub400};
    border-radius: 20px;
    padding-left: 10px;
  }
`;

export const ContentInputDiv = styled.div`
  margin-top: 10px;
  text-align: left;
  padding-bottom: 50px;
  height: 500px;
  background-color: white;
  margin-bottom: 60px;

  .contentInput {
    width: 100%;
    height: 40vh;
    resize: none;
    padding-top: 5px;
    padding-left: 10px;
  }
`;

const PostButton = styled(OKButton)`
  width: 300px;
  height: 50px;

  &:hover {
    background-color: ${secondary.secondary500};
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 200px;
    font-size: ${mbFontSize.medium};
  }
`;

const BoardEdit = () => {
  const { boardStoreData } = useBoardStore();
  const [categoryValue, setCategoryValue] = useState("");
  const [titleValue, setTitleValue] = useState(boardStoreData.title);
  const [contentValue, setContentValue] = useState(boardStoreData.content);
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const data = {
    title: titleValue,
    content: contentValue,
    // image: "",
    category: categoryValue,
  };

  const handleButton = async () => {
    const response = await instance({
      method: "patch",
      url: `http://indiego.kro.kr:80/articles/${id}`,
      data,
    });
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    console.log(response.data);
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    return response.data;
  };

  const handleButtonOnSuccess = () => {
    navigate(`${pathname}/${id}`);
  };

  const { mutate: editBoard } = useMutation({
    mutationKey: ["handleButton"],
    mutationFn: handleButton,
    onSuccess: handleButtonOnSuccess,
    // onError: postButtonOnError,
  });

  return (
    <PageWrapper>
      <Aside></Aside>
      <PostWrapper>
        <div className="title">글 수정하기</div>
        <div className="titleInfo">게시판을 수정 할 수 있습니다.</div>
        <PostBoard>
          <div className="postDiv">분류</div>
          <ClassificationDiv>
            <CreateDropdown
              setCategoryValue={setCategoryValue}
            ></CreateDropdown>
          </ClassificationDiv>
          <div className="postDiv">제목</div>
          <TitleInputDiv>
            <input
              className="titleInput"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              placeholder="게시글의 제목을 작성해주세요."
            />
          </TitleInputDiv>
          <div className="postDiv">본문</div>
          <ContentInputDiv>
            <Editor
              value={contentValue}
              setValue={setContentValue}
              placeholder={"내용을 입력해주세요."}
            ></Editor>
          </ContentInputDiv>
          <PostButton type="button" onClick={() => editBoard()}>
            수정하기
          </PostButton>
        </PostBoard>
      </PostWrapper>
    </PageWrapper>
  );
};

export default BoardEdit;
