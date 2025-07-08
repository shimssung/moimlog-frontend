import React from "react";
import styled from "styled-components";
import { CATEGORY_LABELS } from "../utils/constants";

const StyledCard = styled.div`
  background: var(--card-background);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid var(--border-light);

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
  padding: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--text-primary);
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const CategoryBadge = styled.span`
  background: var(--tag-background);
  color: var(--text-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const MemberCount = styled.span`
  color: var(--text-tertiary);
  font-size: 0.875rem;
`;

const CardLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const LocationBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => props.onlineType === 'online' ? 'var(--success)' : 'var(--warning)'};
  color: white;
`;

const LocationText = styled.span`
  color: var(--text-tertiary);
  font-size: 0.875rem;
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 0.75rem;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`;

const CardTag = styled.span`
  color: var(--text-secondary);
  background: var(--tag-background);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const Card = ({ moim, className = "" }) => {
  const categoryLabel = CATEGORY_LABELS[moim.category];
  const truncatedDescription =
    moim.description.length > 60
      ? moim.description.substring(0, 60) + "..."
      : moim.description;
  const displayTags = moim.tags.slice(0, 3);

  return (
    <StyledCard className={className}>
      <CardImage src={moim.thumbnail} alt={moim.title} />
      <CardContent>
        <CardTitle>{moim.title}</CardTitle>
        <CardMeta>
          <CategoryBadge>{categoryLabel}</CategoryBadge>
          <MemberCount>최대 {moim.maxMembers}명</MemberCount>
        </CardMeta>
        <CardLocation>
          <LocationBadge onlineType={moim.onlineType}>
            {moim.onlineType === "online" ? "온라인" : "오프라인"}
          </LocationBadge>
          {moim.onlineType === "offline" && moim.location && (
            <LocationText>{moim.location}</LocationText>
          )}
        </CardLocation>
        <CardDescription>{truncatedDescription}</CardDescription>
        <CardTags>
          {displayTags.map((tag, index) => (
            <CardTag key={index}>#{tag}</CardTag>
          ))}
        </CardTags>
      </CardContent>
    </StyledCard>
  );
};

export default Card;
