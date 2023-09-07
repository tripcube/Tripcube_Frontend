import './App.css';
import { Reset } from 'styled-reset';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NonLogin from './pages/NonLogin';

const Container = styled.div`
  max-width: 430px;
  height: 932px;
  margin: 0 auto;
`;

function App() {
  return (
    <Container>
      <Reset />
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<NonLogin />}></Route>
          <Route path='/login' index element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
