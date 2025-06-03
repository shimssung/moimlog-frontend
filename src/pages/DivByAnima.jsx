import React from "react";
import styled from "styled-components";

const StyledDivByAnima = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 40px;
  padding: 40px 16px;
  position: relative;
  width: 100%;
`;

const DivByAnima = () => {
  return (
    <StyledDivByAnima>
      {/* 여기에 서비스 소개 섹션의 내용을 추가할 수 있습니다 */}
    </StyledDivByAnima>
  );
};

export default DivByAnima;
