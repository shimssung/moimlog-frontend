import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useTheme } from "../utils/ThemeContext";
import { useRouter } from "next/router";

const TABS = [
  { key: "all", label: "전체 모임" },
  { key: "created", label: "내가 만든 모임" },
  { key: "joined", label: "참여한 모임" },
  { key: "favorites", label: "즐겨찾기" },
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

// my-moims.jsx의 상세 모임 데이터
const myMoims = [
  {
    id: 1,
    title: "북클럽: 시크릿 가든",
    image: "/img4.jpg",
    category: "독서",
    nextEvent: {
      title: "북클럽 정기모임",
      date: "2024-03-20T14:00:00",
      location: "중앙 도서관 3층 세미나실",
    },
    newMessages: 5,
    newPosts: 2,
    members: 12,
    maxMembers: 20,
    role: "운영자",
    onlineType: "offline",
    location: "서울시 강남구",
  },
  {
    id: 2,
    title: "웹앱 개발 모임",
    image: "/img2.jpg",
    category: "개발",
    nextEvent: {
      title: "프로젝트 데모 데이",
      date: "2024-03-25T19:00:00",
      location: "온라인(Zoom)",
    },
    newMessages: 3,
    newPosts: 1,
    members: 8,
    maxMembers: 15,
    role: "멤버",
    onlineType: "online",
    location: "",
  },
  {
    id: 3,
    title: "어반 플레이팅 모임",
    image: "/img3.jpg",
    category: "요리",
    nextEvent: null,
    newMessages: 0,
    newPosts: 0,
    members: 6,
    maxMembers: 12,
    role: "멤버",
    onlineType: "offline",
    location: "서울시 마포구",
  },
  {
    id: 4,
    title: "주말 축구 동호회",
    image: "/img5.jpg",
    category: "스포츠",
    nextEvent: {
      title: "정기 축구 경기",
      date: "2024-03-23T09:00:00",
      location: "올림픽공원 축구장",
    },
    newMessages: 8,
    newPosts: 3,
    members: 18,
    maxMembers: 22,
    role: "멤버",
    onlineType: "offline",
    location: "서울시 송파구",
  },
  {
    id: 5,
    title: "아트 스터디 그룹",
    image: "/img7.jpg",
    category: "예술",
    nextEvent: {
      title: "전시회 관람",
      date: "2024-03-28T15:00:00",
      location: "국립현대미술관",
    },
    newMessages: 2,
    newPosts: 1,
    members: 9,
    maxMembers: 15,
    role: "운영자",
    onlineType: "offline",
    location: "서울시 종로구",
  },
  {
    id: 6,
    title: "재즈 음악 애호가",
    image: "/img6.jpg",
    category: "음악",
    nextEvent: {
      title: "재즈 클럽 나이트",
      date: "2024-03-22T20:00:00",
      location: "블루노트 재즈클럽",
    },
    newMessages: 4,
    newPosts: 0,
    members: 11,
    maxMembers: 18,
    role: "멤버",
    onlineType: "offline",
    location: "서울시 용산구",
  },
];

const MyPage = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [tab, setTab] = useState("all");

  const handleSettingsClick = () => {
    router.push("/settings");
  };

  const handleCardClick = (moimId) => {
    router.push(`/moim/${moimId}/chat`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 필터링된 모임
  const filteredMoims = myMoims.filter((moim) => {
    if (tab === "created") return moim.role === "운영자";
    if (tab === "joined") return moim.role === "멤버";
    if (tab === "favorites") return moim.favorite; // 즐겨찾기 기능은 나중에 구현
    return true; // 전체 모임
  });

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
          <SettingsButton onClick={handleSettingsClick} theme={theme}>
            <SettingsIcon theme={theme} />
          </SettingsButton>
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

        <MoimGrid>
          {filteredMoims.map((moim) => (
            <MoimCard
              key={moim.id}
              onClick={() => handleCardClick(moim.id)}
              theme={theme}
            >
              <CardImage src={moim.image} alt={moim.title} />
              <CardContent>
                <CardHeader>
                  <CardTitle theme={theme}>{moim.title}</CardTitle>
                  <CategoryTag theme={theme}>{moim.category}</CategoryTag>
                </CardHeader>

                <CardInfo>
                  <InfoItem>
                    <InfoIcon>👥</InfoIcon>
                    <InfoText theme={theme}>
                      {moim.members}/{moim.maxMembers}명
                    </InfoText>
                  </InfoItem>
                  <InfoItem>
                    <InfoIcon>🏷️</InfoIcon>
                    <OnlineStatusBadge
                      onlineType={moim.onlineType}
                      theme={theme}
                    >
                      {moim.onlineType === "online" ? "온라인" : "오프라인"}
                    </OnlineStatusBadge>
                  </InfoItem>
                </CardInfo>

                {moim.onlineType === "offline" && moim.location && (
                  <LocationInfo>
                    <LocationIcon>📍</LocationIcon>
                    <LocationText theme={theme}>{moim.location}</LocationText>
                  </LocationInfo>
                )}

                {moim.nextEvent && (
                  <NextEvent theme={theme}>
                    <EventIcon>📅</EventIcon>
                    <EventInfo>
                      <EventTitle theme={theme}>
                        {moim.nextEvent.title}
                      </EventTitle>
                      <EventDate>{formatDate(moim.nextEvent.date)}</EventDate>
                      <EventLocation theme={theme}>
                        {moim.nextEvent.location}
                      </EventLocation>
                    </EventInfo>
                  </NextEvent>
                )}

                <ActivityInfo>
                  {(moim.newMessages > 0 || moim.newPosts > 0) && (
                    <>
                      {moim.newMessages > 0 && (
                        <ActivityItem>
                          <ActivityIcon>💬</ActivityIcon>
                          <ActivityText>
                            새 메시지 {moim.newMessages}개
                          </ActivityText>
                        </ActivityItem>
                      )}
                      {moim.newPosts > 0 && (
                        <ActivityItem>
                          <ActivityIcon>📝</ActivityIcon>
                          <ActivityText>
                            새 게시글 {moim.newPosts}개
                          </ActivityText>
                        </ActivityItem>
                      )}
                    </>
                  )}
                </ActivityInfo>
              </CardContent>
            </MoimCard>
          ))}
        </MoimGrid>

        {filteredMoims.length === 0 && (
          <EmptyState>
            <EmptyIcon>🤝</EmptyIcon>
            <EmptyTitle theme={theme}>
              {tab === "all" && "아직 참여한 모임이 없어요"}
              {tab === "created" && "아직 만든 모임이 없어요"}
              {tab === "joined" && "아직 참여한 모임이 없어요"}
              {tab === "favorites" && "즐겨찾기한 모임이 없어요"}
            </EmptyTitle>
            <EmptyText theme={theme}>
              {tab === "favorites"
                ? "관심 있는 모임을 즐겨찾기에 추가해보세요!"
                : "새로운 모임에 참여해보세요!"}
            </EmptyText>
            <Button href="/moim-list" variant="primary">
              모임 찾아보기
            </Button>
          </EmptyState>
        )}
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
  background-size: cover; // cover: 배경 이미지를 요소의 너비와 높이에 맞게 조절
  background-position: center; /* 배경 이미지 위치 조절 */
  background-repeat: no-repeat; /* 배경 이미지 반복 방지 */
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

const SettingsButton = styled.button`
  background: ${(props) => props.theme.buttonSecondary};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${(props) => props.theme.textSecondary};

  &:hover {
    background: ${(props) => props.theme.borderLight};
    border-color: ${(props) => props.theme.border};
    transform: scale(1.05);
  }
`;

const SettingsIcon = ({ theme }) => (
  <svg
    width="20"
    height="20"
    fill="none"
    stroke={theme.textSecondary}
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

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

const MoimGrid = styled.div`
  width: 100%;
  max-width: 960px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const MoimCard = styled.div`
  background: ${(props) => props.theme.surface};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.cardShadow};
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
  flex: 1;
`;

const CategoryTag = styled.span`
  background: ${(props) => props.theme.buttonPrimary};
  color: white;
  padding: 3px 6px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
`;

const CardInfo = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const InfoIcon = styled.span`
  font-size: 12px;
`;

const InfoText = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.textSecondary};
`;

const OnlineStatusBadge = styled.span`
  background: ${(props) =>
    props.onlineType === "online" ? props.theme.success : props.theme.warning};
  color: white;
  padding: 2px 5px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 500;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 10px;
`;

const LocationIcon = styled.span`
  font-size: 12px;
`;

const LocationText = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.textSecondary};
`;

const NextEvent = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
  padding: 8px;
  background: ${(props) => props.theme.surfaceSecondary};
  border-radius: 6px;
`;

const EventIcon = styled.span`
  font-size: 14px;
`;

const EventInfo = styled.div`
  flex: 1;
`;

const EventTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 2px;
`;

const EventDate = styled.div`
  font-size: 11px;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 2px;
`;

const EventLocation = styled.div`
  font-size: 11px;
  color: ${(props) => props.theme.textSecondary};
`;

const ActivityInfo = styled.div`
  margin-bottom: 8px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 3px;
`;

const ActivityIcon = styled.span`
  font-size: 11px;
`;

const ActivityText = styled.span`
  font-size: 11px;
  color: ${(props) => props.theme.textSecondary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  width: 100%;
  max-width: 960px;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 8px 0;
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.textSecondary};
  margin: 0 0 24px 0;
`;
