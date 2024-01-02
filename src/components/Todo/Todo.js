import styled from 'styled-components';
import tags from '../../constants/tags';
import serverapi from '../../api/serverapi';
import useAuthToken from '../../hooks/useAuthToken';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast, { ToastTheme } from '../../components/Toast/Toast';

const Todo = ({ todoId, numTag, numLike, children, like, placeId }) => {
  const { getAccessToken } = useAuthToken();
  const [Locallike, setLike] = useState(like);
  const navigate = useNavigate();
  const [LocalNumLike, setNumLike] = useState(numLike);
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

  const navigateToTodoPage = () => {
    navigate(`/todo/${todoId}`);
  };

  const love = async () => {
    console.log(todoId);
    const api = `todos/${todoId}/like`;

    try {
      const res = await serverapi.post(api, null, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
        setLike(true);
        setNumLike(LocalNumLike + 1);
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
        setLike(false);
        setNumLike(LocalNumLike - 1);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <div
      style={{
        onClick: { navigateToTodoPage },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: '4px 12px 4px 12px',
        borderRadius: '5px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TagBox num={numTag} />
        <TodoTextStyle onClick={navigateToTodoPage}>{children}</TodoTextStyle>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <LikeTextStyle>{LocalNumLike}</LikeTextStyle>

        {Locallike ? (
          <img
            src='images/heartFilled.svg'
            alt='heartFilled'
            onClick={() => hate()}
            style={{ marginLeft: '4px' }}
          />
        ) : (
          <img
            src='images/heartEmpty.svg'
            alt='heartEmpty'
            onClick={() => love()}
            style={{ marginLeft: '4px' }}
          />
        )}
      </div>
      {showToast && (
        <Toast toastTheme={ToastTheme.SUCCESS}>{toastMessage}</Toast>
      )}
    </div>
  );
};

export default Todo;

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
