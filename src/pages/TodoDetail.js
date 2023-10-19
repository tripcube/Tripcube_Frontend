import React, { useState, useEffect } from "react";
import styled from "styled-components";
import serverapi from "../api/serverapi";
import { useNavigate } from "react-router-dom";
import Comment from "../components/Comment/Comment";

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

  //   if (!todoInfo) {
  //     return <div>Place information not found.</div>;
  //   }

  const navigateToWritePage = () => {
    navigate("/write");
  };
  const navigateBack = () => {
    window.history.back(); // 브라우저의 뒤로 가기 기능을 사용하여 이전 페이지로 이동
  };

  return (
    <div>
      <BackSpace>
        <PlaceTitle onClick={navigateBack}>배봉산</PlaceTitle>
      </BackSpace>
      <TitleBox>
        <TodoTitle>노을이 지는 곳에서 사진 찍기</TodoTitle>
        <Like>
          {true ? (
            <img
              src={require("../images/heartFilled.svg").default}
              alt="filled"
              //   onClick={() => unscrap()}
            />
          ) : (
            <img
              src={require("../images/heartEmpty.svg").default}
              //   onClick={() => scrap()}
            />
          )}
        </Like>
      </TitleBox>
      <WriteBox>
        <ReviewWrite onClick={navigateToWritePage}>
          나도 더 알려주기
        </ReviewWrite>
      </WriteBox>
      <Comment
        commentId={3}
        like={false}
        numLike={0}
        userName={"TRIPCUBE"}
        date={"2023년 10월 1일 등록"}
        content={"노을지는 오후 8시 이후에 가면 좋아요"}
        profileImage={
          "https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg"
        }
        image={
          "https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=24651&fileTy=MEDIA&fileNo=1"
        }
      ></Comment>
      <Comment
        commentId={3}
        like={false}
        numLike={0}
        userName={"TRIPCUBE"}
        date={"2023년 10월 1일 등록"}
        content={"노을지는 오후 8시 이후에 가면 좋아요"}
        profileImage={
          "https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg"
        }
        image={
          "https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=24651&fileTy=MEDIA&fileNo=1"
        }
      ></Comment>
      <Comment
        commentId={3}
        like={false}
        numLike={0}
        userName={"TRIPCUBE"}
        date={"2023년 10월 1일 등록"}
        content={"노을지는 오후 8시 이후에 가면 좋아요"}
        profileImage={
          "https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg"
        }
        image={
          "https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=24651&fileTy=MEDIA&fileNo=1"
        }
      ></Comment>
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

const TitleBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
`;
const TodoTitle = styled.div`
  width: 80%;
  height: 50px;
  margin-left: 10px;
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Like = styled.div`
  width: 20%;
  float: right;
  align-items: center;
`;

const WriteBox = styled.div`
  height: 50px;
  width: 100%;
`;

const ReviewWrite = styled.button`
  width: 30%;
  height: 30px;
  background-color: black;
  float: right;
  margin-right: 10px;
  color: white;
  border-color: transparent;
  border-radius: 5px;
`;
