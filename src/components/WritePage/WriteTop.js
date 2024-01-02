import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import serverapi from '../../api/serverapi';
import useAuthToken from '../../hooks/useAuthToken';
import Toast, { ToastTheme } from '../../components/Toast/Toast';

const WriteTop = ({ reviewText, setReviewText, todoId }) => {
  const { getAccessToken } = useAuthToken();
  const [image, setImage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastTheme, setToastTheme] = useState(ToastTheme.SUCCESS);
  const [isModal, setModal] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const accessToken = getAccessToken();

  const handleUploadReview = async () => {
    if (reviewText) {
      try {
        const res = await serverapi.post(
          'comments',
          {
            content: reviewText,
            todoId: todoId,
            imageURL: image,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        console.log('리뷰 업로드 성공:', res.data);
        window.history.back();
        // 요청이 성공한 경우의 후속 작업을 수행하세요.
      } catch (e) {
        console.error('오류가 발생했습니다:', e);
        // 에러 처리 로직을 추가하세요.
      } finally {
      }
    }
  };

  window.getCImage = getCImage; // 전역 스코프에 등록

  function getCImage(text) {
    setImage(text);
    setLoading(false);
    setToastMessage('사진을 불러오는데 성공했습니다.');
    setToastTheme(ToastTheme.SUCCESS);
    setShowToast(true);
  }

  const handleFileSelect = () => {
    setLoading(true);
    try {
      //eslint-disable-next-line
      GetCImage.postMessage('');
    } catch (e) {
      if (e.response.status === 401) {
        // 401 Unauthorized 오류가 발생한 경우
        console.log('Unauthorized 오류가 발생했습니다. 리디렉션을 수행합니다.');
        window.location.href = '/nonlogin'; // 홈페이지로 리디렉션
      } else {
        // 다른 오류가 발생한 경우
        console.error('오류가 발생했습니다:', e);
      }
      setLoading(false);
    }
  };

  const viewImage = () => {
    if (isLoading) {
      setToastMessage('이미지를 불러오는 중입니다.');
      setToastTheme(ToastTheme.ERROR);
      setShowToast(true);
      return;
    }
    if (image === '') {
      setToastMessage('이미지를 선택하지 않았습니다.');
      setToastTheme(ToastTheme.ERROR);
      setShowToast(true);
      return;
    }
    setModal(true);
  };

  return (
    <>
      <TopBox>
        <PictureButton onClick={handleFileSelect}>사진 선택</PictureButton>
        <WriteTitle>작성</WriteTitle>
        <RegisterButton onClick={handleUploadReview}>등록</RegisterButton>
      </TopBox>
      <Outlet />
      <ViewSelectedPhotoButton onClick={viewImage}>
        선택한 사진 보기
      </ViewSelectedPhotoButton>
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            zIndex: 1,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img src='images/loading.svg' height='80px' width='80px'></img>
        </div>
      )}
      {showToast && (
        <Toast toastTheme={ToastTheme.SUCCESS}>{toastMessage}</Toast>
      )}
      {isModal && (
        <ImageOverlay
          onClick={() => {
            setModal(false);
          }}
        >
          <Image src={image}></Image>
        </ImageOverlay>
      )}
    </>
  );
};

export default WriteTop;

const TopBox = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc; /* 회색 줄 스타일 */
`;

const WriteTitle = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;

  text-align: center;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const PictureButton = styled.button`
  width: 30%;
  height: 80%;
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9f9f9f;

  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &:hover {
    cursor: pointer; /* hover 시 포인터 스타일 추가 */
  }
`;

const RegisterButton = styled.button`
  width: 30%;
  height: 80%;
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9f9f9f;

  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &:hover {
    cursor: pointer; /* hover 시 포인터 스타일 추가 */
  }
`;

const ViewSelectedPhotoButton = styled.button`
  width: 93%;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px 20px;
  border-radius: 5px;
`;

const ImageOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
  height: 100%;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;
