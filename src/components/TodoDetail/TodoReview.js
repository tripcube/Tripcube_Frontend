import React from "react";
import styled from "styled-components";
import tags from "../../constants/tags";
import serverapi from "../../api/serverapi";
import useAuthToken from "../../hooks/useAuthToken";

const TodoReview = ({ data }) => {
  const {
    content,
    createdAt,
    date,
    like,
    likes,
    placeName,
    tag,
    todoId,
    userName,
  } = data;

  return (
    <ReviewContainer>
      <div>
        <h3>Todo Review</h3>
        <p>Content: {content}</p>
        <p>Created At: {createdAt}</p>
        <p>Date: {date}</p>
        <p>Likes: {likes}</p>
        <p>Place Name: {placeName}</p>
        <p>Tag: {tag}</p>
        <p>Todo ID: {todoId}</p>
        <p>User Name: {userName}</p>
        <p>Like: {like ? "Yes" : "No"}</p>
      </div>
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  padding: 16px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

export default TodoReview;

export const TagBox = styled.div`
  width: 8px;
  height: 28px;
  background-color: ${(props) => tags[props.num].color};
  margin-right: 12px;
`;

export const TodoTextStyle = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

export const LikeTextStyle = styled.div`
  font-size: 8px;
  font-weight: 500;
  font-color: #9f9f9f;
`;
