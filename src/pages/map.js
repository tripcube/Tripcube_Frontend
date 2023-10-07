import React, { useEffect, useState } from 'react';
import InputSearch from '../components/Input/InputSearch';
import { Map } from 'react-kakao-maps-sdk';

const Maps = () => {
  const [keywordValue, setKeywordValue] = useState('');
  const [latitude, setLatitude] = useState(33.450701);
  const [longitude, setLongitude] = useState(126.570667);

  function getLatitude(lat) {
    setLatitude(Number(lat));
  }

  function getLongitude(lon) {
    setLongitude(Number(lon));
  }

  window.getLongitude = getLongitude; // 전역 스코프에 등록
  window.getLatitude = getLatitude;

  const onChangeKeyword = (event) => {
    setKeywordValue(event.target.value);
  };


  const search = async () => {
    //eslint-disable-next-line
    GetImage.postMessage('');
  };

  function getLocation() {
    try {
      console.log('a');
      //eslint-disable-next-line
      GetLocation.postMessage('');
      console.log('b');
    } catch (e) {}
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    console.log(latitude);
    console.log(longitude);
  }, [latitude, longitude]);

  return (
    <Map
        center={{ lat: latitude, lng: longitude }}   // 지도의 중심 좌표
        style={{ width: '100%', height: '100vh' }} // 지도 크기
        level={3}                                   // 지도 확대 레벨
      >
      <div id="search" style={{position:"absolute", zIndex:31, width:"80%", top:"30px", left:"10%", display:'flex', justifyContent: "space-between"}}>
        <InputSearch placeholder='관광지 검색' value={keywordValue} onChangeHandler={onChangeKeyword} />
        <button onClick={search} style={{width:"10%", backgroundImage:'../images/search.svg', border:"none", backgroundSize: "90% 90%", backgroundRepeat:"no-repeat"}}> </button>
      </div>
    </Map>
  );
};

export default Maps;
