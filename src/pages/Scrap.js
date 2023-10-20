import React, { useEffect, useState } from 'react';
import TopNav from '../components/TopNav/TopNav';
import BottomNav from '../components/BottomNav/BottomNav';
import serverapi from '../api/serverapi';
import useAuthToken from '../hooks/useAuthToken';
import { LinearProgress } from '@mui/material';
import Place from '../components/Place/Place';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Scrap = () => {
  const [scraplist, setScraplist] = useState([]);
  const [folderlist, setFolderlist] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const { getAccessToken } = useAuthToken();
  const [mode, setMode] = useState('main'); // main: 처음, all: 모두, folder: 폴더별
  const [folderPage, setFolderPage] = useState(0);

  const getScraplist = async () => {
    const api = `places/scrap?page=1`;

    try {
      setLoading1(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getScraplist-api', api);
      if (res.status === 201) {
        setScraplist(res.data.data);
        console.log('res.data.data', res.data.data);
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
    } finally {
      setLoading1(false);
    }
  };

  useEffect(() => {
    getScraplist();
  }, [mode]);

  return (
    <div>
      <TopNav onClick={() => (window.location.href = '/scrap')}>스크랩</TopNav>
      <MainContainer
        setMode={setMode}
        scraplist={scraplist}
        folderlist={folderlist}
        loading1={loading1}
        loading2={loading2}
        setFolderPage={setFolderPage}
      />
      <BottomNav />
    </div>
  );
};

// mode: main
const MainContainer = (props) => {
  const setMode = props.setMode;
  const scraplist = props.scraplist;
  const loading1 = props.loading1;

  return (
    <>
      <ScrapStyle style={{ minHeight: '270px' }}>
        {loading1 ? (
          <LinearProgress />
        ) : (
          <AllScrap scraplist={scraplist} setMode={setMode} />
        )}
      </ScrapStyle>
    </>
  );
};

// mode: main에서 전체 보기
const AllScrap = (props) => {
  const scraplist = props.scraplist;
  const setMode = props.setMode;
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          fontWeight: '700',
          fontSize: '20px',
          padding: '44px 0px 8px 0px',
        }}
      >
        전체 보기
      </div>
      {scraplist.length !== 0 ? (
        <PlaceStyle>
          {scraplist.map((place, index) => (
            <Place
              key={place.placeId}
              place={place}
              onClick={() => navigate(`/detail/${place.placeId}`)}
            />
          ))}
        </PlaceStyle>
      ) : (
        <a>불러올 장소가 없습니다</a>
      )}
    </>
  );
};

export default Scrap;

const PlaceStyle = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  overflow-x: auto;
  height: auto;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 576px;
  align-content: flex-start;
`;

const FolderStyle = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  overflow-x: auto;
  height: auto;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const ScrapStyle = styled.div`
  background-color: rgb(237, 237, 237);
  padding: 20px 15px;
  margin-bottom: 8px;
`;
