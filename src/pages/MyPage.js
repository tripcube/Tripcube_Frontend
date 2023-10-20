import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import serverapi from '../api/serverapi';
import useAuthToken from '../hooks/useAuthToken';
import { LinearProgress } from '@mui/material';
import Todo from '../components/Todo/Todo';
import BottomNav from '../components/BottomNav/BottomNav';
import FormattedDate from '../components/FormattedDate';
import CustomButton, {
  ButtonSize,
  ButtonTheme,
} from '../components/CustomButton/CustomButton';
import Comment from '../components/Comment/Comment';
import Input from '../components/Input/Input';
import Toast, { ToastTheme } from '../components/Toast/Toast';
import useAuthorized from '../hooks/useAuthorized';

// 전체 페이지()
const MyPage = () => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [editmode, setEditmode] = useState(false);
  const [privatemode, setPrivatemode] = useState(false);
  const [toastTheme, setToastTheme] = useState(ToastTheme.SUCCESS);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { userId } = useParams(); // URL 파라미터에서 userId를 추출

  const { getAccessToken } = useAuthToken();

  const getInfo = async () => {
    const api = `users/${userId}`;

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
      if (e.response.status === 401) {
        // 401 Unauthorized 오류가 발생한 경우
        console.log('Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.');
        window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
      } else {
        // 다른 오류가 발생한 경우
        console.error('오류가 발생했습니다:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (!privatemode) {
      setPrivatemode(false);
      setEditmode(false);
    }
    getInfo();
    console.log('privatemode1', privatemode);
    console.log('editmode1', editmode);
  }, [privatemode]);

  useEffect(() => {
    getInfo();
    console.log('privatemode2', privatemode);
    console.log('editmode2', editmode);
  }, [editmode]);

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <BackGroundImage
            userId={userId}
            info={info}
            editmode={editmode}
            setEditmode={setEditmode}
            privatemode={privatemode}
            setPrivatemode={setPrivatemode}
          />
          {editmode ? (
            privatemode ? (
              <CheckPwd
                setPrivatemode={setPrivatemode}
                setToastMessage={setToastMessage}
                setToastTheme={setToastTheme}
                setShowToast={setShowToast}
              />
            ) : (
              <Edit
                info={info}
                setEditmode={setEditmode}
                setToastMessage={setToastMessage}
                setToastTheme={setToastTheme}
                setShowToast={setShowToast}
              />
            )
          ) : (
            <>
              <Profile info={info} />
              <Content userId={userId} />
            </>
          )}
        </>
      )}
      {userId == 0 ? <BottomNav /> : <></>}
      {showToast && <Toast toastTheme={toastTheme}>{toastMessage}</Toast>}
    </>
  );
};

