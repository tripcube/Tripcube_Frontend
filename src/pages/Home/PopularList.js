import React, { useEffect, useState } from 'react';
import serverapi from '../../api/serverapi';
import { LinearProgress, CircularProgress, Select } from '@mui/material';
import Place from '../../components/Place/Place';
import styled from 'styled-components';

const PopularList = (props) => {
  const area1 = props.area1;
  const area2 = props.area2;
  const setToastMessage = props.setToastMessage;
  const setShowToast = props.setShowToast;
  const navigate = props.navigate;
  const getAccessToken = props.getAccessToken;

  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [list, setList] = useState([]);

  const getFirstList = async () => {
    const api = `places/recommend/hot-place?areaCode1=${area1}&areaCode2=${area2}&page=1`;

    try {
      setLoading(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getList-api-LastPopPlace', api);
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
    const api = `places/recommend/hot-place?areaCode1=${area1}&areaCode2=${area2}&page=${page}`;

    try {
      setMoreLoading(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getList-api-LastPopPlace', api);
      if (res.status === 201) {
        if (res.data.data.length === 0) {
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
    getFirstList();
  }, []);

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <PlaceStyle>
          {list.length !== 0 ? (
            <>
              {list.map((place, index) => (
                <Place
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

export default PopularList;

const PlaceStyle = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  overflow-x: auto;
  height: auto;
  align-items: flex-start;
`;
