import React from "react";
import styled from "styled-components";
import { useStore } from "../stores/useStore";
import { CATEGORY_LABELS } from "../utils/constants";

const Card = ({ moim }) => {
  const { theme } = useStore();
  const categoryLabel = CATEGORY_LABELS[moim.category];
  const truncatedDescription =
    moim.description.length > 60
      ? moim.description.substring(0, 60) + "..."
      : moim.description;
  const displayTags = moim.tags.slice(0, 3);

  return (
    <CardContainer theme={theme}>
      <CardImage src={moim.thumbnail} alt={moim.title} />
      <CardContent>
        <CardTitle theme={theme}>{moim.title}</CardTitle>
        <CardMeta>
          <CategoryBadge theme={theme}>{categoryLabel}</CategoryBadge>
          <MemberCount theme={theme}>최대 {moim.maxMembers}명</MemberCount>
        </CardMeta>
        <CardLocation>
          <LocationBadge $onlineType={moim.onlineType} theme={theme}>
            {moim.onlineType === "online" ? "온라인" : "오프라인"}
          </LocationBadge>
          {moim.onlineType === "offline" && moim.location && (
            <LocationText theme={theme}>{moim.location}</LocationText>
          )}
        </CardLocation>
        <CardDescription theme={theme}>{truncatedDescription}</CardDescription>
        <CardTags>
          {displayTags.map((tag, index) => (
            <Tag key={index} theme={theme}>
              #{tag}
            </Tag>
          ))}
        </CardTags>
      </CardContent>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  background: ${(props) => props.theme.cardBackground};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.cardShadow};
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid ${(props) => props.theme.borderLight};

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.13);
    transform: translateY(-2px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
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
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CategoryBadge = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.textSecondary};
  background: ${(props) => props.theme.tagBackground};
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
`;

const MemberCount = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.textTertiary};
  background: ${(props) => props.theme.tagBackground};
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
`;

const CardLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const LocationBadge = styled.span`
  font-size: 13px;
  color: ${(props) => (props.$onlineType === "online" ? "#059669" : "#dc2626")};
  background: ${(props) =>
    props.$onlineType === "online" ? "#d1fae5" : "#fee2e2"};
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
`;

const LocationText = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.textTertiary};
  font-weight: 500;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
`;

const CardTags = styled.div`
  display: flex;
  gap: 4px;
`;

const Tag = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.textSecondary};
  background: ${(props) => props.theme.tagBackground};
  padding: 4px 8px;
  border-radius: 20px;
  font-weight: 500;
`;
