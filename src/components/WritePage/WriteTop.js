import React, { useState } from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import serverapi from "../../api/serverapi";
import useAuthToken from "../../hooks/useAuthToken";

const WriteTop = ({ reviewText, setReviewText, todoId }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { getAccessToken } = useAuthToken();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const accessToken = getAccessToken();

  const handleUploadReview = async () => {
    if (reviewText) {
      try {
        setLoading(true);
        const res = await serverapi.post(
          "comments",
          {
            content: reviewText,
            todoId: todoId,
            imageURL: image
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("리뷰 업로드 성공:", res.data);
        window.history.back();
        // 요청이 성공한 경우의 후속 작업을 수행하세요.
      } catch (e) {
        console.error("오류가 발생했습니다:", e);
        // 에러 처리 로직을 추가하세요.
      } finally {
        setLoading(false);
      }
    }
  };

  window.getCImage = getCImage; // 전역 스코프에 등록

  function getCImage(text) {
    setImage(text);
  }

  const handleFileSelect = () => {
    try {
      //eslint-disable-next-line
      GetCImage.postMessage('');
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
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setSelectedPhoto(URL.createObjectURL(selectedFile)); // 선택한 파일 저장
    }
  };

  return (
    <>
      <TopBox>
        <PictureButton onClick={handleFileSelect}>사진 선택</PictureButton>
        <WriteTitle>작성</WriteTitle>
        <RegisterButton onClick={handleUploadReview}>등록</RegisterButton>
      </TopBox>
      <Outlet />
      <ViewSelectedPhotoButton
        selectedPhoto={selectedPhoto}
        onClick={() => {}}
      >
        선택한 사진 보기
      </ViewSelectedPhotoButton>
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
  border: 1px solid ${(props) => (props.selectedPhoto ? "black" : "#ccc")};
  border-radius: 5px;
  background-color: ${(props) => (props.selectedPhoto ? "white" : "#f0f0f0")};
  color: ${(props) => (props.selectedPhoto ? "black" : "#ccc")};
`;
