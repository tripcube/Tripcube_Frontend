<<<<<<< HEAD:src/pages/map.js
import React, { useEffect, useState, useRef } from "react";
import InputSearch from "../components/Input/InputSearch";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useAuthToken from "../hooks/useAuthToken";
import serverapi from "../api/serverapi";
import BottomModalSheet from "../components/BottomModalSheet/BottomModalSheet";
import BottomNav from "../components/BottomNav/BottomNav";
=======
import React, { useEffect, useState, useRef } from 'react';
import InputSearch from '../components/Input/InputSearch';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useAuthToken from '../hooks/useAuthToken';
import serverapi from '../api/serverapi';
import BottomModalSheet from '../components/BottomModalSheet/BottomModalSheet';
import BottomNav from '../components/BottomNav/BottomNav';
import SearchDiv from '../components/Search/SearchDiv';
import Toast, { ToastTheme } from '../components/Toast/Toast';
import userMarkerImg from '../images/mapMarker.png';
>>>>>>> a60ab5a97d987578dd251c828c8c03d61c418269:src/pages/Map.js

const Maps = () => {
  const [keywordValue, setKeywordValue] = useState("");
  const [latitude, setLatitude] = useState(37.583865);
  const [longitude, setLongitude] = useState(127.0587767);
  const [user_latitude, setUserLatitude] = useState(37.583865);
  const [user_longitude, setUserLongitude] = useState(127.0587767);
  const [markerList, setMarkerList] = useState([]);
  const { getAccessToken } = useAuthToken();
  const mapRef = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectIdx, setIdx] = useState(-1);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [mapLevel, setMapLevel] = useState(5);
  const [isLoading, setLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  function getLatitude(lat) {
    setLatitude(Number(lat));
    setUserLatitude(Number(lat));
  }

  function getLongitude(lon) {
    setLongitude(Number(lon));
    setUserLongitude(Number(lon));
  }

  window.getLongitude = getLongitude; // 전역 스코프에 등록
  window.getLatitude = getLatitude;

  const onChangeKeyword = (event) => {
    setKeywordValue(event.target.value);
  };

<<<<<<< HEAD:src/pages/map.js
  const search = async () => {};
=======

  const search = async () => {
    if (!isSearchOpen) {
      setSearchOpen(true);
    }
    if (!isLoading) {
      setLoading(true);
    }
    setSearchList([]);
    const api = `places/keyword?keyword=${keywordValue}&page=1`;

    const res = await serverapi.get(api, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (res.status === 201) {
      if (Object.keys(res.data.data.places).length === 0) {
        setToastMessage('불러올 장소가 없습니다.');
        setShowToast(true);
      }
      let tmp = [...res.data.data.places];
      setSearchList(tmp);
      console.log(tmp);
    }
    setLoading(false);
  };
>>>>>>> a60ab5a97d987578dd251c828c8c03d61c418269:src/pages/Map.js

  const openSearchDiv = () => {
    setSearchOpen(true);
  }

  function getLocation() {
    try {
      //eslint-disable-next-line
      GetLocation.postMessage("");
    } catch (e) {}
  }

  const getMarkerList = async () => {
    if (!isLoading) {
      setLoading(true);
    }
    const api = `places/location?mapX=${longitude}&mapY=${latitude}&page=1`;

    const res = await serverapi.get(api, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (res.status === 201) {
      if (Object.keys(res.data.data.places).length === 0) {
        setToastMessage('불러올 장소가 없습니다.');
        setShowToast(true);
      }
      let tmp = [...res.data.data.places];
      setMarkerList(tmp);
      console.log(tmp);
    }
<<<<<<< HEAD:src/pages/map.js
  };
=======
    setLoading(false);
  }
>>>>>>> a60ab5a97d987578dd251c828c8c03d61c418269:src/pages/Map.js

  const getPlaceButtonHandler = () => {
    const map = mapRef.current;
    setLatitude(map.getCenter().getLat());
    setLongitude(map.getCenter().getLng());
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIdx(-1);
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getMarkerList();
  }, [latitude, longitude]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <Map
<<<<<<< HEAD:src/pages/map.js
      center={{ lat: latitude, lng: longitude }} // 지도의 중심 좌표
      style={{ width: "100%", height: "100vh" }} // 지도 크기
      level={5} // 지도 확대 레벨
      ref={mapRef}
    >
=======
        center={{ lat: latitude, lng: longitude }}  // 지도의 중심 좌표
        style={{ width: '100%', height: '100vh' }}  // 지도 크기
        level={mapLevel}                                   // 지도 확대 레벨
        ref={mapRef}
      >
>>>>>>> a60ab5a97d987578dd251c828c8c03d61c418269:src/pages/Map.js
      {markerList.map((marker, idx) => (
        <MapMarker
          key={idx}
          position={{ lat: marker.mapY, lng: marker.mapX }}
          image={{
<<<<<<< HEAD:src/pages/map.js
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            size: { width: 24, height: 35 },
=======
            src: ((selectIdx === idx) ? userMarkerImg : 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'),
						size: (selectIdx === idx) ? { width: 45, height: 45 } : { width: 24, height: 35 },
>>>>>>> a60ab5a97d987578dd251c828c8c03d61c418269:src/pages/Map.js
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
<<<<<<< HEAD:src/pages/map.js
      <div
        style={{
          position: "absolute",
          zIndex: 31,
          width: "90%",
          top: "30px",
          left: "5%",
        }}
      >
        <div
          id="search"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InputSearch
            placeholder="관광지 검색"
            value={keywordValue}
            onChangeHandler={onChangeKeyword}
          />
          <img
            src={require("../images/search.svg").default}
            style={{ height: "50px", width: "50px", marginTop: "10px" }}
          ></img>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
          }}
        >
          <button
            onClick={getPlaceButtonHandler}
            className="rounded-button"
            style={{
              borderRadius: "10px",
              padding: "5px 5px",
              fontSize: "12px",
              backgroundColor: "#ffffff",
              border: "1px solid #000000",
              boxShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={require("../images/refresh.svg").default}
                height="20px"
                style={{ marginRight: "5px" }}
              ></img>
=======
        <MapMarker
          key="UserMapker"
          position={{lat : user_latitude, lng : user_longitude}}
          image={{
            src: require('../images/location.svg').default,
						size: { width: 20, height: 20},
          }}
          title="UserMapker"
          zIndex={1}
        />

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
>>>>>>> a60ab5a97d987578dd251c828c8c03d61c418269:src/pages/Map.js
              <span>장소 불러오기</span>
            </div>
          </button>
        </div>
        )}
        {showToast && (
          <Toast toastTheme={ToastTheme.SUCCESS}>{toastMessage}</Toast>
        )}
      </div>

      <div style={{position:"absolute", zIndex:1, bottom:"70px", right:"5%"}}>
        <img onClick={() => {getLocation()}} src = {require("../images/aim.svg").default} height="50px" width="50px"></img>
      </div>

      <div>
        {isModalOpen && (
          <BottomModalSheet
            onClose={closeModal}
            location={markerList[selectIdx]}
            getMarkerList={getMarkerList}
          ></BottomModalSheet>
        )}
      </div>
<<<<<<< HEAD:src/pages/map.js
      <BottomNav />
=======

      {isSearchOpen && (
          <SearchDiv setSearchOpen={setSearchOpen} places={searchList} setLat={setLatitude} setLon={setLongitude} setLevel={setMapLevel}></SearchDiv>
      )}

      {isLoading && (
        <div style={{position:"fixed", zIndex:1, top:"50%", left:"50%", transform: "translate(-50%, -50%)"}}>
          <img src = {require("../images/loading.svg").default} height="80px" width="80px"></img>
      </div>
      )}
      <BottomNav/>
>>>>>>> a60ab5a97d987578dd251c828c8c03d61c418269:src/pages/Map.js
    </Map>
  );
};

export default Maps;
