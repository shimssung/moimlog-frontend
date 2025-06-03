import React from "react";
import styled from "styled-components";

const StyledDivWrapperByAnima = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 24px;
  padding: 0 16px;
  position: relative;
  width: 100%;
`;

const StyledCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;
`;

const StyledCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 8px;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  p {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
`;

const DivWrapperByAnima = () => {
  const recommendedMoims = [
    {
      id: 1,
      title: "프론트엔드 개발 스터디",
      description: "React, Vue.js 등 프론트엔드 기술 학습",
      image: "/img5.jpg",
    },
    {
      id: 2,
      title: "알고리즘 문제 풀이",
      description: "코딩 테스트 대비 알고리즘 스터디",
      image: "/img6.jpg",
    },
    {
      id: 3,
      title: "디자인 시스템 연구",
      description: "UI/UX 디자인 시스템 구축 방법론",
      image: "/img7.jpg",
    },
    {
      id: 4,
      title: "백엔드 개발 모임",
      description: "Spring, Node.js 서버 개발 학습",
      image: "/img8.jpg",
    },
  ];

  return (
    <StyledDivWrapperByAnima>
      <StyledCardGrid>
        {recommendedMoims.map((moim) => (
          <StyledCard key={moim.id}>
            <img src={moim.image} alt={moim.title} />
            <h3>{moim.title}</h3>
            <p>{moim.description}</p>
          </StyledCard>
        ))}
      </StyledCardGrid>
    </StyledDivWrapperByAnima>
  );
};

export default DivWrapperByAnima;
