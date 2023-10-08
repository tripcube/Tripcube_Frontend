// BottomModalSheet.js

import React from 'react';
import './style.css';

function BottomModalSheet({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-sheet">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
		<h2>Bottom Modal Sheet</h2>
        <p>이 곳에 모달 내용을 추가하세요.</p>
      </div>
    </div>
  );
}

export default BottomModalSheet;
