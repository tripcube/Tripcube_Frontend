import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import serverapi from '../api/serverapi';
import Input from '../components/Input/Input';
import CustomButton, {
  ButtonSize,
  ButtonTheme,
} from '../components/CustomButton/CustomButton';
import Toast, { ToastTheme } from '../components/Toast/Toast';
import useAuthToken from '../hooks/useAuthToken';
import useAuthorized from '../hooks/useAuthorized';

const Login = () => {
  const [idValue, setIdValue] = useState('');
  const [pwdValue, setPwdValue] = useState('');
  const { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken } =
    useAuthToken();
  const { setAutorized } = useAuthorized();

  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastTheme, setToastTheme] = useState(ToastTheme.SUCCESS);

  const onChangeId = (event) => {
    setIdValue(event.target.value);
  };
  const onChangePwd = (event) => {
    setPwdValue(event.target.value);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const login = async () => {
    const api = `auth/login`;
    const data = {
      loginId: idValue,
      password: pwdValue,
    };

    try {
      console.log('data-login', data);
      const res = await serverapi.post(api, data);
      console.log('res', res);
      if (res.status === 201) {
        navigate('/home');
        setAccessToken(res.data.accessToken);
        await setRefreshToken(res.data.refreshToken);

        console.log('access: ', getAccessToken());
        console.log('refresh: ', await getRefreshToken());
        setAutorized();
        window.location.href('/home');
        //eslint-disable-next-line
        Tripcube.postMessage(getAccessToken());
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setToastMessage('회원정보가 일치하지 않습니다.');
        setToastTheme(ToastTheme.ERROR);
        setShowToast(true);
      }
    }
  };

  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <InfoWrapper>
      <div>
        <LogoWrapper href='/nonlogin'>
          <LogoImg src='images/tripcube_logo.svg' alt='logo' />
        </LogoWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '20px 27px',
          }}
        >
          <Input label='아이디' value={idValue} onChangeHandler={onChangeId} />
          <Input
            label='비밀번호'
            value={pwdValue}
            type='password'
            onChangeHandler={onChangePwd}
            onKeyPress={onPressEnter}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px 27px',
        }}
      >
        <SubLink href='/findAccount'>
          아이디 또는 비밀번호를 잊으셨나요?
        </SubLink>
        <CustomButton
          buttonSize={ButtonSize.LARGE}
          buttonTheme={ButtonTheme.BLACK}
          disabled={idValue.length > 0 && pwdValue.length > 0 ? false : true}
          handler={() => {
            login();
          }}
        >
          로그인
        </CustomButton>
      </div>
      {showToast && <Toast toastTheme={ToastTheme.ERROR}>{toastMessage}</Toast>}
    </InfoWrapper>
  );
};

export default Login;

const SubLink = styled.a`
  color: #555555;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoWrapper = styled.a`
  padding-top: 120px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 130px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;
