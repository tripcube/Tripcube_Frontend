import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NonLogin from "./pages/NonLogin";
import GlobalStyle from "./styles/GlobalStyle";

import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Maps from "./pages/Map";
import Scrap from "./pages/Scrap";
import MyPage from "./pages/MyPage";
import useAuthorized from "./hooks/useAuthorized";
import Splash from "./pages/Splash";
import ReviewWrite from "./pages/ReviewWrite";

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

  console.log("isUnauthorized", isUnauthorized());

  if (isUnauthorized()) {
    return <Navigate to="/login" replace />;
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
        <Route path="*" element={<Splash url={fullPath} />} />
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
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/detail/:placeId" element={<Detail />} />
              <Route path="/map" element={<Maps />} />
              <Route path="/scrap" element={<Scrap />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/write" element={<ReviewWrite />} />
            </Route>
            <Route element={<CommonRoute />}>
              <Route element={<Outlet />}>
                <Route path="/nonlogin" index element={<NonLogin />}></Route>
                <Route path="/login" index element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="*" element={<NotFound />}></Route>
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
