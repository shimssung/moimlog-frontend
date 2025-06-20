import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useState } from "react";
import MoimDetailModal from "../components/MoimDetailModal";
import Card from "../components/Card";
import { mockMoims } from "../utils/mockData";

const MoimMainPage = () => {
  const [selectedMoim, setSelectedMoim] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 추천 모임 (처음 8개만 표시)
  const recommendedMoims = mockMoims.slice(0, 8);

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
                <CardWrapper key={moim.id} onClick={() => openModal(moim)}>
                  <Card moim={moim} />
                </CardWrapper>
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

const CardWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;
