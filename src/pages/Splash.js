import styled from 'styled-components';
import useAuthToken from '../hooks/useAuthToken';
import useRefresh from '../hooks/useRefresh';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthorized from '../hooks/useAuthorized';

const Splash = ({ url }) => {
  const { getRefreshToken } = useAuthToken();
  const { refresh } = useRefresh();
  const { setAutorized, setUnAuthorized } = useAuthorized();
  const navigate = useNavigate();

  console.log(`splash screen url: ${url}`);
  useEffect(() => {
    const run = async () => {
      const refreshToken = await getRefreshToken();
      if (refreshToken === undefined || refreshToken === '') {
        console.log('refresh token is empty');
        setUnAuthorized();
        navigate(url);
        return;
      }

      try {
        await refresh();
        setAutorized();
        console.log('success to refresh token');
      } catch (e) {
        setUnAuthorized();
        console.log('fail to refresh token');
      }

      if (url === '/') {
        navigate('/home');
      } else {
        navigate(url);
      }
    };

    run();
  }, []);

  return (
    <BackgroundStyle>
      <img src='images/splash.svg' alt='splash' />
    </BackgroundStyle>
  );
};

const BackgroundStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Splash;
