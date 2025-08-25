import React from "react";
import styled, { keyframes } from "styled-components";
import { useStore } from "../stores/useStore";

const SkeletonCard = () => {
  const { theme } = useStore();
  return (
    <CardContainer theme={theme}>
      {/* 이미지 스켈레톤 */}
      <ImageSkeleton />
      
      <ContentContainer>
        {/* 제목 스켈레톤 */}
        <TitleSkeleton />
        
        {/* 메타 정보 스켈레톤 */}
        <MetaContainer>
          <BadgeSkeleton />
          <BadgeSkeleton />
        </MetaContainer>
        
        {/* 위치 정보 스켈레톤 */}
        <LocationContainer>
          <BadgeSkeleton />
          <TextSkeleton width="60%" />
        </LocationContainer>
        
        {/* 설명 스켈레톤 */}
        <DescriptionSkeleton />
        
        {/* 태그 스켈레톤 */}
        <TagsContainer>
          <TagSkeleton />
          <TagSkeleton />
          <TagSkeleton />
        </TagsContainer>
      </ContentContainer>
    </CardContainer>
  );
};

export default SkeletonCard;

// 애니메이션
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// 스타일 컴포넌트
const CardContainer = styled.div`
  background: ${(props) => props.theme?.cardBackground || '#ffffff'};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${(props) => props.theme?.borderLight || '#e5e7eb'};
`;

const ImageSkeleton = styled.div`
  width: 100%;
  height: 160px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const ContentContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TitleSkeleton = styled.div`
  height: 24px;
  width: 80%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const MetaContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const BadgeSkeleton = styled.div`
  height: 20px;
  width: 60px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 20px;
`;

const TextSkeleton = styled.div`
  height: 16px;
  width: ${props => props.width || '40%'};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const DescriptionSkeleton = styled.div`
  height: 16px;
  width: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const TagSkeleton = styled.div`
  height: 20px;
  width: 40px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 20px;
`;
