import logo from './logo.svg';
import './App.css';
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

import Detail from './pages/Detail';
import Home from './pages/Home/Home';
import Maps from './pages/Map';
import Scrap from './pages/Scrap';
import MyPage from './pages/MyPage';
import useAuthorized from './hooks/useAuthorized';
import Splash from './pages/Splash';
import ReviewWrite from './pages/ReviewWrite';
import TodoDetail from './pages/TodoDetail';

const Container = styled.div`
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 0px;
`;

function App() {
  return (
    <BrowserRouter>
      <Container>
        <GlobalStyle />
        <Routes>
          <Route path='/detail/:placeId' element={<Detail />} />
          <Route path='/map' element={<Maps />} />
          <Route path='/scrap' element={<Scrap />} />
          <Route path='/mypage/:userId' element={<MyPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/todo/:todoId' element={<TodoDetail />} />
          <Route path='/write/:todoId' element={<ReviewWrite />} />

          <Route path='/nonlogin' index element={<NonLogin />}></Route>
          <Route path='/login' index element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </Container>
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
