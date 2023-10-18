import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import serverapi from '../api/serverapi';
import useAuthToken from '../hooks/useAuthToken';
import styled from 'styled-components';
import Button, { ButtonSize, ButtonTheme } from '../components/Button/Button';
import TagChip, { ChipSize } from '../components/TagChip/TagChip';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import Input from '../components/Input/Input';
import Todo from '../components/Todo/Todo';
import Toast, { ToastTheme } from '../components/Toast/Toast';
import BottomNav from '../components/BottomNav/BottomNav';

function Detail() {
  const { placeId } = useParams();

  const [placeInfo, setPlaceInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (placeInfo.image) {
      setLoading(false); // 이미지가 로드되면 로딩을 false로 설정
    }
  }, [placeInfo.image]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <DetailHeader
        placeId={placeId}
        placeInfo={placeInfo}
        setPlaceInfo={setPlaceInfo}
        setLoading={setLoading}
      />
      <div style={{ marginTop: '44px' }}>
        <img
          src={placeInfo.image}
          height='300px'
          width='100%'
          alt='placeImage'
        />
        <div
          style={{
            width: 'auto',
            flexDirection: 'column',
            marginLeft: '20px',
            marginRight: '20px',
          }}
        >
          <PlaceDetail placeInfo={placeInfo} />
          <PlaceTodo placeId={placeId} />
          <PlaceTodoList placeId={placeId} />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function DetailHeader(props) {
  const placeId = props.placeId;
  const placeInfo = props.placeInfo;
  const setPlaceInfo = props.setPlaceInfo;
  const setLoading = props.setLoading;
  const { getAccessToken } = useAuthToken();

  useEffect(() => {
    const getPlaceInfo = async () => {
      setLoading(true);
      const api = `places/${placeId}`;

      try {
        const res = await serverapi.get(api, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
        console.log('res.data.data', res.data.data);
        if (res.status === 201) {
          setPlaceInfo(res.data.data);
        }
      } catch (e) {
        console.log('error', e);
      }
    };

    getPlaceInfo();
    setLoading(false);
  }, []);

  return <Header>{placeInfo.placeName}</Header>;
}

function PlaceDetail(props) {
  const placeInfo = props.placeInfo;
  const { getAccessToken } = useAuthToken();

  const scrap = async () => {
    const api = `places/${placeInfo.placeId}/scrap`;

    try {
      const res = await serverapi.post(api, null, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  const unscrap = async () => {
    const api = `places/${placeInfo.placeId}/scrap`;

    try {
      const res = await serverapi.delete(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '20px',
          fontWeight: '600',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <div>
          <img src='images/detail_map.svg' />
          {placeInfo.placeName}
        </div>
        <div>
          {placeInfo.scrap ? (
            <img
              src='images/detail_scrap_filled.svg'
              alt='filled'
              onClick={() => unscrap()}
            />
          ) : (
            <img src='images/detail_scrap.svg' onClick={() => scrap()} />
          )}
        </div>
      </div>
      <Title>공간 정보</Title>
      <Content>- {placeInfo.address}</Content>

      <Content>- 전화: {placeInfo.tel}</Content>
      <Content>- 주차 {placeInfo.parking}</Content>
      <Content
        dangerouslySetInnerHTML={{ __html: placeInfo.website }}
      ></Content>
      {placeInfo.tags && placeInfo.tags.length > 0 && (
        <div
          style={{
            display: 'flex',
          }}
        >
          {placeInfo.tags.map((tag, index) => (
            <TagChip key={tag} num={tag} chipSize={ChipSize.NORMAL} />
          ))}
        </div>
      )}
    </>
  );
}

function PlaceTodo(props) {
  const placeId = props.placeId;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoValue, setTodoValue] = useState('');
  const [numTag, setNumTag] = useState(0);
  const { getAccessToken } = useAuthToken();

  const onChangeTodo = (event) => {
    setTodoValue(event.target.value);
  };

  const getTag = async () => {
    const api = `todos/tag`;
    const data = {
      todo: todoValue,
    };

    try {
      console.log('data-getTodo', data);
      const res = await serverapi.post(api, data, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('res.data.data', res.data.data);
      if (res.status === 201) {
        setNumTag(res.data.data);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const inform = async () => {
    const api = `todos`;
    const data = {
      content: todoValue,
      placeId: placeId,
      tag: numTag,
    };

    try {
      console.log('data-inform', data);
      const res = await serverapi.post(api, data, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
        setIsModalOpen(false);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title>여기서 뭐 할까?</Title>
        <Button
          buttonSize={ButtonSize.NORMAL}
          ButtonTheme={ButtonTheme.BLACK}
          handler={() => {
            setIsModalOpen(true);
          }}
        >
          나도 알려주기
        </Button>
      </div>
      {isModalOpen && (
        <BottomSheet closeModal={() => setIsModalOpen(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Input
              label='Todo 입력'
              value={todoValue}
              onChangeHandler={onChangeTodo}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
              >
                <Button
                  buttonSize={ButtonSize.NORMAL}
                  ButtonTheme={ButtonTheme.BLACK}
                  handler={() => {
                    getTag(true);
                  }}
                >
                  태그 요청하기
                </Button>
                {numTag !== 0 && <TagChip num={numTag} />}
              </div>
              <Button
                buttonSize={ButtonSize.NORMAL}
                ButtonTheme={ButtonTheme.BLACK}
                disabled={todoValue.length > 0 && numTag > 0 ? false : true}
                handler={() => {
                  inform();
                }}
              >
                알려주기
              </Button>
            </div>
          </div>
        </BottomSheet>
      )}
    </>
  );
}

function PlaceTodoList(props) {
  const placeId = props.placeId;
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('LIKE_DESC');
  const [limit, setLimit] = useState(5);
  const [todolist, setTodolist] = useState([]);
  const { getAccessToken } = useAuthToken();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const getTodoInfo = async () => {
    const api = `todos/place?placeId=${placeId}&sort=${sort}&page=${page}&limit=${limit}`;

    try {
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('res.data.data', res.data.data);
      if (res.status === 201) {
        if (res.data.data.length === 0 && todolist.length !== 0) {
          console.log('res.data.data.length', res.data.data.length);
          setToastMessage('더 이상 불러올 Todo가 없습니다');
          setShowToast(true);
        }
        const tmp = [...todolist, ...res.data.data];
        setTodolist(tmp);
        setPage(page + 1);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  useEffect(() => {
    getTodoInfo();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {todolist.map((todo, index) => (
        <Todo
          key={index}
          todoId={todo.todoId}
          numTag={todo.tag}
          numLike={todo.likes}
          like={todo.like}
        >
          {todo.content}
        </Todo>
      ))}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          buttonSize={ButtonSize.NORMAL}
          ButtonTheme={ButtonTheme.BLACK}
          handler={() => {
            getTodoInfo();
          }}
        >
          더 보기
        </Button>
      </div>
      {showToast && (
        <Toast toastTheme={ToastTheme.SUCCESS}>{toastMessage}</Toast>
      )}
    </div>
  );
}

export default Detail;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-size: 10px;
  font-weight: 400;
  margin-top: 5px;
  margin-bottom: 5px;
`;
