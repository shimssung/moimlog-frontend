import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useTheme } from "../utils/ThemeContext";
import { useRouter } from "next/router";
import { useStore } from "../stores/useStore";
import { authAPI } from "../api/auth";
import { moimAPI } from "../api/moim";
import toast from "react-hot-toast";

const TABS = [
  { key: "all", label: "전체 모임" },
  { key: "created", label: "내가 만든 모임" },
  { key: "joined", label: "참여한 모임" },
];

const MyPage = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { isAuthenticated } = useStore();
  const [tab, setTab] = useState("all");
  const [myMoims, setMyMoims] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [userProfile, setUserProfile] = useState(null);

  // 무한스크롤을 위한 observer ref
  const observer = useRef();
  const lastMoimElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  // 사용자 프로필 가져오기
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        setUserProfile(response.data);
      } catch (error) {
        console.error("사용자 프로필 가져오기 실패:", error);
        toast.error("사용자 정보를 가져오는데 실패했습니다.");
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  // 모임 데이터 가져오기
  useEffect(() => {
    const fetchMoims = async () => {
      if (isLoading) return;

      try {
        setIsLoading(true);
        let response;

        switch (tab) {
          case "created":
            response = await moimAPI.getMyCreatedMoims();
            break;
          case "joined":
            response = await moimAPI.getMyJoinedMoims();
            break;
          default:
            response = await moimAPI.getMyJoinedMoims(); // 전체 모임
        }

        const newMoims = response.data.moims || [];

        if (page === 1) {
          setMyMoims(newMoims);
        } else {
          setMyMoims((prev) => [...prev, ...newMoims]);
        }

        // 더 불러올 데이터가 있는지 확인
        setHasMore(newMoims.length === 20); // 페이지 크기가 20개
      } catch (error) {
        console.error("모임 데이터 가져오기 실패:", error);
        toast.error("모임 정보를 가져오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchMoims();
    }
  }, [tab, page, isAuthenticated]);

  // 탭 변경 시 페이지 초기화
  useEffect(() => {
    setPage(1);
    setMyMoims([]);
    setHasMore(true);
  }, [tab]);

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

  // 데이터베이스 응답을 UI에 맞게 변환하는 함수
  const mapMoimData = (moim) => ({
    id: moim.id,
    title: moim.title,
    image: moim.thumbnail || "/img4.jpg", // 기본 이미지
    category: moim.category_name || "기타",
    nextEvent: moim.next_schedule
      ? {
          title: moim.next_schedule.title,
          date: moim.next_schedule.start_date,
          location: moim.next_schedule.location,
        }
      : null,
    newMessages: moim.unread_messages || 0,
    newPosts: moim.unread_posts || 0,
    members: moim.current_members || 0,
    maxMembers: moim.max_members || 0,
    role: moim.role === "admin" ? "운영자" : "멤버",
    onlineType: moim.online_type || "offline",
    location: moim.location || "",
  });

  // 변환된 모임 데이터
  const transformedMoims = myMoims.map(mapMoimData);

  return (
    <>
      <Header />
      <PageContainer theme={theme}>
        <ProfileSection>
          <ProfileLeft>
            <Avatar
              style={{
                backgroundImage: `url(${
                  userProfile?.profile_image || "/img1.jpg"
                })`,
              }}
              theme={theme}
            />
            <ProfileInfo>
              <ProfileName theme={theme}>
                {userProfile?.name || "사용자"}
              </ProfileName>
              <ProfileEmail theme={theme}>
                {userProfile?.email || "email@example.com"}
              </ProfileEmail>
              <ProfileJoined theme={theme}>
                Joined on{" "}
                {userProfile?.created_at
                  ? new Date(userProfile.created_at).toLocaleDateString()
                  : "날짜 없음"}
              </ProfileJoined>
            </ProfileInfo>
          </ProfileLeft>
          <SettingsButton onClick={handleSettingsClick} theme={theme}>
            <SettingsIcon theme={theme} />
          </SettingsButton>
        </ProfileSection>

        <AboutSection>
          <AboutTitle theme={theme}>About Me</AboutTitle>
          <AboutDesc theme={theme}>
            {userProfile?.bio || "자기소개가 없습니다."}
          </AboutDesc>
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
          {transformedMoims.map((moim, index) => (
            <MoimCard
              key={moim.id}
              ref={
                index === transformedMoims.length - 1
                  ? lastMoimElementRef
                  : null
              }
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

        {/* 로딩 상태 표시 */}
        {isLoading && (
          <LoadingContainer>
            <LoadingText theme={theme}>모임을 불러오는 중...</LoadingText>
          </LoadingContainer>
        )}

        {/* 더 이상 데이터가 없을 때 */}
        {!isLoading && !hasMore && transformedMoims.length > 0 && (
          <EndMessage theme={theme}>모든 모임을 불러왔습니다.</EndMessage>
        )}

        {transformedMoims.length === 0 && !isLoading && (
          <EmptyState>
            <EmptyIcon>🤝</EmptyIcon>
            <EmptyTitle theme={theme}>
              {tab === "all" && "아직 참여한 모임이 없어요"}
              {tab === "created" && "아직 만든 모임이 없어요"}
              {tab === "joined" && "아직 참여한 모임이 없어요"}
            </EmptyTitle>
            <EmptyText theme={theme}>새로운 모임에 참여해보세요!</EmptyText>
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

const LoadingContainer = styled.div`
  text-align: center;
  padding: 20px;
  width: 100%;
  max-width: 960px;
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.textSecondary};
`;

const EndMessage = styled.p`
  text-align: center;
  padding: 20px;
  width: 100%;
  max-width: 960px;
  font-size: 16px;
  color: ${(props) => props.theme.textSecondary};
`;
