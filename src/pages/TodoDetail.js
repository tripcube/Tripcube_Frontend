import React, { useState, useEffect } from "react";
import styled from "styled-components";
import serverapi from "../api/serverapi";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment/Comment";
import tags from '../constants/tags'

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
  }, []);

  return { todoInfo, loading };
}

function TodoDetail() {
  const navigate = useNavigate();
  const { getAccessToken } = useAuthToken();
  const { todoId } = useParams(); // URL 파라미터에서 todoId를 추출

  const { todoInfo, loading } = useTodoInfo(todoId, getAccessToken);
  const [commentsList, setCommentList] = useState([]);

  useEffect(() => {
    const getCommentsInfo = async () => {
      const api = `comments/todo?page=1&sort=DATE_DESC&todoId=${todoId}`;
      try {
        const res = await serverapi.get(api, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });

        if (res.status === 201) {
          setCommentList(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching place info:", error);
      }
    };

    getCommentsInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  const navigateToWritePage = () => {
    navigate("/write");
  };
  const navigateBack = () => {
    window.history.back(); // 브라우저의 뒤로 가기 기능을 사용하여 이전 페이지로 이동
  };

  return (
    <div style={{padding: "10px 10px 10px 10px"}}>
      <BackSpace>
        <PlaceTitle onClick={navigateBack}>{"< " + todoInfo.placeName}</PlaceTitle>
      </BackSpace>
      <TitleBox>
        <TagBox num={todoInfo.tag} />
        <TodoTitle>{todoInfo.content}</TodoTitle>
        <Like>
          {todoInfo.like ? (
            <img
              src={require("../images/heartFilled.svg").default}
              alt="filled"
              width="25px"
              //   onClick={() => unscrap()}
            />
          ) : (
            <img
              src={require("../images/heartEmpty.svg").default}
              width="25px"
              //   onClick={() => scrap()}
            />
          )}
        </Like>
      </TitleBox>
      <WriteBox>
        <StartText>{"첫시작 : " + todoInfo.userName}</StartText>
        <ReviewWrite onClick={navigateToWritePage}>
          나도 더 알려주기
        </ReviewWrite>
      </WriteBox>
      {commentsList && commentsList.map((commentInfo, idx) => (
        <div>
          <Comment
            commentId={commentInfo.commentId}
            content={commentInfo.comment_content}
            date={commentInfo.date}
            image={commentInfo.image}
            like={commentInfo.comment_islike}
            numLike={commentInfo.comment_likes}
            profileImage={commentInfo.profileImage}
            userName={commentInfo.userName}
            key={idx}
          ></Comment>
           <DottedLine />
        </div>
      ))}

    </div>
  );
}

export default TodoDetail;

const BackSpace = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const PlaceTitle = styled.button`
  background-color: transparent;
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.375px;
  border: transparent;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const TodoTitle = styled.div`
  width: 100%;
  color: #000;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Like = styled.div`
  float: right;
  align-items: center;
`;

const WriteBox = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ReviewWrite = styled.button`
  padding: 5px 10px 5px 10px;
  background-color: black;
  float: right;
  color: white;
  border-color: transparent;
  border-radius: 7px;
`;

export const TagBox = styled.div`
  width: 8px;
  height: 28px;
  background-color: ${(props) => tags[props.num].color};
  margin-right: 12px;
`;

export const StartText = styled.div`
  font-size: 10px;
  font-weight: 500;
  font-color: #000000;
`;

const DottedLine = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
  width: 100%;
  border-top: 2px dotted #BEBEBE; /* 점선 스타일과 색상 설정 */
  height: 0; /* 높이를 0으로 설정하여 선만 표시 */
`;
