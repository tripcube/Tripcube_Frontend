import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/TopNav/TopNav';
import styled from 'styled-components';
import Toast, { ToastTheme } from '../../components/Toast/Toast';
import BottomNav from '../../components/BottomNav/BottomNav';
import AreaPart from './AreaPart';

const Home = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <TopNav>장소</TopNav>
      <div style={{ padding: '60px 12px 70px 12px' }}>
        <AreaPart // 지역 기반 추천
          setToastMessage={setToastMessage}
          setShowToast={setShowToast}
          navigate={navigate}
        />
      </div>
      <BottomNav />
      {showToast && (
        <Toast toastTheme={ToastTheme.SUCCESS}>{toastMessage}</Toast>
      )}
    </div>
  );
};
/*
const UserRec = ({ setToastMessage, setShowToast, navigate }) => {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);

  const { getAccessToken } = useAuthToken();

  const getFirstList = async (page) => {
    const api = `places/recommend/like-place?page=${page}`;

    try {
      setLoading(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getList-api-UserRec', api);
      if (res.status === 201) {
        setList(res.data.data);
        console.log('res.data.data', res.data.data);
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        // 401 Unauthorized 오류가 발생한 경우
        console.log('Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.');
        window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
      } else {
        // 다른 오류가 발생한 경우
        console.error('오류가 발생했습니다:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  const getList = async (page) => {
    const api = `places/recommend/like-place?page=${page}`;

    try {
      setMoreLoading(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getList-api-UserRec', api);
      if (res.status === 201) {
        if (res.data.data.length === 0) {
          console.log('res.data.data.length-UserRec', res.data.data.length);
          setToastMessage('더 이상 불러올 장소가 없습니다');
          setShowToast(true);
        } else {
          const tmp = [...list, ...res.data.data];
          setList(tmp);
          setPage((prevPage) => prevPage + 1);
        }
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        // 401 Unauthorized 오류가 발생한 경우
        console.log('Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.');
        window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
      } else {
        // 다른 오류가 발생한 경우
        console.error('오류가 발생했습니다:', e);
      }
    } finally {
      setMoreLoading(false);
    }
  };

  useEffect(() => {
    getFirstList(1);
  }, []);

  return (
    <>
      <TextStyle>
        <img
          src='/images/main_rec.svg'
          style={{ width: '20px', height: '20px', margin: '4px' }}
        />
        회원님이 좋아할 장소
      </TextStyle>
      {loading ? (
        <LinearProgress />
      ) : (
        <PlaceStyle>
          {list.length !== 0 ? (
            <>
              {list.map((place, index) => (
                <Place
                  rankIndex={-1}
                  key={place.placeId}
                  place={place}
                  onClick={() => navigate(`/detail/${place.placeId}`)}
                  todo={'none'}
                />
              ))}
              {moreLoading ? (
                <CircularProgress />
              ) : (
                <MorePlaceImage
                  src='/images/more_place.svg'
                  onClick={() => {
                    getList(page);
                  }}
                />
              )}
            </>
          ) : (
            <NoPlaceTextStyle>불러올 장소가 없습니다</NoPlaceTextStyle>
          )}
        </PlaceStyle>
      )}
    </>
  );
};
*/
export default Home;

const TextStyle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 20px 0px 10px 0px;
  display: flex;
  align-items: center;
`;

const PlaceStyle = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  overflow-x: auto;
  height: auto;
  align-items: flex-start;
`;

const MorePlaceImage = styled.img`
  width: 112px;
  height: 164px;
  border-radius: 8px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  object-fit: cover;
  margin-right: 8px;
`;

const NoPlaceTextStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 14px;
  padding: 8px;
  border-radius: 10px;
  border: 0.1px solid #acacac;
`;
