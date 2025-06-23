import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../utils/ThemeContext";

const TABS = [
  { key: "created", label: "내가 만든 모임" },
  { key: "joined", label: "참여한 모임" },
];

const mockProfile = {
  name: "올리비아 베넷",
  email: "olivia.bennett@email.com",
  joined: "2023-01-15",
  about:
    "여행과 맛집 탐방을 좋아하는 모험가입니다. 새로운 사람들과 문화를 경험하는 것을 즐깁니다. 여가 시간에는 등산, 독서, 요리하기를 좋아합니다.",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDYhudJVFm4j1jvaC3VWtkGNFmVFgvExkuGOiCq6wb6n7E4J9xxEqElvphiAZC0gj5eBA_7iZgjBRvQo-9Gxw8JoY_kWlISZJ50bITlmXdYj57pGxsbk6KKMfELeMhLrns-rtFui-xzTQShRZX3NVMfl7dfHr6tUYvsvy_alUFaMe6a3euW23fOmmrjFpi3shfKFXu-nkXQNxR7dsB2s_X6eCXyewLkF_HPECgXPDn2yaaxF-BZRZzDxExVJeWp_v0pylmwt9R_2g",
};

const mockGatherings = [
  {
    status: "모집중",
    title: "주말 산행 모임",
    desc: "아름다운 산길을 함께 걷고 멋진 풍경을 감상해요. 모든 레벨 환영!",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCQcuL7lQGhAgCk9Ee53PjZoCZpD8abAcd7nVjumMVzQM0Az-MG0R41CRKmzHGYKLqiyF6zRFd0w6bQY4N7kQOq8QvZP6Romsvpz8SK9gv44-taJipVN_x-cIu_A-nBMTpkQDSgT0tjypgWtpuVdF70pd79B9kEXH0fiF3YYSWeeJ7K8NTPN1Z31SuEnDRsrOBruoy02yomuuzr3S-wjnskP2A_pc0TKPaIw4qNX_J8Z0Z32X5UbBVktjGfpkgnk4FWXSPDopG8Q",
  },
  {
    status: "모집중",
    title: "이탈리안 요리 클래스",
    desc: "셰프와 함께 이탈리안 요리를 배우고 직접 만든 파스타를 맛보세요.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqFY_7K2T64UIjWK-DImGxQwn5iOvpUQzRXkxmUT_oqR5vdhMIIi-FnoAgNNd2OIiVlgFHXDsOj7ALZx5etDJwt9hzPxRmn4_GsGE0BnXvZ3kpSGrG3x3Amv0cQAGKfP0lXq2Z4JyMxYQzc4YmpRHLQ6DQL14cmlp0Ayk3iP7MAEbRUXxdOFUIE-YE4V0qZCYuNJ773tPAsBfs7tYrrhAc2hzuauvz4t300w6arSK763u4_1COOLCSDDS00u-Pm1nWgpon9BiXcg",
  },
  {
    status: "완료",
    title: "북클럽: '비밀의 화원'",
    desc: "'비밀의 화원'을 읽고 자유롭게 이야기를 나누는 시간입니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLeB3yIWAxZUD8WqICGsTB6zD_zsve8SlnKR0d9KXEd2uWumx8Au6_bxVagSP6bTTeDsmD8f0svIb6TKXTAaSR4BIubi0MlPs2e0CK6mu-HY43F5aVjZm489uIVz5mBFRIkSxDvstc5dxBd6r82MTrPXJakhWAtNx7wYP5g5_RHCYEMKZLRfawRnh62Y-vzEgvnujsCosEV7LdajiTjAEbfS17zfWoyRD8f0zQlGOuxpDhXEa0VWZnuF2hc8IQZXOjvCQwgVZg0Q",
  },
];

