import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CustomButton, {
  ButtonSize,
  ButtonTheme,
} from '../components/CustomButton/CustomButton';

const Login = () => {
  return (
    <LoginWrapper>
      <LogoWrapper>
        <LogoImg src='images/tripcube_logo.svg' alt='logo' />
      </LogoWrapper>
      <BottomBtnWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '20px 24px',
          }}
        >
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <CustomButton
              buttonSize={ButtonSize.LARGE}
              buttonTheme={ButtonTheme.BLACK}
            >
              로그인 하기
            </CustomButton>
          </Link>
          <Link to='/signup' style={{ textDecoration: 'none' }}>
            <CustomButton
              buttonSize={ButtonSize.LARGE}
              buttonTheme={ButtonTheme.BLACK}
            >
              회원가입 하기
            </CustomButton>
          </Link>
        </div>
      </BottomBtnWrapper>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const LogoWrapper = styled.div`
  margin-top: 120px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 130px;
`;

const BottomBtnWrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
`;
