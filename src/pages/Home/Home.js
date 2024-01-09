import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/TopNav/TopNav';
import styled from 'styled-components';
import Toast, { ToastTheme } from '../../components/Toast/Toast';
import BottomNav from '../../components/BottomNav/BottomNav';
import AreaPart from './AreaPart';

const Home = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <TopNav>장소</TopNav>
      <div style={{ padding: '60px 12px 70px 12px' }}>
        <AreaPart // 지역 기반 추천
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
