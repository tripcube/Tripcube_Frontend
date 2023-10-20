import React, { useEffect, useState } from 'react';
import TopNav from '../components/TopNav/TopNav';
import BottomNav from '../components/BottomNav/BottomNav';
import serverapi from '../api/serverapi';
import useAuthToken from '../hooks/useAuthToken';
import { LinearProgress } from '@mui/material';
import Place from '../components/Place/Place';
import { useNavigate } from 'react-router-dom';
import CustomButton, {
  ButtonSize,
  ButtonTheme,
} from '../components/CustomButton/CustomButton';
import styled from 'styled-components';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import Input from '../components/Input/Input';

const Scrap = () => {
  const [scraplist, setScraplist] = useState([]);
  const [folderlist, setFolderlist] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const { getAccessToken } = useAuthToken();
  const [mode, setMode] = useState('main'); // main: 처음, all: 모두, folder: 폴더별
  const [folderPage, setFolderPage] = useState(0);

  const getScraplist = async () => {
    const api = `places/scrap?page=1`;

    try {
      setLoading1(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getScraplist-api', api);
      if (res.status === 201) {
        setScraplist(res.data.data);
        console.log('res.data.data', res.data.data);
      }
    } catch (e) {
      if (e.response.status === 401) {
        // 401 Unauthorized 오류가 발생한 경우
        console.log('Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.');
        window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
      } else {
        // 다른 오류가 발생한 경우
        console.error('오류가 발생했습니다:', e);
      }
    } finally {
      setLoading1(false);
    }
  };

  const getFolderlist = async () => {
    const api = `folders`;

    try {
      setLoading2(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getFolderlist-api', api);
      if (res.status === 201) {
        setFolderlist(res.data.data);
        console.log('res.data.data', res.data.data);
      }
    } catch (e) {
      if (e.response.status === 401) {
        // 401 Unauthorized 오류가 발생한 경우
        console.log('Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.');
        window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
      } else {
        // 다른 오류가 발생한 경우
        console.error('오류가 발생했습니다:', e);
      }
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    getScraplist();
    getFolderlist();
  }, [mode]);

  return (
    <div>
      <TopNav onClick={() => (window.location.href = '/scrap')}>스크랩</TopNav>
      {mode === 'main' ? (
        <MainContainer
          setMode={setMode}
          scraplist={scraplist}
          folderlist={folderlist}
          loading1={loading1}
          loading2={loading2}
          setFolderPage={setFolderPage}
          getFolderlist={getFolderlist}
        />
      ) : mode === 'all' ? (
        <AllContainer scraplist={scraplist} setMode={setMode} />
      ) : (
        <FolderContainer folderPage={folderPage} setMode={setMode} />
      )}
      <BottomNav />
    </div>
  );
};

// mode: main
const MainContainer = (props) => {
  const setMode = props.setMode;
  const scraplist = props.scraplist;
  const folderlist = props.folderlist;
  const loading1 = props.loading1;
  const loading2 = props.loading2;
  const setFolderPage = props.setFolderPage;
  const getFolderlist = props.getFolderlist;

  const [nameValue, setNameValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getAccessToken } = useAuthToken();

  const addFolder = async () => {
    const api = `folders`;
    const data = {
      name: nameValue,
    };

    try {
      console.log('data-addFolder', data);
      const res = await serverapi.post(api, data, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
        setIsModalOpen(false);
        getFolderlist();
      }
    } catch (e) {
      if (e.response.status === 401) {
        // 401 Unauthorized 오류가 발생한 경우
        console.log('Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.');
        window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
      } else {
        // 다른 오류가 발생한 경우
        console.error('오류가 발생했습니다:', e);
      }
    }
  };

  const onChangeName = (event) => {
    setNameValue(event.target.value);
  };

  return (
    <>
      <ScrapStyle style={{ minHeight: '270px' }}>
        {loading1 ? (
          <LinearProgress />
        ) : (
          <AllScrap scraplist={scraplist} setMode={setMode} />
        )}
      </ScrapStyle>
      <div
        style={{
          backgroundColor: '#ededed',
          padding: '20px',
          marginBottom: '44px',
          minHeight: '430px',
        }}
      >
        {loading2 ? (
          <LinearProgress />
        ) : (
          <FolderScrap
            folderlist={folderlist}
            setMode={setMode}
            setFolderPage={setFolderPage}
          />
        )}
        <div style={{ padding: '48px 0px' }}>
          <CustomButton
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.BLACK}
            handler={() => {
              setIsModalOpen(true);
            }}
          >
            폴더 추가하기
          </CustomButton>
        </div>
        {isModalOpen && (
          <BottomSheet
            closeModal={() => setIsModalOpen(false)}
            style={{ marginBottom: '44px' }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <Input
                label='폴더 이름'
                value={nameValue}
                onChangeHandler={onChangeName}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', gap: '4px' }} />

                <CustomButton
                  buttonSize={ButtonSize.NORMAL}
                  ButtonTheme={ButtonTheme.BLACK}
                  disabled={nameValue.length > 0 ? false : true}
                  handler={() => {
                    addFolder();
                  }}
                >
                  폴더 추가
                </CustomButton>
              </div>
            </div>
          </BottomSheet>
        )}
      </div>
    </>
  );
};

// mode: main에서 전체 보기
const AllScrap = (props) => {
  const scraplist = props.scraplist;
  const setMode = props.setMode;
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          fontWeight: '700',
          fontSize: '20px',
          padding: '44px 0px 8px 0px',
        }}
      >
        전체 보기
      </div>
      {scraplist.length !== 0 ? (
        <PlaceStyle>
          {scraplist.map((place, index) => (
            <Place
              key={place.placeId}
              place={place}
              onClick={() => navigate(`/detail/${place.placeId}`)}
            />
          ))}
          <img
            src={require('../images/more_place.svg').default}
            alt='image_more'
            width='112px'
            height='164px'
            onClick={() => {
              setMode('all');
            }}
          />
        </PlaceStyle>
      ) : (
        <a>불러올 장소가 없습니다</a>
      )}
    </>
  );
};

