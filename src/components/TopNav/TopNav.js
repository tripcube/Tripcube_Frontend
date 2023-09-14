import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TopNavStyle } from './style';
import { Outlet } from 'react-router';

const TopNav = ({ numMenu, name1, url1, name2, url2, name3, url3 }) => {
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
      case '/mypage':
        setActiveNav(4);
        break;
      default:
        setActiveNav(1);
    }
  }, [location.pathname]);

  return (
    <>
      <TopNavStyle>
        <Link to='/home' onClick={() => setActiveNav(1)}>
          {activeNav === 1 ? (
            <img src='images/home_filled.svg' alt='filled_main_icon' />
          ) : (
            <img src='images/home_main.svg' alt='main_icon' />
          )}
        </Link>
        <Link to='/map' onClick={() => setActiveNav(2)}>
          {activeNav === 2 ? (
            <img src='images/map_filled.svg' alt='filled_map_icon' />
          ) : (
            <img src='images/map_locker.svg' alt='map_icon' />
          )}
        </Link>
        <Link to='/scrap' onClick={() => setActiveNav(3)}>
          {activeNav === 3 ? (
            <img src='images/scrap_filled.svg' alt='filled_scrap_icon' />
          ) : (
            <img src='images/scrap.svg' alt='scrap_icon' />
          )}
        </Link>
        <Link to='/mypage' onClick={() => setActiveNav(4)}>
          {activeNav === 4 ? (
            <img src='images/mypage_filled.svg' alt='filled_mypage_icon' />
          ) : (
            <img
              src={process.env.PUBLIC_URL + 'images/mypage.svg'}
              alt='mypage_icon'
            />
          )}
        </Link>
      </TopNavStyle>
      <Outlet />
    </>
  );
};

export default TopNav;
