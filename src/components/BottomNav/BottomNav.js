import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BottomNavStyle } from './style';
import { Outlet } from 'react-router';

const BottomNav = () => {
  const [activeNav, setActiveNav] = useState(1);
  const location = useLocation();

  useEffect(() => {
    let activeUrl = location.pathname;

    switch (activeUrl) {
      case '/home':
        setActiveNav(1);
        break;
      case '/map':
        setActiveNav(2);
        break;
      case '/scrap':
        setActiveNav(3);
        break;
      case '/mypage/0':
        setActiveNav(4);
        break;
      default:
        setActiveNav(1);
    }
  }, [location.pathname]);

  return (
    <>
      <BottomNavStyle>
        <Link to='/home' onClick={() => setActiveNav(1)}>
          {activeNav === 1 ? (
            <img src='images/nav_home_filled.svg' alt='filled_main_icon' />
          ) : (
            <img src='images/nav_home.svg' alt='main_icon' />
          )}
        </Link>
        <Link to='/map' onClick={() => setActiveNav(2)}>
          {activeNav === 2 ? (
            <img src='images/nav_map_filled.svg' alt='filled_map_icon' />
          ) : (
            <img src='images/nav_map.svg' alt='map_icon' />
          )}
        </Link>
        <Link to='/scrap' onClick={() => setActiveNav(3)}>
          {activeNav === 3 ? (
            <img src='images/nav_scrap_filled.svg' alt='filled_scrap_icon' />
          ) : (
            <img src='images/nav_scrap.svg' alt='scrap_icon' />
          )}
        </Link>
        <Link to='/mypage/0' onClick={() => setActiveNav(4)}>
          {activeNav === 4 ? (
            <img src='images/nav_mypage_filled.svg' alt='filled_mypage_icon' />
          ) : (
            <img src='images/nav_mypage.svg' alt='mypage_icon' />
          )}
        </Link>
      </BottomNavStyle>
      <Outlet />
    </>
  );
};

export default BottomNav;