// mode: main에서 폴더 보기
const FolderScrap = (props) => {
  const folderlist = props.folderlist;
  const setMode = props.setMode;
  const setFolderPage = props.setFolderPage;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          fontWeight: '800',
          fontSize: '20px',
          justifyContent: 'space-between',
          padding: '4px',
        }}
      >
        <div>폴더</div>
      </div>
      {folderlist.length !== 0 ? (
        <FolderStyle>
          {folderlist.map((folder, index) => (
            <FolderComponent
              setMode={setMode}
              setFolderPage={setFolderPage}
              coverImage={folder.coverImage}
              name={folder.name}
              placeCount={folder.placeCount}
              folderId={folder.folderId}
            />
          ))}
        </FolderStyle>
      ) : (
        <a>불러올 폴더가 없습니다</a>
      )}
    </div>
  );
};

// mode: all
const AllContainer = (props) => {
  const scraplist = props.scraplist;
  const navigate = useNavigate();
  const setMode = props.setMode;

  return (
    <ScrapStyle>
      <div
        style={{
          fontWeight: '700',
          fontSize: '20px',
          padding: '44px 0px 8px 0px',
        }}
      >
        전체 보기
      </div>
      {scraplist.length !== 0 ? (
        <PlaceStyle
          style={{
            flexWrap: 'wrap',
            minHeight: '80vh',
            alignContent: 'flex-start',
          }}
        >
          {scraplist.map((place, index) => (
            <Place
              key={place.placeId}
              place={place}
              onClick={() => navigate(`/detail/${place.placeId}`)}
            />
          ))}
        </PlaceStyle>
      ) : (
        <a>불러올 장소가 없습니다</a>
      )}
      <div style={{ padding: '48px 0px' }}>
        <CustomButton
          buttonSize={ButtonSize.LARGE}
          buttonTheme={ButtonTheme.BLACK}
          handler={() => {
            setMode('main');
          }}
        >
          스크랩 페이지로 돌아가기
        </CustomButton>
      </div>
    </ScrapStyle>
  );
};