// Bachground + Profile + EditFollow
const BackGroundImage = (props) => {
  const info = props.info;
  const editmode = props.editmode;
  const setEditmode = props.setEditmode;
  const privatemode = props.privatemode;
  const setPrivatemode = props.setPrivatemode;
  const userId = props.userId;

  const [image, setImage] = useState('');
  const { getAccessToken } = useAuthToken();

  window.getBImage = getBImage; // 전역 스코프에 등록

  function getBImage(text) {
    setImage(text);
  }

  function setBackgroundImage() {
    console.log('setBackgroundImage !');
    if (editmode) {
      try {
        //eslint-disable-next-line
        GetBImage.postMessage('');
      } catch (e) {
        if (e.response.status === 401) {
          // 401 Unauthorized 오류가 발생한 경우
          console.log(
            'Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.',
          );
          window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
        } else {
          // 다른 오류가 발생한 경우
          console.error('오류가 발생했습니다:', e);
        }
      }
    }
  }

  async function sendImage() {
    const api = `users/backgroundImage`;
    const data = {
      imageURL: image,
    };
    try {
      console.log('data-sendImage', data);
      const res = await serverapi.put(api, data, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
        setEditmode(false);
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
      window.getBImage('');
    }
  }

  useEffect(() => {
    if (image !== '') {
      sendImage(); // sendImage 함수를 호출합니다.
    }
  }, [image]);

  return (
    <div style={{ position: 'relative' }}>
      {info.backgroundImage === null ? (
        <div
          style={{
            backgroundColor: '#ededed',
            height: '164px',
            width: '100%',
          }}
          onClick={() => setBackgroundImage()}
        ></div>
      ) : (
        <img
          src={info.backgroundImage}
          height='164px'
          width='100%'
          alt='backgroundImage'
          onClick={() => setBackgroundImage()}
        />
      )}
      <ProfileImage info={info} editmode={editmode} setEditmode={setEditmode} />
      <EditFollow
        editmode={editmode}
        setEditmode={setEditmode}
        privatemode={privatemode}
        setPrivatemode={setPrivatemode}
        userId={userId}
      />
    </div>
  );
};

const ProfileImage = (props) => {
  const info = props.info;
  const editmode = props.editmode;
  const setEditmode = props.setEditmode;

  const [image, setImage] = useState('');
  const { getAccessToken } = useAuthToken();

  window.getImage = getImage; // 전역 스코프에 등록

  function getImage(text) {
    setImage(text);
  }

  function setProfileImage() {
    console.log('setProfileImage !');
    if (editmode) {
      try {
        //eslint-disable-next-line
        GetImage.postMessage('');
      } catch (e) {
        if (e.response.status === 401) {
          // 401 Unauthorized 오류가 발생한 경우
          console.log(
            'Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.',
          );
          window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
        } else {
          // 다른 오류가 발생한 경우
          console.error('오류가 발생했습니다:', e);
        }
      }
    }
  }

  async function sendImage() {
    const api = `users/profileImage`;
    const data = {
      imageURL: image,
    };
    try {
      console.log('data-sendImage', data);
      const res = await serverapi.put(api, data, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
        setEditmode(false);
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
        }}
        onClick={() => setProfileImage()}
      />
    </div>
  );
};

const EditFollow = (props) => {
  const editmode = props.editmode;
  const setEditmode = props.setEditmode;
  const privatemode = props.privatemode;
  const setPrivatemode = props.setPrivatemode;
  const userId = props.userId;

  const { getAccessToken, setAccessToken, setRefreshToken } = useAuthToken();
  const { setUnAuthorized } = useAuthorized();

  function editButtonHandler() {
    if (editmode) {
      setPrivatemode(true);
    } else setEditmode(true);
  }

  async function logout() {
    const api = `auth/logout`;
    const data = {
      userId: userId,
    };
    try {
      console.log('data-logout', data);
      const res = await serverapi.post(api, data, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('res', res);
      if (res.status === 201) {
        setAccessToken();
        setRefreshToken();
        setUnAuthorized();
        window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        // 401 Unauthorized 오류가 발생한 경우
        console.log('Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.');
        window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
      } else {
        // 다른 오류가 발생한 경우
        console.error('오류가 발생했습니다:', e);
      }
    }
  }

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
          height: '28px',
        }}
      >
        {' '}
        {!privatemode && userId == 0 && (
          <CustomButton
            buttonSize={ButtonSize.NORMAL}
            ButtonTheme={ButtonTheme.BLACK}
            handler={() => editButtonHandler()}
          >
            {editmode ? '비밀번호 수정' : '프로필 편집'}
          </CustomButton>
        )}
        {
          <CustomButton
            buttonSize={ButtonSize.NORMAL}
            ButtonTheme={ButtonTheme.BLACK}
            handler={() => logout()}
          >
            로그아웃
          </CustomButton>
        }
      </div>
    </div>
  );
};

// when editmode === true
const Edit = (props) => {
  const info = props.info;
  const setEditmode = props.setEditmode;
  const setToastMessage = props.setToastMessage;
  const setToastTheme = props.setToastTheme;
  const setShowToast = props.setShowToast;

  const [nameValue, setNameValue] = useState(info.name);
  const [lineValue, setLineValue] = useState(info.oneliner);

  const { getAccessToken } = useAuthToken();

  const onChangeName = (event) => {
    setNameValue(event.target.value);
  };
  const onChangeLine = (event) => {
    setLineValue(event.target.value);
  };

  function onPressEnter(e) {
    if (e.key === 'Enter') {
      edit();
    }
  }

  async function edit() {
    const api = `users/profile`;
    const data = {
      name: nameValue,
      oneliner: lineValue,
    };
    try {
      console.log('data-edit', data);
      const res = await serverapi.put(api, data, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
        setEditmode(false);
        setToastMessage('회원 정보가 수정되었습니다.');
        setToastTheme(ToastTheme.SUCCESS);
        setShowToast(true);
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
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '64px 27px 20px 27px',
        }}
      >
        <Input
          label='닉네임'
          value={nameValue}
          onChangeHandler={onChangeName}
        />
        <Input
          label='한 줄 소개'
          value={lineValue}
          onChangeHandler={onChangeLine}
          onKeyPress={onPressEnter}
        />
        <CustomButton
          buttonSize={ButtonSize.LARGE}
          buttonTheme={ButtonTheme.BLACK}
          disabled={nameValue !== null ? false : true}
          handler={() => {
            edit();
          }}
        >
          수정
        </CustomButton>
        <CustomButton
          buttonSize={ButtonSize.LARGE}
          buttonTheme={ButtonTheme.BLACK}
          handler={() => {
            setEditmode(false);
          }}
        >
          마이페이지로 돌아가기
        </CustomButton>
      </div>
    </>
  );
};

