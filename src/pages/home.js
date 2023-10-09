import React, { useEffect, useState } from 'react';
import Button, { ButtonSize, ButtonTheme } from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import serverapi from '../api/serverapi';
import useAuthToken from '../hooks/useAuthToken';
import TopNav from '../components/TopNav/TopNav';
import areaCode1 from '../constants/areaCode1';
import areaCode2 from '../constants/areaCode2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { LinearProgress, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Place from '../components/Place/Place';
import styled from 'styled-components';
import tags from '../constants/tags';
import Toast, { ToastTheme } from '../components/Toast/Toast';
import BottomNav from '../components/BottomNav/BottomNav';

function UserRec(props) {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getAccessToken } = useAuthToken();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const getList = async () => {
    const api = `places/recommend/like-place?page=${page}`;

    try {
      setLoading(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getList-api', api);
      if (res.status === 201) {
        if (res.data.data.length === 0 && list.length !== 0) {
          console.log('res.data.data.length', res.data.data.length);
          setToastMessage('더 이상 불러올 장소가 없습니다');
          setShowToast(true);
        }
        const tmp = [...list, ...res.data.data];
        setList(tmp);
        setPage((prevPage) => prevPage + 1);
        console.log('list', list);
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

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <TextStyle>
        <img src='images/flag.svg' alt='Popular' />
        회원님이 좋아할 장소
      </TextStyle>
      {loading ? (
        <LinearProgress />
      ) : (
        <PlaceStyle>
          {list.map((place, index) => (
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
              getList();
            }}
          >
            장소 더 보기
          </Button>
        </PlaceStyle>
      )}
      {showToast && (
        <Toast toastTheme={ToastTheme.SUCCESS}>{toastMessage}</Toast>
      )}
    </>
  );
}

function AreaRec(props) {
  const [poppage, setPoppage] = useState(1);
  const [poplist, setPoplist] = useState([]);
  const [goodpage, setGoodpage] = useState(1);
  const [goodlist, setGoodlist] = useState([]);
  const [popLoading, setPopLoading] = useState(false);
  const [goodLoading, setGoodLoading] = useState(false);
  const [area1, setArea1] = useState(0);
  const [area2, setArea2] = useState(0);
  const [tag, setTag] = useState(1);
  const { getAccessToken } = useAuthToken();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const getPop = async () => {
    const api = `places/recommend/hot-place?areaCode1=${area1}&areaCode2=${area2}&page=${poppage}`;

    try {
      setPopLoading(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getPop-api', api);
      if (res.status === 201) {
        if (res.data.data.length === 0 && poplist.length !== 0) {
          console.log('res.data.data.length', res.data.data.length);
          setToastMessage('더 이상 불러올 장소가 없습니다');
          setShowToast(true);
        }
        const popTmp = [...poplist, ...res.data.data];
        setPoplist(popTmp);
        setPoppage((prevPoppage) => prevPoppage + 1);
        console.log('poplist', poplist);
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
      setPopLoading(false);
    }
  };

  const getGood = async () => {
    const api = `places/recommend/todo-place?areaCode1=${area1}&areaCode2=${area2}&page=${goodpage}&tag=${tag}`;

    try {
      setGoodLoading(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getGood-api', api);
      if (res.status === 201) {
        if (res.data.data.length === 0 && goodlist.length !== 0) {
          console.log('res.data.data.length', res.data.data.length);
          setToastMessage('더 이상 불러올 장소가 없습니다');
          setShowToast(true);
        }
        const goodTmp = [...goodlist, ...res.data.data];
        setGoodlist(goodTmp);
        setGoodpage((prevGoodpage) => prevGoodpage + 1);
        console.log('goodlist', goodlist);
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
      setGoodLoading(false);
    }
  };

  const areaReset = () => {
    setPoplist([]);
    setPoppage(0);
    setGoodlist([]);
    setGoodpage(0);
    getPop();
    getGood();
  };

  const onChangeArea1 = (event) => {
    setArea1(event.target.value);
    if (event.target.value === 0) {
      setArea2(0);
    } else {
      setArea2(1);
    }
    areaReset();
  };

  const onChangeArea2 = (event) => {
    setArea2(event.target.value);
    areaReset();
  };

  const onChangeTag = (event) => {
    setTag(event.target.value);
    setGoodlist([]);
    setGoodpage(0);
    getGood();
  };

  useEffect(
    () => {
      areaReset();
    },
    [],
    [area1, area2],
  );

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
      <TextStyle>
        <img src='images/flag.svg' alt='Popular' />
        지난 24시간 인기 장소
      </TextStyle>
      {popLoading ? (
        <LinearProgress />
      ) : (
        <PlaceStyle>
          {poplist.length !== 0 ? (
            <>
              {poplist.map((place, index) => (
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
                  getPop();
                }}
              >
                장소 더 보기
              </Button>
            </>
          ) : (
            <a>불러올 장소가 없습니다</a>
          )}
        </PlaceStyle>
      )}
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextStyle>
            <img src='images/flag.svg' alt='Popular' />
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
          {goodLoading ? (
            <LinearProgress />
          ) : (
            <PlaceStyle>
              {goodlist.length !== 0 ? (
                <>
                  {goodlist.map((place, index) => (
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
                      getGood();
                    }}
                  >
                    장소 더 보기
                  </Button>
                </>
              ) : (
                <a>불러올 장소가 없습니다</a>
              )}
            </PlaceStyle>
          )}
        </div>
      </div>
      {showToast && (
        <Toast toastTheme={ToastTheme.SUCCESS}>{toastMessage}</Toast>
      )}
    </div>
  );
}

function Home() {
  return (
    <div>
      <TopNav>장소</TopNav>
      <div style={{ padding: '60px 12px 0px 12px' }}>
        <AreaRec />
        <UserRec />
      </div>
      <BottomNav />
    </div>
  );
}

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
  gap: 16px;
  width: 100%;
  overflow-x: auto;
  height: auto;
  align-items: center;
`;