const MyPage = () => {
  const { theme } = useTheme();
  const [tab, setTab] = useState("created");

  return (
    <>
      <Header />
      <PageContainer theme={theme}>
        <ProfileSection>
          <ProfileLeft>
            <Avatar
              style={{ backgroundImage: `url(${mockProfile.avatar})` }}
              theme={theme}
            />
            <ProfileInfo>
              <ProfileName theme={theme}>{mockProfile.name}</ProfileName>
              <ProfileEmail theme={theme}>{mockProfile.email}</ProfileEmail>
              <ProfileJoined theme={theme}>
                Joined on {mockProfile.joined}
              </ProfileJoined>
            </ProfileInfo>
          </ProfileLeft>
          <EditButton theme={theme}>프로필 수정</EditButton>
        </ProfileSection>
        <AboutSection>
          <AboutTitle theme={theme}>About Me</AboutTitle>
          <AboutDesc theme={theme}>{mockProfile.about}</AboutDesc>
        </AboutSection>
        <TabBar theme={theme}>
          {TABS.map((t) => (
            <TabItem
              key={t.key}
              $active={tab === t.key}
              onClick={() => setTab(t.key)}
              theme={theme}
            >
              {t.label}
            </TabItem>
          ))}
        </TabBar>
        <GatheringList>
          {mockGatherings.map((g, i) => (
            <GatheringCard key={i} theme={theme}>
              <GatheringImage style={{ backgroundImage: `url(${g.image})` }} />
              <GatheringInfo>
                <GatheringStatus theme={theme}>{g.status}</GatheringStatus>
                <GatheringTitle theme={theme}>{g.title}</GatheringTitle>
                <GatheringDesc theme={theme}>{g.desc}</GatheringDesc>
              </GatheringInfo>
            </GatheringCard>
          ))}
        </GatheringList>
        <SectionTitle theme={theme}>Account Settings</SectionTitle>
        <SettingList>
          <SettingItem theme={theme}>
            <SettingText theme={theme}>Change Password</SettingText>
            <SettingIcon theme={theme}>
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
              </svg>
            </SettingIcon>
          </SettingItem>
          <SettingItem theme={theme}>
            <SettingText theme={theme}>Delete Account</SettingText>
            <SettingIcon theme={theme}>
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
              </svg>
            </SettingIcon>
          </SettingItem>
        </SettingList>
      </PageContainer>
      <Footer />
    </>
  );
};

export default MyPage;

// styled-components
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 40px 0;
  transition: background-color 0.3s ease;
`;

const ProfileSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 960px;
  padding: 40px 0 0 0;
  gap: 32px;
`;

const ProfileLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Avatar = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.surfaceSecondary};
  transition: background-color 0.3s ease;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProfileName = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
  transition: color 0.3s ease;
`;

const ProfileEmail = styled.p`
  color: ${(props) => props.theme.textSecondary};
  font-size: 16px;
  margin: 0;
  transition: color 0.3s ease;
`;

const ProfileJoined = styled.p`
  color: ${(props) => props.theme.textSecondary};
  font-size: 16px;
  margin: 0;
  transition: color 0.3s ease;
`;

const EditButton = styled.button`
  background: ${(props) => props.theme.surfaceSecondary};
  color: ${(props) => props.theme.textPrimary};
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 999px;
  padding: 0 32px;
  height: 40px;
  cursor: pointer;
  min-width: 84px;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.borderLight};
  }
`;

const AboutSection = styled.section`
  width: 100%;
  max-width: 960px;
  padding: 0 0 0 0;
`;

const AboutTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.textPrimary};
  margin: 32px 0 0 0;
  padding: 0 0 8px 0;
  transition: color 0.3s ease;
`;

const AboutDesc = styled.p`
  color: ${(props) => props.theme.textSecondary};
  font-size: 15px;
  margin: 0 0 16px 0;
  transition: color 0.3s ease;
`;

const TabBar = styled.div`
  display: flex;
  gap: 32px;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
  width: 100%;
  max-width: 960px;
  margin: 0 0 16px 0;
  transition: border-color 0.3s ease;
`;

const TabItem = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  font-weight: bold;
  color: ${({ $active, theme }) =>
    $active ? theme.textPrimary : theme.textSecondary};
  border-bottom: 3px solid
    ${({ $active, theme }) => ($active ? theme.buttonPrimary : "transparent")};
  padding: 16px 0 13px 0;
  cursor: pointer;
  transition: all 0.15s;
`;

const GatheringList = styled.div`
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

const GatheringCard = styled.div`
  display: flex;
  gap: 16px;
  background: ${(props) => props.theme.surface};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.cardShadow};
  align-items: stretch;
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const GatheringInfo = styled.div`
  flex: 2 2 0px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 0 18px 24px;
`;

const GatheringStatus = styled.p`
  color: ${(props) => props.theme.textSecondary};
  font-size: 15px;
  margin: 0;
  transition: color 0.3s ease;
`;

const GatheringTitle = styled.p`
  color: ${(props) => props.theme.textPrimary};
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  transition: color 0.3s ease;
`;

const GatheringDesc = styled.p`
  color: ${(props) => props.theme.textSecondary};
  font-size: 15px;
  margin: 0;
  transition: color 0.3s ease;
`;

const GatheringImage = styled.div`
  flex: 1 1 0px;
  min-width: 180px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  aspect-ratio: 16/9;
  border-radius: 0 16px 16px 0;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.textPrimary};
  margin: 32px 0 8px 0;
  padding: 0 0 8px 0;
  transition: color 0.3s ease;
`;

const SettingList = styled.div`
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: ${(props) => props.theme.surfaceSecondary};
  border-radius: 12px;
  padding: 0 16px;
  min-height: 56px;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const SettingText = styled.p`
  color: ${(props) => props.theme.textPrimary};
  font-size: 16px;
  margin: 0;
  flex: 1 1 0px;
  font-weight: normal;
  transition: color 0.3s ease;
`;

const SettingIcon = styled.div`
  color: ${(props) => props.theme.textPrimary};
  display: flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
`;
