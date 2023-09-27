import './App.css';
import { Reset } from 'styled-reset';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NonLogin from './pages/NonLogin';
import GlobalStyle from './styles/GlobalStyle';

import BottomNav from './components/BottomNav/BottomNav';
import Home from './pages/Home';
import Map from './pages/Map';
import Detail from './pages/Detail';
import Scrap from './pages/Scrap';
import MyPage from './pages/MyPage';
import useAuthorized from './hooks/useAuthorized';
import Splash from './pages/Splash';

const ContainerWrapper = styled.div`
  max-width: 430px;
  margin: 0 auto;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px;
`;

const PrivateRoute = () => {
  const { isUnauthorized } = useAuthorized();

  console.log('isUnauthorized', isUnauthorized());

  if (isUnauthorized()) {
    return <Navigate to='/nonlogin' replace />;
  }
  return <Outlet />;
};

const CommonRoute = () => {
  const { isUndefined } = useAuthorized();

  const location = useLocation();
  const fullPath = location.pathname + location.search + location.hash;

  if (isUndefined()) {
    return (
      <Routes>
        <Route path='*' element={<Splash url={fullPath} />} />
      </Routes>
    );
  }

  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <ContainerWrapper>
        <Container>
          <GlobalStyle />
          <Reset />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/detail/:placeId' element={<Detail />} />
              <Route path='/map' element={<Map />} />
              <Route path='/scrap' element={<Scrap />} />
              <Route path='/mypage' element={<MyPage />} />
              <Route path='/home' element={<Home />} />
            </Route>
            <Route element={<CommonRoute />}>
              <Route element={<Outlet />}>
                <Route path='/nonlogin' index element={<NonLogin />}></Route>
                <Route path='/login' index element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='*' element={<NotFound />}></Route>
              </Route>
            </Route>
          </Routes>
        </Container>
      </ContainerWrapper>
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
