import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useState } from "react";
import MoimDetailModal from "../components/MoimDetailModal";
import Card from "../components/Card";
import { useStore } from "../stores/useStore";
import { mockMoims } from "../utils/mockData";

const MoimMainPage = () => {
  const { theme } = useStore();
  const [selectedMoim, setSelectedMoim] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 추천 모임 (처음 8개만 표시)
  const recommendedMoims = mockMoims.slice(0, 8);

  const handleCardClick = (moim) => {
    setSelectedMoim(moim);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMoim(null);
  };

  return (
    <StyledMoimMainPage theme={theme}>
      <Header />
      <MainContent theme={theme}>
        <HeroSection theme={theme}>
          <HeroContent>
            <HeroText>
              <HeroTitle theme={theme}>함께 성장하는 모임 플랫폼</HeroTitle>
              <HeroTitle theme={theme}>MoimLog</HeroTitle>
              <HeroSubtitle theme={theme}>
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
              <SectionTitle theme={theme}>추천 모임</SectionTitle>
            </SectionHeader>
            <MoimGrid>
              {recommendedMoims.map((moim) => (
                <CardWrapper
                  key={moim.id}
                  onClick={() => handleCardClick(moim)}
                >
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
  background-color: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const HeroSection = styled.section`
  background-color: ${(props) => props.theme.surface};
  padding: 80px 0;
  text-align: center;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
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
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 24px;
  line-height: 1.2;
  transition: color 0.3s ease;
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 32px;
  transition: color 0.3s ease;
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
  background-color: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const SectionContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const SectionHeader = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 8px;
  transition: color 0.3s ease;
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

const TestButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const TestButton = styled.button`
  background: ${(props) => props.theme.buttonPrimary};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.buttonHover};
  }
`;
