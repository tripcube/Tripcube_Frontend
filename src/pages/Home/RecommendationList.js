import React, { useEffect, useState } from 'react';
import serverapi from '../../api/serverapi';
import { LinearProgress, CircularProgress, Select } from '@mui/material';
import Place from '../../components/Place/Place';
import styled from 'styled-components';
import areaCode1 from '../../constants/areaCode1';
import areaCode2 from '../../constants/areaCode2';

const RecommendationList = ({
  area1,
  area2,
  setToastMessage,
  setShowToast,
  navigate,
  getAccessToken,
}) => {
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [list, setList] = useState([]);
  const [areaName1, setAreaName1] = useState('');
  const [areaName2, setAreaName2] = useState('');

  const getFirstList = async (page, areaName1, areaName2) => {
    const api = `places/recommend/like-place?area1=${areaName1}&area2=${areaName2}&page=${page}`;

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
    const areaName1 = areaCode1.find((area) => area.num === area1)?.name;
    const areaName2 = areaCode2[area1].find((area) => area.num === area2)?.name;
    setAreaName1(areaName1);
    setAreaName2(areaName2);
    getFirstList(1, areaName1, areaName2);
  }, []);

  useEffect(() => {
    const areaName1 = areaCode1.find((area) => area.num === area1)?.name;
    const areaName2 = areaCode2[area1].find((area) => area.num === area2)?.name;
    setAreaName1(areaName1);
    setAreaName2(areaName2);
    getFirstList(1, areaName1, areaName2);
  }, [area1, area2]);

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
                  accuracy={place.accuracy.toFixed(2)}
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

export default RecommendationList;

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
