import React, { useEffect } from "react";
import styled from "styled-components";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 body 스크롤 막기
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 body 스크롤 복원
      document.body.style.overflow = 'unset';
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalBox>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.18);
  min-width: 320px;
  max-width: 90vw;
  padding: 10px;
  position: relative;
`;
