import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import { useRouter } from "next/router";

const MyMoimsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("내 모임");

  // 더미 데이터 - 실제로는 API에서 가져올 데이터
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
    },
    {
      id: 7,
      title: "바이크 라이딩 클럽",
      image: "/img8.jpg",
      category: "운동",
      nextEvent: {
        title: "한강 라이딩",
        date: "2024-03-24T07:00:00",
        location: "여의도 한강공원",
      },
      newMessages: 6,
      newPosts: 2,
      members: 14,
      maxMembers: 20,
      role: "멤버",
    },
  ];

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

  return (
    <PageContainer>
      <Header />
      <Container>
        <PageHeader>
          <Title>내 모임</Title>
          <Subtitle>참여하고 있는 모임들을 한눈에 확인하세요</Subtitle>
        </PageHeader>

        <TabContainer>
          <Tab active={activeTab === "내 모임"} onClick={() => setActiveTab("내 모임")}>
            내 모임 ({myMoims.length})
          </Tab>
          <Tab active={activeTab === "운영 중"} onClick={() => setActiveTab("운영 중")}>
            운영 중 ({myMoims.filter(m => m.role === "운영자").length})
          </Tab>
          <Tab active={activeTab === "참여 중"} onClick={() => setActiveTab("참여 중")}>
            참여 중 ({myMoims.filter(m => m.role === "멤버").length})
          </Tab>
        </TabContainer>

        <CardGrid>
          {myMoims.map((moim) => (
            <MoimCard key={moim.id} onClick={() => handleCardClick(moim.id)}>
              <CardImage src={moim.image} alt={moim.title} />
              <CardContent>
                <CardHeader>
                  <CardTitle>{moim.title}</CardTitle>
                  <CategoryTag>{moim.category}</CategoryTag>
                </CardHeader>
                
                <CardInfo>
                  <InfoItem>
                    <InfoIcon>👥</InfoIcon>
                    <InfoText>{moim.members}/{moim.maxMembers}명</InfoText>
                  </InfoItem>
                  <InfoItem>
                    <InfoIcon>🏷️</InfoIcon>
                    <InfoText>{moim.role}</InfoText>
                  </InfoItem>
                </CardInfo>

                {moim.nextEvent && (
                  <NextEvent>
                    <EventIcon>📅</EventIcon>
                    <EventInfo>
                      <EventTitle>{moim.nextEvent.title}</EventTitle>
                      <EventDate>{formatDate(moim.nextEvent.date)}</EventDate>
                      <EventLocation>📍 {moim.nextEvent.location}</EventLocation>
                    </EventInfo>
                  </NextEvent>
                )}

                <ActivityInfo>
                  {moim.newMessages > 0 && (
                    <ActivityItem>
                      <ActivityIcon>💬</ActivityIcon>
                      <ActivityText>새 메시지 {moim.newMessages}개</ActivityText>
                    </ActivityItem>
                  )}
                  {moim.newPosts > 0 && (
                    <ActivityItem>
                      <ActivityIcon>📝</ActivityIcon>
                      <ActivityText>새 게시글 {moim.newPosts}개</ActivityText>
                    </ActivityItem>
                  )}
                </ActivityInfo>

                <ClickHint>
                  <HintIcon>💬</HintIcon>
                  <HintText>클릭하여 채팅 참여하기</HintText>
                </ClickHint>
              </CardContent>
            </MoimCard>
          ))}
        </CardGrid>

        {myMoims.length === 0 && (
          <EmptyState>
            <EmptyIcon>🤝</EmptyIcon>
            <EmptyTitle>아직 참여한 모임이 없어요</EmptyTitle>
            <EmptyText>새로운 모임에 참여해보세요!</EmptyText>
            <Button href="/moim-list" variant="primary">
              모임 찾아보기
            </Button>
          </EmptyState>
        )}
      </Container>
    </PageContainer>
  );
};

export default MyMoimsPage;

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 16px 60px 16px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 40px;
`;

const Tab = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? "#3b82f6" : "#fff"};
  color: ${props => props.active ? "#fff" : "#6b7280"};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.active ? "0 4px 12px rgba(59, 130, 246, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)"};

  &:hover {
    background: ${props => props.active ? "#2563eb" : "#f3f4f6"};
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`;

const MoimCard = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 24px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  flex: 1;
`;

const CategoryTag = styled.span`
  background: #e0e7ff;
  color: #3730a3;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CardInfo = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const InfoIcon = styled.span`
  font-size: 1rem;
`;

const InfoText = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
`;

const NextEvent = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #f0f9ff;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const EventIcon = styled.span`
  font-size: 1.2rem;
`;

const EventInfo = styled.div`
  flex: 1;
`;

const EventTitle = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
`;

const EventDate = styled.div`
  font-size: 0.9rem;
  color: #059669;
  margin-bottom: 2px;
`;

const EventLocation = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
`;

const ActivityInfo = styled.div`
  margin-bottom: 20px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const ActivityIcon = styled.span`
  font-size: 1rem;
`;

const ActivityText = styled.span`
  font-size: 0.9rem;
  color: #dc2626;
  font-weight: 500;
`;

const ClickHint = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f0f9ff;
  border-radius: 8px;
  margin-top: 16px;
  border: 1px solid #bae6fd;
`;

const HintIcon = styled.span`
  font-size: 1.2rem;
`;

const HintText = styled.span`
  font-size: 0.9rem;
  color: #0369a1;
  font-weight: 500;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0 0 24px 0;
`; 