// when editmode && privatemode === true
const CheckPwd = (props) => {
  const setEditmode = props.setEditmode;
  const privatemode = props.privatemode;
  const setPrivatemode = props.setPrivatemode;
  const setToastMessage = props.setToastMessage;
  const setToastTheme = props.setToastTheme;
  const setShowToast = props.setShowToast;

  const [pwdValue, setPwdValue] = useState('');
  const [changemode, setChangemode] = useState(false);

  const { getAccessToken } = useAuthToken();

  const onChangePwd = (event) => {
    setPwdValue(event.target.value);
  };

  function onPressEnter(e) {
    if (e.key === 'Enter') {
      checkPwd();
    }
  }

  useEffect(() => {
    if (!privatemode) setChangemode(false);
  }, [privatemode]);

  async function checkPwd() {
    const api = `users/password`;
    const data = {
      password: pwdValue,
    };
    try {
      console.log('data-checkPwd', data);
      const res = await serverapi.post(api, data, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log('res', res.data);
      if (res.status === 201) {
        if (res.data.data) {
          setChangemode(true);
        } else {
          setToastMessage('비밀번호가 일치하지 않습니다.');
          setToastTheme(ToastTheme.ERROR);
          setShowToast(true);
        }
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
  }

  return (
    <>
      {changemode ? (
        <ChangePwd
          setPrivatemode={setPrivatemode}
          setToastMessage={setToastMessage}
          setToastTheme={setToastTheme}
          setShowToast={setShowToast}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '64px 27px 20px 27px',
          }}
        >
          <Input
            label='현재 비밀번호'
            value={pwdValue}
            type='password'
            onChangeHandler={onChangePwd}
            onKeyPress={onPressEnter}
          />
          <CustomButton
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.BLACK}
            disabled={pwdValue !== '' ? false : true}
            handler={() => {
              checkPwd();
            }}
          >
            확인
          </CustomButton>
          <CustomButton
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.BLACK}
            handler={() => {
              setPrivatemode(false);
            }}
          >
            마이페이지로 돌아가기
          </CustomButton>
        </div>
      )}
    </>
  );
};

const ChangePwd = (props) => {
  const setPrivatemode = props.setPrivatemode;
  const setToastMessage = props.setToastMessage;
  const setToastTheme = props.setToastTheme;
  const setShowToast = props.setShowToast;

  const [pwdValue, setPwdValue] = useState('');
  const [matchingPwd, setMatchingPwd] = useState('');
  const [invalidPwdInfo, setInvalidPwdInfo] = useState('');
  const [invalidMatchingPwdInfo, setInvalidMatchingPwdInfo] = useState('');
  const [notEmpty, setNotEmpty] = useState(false);

  const { getAccessToken } = useAuthToken();

  const isAllValid = !invalidPwdInfo && !invalidMatchingPwdInfo && notEmpty;

  const pwdRegEx = /^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?~\[\]\\;',./]{8,16}$/;

  const pwdCheck = (pwd) => {
    return pwdRegEx.test(pwd);
  };

  const pwdChangeHandler = (e) => {
    setPwdValue(e.target.value);

    if (!pwdCheck(e.target.value)) {
      setInvalidPwdInfo('8-16자의 영문 대소문자, 숫자, 특수문자만 사용 가능');
      return;
    }
    if (matchingPwd || invalidMatchingPwdInfo) {
      if (e.target.value !== matchingPwd) {
        setInvalidMatchingPwdInfo('비밀번호가 서로 다릅니다.');
      } else {
        setInvalidMatchingPwdInfo('');
      }
    }
    setInvalidPwdInfo('');
  };

  const matchingPwdChangeHandler = (e) => {
    setMatchingPwd(e.target.value);
    if (pwdValue !== e.target.value) {
      setInvalidMatchingPwdInfo('비밀번호가 서로 다릅니다.');
      return;
    }
    setInvalidMatchingPwdInfo('');
  };

  useEffect(() => {
    if (pwdValue !== '' && matchingPwd !== '') setNotEmpty(true);
  }, [pwdValue, matchingPwd]);

  async function changePwd() {
    const api = `users/password`;
    const data = {
      password: pwdValue,
    };
    try {
      console.log('data-changePwd', data);
      const res = await serverapi.put(api, data, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
        console.log(res.data);
        setToastTheme(ToastTheme.ERROR);
        setShowToast(true);
        setPrivatemode(false);
      } else if (res.status === 202) {
        setToastMessage(res.data.message);
        setToastTheme(ToastTheme.ERROR);
        setShowToast(true);
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
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '64px 27px 20px 27px',
      }}
    >
      <Input
        label='새 비밀번호'
        type='password'
        onChangeHandler={pwdChangeHandler}
        value={pwdValue}
        isError={!!invalidPwdInfo}
        description={invalidPwdInfo}
      />
      <Input
        label='새 비밀번호 확인'
        type='password'
        onChangeHandler={matchingPwdChangeHandler}
        isError={!!invalidMatchingPwdInfo}
        description={invalidMatchingPwdInfo}
      />
      <CustomButton
        buttonSize={ButtonSize.LARGE}
        buttonTheme={ButtonTheme.BLACK}
        disabled={!isAllValid}
        handler={() => {
          changePwd();
        }}
      >
        확인
      </CustomButton>
      <CustomButton
        buttonSize={ButtonSize.LARGE}
        buttonTheme={ButtonTheme.BLACK}
        handler={() => {
          setPrivatemode(false);
        }}
      >
        마이페이지로 돌아가기
      </CustomButton>
    </div>
  );
};

