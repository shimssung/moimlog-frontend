import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import Button from "../../../components/Button";

const MoimSchedulePage = () => {
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
        role: "운영자",
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
      .filter(event => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case "meeting": return "🤝";
      case "task": return "📝";
      case "deadline": return "⏰";
      default: return "📅";
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case "meeting": return "#3b82f6";
      case "task": return "#10b981";
      case "deadline": return "#ef4444";
      default: return "#6b7280";
    }
  };

  return (
    <PageContainer>
      <Sidebar moimId={moimId} moimRole={moimInfo?.role} activeMenu="schedule" />
      
      <MainContent>
        <PageHeader>
          <HeaderInfo>
            <PageTitle>일정 관리</PageTitle>
            <PageSubtitle>{moimInfo?.title}의 일정을 관리하세요</PageSubtitle>
          </HeaderInfo>
          <CreateButton onClick={() => setShowCreateModal(true)}>
            <ButtonIcon>➕</ButtonIcon>
            일정 만들기
          </CreateButton>
        </PageHeader>

        <ContentGrid>
          <UpcomingSection>
            <SectionTitle>다가오는 일정</SectionTitle>
            <EventList>
              {getUpcomingEvents().map((event) => (
                <EventCard key={event.id}>
                  <EventHeader>
                    <EventTypeIcon style={{ color: getEventTypeColor(event.type) }}>
                      {getEventTypeIcon(event.type)}
                    </EventTypeIcon>
                    <EventTitle>{event.title}</EventTitle>
                  </EventHeader>
                  <EventDetails>
                    <EventDate>{formatDate(event.date)} {formatTime(event.date)}</EventDate>
                    <EventLocation>📍 {event.location}</EventLocation>
                    <EventDescription>{event.description}</EventDescription>
                    <EventAttendees>
                      참석자: {event.attendees}/{event.maxAttendees}명
                    </EventAttendees>
                  </EventDetails>
                </EventCard>
              ))}
            </EventList>
          </UpcomingSection>

          <CalendarSection>
            <SectionTitle>캘린더</SectionTitle>
            <CalendarPlaceholder>
              <CalendarIcon>📅</CalendarIcon>
              <CalendarText>캘린더 기능은 추후 구현 예정입니다</CalendarText>
              <CalendarSubtext>월간/주간 일정 보기, 일정 필터링 등</CalendarSubtext>
            </CalendarPlaceholder>
          </CalendarSection>
        </ContentGrid>

        {showCreateModal && (
          <ModalOverlay onClick={() => setShowCreateModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>새 일정 만들기</ModalTitle>
                <CloseButton onClick={() => setShowCreateModal(false)}>✕</CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label>일정 제목</Label>
                  <Input type="text" placeholder="일정 제목을 입력하세요" />
                </FormGroup>
                <FormGroup>
                  <Label>날짜 및 시간</Label>
                  <Input type="datetime-local" />
                </FormGroup>
                <FormGroup>
                  <Label>장소</Label>
                  <Input type="text" placeholder="장소를 입력하세요" />
                </FormGroup>
                <FormGroup>
                  <Label>설명</Label>
                  <Textarea placeholder="일정에 대한 설명을 입력하세요" rows="3" />
                </FormGroup>
                <FormGroup>
                  <Label>최대 참석자 수</Label>
                  <Input type="number" min="1" placeholder="최대 참석자 수" />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                  취소
                </Button>
                <Button variant="primary">
                  일정 만들기
                </Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default MoimSchedulePage;

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f8fafc;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
`;

const HeaderInfo = styled.div``;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
`;

const PageSubtitle = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
  }
`;

const ButtonIcon = styled.span`
  font-size: 1rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  padding: 32px;
  flex: 1;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const UpcomingSection = styled.div``;

const CalendarSection = styled.div``;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 20px 0;
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EventCard = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
  }
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
  color: #111827;
  margin: 0;
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const EventDate = styled.div`
  font-size: 0.9rem;
  color: #059669;
  font-weight: 500;
`;

const EventLocation = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
`;

const EventDescription = styled.div`
  font-size: 0.9rem;
  color: #374151;
  margin: 8px 0;
`;

const EventAttendees = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
`;

const CalendarPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  background: #f9fafb;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  color: #6b7280;
`;

const CalendarIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
`;

const CalendarText = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const CalendarSubtext = styled.div`
  font-size: 0.9rem;
  text-align: center;
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
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #111827;
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
  border-top: 1px solid #e5e7eb;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
  }
`; 