import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";

const dummyEvents = [
  {
    id: 1,
    title: "북클럽 정기모임",
    date: "2024-03-20T14:00:00",
    location: "중앙 도서관 3층 세미나실",
    description: "시크릿 가든 1-3장 토론",
    attendees: 8,
    maxAttendees: 12,
  },
  {
    id: 2,
    title: "북클럽 정기모임",
    date: "2024-04-03T14:00:00",
    location: "중앙 도서관 3층 세미나실",
    description: "시크릿 가든 4-6장 토론",
    attendees: 5,
    maxAttendees: 12,
  },
  {
    id: 3,
    title: "북클럽 정기모임",
    date: "2024-04-17T14:00:00",
    location: "중앙 도서관 3층 세미나실",
    description: "시크릿 가든 7-9장 토론",
    attendees: 3,
    maxAttendees: 12,
  },
];

const MoimSchedule = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
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
        <LeftSection>
          <Section>
            <SectionHeader>
              <SectionTitle>일정 목록</SectionTitle>
              <Button variant="primary" size="small">
                일정 추가
              </Button>
            </SectionHeader>
            <EventList>
              {dummyEvents.map((event) => (
                <EventItem key={event.id}>
                  <EventDate>{formatDate(event.date)}</EventDate>
                  <EventInfo>
                    <EventTitle>{event.title}</EventTitle>
                    <EventLocation>📍 {event.location}</EventLocation>
                    <EventDescription>{event.description}</EventDescription>
                    <EventAttendees>
                      참석 인원: {event.attendees}/{event.maxAttendees}
                    </EventAttendees>
                  </EventInfo>
                  <EventActions>
                    <Button variant="secondary" size="small">
                      참석하기
                    </Button>
                  </EventActions>
                </EventItem>
              ))}
            </EventList>
          </Section>
        </LeftSection>

        <RightSection>
          <Section>
            <SectionHeader>
              <SectionTitle>캘린더</SectionTitle>
              <MonthSelector>
                <Button
                  variant="light"
                  size="small"
                  onClick={() =>
                    setSelectedMonth(
                      new Date(
                        selectedMonth.setMonth(selectedMonth.getMonth() - 1)
                      )
                    )
                  }
                >
                  이전
                </Button>
                <MonthText>
                  {selectedMonth.toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "long",
                  })}
                </MonthText>
                <Button
                  variant="light"
                  size="small"
                  onClick={() =>
                    setSelectedMonth(
                      new Date(
                        selectedMonth.setMonth(selectedMonth.getMonth() + 1)
                      )
                    )
                  }
                >
                  다음
                </Button>
              </MonthSelector>
            </SectionHeader>
            <Calendar>
              {/* 캘린더 구현은 별도의 컴포넌트로 분리하는 것이 좋습니다 */}
              <CalendarPlaceholder>
                캘린더 컴포넌트가 들어갈 자리입니다.
                <br />
                (react-calendar 등의 라이브러리 사용 추천)
              </CalendarPlaceholder>
            </Calendar>
          </Section>
        </RightSection>
      </Container>
    </PageContainer>
  );
};

export default MoimSchedule;

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 16px 60px 16px;
  display: flex;
  gap: 48px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RightSection = styled.div`
  flex: 0 0 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1024px) {
    flex: none;
    width: 100%;
  }
`;

const Section = styled.section`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EventItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background: #f9fafb;
  transition: background-color 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;

const EventDate = styled.div`
  flex: 0 0 180px;
  font-weight: 500;
  color: #111827;
`;

const EventInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EventTitle = styled.div`
  font-weight: 600;
  color: #111827;
`;

const EventLocation = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const EventDescription = styled.div`
  font-size: 0.875rem;
  color: #374151;
`;

const EventAttendees = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 4px;
`;

const EventActions = styled.div`
  display: flex;
  align-items: center;
`;

const MonthSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MonthText = styled.div`
  font-weight: 500;
  color: #111827;
  min-width: 120px;
  text-align: center;
`;

const Calendar = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  min-height: 400px;
`;

const CalendarPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #6b7280;
  text-align: center;
  line-height: 1.5;
`;
