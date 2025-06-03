import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const StyledMoimMainPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  background-color: #ffffff;
`;

const HeroSection = styled.section`
  background-color: #f8f9fa;
  padding: 80px 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 60px;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroText = styled.div`
  flex: 1;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
  line-height: 1.2;
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  color: #6b7280;
  margin-bottom: 32px;
`;

const HeroImage = styled.div`
  flex: 1;
  img {
    width: 100%;
    max-width: 500px;
    height: auto;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
  text-decoration: none;

  ${({ primary }) =>
    primary &&
    `
    background-color: #f8fafc;
    color: #2563eb;
    border: 2px solid #2563eb;
    &:hover {
      background-color: #64748b;
      color: white;
      border-color: #64748b;
    }
  `}

  ${({ secondary }) =>
    secondary &&
    `
    background-color: #2563eb;
    color: white;
    border: 2px solid #2563eb;
    &:hover {
      filter: brightness(0.9);
    }
  `}
`;

const ContentSection = styled.section`
  padding: 80px 0;
`;

const SectionContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

const MoimGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 32px;
`;

const MoimCard = styled.a`
  display: block;
  text-decoration: none;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
`;

const MoimMainPage = () => {
  const recommendedMoims = [
    {
      id: 1,
      title: "스크럼 플러스 모임",
      description: "스크럼과 함께 성장하는 개발자들의 모임",
      image: "/img1.jpg",
    },
    {
      id: 2,
      title: "웹앱 개발 모임",
      description: "웹과 앱을 아우르는 사이드프로젝트 모임",
      image: "/img2.jpg",
    },
    {
      id: 3,
      title: "어반 플레이팅 모임",
      description: "감각적인 플레이팅을 위한 모든 것",
      image: "/img3.jpg",
    },
    {
      id: 4,
      title: "북클럽 모임",
      description: "함께 읽고 토론하는 독서 모임",
      image: "/img4.jpg",
    },
    {
      id: 5,
      title: "축구 동호회",
      description: "주말 축구로 건강한 삶을",
      image: "/img5.jpg",
    },
    {
      id: 6,
      title: "바이크 라이딩",
      description: "자전거와 함께하는 새로운 도전",
      image: "/img6.jpg",
    },
    {
      id: 7,
      title: "아트 스터디",
      description: "예술을 사랑하는 사람들의 모임",
      image: "/img7.jpg",
    },
    {
      id: 8,
      title: "올리브오일 테이스팅",
      description: "올리브오일의 세계로 초대합니다",
      image: "/img8.jpg",
    },
  ];

  return (
    <StyledMoimMainPage>
      <Header />

      <MainContent>
        <HeroSection>
          <HeroContent>
            <HeroText>
              <HeroTitle>함께 성장하는 모임 플랫폼, MoimLog</HeroTitle>
              <HeroSubtitle>
                지금 바로 관심 있는 모임을 찾아보세요!
              </HeroSubtitle>
              <ButtonGroup>
                <Button href="/moims" secondary>
                  모임 둘러보기
                </Button>
                <Button href="/create" primary>
                  모임 만들기
                </Button>
              </ButtonGroup>
            </HeroText>
            <HeroImage>
              <img src="/img9.jpg" alt="모임 이미지" />
            </HeroImage>
          </HeroContent>
        </HeroSection>

        <ContentSection>
          <SectionContent>
            <SectionHeader>
              <SectionTitle>추천/인기 모임 리스트</SectionTitle>
            </SectionHeader>
            <MoimGrid>
              {recommendedMoims.map((moim) => (
                <MoimCard key={moim.id} href={`/moim/${moim.id}`}>
                  <CardImage src={moim.image} alt={moim.title} />
                  <CardContent>
                    <CardTitle>{moim.title}</CardTitle>
                    <CardDescription>{moim.description}</CardDescription>
                  </CardContent>
                </MoimCard>
              ))}
            </MoimGrid>
          </SectionContent>
        </ContentSection>
      </MainContent>

      <Footer />
    </StyledMoimMainPage>
  );
};

export default MoimMainPage;
