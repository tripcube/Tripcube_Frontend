import React, { useEffect, useState, useRef } from 'react';
import InputSearch from '../components/Input/InputSearch';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useAuthToken from '../hooks/useAuthToken';
import serverapi from '../api/serverapi';
import BottomModalSheet from '../components/BottomModalSheet/BottomModalSheet';
import BottomNav from '../components/BottomNav/BottomNav';
import SearchDiv from '../components/Search/SearchDiv';

const Maps = () => {
  const [keywordValue, setKeywordValue] = useState('');
  const [latitude, setLatitude] = useState(37.583865);
  const [longitude, setLongitude] = useState(127.0587767);
  const [markerList, setMarkerList] = useState([]);
  const { getAccessToken } = useAuthToken();
  const mapRef = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectIdx, setIdx] = useState(0);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [mapLevel, setMapLevel] = useState(5);
  const [positionMarker, setPositionMarker] = useState([]);

  function getLatitude(lat) {
    setLatitude(Number(lat));
  }

  function getLongitude(lon) {
    setLongitude(Number(lon));
    let marker = [{
      mapX : longitude,
      mapY : latitude,
    }]
    setPositionMarker(marker);
  }

  window.getLongitude = getLongitude; // 전역 스코프에 등록
  window.getLatitude = getLatitude;

  const onChangeKeyword = (event) => {
    setKeywordValue(event.target.value);
  };


  const search = async () => {
    if (!isSearchOpen) {
      setSearchOpen(true);
    }
    setSearchList([]);
    const api = `places/keyword?keyword=${keywordValue}&page=1`;

    const res = await serverapi.get(api, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (res.status === 201) {
      let tmp = [...res.data.data.places];
      setSearchList(tmp);
      console.log(tmp);
    }
  };

  const openSearchDiv = () => {
    setSearchOpen(true);
  }

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
        center={{ lat: latitude, lng: longitude }}  // 지도의 중심 좌표
        style={{ width: '100%', height: '100vh' }}  // 지도 크기
        level={mapLevel}                                   // 지도 확대 레벨
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
          onClick={() => {
            if (isModalOpen) {
              closeModal();
            }
            setIdx(idx);
            openModal();
          }}
        />
      ))}

      {positionMarker.map((marker) => (
        <MapMarker
          key="positionMarker"
          position={{lat : marker.mapY, lng : marker.mapX}}
          image={{
            src: require('../images/location.svg').default,
						size: { width: 20, height: 20},
          }}
          title="positionMarker"
          zIndex={1}
        />
      ))}

      <div style={{position:"absolute", zIndex:31, width:"90%", top:"30px", left:"5%"}}>
        <div id="search" style={{display:'flex', justifyContent: "space-between", alignItems: "center"}}>
          <InputSearch placeholder='관광지 검색' value={keywordValue} onChangeHandler={onChangeKeyword} onFocusHandler={openSearchDiv}/>
          <img onClick={() => {search()}} src={require('../images/search.svg').default} style={{height: "50px", width: "50px", marginTop: "10px"}}></img>
        </div>
        {!isSearchOpen && (
          <div style={{display : 'flex', justifyContent: "center", marginTop: "5px"}}>
          <button onClick={getPlaceButtonHandler} className="rounded-button" style={{borderRadius: "10px", padding: "5px 5px", fontSize: "12px", backgroundColor: "#ffffff", border: "1px solid #000000", boxShadow: "2px 2px 4px rgba(0,0,0,0.5)"}}>
            <div style={{display: "flex", alignItems: "center"}}>
              <img src = {require("../images/refresh.svg").default} height="20px" style={{marginRight: "5px"}}></img>
              <span>장소 불러오기</span>
            </div>
          </button>
        </div>
        )}
      </div>

      <div style={{position:"absolute", zIndex:1, bottom:"70px", right:"5%"}}>
        <img onClick={() => {getLocation()}} src = {require("../images/aim.svg").default} height="50px" width="50px"></img>
      </div>

      <div>
        {isModalOpen && (
          <BottomModalSheet onClose={closeModal} location={markerList[selectIdx]} getMarkerList={getMarkerList}>
          </BottomModalSheet>
        )}
      </div>

      {isSearchOpen && (
          <SearchDiv setSearchOpen={setSearchOpen} places={searchList} setLat={setLatitude} setLon={setLongitude} setLevel={setMapLevel}></SearchDiv>
      )}
      <BottomNav/>
    </Map>
  );
};

export default Maps;

