import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import { useTheme } from "../../../utils/ThemeContext";

const MoimSchedulePage = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { id: moimId } = router.query;
  const [moimInfo, setMoimInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // 더미 데이터
  useEffect(() => {
    if (moimId) {
      setMoimInfo({
        id: moimId,
        title: "북클럽: 시크릿 가든",
        image: "/img4.jpg",
        userRole: "ADMIN", // Changed from role to userRole
      });

      setEvents([
        {
          id: 1,
          title: "북클럽 정기모임",
          date: "2024-03-20T14:00:00",
          location: "중앙 도서관 3층 세미나실",
          description: "시크릿 가든 3-4장 토론",
          attendees: 8,
          maxAttendees: 12,
          type: "meeting",
        },
        {
          id: 2,
          title: "독서 후기 작성",
          date: "2024-03-25T18:00:00",
          location: "온라인",
          description: "개인 독서 후기 공유",
          attendees: 5,
          maxAttendees: 12,
          type: "task",
        },
        {
          id: 3,
          title: "다음 책 선정 회의",
          date: "2024-03-30T15:00:00",
          location: "카페",
          description: "4월 독서 목록 선정",
          attendees: 3,
          maxAttendees: 12,
          type: "meeting",
        },
      ]);
    }
  }, [moimId]);

  const formatDate = (dateString) => {
    if (!dateString) return "날짜 없음";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return "날짜 오류";
      }

      return date.toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
        weekday: "short",
      });
    } catch (error) {
      console.error("날짜 파싱 오류:", error);
      return "날짜 오류";
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "시간 없음";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return "시간 오류";
      }

      return date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("시간 파싱 오류:", error);
      return "시간 오류";
    }
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter((event) => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case "meeting":
        return "🤝";
      case "task":
        return "📝";
      case "deadline":
        return "⏰";
      default:
        return "📅";
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case "meeting":
        return "#3b82f6";
      case "task":
        return "#10b981";
      case "deadline":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <PageContainer theme={theme}>
      <Header />
      <ContentContainer>
        <Sidebar 
          moimId={moimId} 
          moimRole={moimInfo.userRole === "ADMIN" || moimInfo.userRole === "MODERATOR" ? "운영자" : "멤버"} 
          activeMenu="schedule" 
        />

        <MainContent theme={theme}>
        <PageHeader>
          <HeaderInfo>
            <PageTitle theme={theme}>일정 관리</PageTitle>
            <PageSubtitle theme={theme}>
              {moimInfo?.title}의 일정을 관리하세요
            </PageSubtitle>
          </HeaderInfo>
          <CreateButton onClick={() => setShowCreateModal(true)} theme={theme}>
            <ButtonIcon>➕</ButtonIcon>
            일정 만들기
          </CreateButton>
        </PageHeader>

        <ContentGrid>
          <UpcomingSection>
            <SectionTitle theme={theme}>다가오는 일정</SectionTitle>
            <EventList>
              {getUpcomingEvents().map((event) => (
                <EventCard key={event.id} theme={theme}>
                  <EventHeader>
                    <EventTypeIcon
                      style={{ color: getEventTypeColor(event.type) }}
                    >
                      {getEventTypeIcon(event.type)}
                    </EventTypeIcon>
                    <EventTitle theme={theme}>{event.title}</EventTitle>
                  </EventHeader>
                  <EventDetails>
                    <EventDate theme={theme}>
                      {formatDate(event.date)} {formatTime(event.date)}
                    </EventDate>
                    <EventLocation theme={theme}>
                      📍 {event.location}
                    </EventLocation>
                    <EventDescription theme={theme}>
                      {event.description}
                    </EventDescription>
                    <EventAttendees theme={theme}>
                      참석자: {event.attendees}/{event.maxAttendees}명
                    </EventAttendees>
                  </EventDetails>
                </EventCard>
              ))}
            </EventList>
          </UpcomingSection>

          <CalendarSection>
            <SectionTitle theme={theme}>캘린더</SectionTitle>
            <CalendarPlaceholder theme={theme}>
              <CalendarIcon>📅</CalendarIcon>
              <CalendarText theme={theme}>
                캘린더 기능은 추후 구현 예정입니다
              </CalendarText>
              <CalendarSubtext theme={theme}>
                월간/주간 일정 보기, 일정 필터링 등
              </CalendarSubtext>
            </CalendarPlaceholder>
          </CalendarSection>
        </ContentGrid>

        {showCreateModal && (
          <ModalOverlay onClick={() => setShowCreateModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
              <ModalHeader theme={theme}>
                <ModalTitle theme={theme}>새 일정 만들기</ModalTitle>
                <CloseButton
                  onClick={() => setShowCreateModal(false)}
                  theme={theme}
                >
                  ✕
                </CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label theme={theme}>일정 제목</Label>
                  <Input
                    type="text"
                    placeholder="일정 제목을 입력하세요"
                    theme={theme}
                  />
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>날짜 및 시간</Label>
                  <Input type="datetime-local" theme={theme} />
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>장소</Label>
                  <Input
                    type="text"
                    placeholder="장소를 입력하세요"
                    theme={theme}
                  />
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>설명</Label>
                  <Textarea
                    placeholder="일정에 대한 설명을 입력하세요"
                    rows="3"
                    theme={theme}
                  />
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>일정 유형</Label>
                  <Select theme={theme}>
                    <option value="meeting">모임</option>
                    <option value="task">작업</option>
                    <option value="deadline">마감일</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>최대 참석자 수</Label>
                  <Input
                    type="number"
                    placeholder="참석자 수를 입력하세요"
                    theme={theme}
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter theme={theme}>
                <Button
                  variant="light"
                  onClick={() => setShowCreateModal(false)}
                >
                  취소
                </Button>
                <Button variant="primary">일정 만들기</Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        )}
      </MainContent>
      </ContentContainer>
    </PageContainer>
  );
};

