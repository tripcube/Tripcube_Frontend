import React, { useState, useEffect } from "react";
import styled from "styled-components";
import serverapi from "../api/serverapi";
import { useNavigate } from "react-router-dom";
import useAuthToken from "../hooks/useAuthToken";

// 커스텀 후크 생성
function useTodoInfo(todoId, getAccessToken) {
  const [todoInfo, setTodoInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTodoInfo = async () => {
      try {
        const res = await serverapi.get(`todos/${todoId}`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });

        if (res.status === 201) {
          setTodoInfo(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching place info:", error);
      } finally {
        setLoading(false);
      }
    };

    getTodoInfo();
  }, [todoId, getAccessToken]);

  return { todoInfo, loading };
}

function TodoDetail({ placeId }) {
  const navigate = useNavigate();
  const { getAccessToken } = useAuthToken();

  // 커스텀 후크 사용
  const { todoInfo, loading } = useTodoInfo(9, getAccessToken);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!todoInfo) {
    return <div>Place information not found.</div>;
  }

  const navigateToWritePage = () => {
    navigate("/write");
  };

  return (
    <div>
      <BackSpace>
        <PlaceTitle>배봉산</PlaceTitle>
      </BackSpace>
      <TodoTitle>노을이 지는 곳에서 사진 찍기</TodoTitle>
      <ReviewWrite onClick={navigateToWritePage}>나도 더 알려주기</ReviewWrite>
    </div>
  );
}

export default TodoDetail;

const BackSpace = styled.div`
  width: 100%;
  height: 50px;
`;

const PlaceTitle = styled.button`
  background-color: transparent;
  margin-left: 10px;
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.375px;
  border: transparent;
  padding: 10px 20px;
`;

const TodoTitle = styled.div`
  width: 100%;
  height: 50px;
  margin-left: 10px;
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ReviewWrite = styled.button`
  width: 30%;
  height: 30px;
  background-color: black;
  color: white;
`;
