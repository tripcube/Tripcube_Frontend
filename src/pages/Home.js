import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import serverapi from '../api/serverapi';
import useAuthToken from '../hooks/useAuthToken';
import TopNav from '../components/TopNav/TopNav';
import areaCode1 from '../constants/areaCode1';
import areaCode2 from '../constants/areaCode2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { LinearProgress, CircularProgress, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Place from '../components/Place/Place';
import styled from 'styled-components';
import tags from '../constants/tags';
import Toast, { ToastTheme } from '../components/Toast/Toast';
import BottomNav from '../components/BottomNav/BottomNav';
import { Circle } from 'react-kakao-maps-sdk';

const Home = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <TopNav>장소</TopNav>
      <div style={{ padding: '60px 12px 70px 12px' }}>
        <AreaRec // 지역 기반 추천
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

const AreaRec = (props) => {
  const setToastMessage = props.setToastMessage;
  const setShowToast = props.setShowToast;
  const navigate = props.navigate;

  const [area1, setArea1] = useState(0);
  const [area2, setArea2] = useState(0);

  const { getAccessToken } = useAuthToken();

  const onChangeArea1 = (event) => {
    setArea1(event.target.value);
    if (event.target.value === 0) {
      setArea2(0);
    } else {
      setArea2(1);
    }
  };

  const onChangeArea2 = (event) => {
    setArea2(event.target.value);
  };

  return (
    <div>
      <>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id='demo-select-small-label'>도/시/구</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={area1}
            onChange={onChangeArea1}
            autoWidth
            label='도/시'
          >
            {areaCode1.map((area) => (
              <MenuItem key={area.num} value={area.num}>
                {area.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id='demo-select-small-label'>시/구/군</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={area2}
            onChange={onChangeArea2}
            autoWidth
            label='시/구/군'
          >
            {areaCode2[area1].map((area) => (
              <MenuItem key={area.num} value={area.num}>
                {area.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
      <LastPopPlace
        area1={area1}
        area2={area2}
        setToastMessage={setToastMessage}
        setShowToast={setShowToast}
        navigate={navigate}
        getAccessToken={getAccessToken}
      />
      <ActivityPlace
        area1={area1}
        area2={area2}
        setToastMessage={setToastMessage}
        setShowToast={setShowToast}
        navigate={navigate}
        getAccessToken={getAccessToken}
      />
    </div>
  );
};

const LastPopPlace = (props) => {
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
      if (e.response.status === 401) {
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
      if (e.response.status === 401) {
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
      <TextStyle>
        <img
          src={require('../images/main_pop.svg').default}
          style={{ width: '20px', height: '20px', margin: '4px' }}
        />
        지난 24시간 인기 장소
      </TextStyle>
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
                    src={require('../images/more_place.svg').default}
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

const ActivityPlace = (props) => {
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
  const [tag, setTag] = useState(1);

  const getFirstList = async () => {
    const api = `places/recommend/todo-place?areaCode1=${area1}&areaCode2=${area2}&page=1&tag=${tag}`;

    try {
      setLoading(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getList-api-ActivityPlace', api);
      if (res.status === 201) {
        setList(res.data.data);
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
      setLoading(false);
    }
  };

  const getList = async (page) => {
    const api = `places/recommend/todo-place?areaCode1=${area1}&areaCode2=${area2}&page=${page}&tag=${tag}`;

    try {
      setMoreLoading(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getList-api-ActivityPlace', api);
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
      if (e.response.status === 401) {
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

  const onChangeTag = (event) => {
    setTag(event.target.value);
    getFirstList();
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextStyle>
          <img
            src={require('../images/main_act.svg').default}
            style={{ width: '20px', height: '20px', margin: '4px' }}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
            <InputLabel id='demo-select-small-label'>활동 선택</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              value={tag}
              onChange={onChangeTag}
              autoWidth
              label='활동 선택'
            >
              {tags.map(
                (tag) =>
                  tag.num !== 0 && (
                    <MenuItem key={tag.num} value={tag.num}>
                      {tag.explanation}
                    </MenuItem>
                  ),
              )}
            </Select>
          </FormControl>
          좋은 장소
        </TextStyle>
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
                      src={require('../images/more_place.svg').default}
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
      </div>
    </>
  );
};

const UserRec = (props) => {
  const setToastMessage = props.setToastMessage;
  const setShowToast = props.setShowToast;
  const navigate = props.navigate;

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
      if (e.response.status === 401) {
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
      if (e.response.status === 401) {
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
          src={require('../images/main_rec.svg').default}
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
                    src={require('../images/more_place.svg').default}
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
