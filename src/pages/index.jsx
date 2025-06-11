import React from "react";
import styled, { keyframes } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useState } from "react";
import Modal from "../components/Modal";

const MoimMainPage = () => {
  const [selectedMoim, setSelectedMoim] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recommendedMoims = [
    {
      id: 1,
      title: "스크럼 플러스 모임",
      description: "스크럼과 함께 성장하는 개발자들의 모임",
      image: "/img1.jpg",
      creator: {
        name: "홍길동",
        profileImage: "/user1.jpg",
        createdAt: "2024-06-01",
      },
      members: 12,
      maxMembers: 20,
      tags: ["개발", "스크럼"],
      onlineType: "online",
      location: "온라인(Zoom)",
    },
    {
      id: 2,
      title: "웹앱 개발 모임",
      description: "웹과 앱을 아우르는 사이드프로젝트 모임",
      image: "/img2.jpg",
      onlineType: "offline",
      location: "서울 강남구 카페",
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
                <Button
                  href="/moim-create"
                  variant="primary"
                  style={{
                    transition: "all 0.15s",
                    border: "1.5px solid #111827",
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#111827";
                    e.currentTarget.style.border = "1.5px solid #111827";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = "#111827";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.border = "1.5px solid #111827";
                  }}
                >
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedMoim && (
          <ModalCard>
            <ModalImage src={selectedMoim.image} alt={selectedMoim.title} />
            <ModalCloseBtn onClick={closeModal}>&times;</ModalCloseBtn>
            <ModalInner>
              <ModalTitle>{selectedMoim.title}</ModalTitle>
              <ModalDesc>{selectedMoim.description}</ModalDesc>
              <ModalDivider />
              <ModalInfoList>
                <ModalInfoRow>
                  <ModalInfoLabel>모임 형태</ModalInfoLabel>
                  <span>{selectedMoim.onlineType === "online" ? "온라인" : "오프라인"}</span>
                  {selectedMoim.location && <><ModalInfoLabel>위치</ModalInfoLabel><span>{selectedMoim.location}</span></>}
                </ModalInfoRow>
                {selectedMoim.creator && (
                  <ModalInfoRow>
                    <ModalCreator>
                      <ModalCreatorImg src={selectedMoim.creator.profileImage} alt={selectedMoim.creator.name} />
                      <span>개설자: <b>{selectedMoim.creator.name}</b></span>
                      <span style={{ fontSize: "12px", color: "#888", marginLeft: 6 }}>{selectedMoim.creator.createdAt} 생성</span>
                    </ModalCreator>
                  </ModalInfoRow>
                )}
                {selectedMoim.members && selectedMoim.maxMembers && (
                  <ModalInfoRow>
                    <ModalInfoLabel>참여 인원</ModalInfoLabel>
                    <span>{selectedMoim.members} / {selectedMoim.maxMembers}</span>
                  </ModalInfoRow>
                )}
              </ModalInfoList>
              {selectedMoim.tags && selectedMoim.tags.length > 0 && (
                <ModalTagList>
                  {selectedMoim.tags.map((tag, index) => (
                    <ModalTag key={index}>#{tag}</ModalTag>
                  ))}
                </ModalTagList>
              )}
              <ModalBtnGroup>
                <Button variant="primary" fullWidth>참여하기</Button>
                <Button variant="secondary" fullWidth>문의하기</Button>
              </ModalBtnGroup>
            </ModalInner>
          </ModalCard>
        )}
      </Modal>
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

const ModalCard = styled.div`
  max-width: 540px;
  width: 92vw;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  overflow: hidden;
  position: relative;
  animation: ${keyframes`
    0% { transform: translateY(40px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  `} 0.4s cubic-bezier(0.23, 1, 0.32, 1);
`;

const ModalImage = styled.img`
  width: 100%;
  height: 210px;
  object-fit: cover;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  display: block;
`;

const ModalInner = styled.div`
  padding: 32px 28px 24px 28px;
  @media (max-width: 600px) {
    padding: 18px 8px 16px 8px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 8px;
  color: #1a2233;
`;

const ModalDesc = styled.p`
  color: #444;
  font-size: 1.08rem;
  margin-bottom: 18px;
`;

const ModalDivider = styled.hr`
  border: none;
  border-top: 1px solid #ececec;
  margin: 18px 0 18px 0;
`;

const ModalInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 1rem;
  color: #222;
`;

const ModalInfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  align-items: center;
`;

const ModalInfoLabel = styled.span`
  font-weight: 600;
  color: #1a2233;
  min-width: 70px;
`;

const ModalCreator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.98rem;
  color: #444;
  margin-bottom: 2px;
`;

const ModalCreatorImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
`;

const ModalTagList = styled.div`
  margin-top: 10px;
  margin-bottom: 8px;
`;

const ModalTag = styled.span`
  display: inline-block;
  background: #f3f4f6;
  color: #374151;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 13px;
  margin-right: 8px;
  margin-bottom: 4px;
`;

const ModalBtnGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 28px;
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
  z-index: 2;
`;