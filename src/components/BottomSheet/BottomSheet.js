import styled from 'styled-components';

function BottomSheet({ title, closeModal, children }) {
  return (
    <>
      <StyledModalBackground />
      <StyledBottomSheet>
        <StyledBottomSheetHeader>
          <img src='images/delete.svg' alt='delete' onClick={closeModal} />
          <div>{title}</div>
        </StyledBottomSheetHeader>
        <div style={{ padding: '4px 15px 15px 15px' }}>{children}</div>
      </StyledBottomSheet>
    </>
  );
}

export default BottomSheet;

const StyledModalBackground = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  background-color: #000000;
  opacity: 0.5;
  z-index: 1;
`;

const StyledBottomSheet = styled.div`
  z-index: 2;
  position: fixed;
  width: 100%;
  height: fit-content;
  max-height: 90%;
  overflow-y: scroll;
  bottom: 44px; /* 화면 바닥에 위치 */
  left: 50%; /* 화면 가로 중앙에 위치 */
  transform: translateX(-50%); /* 화면 가운데로 이동 */
  border-radius: 1rem 1rem 0 0;
  background-color: #ffffff;
  padding: 4px;
`;

const StyledBottomSheetHeader = styled.div`
  height: auto;
  padding: 5px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background: #ffffff;
  & > img {
    cursor: pointer;
  }
  & > div {
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 1.7rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  flex-direction: row-reverse;
  padding-right: 8px;
`;
