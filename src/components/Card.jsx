import React from "react";
import styled from "styled-components";

const Card = ({ image, title, category, participants, isOnline, onClick, ...props }) => (
  <CardContainer onClick={onClick} {...props}>
    {image && <CardImage style={{ backgroundImage: `url('${image}')` }} />}
    <CardContent>
      <CardTitle>{title}</CardTitle>
      <InfoRow>
        <CategoryBadge>{category}</CategoryBadge>
        <OnlineBadge $isOnline={isOnline}>
          {isOnline ? "온라인" : "오프라인"}
        </OnlineBadge>
      </InfoRow>
      <ParticipantsText>
        <ParticipantsIcon>👥</ParticipantsIcon>
        {participants}명 참여
      </ParticipantsText>
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
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.13);
    transform: translateY(-2px);
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
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0d151c;
  margin: 0;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CategoryBadge = styled.span`
  font-size: 13px;
  color: #49749c;
  background: #e7edf4;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
`;

const OnlineBadge = styled.span`
  font-size: 13px;
  color: ${props => props.$isOnline ? "#0ca678" : "#e67700"};
  background: ${props => props.$isOnline ? "#e6fcf5" : "#fff9db"};
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
`;

const ParticipantsText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ParticipantsIcon = styled.span`
  font-size: 16px;
`;
