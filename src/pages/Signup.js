import React, { useState, useEffect } from 'react';
import Button, { ButtonSize, ButtonTheme } from '../components/Button/Button';
import Toast, { ToastTheme } from '../components/Toast/Toast';
import Input from '../components/Input/Input';
import serverapi from '../api/serverapi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    loginId: '',
    password: '',
    name: '',
    matchingPwd: '',
  });
  const [toastTheme, setToastTheme] = useState(ToastTheme.SUCCESS);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [invalidNameInfo, setInvalidNameInfo] = useState('');
  const [invalidIdInfo, setInvalidIdInfo] = useState('');
  const [invalidPwdInfo, setInvalidPwdInfo] = useState('');
  const [invalidMatchingPwdInfo, setInvalidMatchingPwdInfo] = useState('');
  const checkEmptyUserInfoValue = Object.values(userInfo).some((data) => !data);

  const navigate = useNavigate();

  const isAllValid =
    !invalidIdInfo &&
    !invalidPwdInfo &&
    !invalidMatchingPwdInfo &&
    !checkEmptyUserInfoValue;

  const idRegEx = /^[a-z0-9]{6,15}$/;
  const pwdRegEx = /^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?~\[\]\\;',./]{8,16}$/;

  const idCheck = (userInfo) => {
    return idRegEx.test(userInfo);
  };

  const pwdCheck = (userInfo) => {
    return pwdRegEx.test(userInfo);
  };

  const isIdDuplicated = async (loginId) => {
    const api = `auth/new/check-id`;
    const data = {
      loginId: loginId,
    };
    try {
      console.log('data-loginId', data);
      const res = await serverapi.post(api, data);
      if (res.status === 200) {
        console.log('res.data', res.data);
        return !res.data.data;
      }
      return true;
    } catch (e) {
      console.log(e.response);
    }
  };

  const isNameDuplicated = async (name) => {
    const api = `auth/new/check-name`;
    const data = {
      name: name,
    };
    try {
      console.log('data-name', data);
      const res = await serverapi.post(api, data);
      if (res.status === 200) {
        console.log('res.data', res.data);
        return !res.data.data;
      }
      return true;
    } catch (e) {
      console.log(e.response);
    }
  };

  const signup = async () => {
    const api = '/auth/new';
    const data = {
      loginId: userInfo.loginId,
      password: userInfo.password,
      name: userInfo.name,
    };

    try {
      console.log('data-signup', data);
      const res = await serverapi.post(api, data);
      console.log('res', res);
      if (res.status === 201) {
        setToastMessage('회원가입이 성공적으로 완료되었습니다.');
        setToastTheme(ToastTheme.SUCCESS);
        setShowToast(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (e) {
      console.log(e);
      if (e.response.data.dev_message === 'SignUpFail error')
        alert(e.response.data.message);
    }
  };

  const idChangeHandler = async (e) => {
    setUserInfo({ ...userInfo, loginId: e.target.value });
    if (!idCheck(e.target.value)) {
      setInvalidIdInfo('6-15자의 영문 소문자, 숫자만 사용 가능');
      return;
    }
    if (await isIdDuplicated(e.target.value)) {
      setInvalidIdInfo('아이디가 중복되었습니다.');
      return;
    }
    setInvalidIdInfo('');
  };

  const pwdChangeHandler = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value });
    if (!pwdCheck(e.target.value)) {
      setInvalidPwdInfo('8-16자의 영문 대소문자, 숫자, 특수문자만 사용 가능');
      return;
    }
    if (userInfo.matchingPwd || invalidMatchingPwdInfo) {
      if (e.target.value !== userInfo.matchingPwd) {
        setInvalidMatchingPwdInfo('비밀번호가 서로 다릅니다.');
      } else {
        setInvalidMatchingPwdInfo('');
      }
    }
    setInvalidPwdInfo('');
  };

  const matchingPwdChangeHandler = (e) => {
    setUserInfo({ ...userInfo, matchingPwd: e.target.value });
    if (userInfo.password !== e.target.value) {
      setInvalidMatchingPwdInfo('비밀번호가 서로 다릅니다.');
      return;
    }
    setInvalidMatchingPwdInfo('');
  };

  const nameChangeHandler = async (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
    if (await isNameDuplicated(e.target.value)) {
      setInvalidNameInfo('이미 존재하는 닉네임입니다.');
      return;
    }
    setInvalidNameInfo('');
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    console.log('!invalidIdInfo', !invalidIdInfo);
    console.log('!invalidPwdInfo', !invalidPwdInfo);
    console.log('!invalidMatchingPwdInfo', !invalidMatchingPwdInfo);
    console.log('!checkEmptyUserInfoValue', !checkEmptyUserInfoValue);
    console.log('userInfo', userInfo);

    console.log(
      'isAllValid',
      !invalidIdInfo &&
        !invalidPwdInfo &&
        !invalidMatchingPwdInfo &&
        !checkEmptyUserInfoValue,
    );
  }, [
    invalidIdInfo,
    invalidPwdInfo,
    invalidMatchingPwdInfo,
    checkEmptyUserInfoValue,
  ]);

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
          <Input
            label='이름'
            onChangeHandler={nameChangeHandler}
            value={userInfo.name}
            isError={!!invalidNameInfo}
            description={invalidNameInfo}
          />
          <Input
            label='아이디'
            onChangeHandler={idChangeHandler}
            value={userInfo.loginId}
            isError={!!invalidIdInfo}
            description={invalidIdInfo}
          />
          <Input
            label='비밀번호'
            type='password'
            onChangeHandler={pwdChangeHandler}
            value={userInfo.password}
            isError={!!invalidPwdInfo}
            description={invalidPwdInfo}
          />
          <Input
            label='비밀번호 확인'
            type='password'
            onChangeHandler={matchingPwdChangeHandler}
            value={userInfo.matchingPwd}
            isError={!!invalidMatchingPwdInfo}
            description={invalidMatchingPwdInfo}
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
        <Button
          disabled={!isAllValid}
          buttonSize={ButtonSize.LARGE}
          buttonTheme={isAllValid ? ButtonTheme.GREEN : ButtonTheme.GRAY}
          handler={() => {
            signup();
          }}
        >
          회원가입
        </Button>
      </div>
      {showToast && <Toast toastTheme={toastTheme}>{toastMessage}</Toast>}
      {showToast && <Toast toastTheme={toastTheme}>{toastMessage}</Toast>}
    </InfoWrapper>
  );
};

export default Signup;

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
  width: 100vw;
  justify-content: space-between;
`;
