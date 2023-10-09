import serverapi from '../api/serverapi';
import useAuthToken from './useAuthToken';
import axios from 'axios';

const useRefresh = () => {
  const { getRefreshToken, setRefreshToken, setAccessToken } = useAuthToken();

  // accessToken 재발급을 위한 axios 호출
  const refresh = async () => {
    try {
      const refreshToken = await getRefreshToken();
      const res = await axios.get('http://sw.uos.ac.kr:8080/auth/renew', {
        headers: {
          Authorization: `${refreshToken}`,
        },
      });
      console.log(`accessToken: ${res.data.accessToken}`);
      setAccessToken(res.data.accessToken);
    } catch (e) {
      await setRefreshToken('');
      window.location.href('/');
      return e;
    }
  };

  return {
    refresh,
  };
};

export default useRefresh;
