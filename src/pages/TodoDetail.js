import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import serverapi from '../api/serverapi';
import { useAsyncError, useNavigate, useParams } from 'react-router-dom';
import Comment from '../components/Comment/Comment';
import tags from '../constants/tags';
import Toast, { ToastTheme } from '../components/Toast/Toast';

import useAuthToken from '../hooks/useAuthToken';

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
        console.error('Error fetching place info:', error);
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
  const [localLike, setLocalLike] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastTheme, setToastTheme] = useState(ToastTheme.SUCCESS);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    try {
      setLocalLike(todoInfo.like);
    } catch (e) {}
  }, [todoInfo]);

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
        console.error('Error fetching place info:', error);
      }
    };

    getCommentsInfo();
  }, []);

  const love = async () => {
    const api = `todos/${todoId}/like`;

    try {
      const res = await serverapi.post(api, null, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('------');
      console.log(res.data);
      if (res.status === 201) {
        setLocalLike(true);
      }
      if (res.status === 202) {
        setToastMessage('내 TODO에는 좋아요를 누를 수 없습니다.');
        setToastTheme(ToastTheme.SUCCESS);
        setShowToast(true);
      }
    } catch (e) {
      if (e.response.status === 401) {
        // 401 Unauthorized 오류가 발생한 경우
        console.log('Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.');
        window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
      } else {
        // 다른 오류가 발생한 경우
        console.error('오류가 발생했습니다:', e);
      }
    }
  };

  const hate = async () => {
    const api = `todos/${todoId}/like`;

    try {
      const res = await serverapi.delete(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
        setLocalLike(false);
      }
    } catch (e) {
      if (e.response.status === 401) {
        // 401 Unauthorized 오류가 발생한 경우
        console.log('Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.');
        window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
      } else {
        // 다른 오류가 발생한 경우
        console.error('오류가 발생했습니다:', e);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const navigateToWritePage = () => {
    navigate(`/write/${todoId}`);
  };
  const navigateBack = () => {
    window.history.back(); // 브라우저의 뒤로 가기 기능을 사용하여 이전 페이지로 이동
  };

  return (
    <div style={{ padding: '10px 10px 10px 10px' }}>
      <BackSpace>
        <PlaceTitle onClick={navigateBack}>
          {'< ' + todoInfo.placeName}
        </PlaceTitle>
      </BackSpace>
      <TitleBox>
        <TagBox num={todoInfo.tag} />
        <TodoTitle>{todoInfo.content}</TodoTitle>
        <Like>
          {localLike ? (
            <img
              src={require('../images/heartFilled.svg').default}
              alt='filled'
              width='25px'
              onClick={() => hate()}
            />
          ) : (
            <img
              src={require('../images/heartEmpty.svg').default}
              width='25px'
              onClick={() => love()}
            />
          )}
        </Like>
      </TitleBox>
      <WriteBox>
        <StartText
          onClick={() => {
            navigate(`/mypage/${todoInfo.userId}`);
          }}
        >
          {'첫시작 : ' + todoInfo.userName}
        </StartText>
        <ReviewWrite onClick={navigateToWritePage}>
          나도 더 알려주기
        </ReviewWrite>
      </WriteBox>
      {commentsList.length !== 0 ? (
        commentsList.map((commentInfo, idx) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
            }}
          >
            <Comment
              commentId={commentInfo.commentId}
              content={commentInfo.comment_content}
              date={commentInfo.date}
              image={commentInfo.image}
              like={commentInfo.comment_islike}
              numLike={commentInfo.comment_likes}
              profileImage={commentInfo.profileImage}
              userName={commentInfo.userName}
              userId={commentInfo.userId}
              key={idx}
            ></Comment>
            <DottedLine />
          </div>
        ))
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ fontSize: '15px' }}>불러올 댓글이 없습니다.</h1>
        </div>
      )}
      {showToast && (
        <Toast toastTheme={ToastTheme.SUCCESS}>{toastMessage}</Toast>
      )}
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
  margin-top: 4px;
  margin-bottom: 4px;
  width: 100%;
  border-top: 2px dotted #bebebe; /* 점선 스타일과 색상 설정 */
  height: 0; /* 높이를 0으로 설정하여 선만 표시 */
`;
