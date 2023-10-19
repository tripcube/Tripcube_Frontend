import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TopNavStyle } from "../TopNav/style";
import { Outlet } from "react-router";
import styled from "styled-components";
import serverapi from "../../api/serverapi";

const WriteTop = ({ children, reviewText, setReviewText }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null); // selectedPhoto 상태 추가
  const handleReviewChange = (e) => {
    setReviewText(e.target.value); // reviewText를 업데이트합니다.
  };

  const handleUploadReview = () => {
    if (reviewText) {
      // 후기 업로드 POST 요청을 보냅니다.
      serverapi
        .post("/comments", {
          content: reviewText,
          todoId: 9, // 예시로 1234로 설정, 실제로 사용하는 값으로 대체해야 합니다.
        })
        .then((response) => {
          // 요청이 성공하면 response를 처리합니다.
          console.log("후기 업로드 성공:", response.data);
          // 다른 후속 동작을 수행할 수 있습니다.
        })
        .catch((error) => {
          console.error("후기 업로드 실패:", error);
          // 에러 처리 로직을 추가합니다.
        });
    } else {
      alert("후기를 입력하세요.");
    }
  };

  //사진관련

  const handleFileSelect = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setSelectedPhoto(URL.createObjectURL(selectedFile)); // 선택한 파일 저장
    }
  };

  const handleViewSelectedPhoto = () => {
    if (selectedPhoto) {
      const newWindow = window.open("", "_blank");
      newWindow.document.write(
        `<img src="${selectedPhoto}" alt="Selected Photo" />`
      );
    } else {
      alert("선택한 사진이 없습니다.");
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
        onClick={handleViewSelectedPhoto}
      >
        선택한 사진 보기
      </ViewSelectedPhotoButton>

      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e)}
      />
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
  .button:hover {
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
  .button:hover {
    cursor: pointer; /* hover 시 포인터 스타일 추가 */
  }
`;

const ViewSelectedPhotoButton = styled.button`
  width: 90%;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px 20px;
  border: 1px solid ${(props) => (props.selectedPhoto ? "black" : "#ccc")};
  border-radius: 5px;
  background-color: ${(props) => (props.selectedPhoto ? "white" : "#f0f0f0")};
  color: ${(props) => (props.selectedPhoto ? "black" : "#ccc")};
`;