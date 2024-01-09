import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 0px 24px 37px;
  box-sizing: border-box;
  top: 1;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  background-color: white;
  border-radius: 24px 24px 0px 0px;
  transition: all 0.3s ease-in-out;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border: 1px;
  border-radius: 16px;
  background-color: #f8f8f8;
  padding: 12px 0px;
  box-sizing: border-box;
  justify-content: center; /* 이미지를 가로 방향 가운데 정렬 */
  align-items: center;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  heigth: 112px;
  border: none;
  gap: 18px;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const BottomText = styled.div`
  padding-top: 8px;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #a0a0a0;
`;

const BottomToast = ({ changeCheck, isChecked, clickIsShare }) => {
  return (
    <MainContainer
      style={{
        opacity: isChecked ? '1' : '0',
        transform: isChecked ? 'translateY(0%)' : 'translateY(100%)',
        paddingBottom: clickIsShare ? '12px' : '24px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            width: '52px',
            height: '4px',
            marginTop: '12px',
            marginBottom: '25px',
            backgroundColor: '#EEEEEE',
            borderRadius: '4px',
          }}
          onClick={changeCheck}
        ></div>
      </div>
      <SubContainer></SubContainer>
    </MainContainer>
  );
};

export default BottomToast;
