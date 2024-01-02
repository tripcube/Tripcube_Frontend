import React, { useEffect, useState } from 'react';
import serverapi from '../../api/serverapi';
import { LinearProgress, CircularProgress, Select } from '@mui/material';
import Place from '../../components/Place/Place';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import tags from '../../constants/tags';

const GoodList = (props) => {
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
    if (page === undefined) page = 1;

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

  useEffect(() => {
    getFirstList();
  }, [area1, area2]);

  const onChangeTag = (event) => {
    setTag(event.target.value);
    getFirstList();
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextStyle>
          <img
            src='images/main_act.svg'
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
                  <div>
                    <Place
                      key={place.placeId}
                      place={place}
                      onClick={() => navigate(`/detail/${place.placeId}`)}
                    />
                    <div
                      style={{
                        fontSize: '9px',
                        backgroundColor: '#ffdb4b',
                        margin: '5px 0px 0px 0px',
                      }}
                    >
                      "{place.content}"
                    </div>
                  </div>
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
      </div>
    </>
  );
};

export default GoodList;

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
