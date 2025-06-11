import React from "react";
import styled from "styled-components";

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
  padding: 6px;
  position: relative;
`;

const Modal = ({ isOpen, onClose, children }) => {
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
