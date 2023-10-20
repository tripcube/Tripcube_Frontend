import styled from 'styled-components';
import serverapi from '../../api/serverapi';
import useAuthToken from '../../hooks/useAuthToken';
import { useState } from 'react';

const Comment = ({
  commentId,
  numLike,
  like,
  userName,
  date,
  content,
  profileImage,
  image,
}) => {
  const { getAccessToken } = useAuthToken();
  const [Locallike, setLike] = useState(like);
  const [LocalNumLike, setNumLike] = useState(numLike);

  const love = async () => {
    console.log(commentId);
    const api = `comments/${commentId}/like`;

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
    const api = `comments/${commentId}/like`;

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

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: '4px 12px 4px 12px',
        borderRadius: '5px',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CircleImage style={{ marginRight: '15px' }}>
            <img src={profileImage} alt='원형 이미지' />
          </CircleImage>
          <div style={{ lineHeight: '1', justifyContent: 'center' }}>
            <NameTextStyle>{userName}</NameTextStyle>
            <DateTextStyle>{date}</DateTextStyle>
          </div>
        </div>
        <div style={{ marginTop: '10px' }}>
          <ContentTextStyle>{content}</ContentTextStyle>
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}
        >
          {Locallike ? (
            <img
              src={require('../../images/heartFilled.svg').default}
              alt='heartFilled'
              onClick={() => hate()}
            />
          ) : (
            <img
              src={require('../../images/heartEmpty.svg').default}
              alt='heartEmpty'
              onClick={() => love()}
            />
          )}
          <LikeTextStyle>{numLike}</LikeTextStyle>
        </div>
      </div>
      <div>
        <img
          src={image}
          width='80px'
          height='80px'
          style={{
            borderRadius: '10%',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
          }}
        ></img>
      </div>
    </div>
  );
};

export default Comment;

export const CircleImage = styled.div`
  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
`;

export const NameTextStyle = styled.div`
  font-size: 10px;
  font-weight: 900;
  font-color: #000000;
  margin-bottom: 5px;
`;

export const DateTextStyle = styled.div`
  font-size: 8px;
  font-color: #9f9f9f;
`;

export const ContentTextStyle = styled.span`
  font-size: 12px;
  font-weight: 500;
  font-color: #000000;
`;

export const LikeTextStyle = styled.div`
  margin-left: 4px;
  font-size: 8px;
  font-weight: 500;
  font-color: #9f9f9f;
`;

export const DottedLine = styled.div`
  width: 100%;
  border-top: 1px dotted #bebebe; /* 점선 스타일과 색상 설정 */
  height: 0; /* 높이를 0으로 설정하여 선만 표시 */
  margin-top: 5px;
`;
