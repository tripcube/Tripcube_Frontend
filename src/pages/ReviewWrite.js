import React, { useState } from "react";
import styled from "styled-components";
import WriteTop from "../components/WritePage/WriteTop";
import serverapi from "../api/serverapi";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";

function ReviewWrite() {
  const [reviewText, setReviewText] = useState("");
  const { todoId } = useParams(); // URL 파라미터에서 todoId를 추출

  const handleReviewChange = (e) => {
    // 입력 창 내용을 업데이트합니다.
    setReviewText(e.target.value);
  };

  return (
    <div>
      <WriteTop reviewText={reviewText} setReviewText={setReviewText} todoId={todoId}/>
      <ReviewInput
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="최대 500자의 후기를 남겨주세요."
      />
    </div>
  );
}

export default ReviewWrite;

const ReviewInput = styled.textarea`
  width: 90%;
  height: 200px;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 10px;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-radius: 10px; /* 테두리를 둥글게 만듭니다 */
  margin-top: 10px;
`;
