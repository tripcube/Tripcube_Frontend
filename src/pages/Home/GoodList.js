import React, { useEffect, useState } from 'react';
import serverapi from '../../api/serverapi';
import { LinearProgress, CircularProgress, Select } from '@mui/material';
import Place from '../../components/Place/Place';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import tags from '../../constants/tags';

const GoodList = ({
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
  const [tag, setTag] = useState(1);

  const getFirstList = async (tag) => {
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
    getFirstList(1);
  }, []);

  useEffect(() => {
    getFirstList(1);
  }, [area1, area2]);

  const onChangeTag = (event) => {
    setTag(event.target.value);
    getFirstList(event.target.value);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextStyle>
          <img
            src='/images/main_act.svg'
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
          <>
            {list.length !== 0 ? (
              <PlaceStyle>
                {list.map((place, index) => (
                  <Place
                    rankIndex={-1}
                    key={place.placeId}
                    place={place}
                    onClick={() => navigate(`/detail/${place.placeId}`)}
                    todo={place.content}
                    tagColor={tags[tag].color}
                  />
                ))}
                {moreLoading ? (
                  <CircularProgress />
                ) : (
                  <MorePlaceImage
                    src='/images/more_place_todo.svg'
                    onClick={() => {
                      getList(page);
                    }}
                  />
                )}
              </PlaceStyle>
            ) : (
              <NoPlaceTextStyle>불러올 장소가 없습니다</NoPlaceTextStyle>
            )}
          </>
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
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 130px 130px;
  grid-template-columns: repeat(auto-fill, 180px);
  gap: 8px;
  overflow-x: auto;
`;

const MorePlaceImage = styled.img`
  width: 180px;
  height: 90px;
  border-radius: 8px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  object-fit: cover;
  margin-right: 8px;
`;

const NoPlaceTextStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 16px);
  height: fit-content;
  font-size: 14px;
  padding: 8px;
  border-radius: 10px;
  border: 0.1px solid #acacac;
`;
