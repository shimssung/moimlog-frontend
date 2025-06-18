import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useState } from "react";
import MoimDetailModal from "../components/MoimDetailModal";

const MoimMainPage = () => {
  const [selectedMoim, setSelectedMoim] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recommendedMoims = [
    {
      id: 1,
      title: "스크럼 플러스 모임",
      description: "스크럼과 함께 성장하는 개발자들의 모임입니다. 매주 스크럼 방법론을 학습하고 실제 프로젝트에 적용해보며 함께 성장하는 시간을 가집니다. 초보자부터 경험자까지 모두 환영합니다!",
      image: "/img1.jpg",
      creator: {
        name: "홍길동",
        profileImage: "/user1.jpg",
        createdAt: "2024-06-01",
      },
      members: 12,
      maxMembers: 20,
      tags: ["개발", "스크럼", "프로젝트"],
      onlineType: "online",
      location: "온라인(Zoom)",
      organizer: "홍길동",
      attendees: [
        { name: "Alice", image: "/profile1.jpg" },
        { name: "Bob", image: "/profile2.jpg" },
        { name: "Carol", image: "/profile3.jpg" },
        { name: "David", image: "/profile4.jpg" },
        { name: "Eve", image: "/profile5.jpg" },
      ],
      rules: [
        "매주 정기 모임 참여 필수",
        "스크럼 관련 자료 사전 학습",
        "적극적인 토론 참여",
        "서로를 존중하는 마음가짐",
      ],
      nextEvent: {
        title: "스크럼 스프린트 계획 회의",
        date: "2024-12-20T14:00:00",
      },
    },
    {
      id: 2,
      title: "웹앱 개발 모임",
      description: "웹과 앱을 아우르는 사이드프로젝트 모임입니다. 아이디어부터 출시까지 함께 만들어가는 과정을 경험해보세요. 다양한 기술 스택을 다루며 실무 경험을 쌓을 수 있습니다.",
      image: "/img2.jpg",
      onlineType: "offline",
      location: "서울 강남구 카페",
      organizer: "김개발",
      attendees: [
        { name: "Frank", image: "/profile6.jpg" },
        { name: "Grace", image: "/profile7.jpg" },
        { name: "Henry", image: "/profile8.jpg" },
      ],
      rules: [
        "프로젝트 기여도 유지",
        "코드 리뷰 적극 참여",
        "정기 데모 발표",
      ],
      nextEvent: {
        title: "프로젝트 데모 데이",
        date: "2024-12-25T19:00:00",
      },
    },
    {
      id: 3,
      title: "어반 플레이팅 모임",
      description: "감각적인 플레이팅을 위한 모든 것을 배우는 모임입니다. 음식의 예술적 표현과 창의적인 접시 디자인을 함께 탐구해보세요.",
      image: "/img3.jpg",
      organizer: "박요리",
      attendees: [
        { name: "Ivy", image: "/profile9.jpg" },
        { name: "Jack", image: "/profile10.jpg" },
      ],
      rules: [
        "매월 플레이팅 실습 참여",
        "사진 촬영 및 공유",
        "창의적인 아이디어 제안",
      ],
    },
    {
      id: 4,
      title: "북클럽 모임",
      description: "함께 읽고 토론하는 독서 모임입니다. 매월 한 권의 책을 선정하여 깊이 있는 독서와 의미 있는 대화를 나눕니다.",
      image: "/img4.jpg",
      organizer: "이독서",
      attendees: [
        { name: "Kate", image: "/profile11.jpg" },
        { name: "Leo", image: "/profile12.jpg" },
        { name: "Mia", image: "/profile13.jpg" },
        { name: "Noah", image: "/profile14.jpg" },
      ],
      rules: [
        "매월 선정 도서 완독",
        "토론 참여 필수",
        "다양한 관점 존중",
      ],
      nextEvent: {
        title: "12월 독서 토론회",
        date: "2024-12-28T15:00:00",
      },
    },
    {
      id: 5,
      title: "축구 동호회",
      description: "주말 축구로 건강한 삶을 만들어가는 동호회입니다. 실력에 관계없이 축구를 사랑하는 분들이 모여 즐겁게 뛰는 시간을 가집니다.",
      image: "/img5.jpg",
      organizer: "최축구",
      attendees: [
        { name: "Oscar", image: "/profile15.jpg" },
        { name: "Paul", image: "/profile16.jpg" },
        { name: "Quinn", image: "/profile17.jpg" },
      ],
      rules: [
        "정기 참여 권장",
        "팀워크 중시",
        "부상 예방 주의",
      ],
    },
    {
      id: 6,
      title: "바이크 라이딩",
      description: "자전거와 함께하는 새로운 도전을 시작해보세요. 도시 탐방부터 장거리 라이딩까지 다양한 코스를 함께 즐깁니다.",
      image: "/img6.jpg",
      organizer: "정라이딩",
      attendees: [
        { name: "Ruby", image: "/profile18.jpg" },
        { name: "Sam", image: "/profile19.jpg" },
      ],
      rules: [
        "안전 장비 착용 필수",
        "코스 난이도 확인",
        "서로 배려하며 라이딩",
      ],
    },
    {
      id: 7,
      title: "아트 스터디",
      description: "예술을 사랑하는 사람들의 모임입니다. 다양한 예술 작품을 감상하고 창작 활동을 통해 예술적 감성을 키워갑니다.",
      image: "/img7.jpg",
      organizer: "한아트",
      attendees: [
        { name: "Tom", image: "/profile20.jpg" },
        { name: "Uma", image: "/profile21.jpg" },
        { name: "Vera", image: "/profile22.jpg" },
      ],
      rules: [
        "정기 전시회 관람",
        "창작 활동 공유",
        "예술적 감상 능력 향상",
      ],
    },
    {
      id: 8,
      title: "올리브오일 테이스팅",
      description: "올리브오일의 세계로 초대합니다. 다양한 지역의 올리브오일을 맛보고 그 특성과 활용법을 함께 배워봅니다.",
      image: "/img8.jpg",
      organizer: "윤테이스팅",
      attendees: [
        { name: "Wendy", image: "/profile23.jpg" },
        { name: "Xander", image: "/profile24.jpg" },
      ],
      rules: [
        "테이스팅 참여 필수",
        "맛과 향 기록",
        "요리 활용법 공유",
      ],
    },
  ];

  const openModal = (moim) => {
    setSelectedMoim(moim);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMoim(null);
  };

  return (
    <StyledMoimMainPage>
      <Header />
      <MainContent>
        <HeroSection>
          <HeroContent>
            <HeroText>
              <HeroTitle>함께 성장하는 모임 플랫폼</HeroTitle>
              <HeroTitle>MoimLog</HeroTitle>
              <HeroSubtitle>
                지금 바로 관심 있는 모임을 찾아보세요!
              </HeroSubtitle>
              <ButtonGroup>
                <Button href="/moim-list" variant="secondary">
                  모임 둘러보기
                </Button>
                <Button href="/moim-create" variant="primary">
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
              <SectionTitle>추천 모임</SectionTitle>
            </SectionHeader>
            <MoimGrid>
              {recommendedMoims.map((moim) => (
                <MoimCard key={moim.id} onClick={() => openModal(moim)}>
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
      <MoimDetailModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        moim={selectedMoim} 
      />
    </StyledMoimMainPage>
  );
};

export default MoimMainPage;

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