// mode: folder
const FolderContainer = (props) => {
  const folderPage = props.folderPage;
  const setMode = props.setMode;
  const [folderName, setFolderName] = useState('');
  const [scraplist, setScraplist] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [folderMode, setFolderMode] = useState('none');
  // none: 아무 것도 아님(PlaceStyle), add: 추가 상태, delete: 삭제 상태

  const navigate = useNavigate();
  const { getAccessToken } = useAuthToken();

  useEffect(() => {
    getFolderDetail();
  }, []);

  const getFolderDetail = async () => {
    const api = `folders/${folderPage}`;

    try {
      setLoading1(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getFolderDetail-api', api);
      if (res.status === 201) {
        setFolderName(res.data.data.folderName);
        setScraplist(res.data.data.places);
        console.log('res.data.data', res.data.data);
      }
    } catch (e) {
      if (e.response.status === 401) {
        // 401 Unauthorized 오류가 발생한 경우
        console.log('Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.');
        window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
      } else {
        // 다른 오류가 발생한 경우
        console.error('오류가 발생했습니다:', e);
      }
    } finally {
      setLoading1(false);
    }
  };

  const deleteFolder = async () => {
    const api = `folders/${folderPage}`;

    try {
      setLoading1(true);
      const res = await serverapi.delete(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('deleteFolder-api', api);
      if (res.status === 201) {
        setMode('main');
      }
    } catch (e) {
      if (e.response.status === 401) {
        // 401 Unauthorized 오류가 발생한 경우
        console.log('Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.');
        window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
      } else {
        // 다른 오류가 발생한 경우
        console.error('오류가 발생했습니다:', e);
      }
    } finally {
      setLoading1(false);
    }
  };

  return (
    <ScrapStyle>
      {loading1 ? (
        <LinearProgress />
      ) : (
        <>
          <div
            style={{
              fontWeight: '700',
              fontSize: '20px',
              padding: '44px 0px 8px 0px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>{folderName}</div>
            <div onClick={() => deleteFolder()}>폴더 삭제</div>
          </div>
          {scraplist.length !== 0 ? (
            <PlaceStyle
              style={{
                flexWrap: 'wrap',
                minHeight: '100vh',
                alignContent: 'flex-start',
              }}
            >
              {scraplist.map((place, index) => (
                <Place
                  key={place.placeId}
                  place={place}
                  onClick={() => navigate(`/detail/${place.placeId}`)}
                />
              ))}
            </PlaceStyle>
          ) : (
            <a>불러올 장소가 없습니다</a>
          )}
        </>
      )}
      <CustomButton
        buttonSize={ButtonSize.LARGE}
        buttonTheme={ButtonTheme.BLACK}
        handler={() => {
          setMode('main');
        }}
      >
        스크랩 페이지로 돌아가기
      </CustomButton>
    </ScrapStyle>
  );
};

const FolderComponent = (props) => {
  const setFolderPage = props.setFolderPage;
  const setMode = props.setMode;
  const folderId = props.folderId;
  const coverImage = props.coverImage;
  const name = props.name;
  const placeCount = props.placeCount;

  function clickFolderHandler(folderId) {
    setFolderPage(folderId);
    setMode('folder');
  }

  const divStyle = {
    width: '100px',
    height: '100px',
    fontWeight: '600',
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    borderRadius: '10px',
  };

  const folderContentStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)' /* 어두운 배경색 (0.4는 불투명도 조절) */,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    gap: '4px',
  };

  if (coverImage === '') {
    divStyle.backgroundColor = 'white';
  } else {
    divStyle.backgroundImage = `url(${coverImage})`;
  }

  return (
    <div style={divStyle} onClick={() => clickFolderHandler(folderId)}>
      <div style={folderContentStyle}>
        <div>{name}</div>
        <div>({placeCount})</div>
      </div>
    </div>
  );
};

export default Scrap;

const PlaceStyle = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  overflow-x: auto;
  height: auto;
  align-items: flex-start;
`;

const FolderStyle = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  overflow-x: auto;
  height: auto;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const ScrapStyle = styled.div`
  background-color: rgb(237, 237, 237);
  padding: 20px 15px;
  margin-bottom: 8px;
`;
