import { useRef } from 'react';
import useFlutterWebview from './useFlutterWebview';
import { useEffect } from 'react';
import useSleep from './useSleep';

const accessToken = {
  current: '',
};

const useAuthToken = () => {
  const getAccessToken = () => {
    //console.log(`getAccessToken: ${accessToken.current}`)
    return accessToken.current;
  };

  const setAccessToken = (token) => {
    //console.log(`setAccessToken: ${token}`)
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

  const {
    isMobile,
    getAuthToken: getAuthTokenFromMobile,
    storeAuthToken: storeAuthTokenFromMobile,
  } = useFlutterWebview();

  const getRefreshToken = async () => {
    if (isMobile()) {
      return await getAuthTokenFromMobile();
    } else {
      return await getAuthTokenFromLocalStorage();
    }
  };

  const setRefreshToken = async (token) => {
    if (isMobile()) {
      muLock.current = true;
      storeAuthTokenFromMobile(token);
    } else {
      storeAuthTokenToLocalStorage(token);
    }
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
