import React, { useEffect, useState } from 'react';
import serverapi from '../api/serverapi';
import useAuthToken from '../hooks/useAuthToken';
import { Button, LinearProgress } from '@mui/material';
import Todo from '../components/Todo/Todo';
import BottomNav from '../components/BottomNav/BottomNav';
import FormattedDate from '../components/FormattedDate';
import CustomButton, {
  ButtonSize,
  ButtonTheme,
} from '../components/CustomButton/CustomButton';

const MyPage = () => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [editmode, setEditmode] = useState(false);

  const { getAccessToken } = useAuthToken();

  const getInfo = async () => {
    const api = `users/0`;

    try {
      setLoading(true);
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getInfo-api', api);
      if (res.status === 201) {
        setInfo(res.data.data);
        console.log('res.data.data', res.data.data);
      }
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <BackGroundImage
            info={info}
            editmode={editmode}
            setEditmode={setEditmode}
          />
          <Profile info={info} />
          <Content info={info} />
        </>
      )}
      <BottomNav />
    </>
  );
};

const BackGroundImage = (props) => {
  const info = props.info;
  const editmode = props.editmode;
  const setEditmode = props.setEditmode;

  return (
    <div style={{ position: 'relative' }}>
      {info.backgroundImage === null ? (
        <div
          style={{
            backgroundColor: '#ededed',
            height: '164px',
            width: '100%',
          }}
        ></div>
      ) : (
        <img
          src={info.backgroundImage}
          height='164px'
          width='100%'
          alt='backgroundImage'
        />
      )}
      <ProfileImage info={info} editmode={editmode} />
      <EditFollow info={info} editmode={editmode} setEditmode={setEditmode} />
    </div>
  );
};

const ProfileImage = (props) => {
  const info = props.info;
  const editmode = props.editmode;

  const [image, setImage] = useState('');

  window.getImage = getImage; // 전역 스코프에 등록

  function getImage(text) {
    setImage(text);
  }

  function setProfileImage() {
    if (editmode) {
      try {
        //eslint-disable-next-line
        GetImage.postMessage('');
      } catch (e) {}
    }
  }

  async function sendImage() {
    const api = `users/profileImage`;
    const data = {
      ImageURL: image,
    };
    try {
      console.log('data-sendImage', data);
      const res = await serverapi.put(api, data);
      if (res.status === 200) {
        window.location.href = '/mypage'; // 페이지를 이동시킵니다.
      }
    } catch (e) {
      console.log(e.response);
    } finally {
      window.getImage('');
    }
  }

  useEffect(() => {
    if (image !== '') {
      sendImage(); // sendImage 함수를 호출합니다.
    }
  }, [image]);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: '3',
        top: '60%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '92px',
        height: '92px',
        borderRadius: '50%',
        overflow: 'hidden',
      }}
      onClick={() => setProfileImage()}
    >
      <img
        src={
          info.profileImage === null
            ? require('../images/profile-image.svg').default
            : info.profileImage
        }
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none', // 이미지에 대한 이벤트를 막음
        }}
      />
    </div>
  );
};

const EditFollow = (props) => {
  const info = props.info;
  const editmode = props.editmode;
  const setEditmode = props.setEditmode;

  return (
    <div
      style={{
        zIndex: '3',
        position: 'absolute',
        bottom: '0px',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0px 4px 4px 4px',
        }}
      >
        <CustomButton
          buttonSize={ButtonSize.NORMAL}
          ButtonTheme={ButtonTheme.BLACK}
          handler={() => setEditmode(!editmode)}
        >
          {editmode ? '개인정보 수정' : '프로필 편집'}
        </CustomButton>
        <div style={{ fontSize: '10px' }}>팔로잉 팔로워</div>
      </div>
    </div>
  );
};

const Profile = (props) => {
  const info = props.info;

  return (
    <>
      <div
        style={{
          margin: '32px 0px 8px 0px',
          display: 'flex',
          justifyContent: 'center',
          fontWeight: '700',
          fontSize: '12px',
          gap: '4px',
        }}
      >
        <>
          {info.name}({info.loginId})
        </>
        <div style={{ fontWeight: '400', fontSize: '11px' }}>
          {info.oneliner}
        </div>
      </div>
    </>
  );
};

const Content = (props) => {
  const info = props.info;
  const [page, setPage] = useState(true); // true는 todopage, false는 commentPage
  const [todolist, setTodolist] = useState([]);
  const [commentlist, setCommentlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getAccessToken } = useAuthToken();

  const getTodolist = async () => {
    const api = `todos/mypage?userId=0&sort=DATE_ASC&page=1`;

    try {
      setLoading(true);
      setPage(true);
      console.log('getTodolist-api', api);

      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
        setTodolist(res.data.data);
        console.log('res.data.data', res.data.data);
      }
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  };

  const getCommentlist = async () => {
    const api = `comments/mypage`;

    try {
      setLoading(true);
      setPage(false);

      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('getInfo-api', api);
      if (res.status === 201) {
        setCommentlist(res.data);
        console.log('res.data', res.data);
      }
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <ImageBox
          image='images/mypage_todo.svg'
          onClick={() => getTodolist()}
        />
        <ImageBox
          image='images/mypage_comment.svg'
          onClick={() => getCommentlist()}
        />
      </div>
      <div
        style={{
          backgroundColor: '#ededed',
          padding: '20px 20px 70px 20px',
          minHeight: '550px',
        }}
      >
        {loading ? (
          <LinearProgress />
        ) : (
          todolist.map((todo, index) => (
            <MypageTodo key={index} todo={todo} index={index} />
          ))
        )}
      </div>
    </>
  );
};

const ImageBox = (props) => {
  const image = props.image;
  return (
    <div style={{ margin: '8px 40px 8px 40px' }} onClick={props.onClick}>
      <img src={image} />
    </div>
  );
};

const MypageTodo = (props) => {
  const todo = props.todo;
  const index = props.index;

  const date = FormattedDate(todo.createdAt);

  return (
    <>
      <div
        style={{
          display: 'flex',
          padding: '12px 8px 4px 12px',
          justifyContent: 'space-between',
          fontSize: '10px',
        }}
      >
        <div>{todo.placeName}</div>
        <div>
          {date.year}년 {date.month}월 {date.day}일 등록
        </div>
      </div>
      <Todo
        key={index}
        todoId={todo.todoId}
        numTag={todo.tag}
        numLike={todo.likes}
        like={todo.like}
      >
        {todo.content}
      </Todo>
    </>
  );
};

export default MyPage;
