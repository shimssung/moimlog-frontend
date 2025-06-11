import React from "react";
import styled from "styled-components";

const Card = ({ image, title, desc, onClick, children, ...props }) => (
  <CardContainer onClick={onClick} {...props}>
    {image && <CardImage style={{ backgroundImage: `url('${image}')` }} />}
    <CardContent>
      {title && <CardTitle>{title}</CardTitle>}
      {desc && <CardDesc>{desc}</CardDesc>}
      {children}
    </CardContent>
  </CardContainer>
);

export default Card;

const CardContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  min-width: 200px;
  max-width: 320px;
  cursor: pointer;
  transition: box-shadow 0.15s;
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.13);
  }
`;

const CardImage = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #0d151c;
  margin-bottom: 4px;
`;

const CardDesc = styled.p`
  font-size: 14px;
  color: #49749c;
`;
