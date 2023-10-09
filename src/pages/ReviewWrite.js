import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TodoReview from "../components/TodoDetail/TodoReview";
import serverapi from "../api/serverapi";
import { Delete } from "@mui/icons-material";
const ReviewWrite = () => {
  const { todoId } = useParams();
  const [todoReviews, setTodoReviews] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const fetchTodoReviewsFromAPI = async (todoId) => {
    try {
      const response = await serverapi.get(`/todos/${todoId}/reviews`);
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error; // Rethrow the error for handling in the component
    }
  };

  useEffect(() => {
    // Fetch reviews when the component mounts
    const fetchReviews = async () => {
      try {
        const response = await fetchTodoReviewsFromAPI(todoId);
        setTodoReviews(response); // Assuming response contains the reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [todoId]);

  const handleGoBack = () => {
    // Go back to the previous page
    navigate(-1);
  };

  return (
    <div>
      <BackButton onClick={handleGoBack}>노들섬</BackButton>
      <TitleBox>
        <Title>노을이 지는 곳에서 사진 찍기</Title>
      </TitleBox>
      <div>
        <h3>Todo Reviews</h3>
        {todoReviews.map((reviewData, index) => (
          <TodoReview key={index} data={reviewData} />
        ))}
      </div>
    </div>
  );
};

const BackButton = styled.button`
  background-color: #ccc;
  color: #000;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;
  background-image: url(${Delete}); // 이미지 삽입
  background-size: cover;
  width: 30px; /* 이미지의 크기에 맞게 조절 */
  height: 30px; /* 이미지의 크기에 맞게 조절 */
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const TitleBox = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;
const Content = styled.div`
  font-size: 10px;
  font-weight: 400;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export default ReviewWrite;