// when editmode === fasle
// name = oneliner
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
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <>
          {info.name}( {info.loginId} )
        </>
        <div style={{ fontWeight: '400', fontSize: '11px' }}>
          {info.oneliner}
        </div>
      </div>
    </>
  );
};

const Content = (props) => {
  const [page, setPage] = useState(true); // true는 todopage, false는 commentPage
  const [todolist, setTodolist] = useState([]);
  const [commentlist, setCommentlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = props.userId;

  const { getAccessToken } = useAuthToken();

  const getTodolist = async () => {
    const api = `todos/mypage?userId=${userId}&sort=DATE_ASC&page=1`;

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
      if (e.response.status === 401) {
        // 401 Unauthorized 오류가 발생한 경우
        console.log('Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.');
        window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
      } else {
        // 다른 오류가 발생한 경우
        console.error('오류가 발생했습니다:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  const getCommentlist = async () => {
    const api = `comments/mypage?userId=${userId}&sort=DATE_ASC&page=1`;

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
        setCommentlist(res.data.data);
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
      setLoading(false);
      console.log('2');
    }
  };

  useEffect(() => {
    getTodolist();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <ImageBox
          image={require('../images/mypage_todo.svg').default}
          onClick={() => getTodolist()}
        />
        <ImageBox
          image={require('../images/mypage_comment.svg').default}
          onClick={() => getCommentlist()}
        />
      </div>
      <div
        style={{
          backgroundColor: '#ededed',
          padding: '5px 16px 70px 16px',
          minHeight: '550px',
        }}
      >
        {loading ? (
          <LinearProgress />
        ) : (
          <div>
            {page
              ? todolist.length > 0 &&
                todolist.map((todo, index) => (
                  <MypageTodo key={index} todo={todo} index={index} />
                ))
              : commentlist.length > 0 &&
                commentlist.map((comment, index) => (
                  <MypageComment key={index} comment={comment} index={index} />
                ))}
          </div>
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
        placeId={todo.placeId}
      >
        {todo.content}
      </Todo>
    </>
  );
};

const MypageComment = (props) => {
  const comment = props.comment;
  const index = props.index;

  const cDate = FormattedDate(comment.createdAt);

  return (
    <>
      <>
        <div
          style={{
            display: 'flex',
            padding: '12px 8px 4px 12px',
            justifyContent: 'space-between',
            fontSize: '10px',
          }}
        >
          <div>{comment.placeName}</div>
        </div>
        <Todo
          key={index}
          todoId={comment.todoId}
          numTag={comment.tag}
          numLike={comment.todo_likes}
          like={comment.todo_islike}
          placeId={comment.placeId}
        >
          {comment.todo_content}
        </Todo>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginTop: '8px',
          }}
        >
          <img src={require('../images/comment-arrow.svg').default} />
          <div>
            <Comment
              commentId={comment.commentId}
              numLike={comment.comment_likes}
              like={comment.comment_islike}
              userName={comment.userName}
              date={comment.date}
              content={comment.comment_content}
              userId={comment.userId}
              profileImage={comment.profileImage}
              image={comment.image}
            />
          </div>
        </div>
      </>
    </>
  );
};

export default MyPage;
