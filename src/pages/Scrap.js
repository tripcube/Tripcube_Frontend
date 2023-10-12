import React, { useEffect, useState } from 'react';
import TopNav from '../components/TopNav/TopNav';
import BottomNav from '../components/BottomNav/BottomNav';
import serverapi from '../api/serverapi';
import useAuthToken from '../hooks/useAuthToken';
import { LinearProgress } from '@mui/material';
import Place from '../components/Place/Place';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonSize, ButtonTheme } from '../components/Button/Button';
import styled from 'styled-components';

const Scrap = () => {
  const [scraplist, setScraplist] = useState([]);
  const [folderlist, setFolderlist] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const { getAccessToken } = useAuthToken();

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
      console.log('error', e);
    } finally {
      setLoading1(false);
    }
  };

  const getFolderlist = async () => {
    const api = `places/folders`;

    try {
      setLoading2(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getFolderlist-api', api);
      if (res.status === 201) {
        setFolderlist(res.data.data);
        console.log('res.data.data', res.data.data);
      }
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    getScraplist();
    getFolderlist();
  }, []);

  return (
    <div>
      <TopNav>스크랩</TopNav>
      <div
        style={{
          backgroundColor: '#ededed',
          padding: '20px',
          marginBottom: '8px',
          minHeight: '270px',
        }}
      >
        {loading1 ? (
          <LinearProgress />
        ) : (
          <AllScrap scraplist={scraplist} getScraplist={getScraplist} />
        )}
      </div>
      <div
        style={{
          backgroundColor: '#ededed',
          padding: '20px',
          marginBottom: '44px',
          minHeight: '430px',
        }}
      >
        {loading2 ? <LinearProgress /> : <Folder folderlist={folderlist} />}
      </div>
      <BottomNav />
    </div>
  );
};

const AllScrap = (props) => {
  const scraplist = props.scraplist;
  const getScraplist = props.getScraplist;
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
      <PlaceStyle>
        {scraplist.map((place, index) => (
          <Place
            key={place.placeId}
            place={place}
            onClick={() => navigate(`/detail/${place.placeId}`)}
          />
        ))}
        <Button
          buttonSize={ButtonSize.NORMAL}
          ButtonTheme={ButtonTheme.BLACK}
          handler={() => {
            getScraplist();
          }}
        >
          장소 더 보기
        </Button>
      </PlaceStyle>
    </>
  );
};

const Folder = (props) => {
  const folderlist = props.folderlist;

  return folderlist.length === 0 ? (
    <div>폴더가 없습니다.</div>
  ) : (
    <div
      style={{
        display: 'flex',
        fontWeight: '700',
        fontSize: '20px',
        justifyContent: 'space-between',
      }}
    >
      <div>폴더</div>
      <div>편집</div>
    </div>
  );
};

export default Scrap;

const PlaceStyle = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  overflow-x: auto;
  height: auto;
  align-items: center;
`;