export default MoimSchedulePage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 80px); // 헤더 높이를 뺀 높이

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 250px;
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 80px); // 헤더 높이를 뺀 높이

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 16px;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const HeaderInfo = styled.div``;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 8px 0;
  transition: color 0.3s ease;
`;

const PageSubtitle = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
  transition: color 0.3s ease;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${(props) => props.theme.buttonPrimary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.buttonHover};
  }
`;

const ButtonIcon = styled.span`
  font-size: 1rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const UpcomingSection = styled.div``;

const CalendarSection = styled.div``;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 20px 0;
  transition: color 0.3s ease;
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EventCard = styled.div`
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
`;

const EventHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const EventTypeIcon = styled.span`
  font-size: 1.5rem;
`;

const EventTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
  transition: color 0.3s ease;
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EventDate = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.3s ease;
`;

const EventLocation = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.3s ease;
`;

const EventDescription = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.5;
  transition: color 0.3s ease;
`;

const EventAttendees = styled.div`
  font-size: 0.85rem;
  color: ${(props) => props.theme.textTertiary};
  transition: color 0.3s ease;
`;

const CalendarPlaceholder = styled.div`
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const CalendarIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
`;

const CalendarText = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 8px 0;
  transition: color 0.3s ease;
`;

const CalendarSubtext = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
  transition: color 0.3s ease;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.surface};
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
  transition: border-color 0.3s ease;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
  transition: color 0.3s ease;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${(props) => props.theme.textTertiary};
  cursor: pointer;
  padding: 4px;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.textPrimary};
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid ${(props) => props.theme.borderLight};
  transition: border-color 0.3s ease;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 6px;
  transition: color 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  background: ${(props) => props.theme.surfaceSecondary};
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${(props) => props.theme.buttonPrimary};
  }

  &::placeholder {
    color: ${(props) => props.theme.textTertiary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  background: ${(props) => props.theme.surfaceSecondary};
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${(props) => props.theme.buttonPrimary};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  resize: vertical;
  background: ${(props) => props.theme.surfaceSecondary};
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${(props) => props.theme.buttonPrimary};
  }

  &::placeholder {
    color: ${(props) => props.theme.textTertiary};
  }
`;
