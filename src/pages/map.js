import React, { useEffect, useState, useRef } from 'react';
import InputSearch from '../components/Input/InputSearch';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useAuthToken from '../hooks/useAuthToken';
import serverapi from '../api/serverapi';
import BottomModalSheet from '../components/BottomModalSheet/BottomModalSheet';

const Maps = () => {
  const [keywordValue, setKeywordValue] = useState('');
  const [latitude, setLatitude] = useState(37.583865);
  const [longitude, setLongitude] = useState(127.0587767);
  const [markerList, setMarkerList] = useState([]);
  const { getAccessToken } = useAuthToken();
  const mapRef = useRef();
  const [isModalOpen, setModalOpen] = useState(false);

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
      //eslint-disable-next-line
      GetLocation.postMessage('');
    } catch (e) {}
  }

  const getMarkerList = async () => {
    const api = `places/location?mapX=${longitude}&mapY=${latitude}&page=1`;

    const res = await serverapi.get(api, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (res.status === 201) {
      let tmp = [...res.data.data.places];
      setMarkerList(tmp);
      console.log(tmp);
    }
  }

  const getPlaceButtonHandler = () => {
    const map = mapRef.current;
    setLatitude(map.getCenter().getLat());
    setLongitude(map.getCenter().getLng());
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getMarkerList();
  }, [latitude, longitude]);

  return (
    <Map
        center={{ lat: latitude, lng: longitude }}   // 지도의 중심 좌표
        style={{ width: '100%', height: '100vh' }} // 지도 크기
        level={5}                                   // 지도 확대 레벨
        ref={mapRef}
      >
      {markerList.map((marker, idx) => (
        <MapMarker
          key={idx}
          position={{lat : marker.mapY, lng : marker.mapX}}
          image={{
            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
						size: { width: 24, height: 35 },
          }}
          title={marker.placeName}
          onClick={openModal}
        />
      ))}
      <div style={{position:"absolute", zIndex:31, width:"80%", top:"30px", left:"10%"}}>
        <div id="search" style={{display:'flex', justifyContent: "space-between"}}>
          <InputSearch placeholder='관광지 검색' value={keywordValue} onChangeHandler={onChangeKeyword} />
          <button onClick={search} style={{width:"10%", backgroundImage:'../images/search.svg', border:"none", backgroundSize: "90% 90%", backgroundRepeat:"no-repeat"}}> </button>
        </div>
        <div style={{display : 'flex', justifyContent: "center", marginTop: "10px"}}>
          <button onClick={getPlaceButtonHandler} className="rounded-button" style={{borderRadius: "10px", padding: "5px 5px", fontSize: "12px", backgroundColor: "#fffffff", color: "#000000", border: "1px solid #000000", boxShadow: "2px 2px 4px rgba(0,0,0,0.5)"}}>
            <div style={{display: "flex", alignItems: "center"}}>
              <img src = {require("../images/refresh.svg").default} height="20px" style={{marginRight: "5px"}}></img>
              <span>장소 불러오기</span>
            </div>
          </button>
        </div>
      </div>
      <div>
        <BottomModalSheet isOpen={isModalOpen} onClose={closeModal}>
        </BottomModalSheet>
      </div>
    </Map>
  );
};

export default Maps;
