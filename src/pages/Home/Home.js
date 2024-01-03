import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import serverapi from '../../api/serverapi';
import useAuthToken from '../../hooks/useAuthToken';
import TopNav from '../../components/TopNav/TopNav';
import { LinearProgress, CircularProgress, Select } from '@mui/material';
import Place from '../../components/Place/Place';
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
        <UserRec // 지역 기반 추천 X, 오직 유저 기반 추천
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
          src='images/main_rec.svg'
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
                />
              ))}
              {moreLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <img
                    src='images/more_place.svg'
                    alt='image_more'
                    width='112px'
                    height='164px'
                    onClick={() => {
                      getList(page);
                    }}
                  />
                </>
              )}
            </>
          ) : (
            <a>불러올 장소가 없습니다</a>
          )}
        </PlaceStyle>
      )}
    </>
  );
};

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
