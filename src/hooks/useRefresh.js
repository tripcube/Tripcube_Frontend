import serverapi from '../api/serverapi';
import useAuthToken from './useAuthToken';

const useRefresh = () => {
  const { getRefreshToken, setRefreshToken, setAccessToken } = useAuthToken();

  // accessToken 재발급을 위한 axios 호출
  const refresh = async () => {
    try {
      const refreshToken = await getRefreshToken();
      const res = await serverapi.get('/user/token', {
        headers: {
          Authorization: `${refreshToken}`,
        },
      });
      console.log(`access_token: ${res.data.access_token}`);
      setAccessToken(res.data.access_token);
    } catch (e) {
      // 401 : refresh token 만료
      if (e.status === 401) {
        await setRefreshToken('');
        window.location.href('/');
      }
      return e;
    }
  };

  return {
    refresh,
  };
};

export default useRefresh;
