import { useRef } from 'react';
import { useEffect } from 'react';
import useSleep from './useSleep';

const accessToken = {
  current: '',
};

const useAuthToken = () => {
  const getAccessToken = () => {
    console.log(`getAccessToken: ${accessToken.current}`);
    return accessToken.current;
  };

  const setAccessToken = (token) => {
    console.log(`setAccessToken: ${token}`);
    accessToken.current = token;
  };

  const muLock = useRef(false);
  const { sleepWithCondition } = useSleep();

  const getAuthTokenFromLocalStorage = async () => {
    await sleepWithCondition(() => muLock.current === false);
    return localStorage.getItem('refreshToken');
  };

  const storeAuthTokenToLocalStorage = (token) => {
    localStorage.setItem('refreshToken', token);
  };

  const getRefreshToken = async () => {
    return await getAuthTokenFromLocalStorage();
  };

  const setRefreshToken = async (token) => {
    storeAuthTokenToLocalStorage(token);
  };

  useEffect(() => {
    window.alertStoringTokenFinished = () => {
      muLock.current = false;
    };
  }, []);

  return {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
  };
};

export default useAuthToken;
