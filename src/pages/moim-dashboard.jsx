import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";

const dummyData = {
  moimInfo: {
    title: "북클럽: 시크릿 가든",
    image: "/bookclub.jpg",
    nextEvent: {
      title: "북클럽 정기모임",
      date: "2024-03-20T14:00:00",
      location: "중앙 도서관 3층 세미나실",
    },
  },
  recentActivities: [
    {
      type: "post",
      title: "다음 모임 준비물 안내",
      author: "소피아 카터",
      date: "2024-03-15",
    },
    {
      type: "comment",
      content: "다음 모임이 기대되네요!",
      author: "앨리스",
      date: "2024-03-16",
    },
    {
      type: "photo",
      title: "지난 모임 사진",
      author: "밥",
      date: "2024-03-10",
    },
  ],
  members: [
    { name: "소피아 카터", role: "운영자", image: "/profile1.jpg" },
    { name: "앨리스", role: "멤버", image: "/profile2.jpg" },
    { name: "밥", role: "멤버", image: "/profile3.jpg" },
    { name: "캐롤", role: "멤버", image: "/profile4.jpg" },
  ],
};

const MoimDashboard = () => {
  const nextDate = dummyData.moimInfo.nextEvent?.date
    ? new Date(dummyData.moimInfo.nextEvent.date).toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <PageContainer>
      <Header />
      <Container>
        <LeftSection>
          <MoimInfo>
            <MoimImage src={dummyData.moimInfo.image} alt="모임 이미지" />
            <MoimTitle>{dummyData.moimInfo.title}</MoimTitle>
          </MoimInfo>

          <Section>
            <SectionTitle>다음 일정</SectionTitle>
            <EventBox>
              <EventTitle>📅 {dummyData.moimInfo.nextEvent.title}</EventTitle>
              <EventDate>{nextDate}</EventDate>
              <EventLocation>
                📍 {dummyData.moimInfo.nextEvent.location}
              </EventLocation>
            </EventBox>
            <ButtonWrap>
              <Button variant="primary" size="medium">
                일정 추가하기
              </Button>
            </ButtonWrap>
          </Section>

          <Section>
            <SectionTitle>멤버</SectionTitle>
            <MemberList>
              {dummyData.members.map((member) => (
                <MemberItem key={member.name}>
                  <MemberImage src={member.image} alt={member.name} />
                  <MemberInfo>
                    <MemberName>{member.name}</MemberName>
                    <MemberRole>{member.role}</MemberRole>
                  </MemberInfo>
                </MemberItem>
              ))}
            </MemberList>
          </Section>
        </LeftSection>

        <RightSection>
          <Section>
            <SectionTitle>최근 활동</SectionTitle>
            <ActivityList>
              {dummyData.recentActivities.map((activity, idx) => (
                <ActivityItem key={idx}>
                  <ActivityIcon>
                    {activity.type === "post" && "📝"}
                    {activity.type === "comment" && "💬"}
                    {activity.type === "photo" && "📸"}
                  </ActivityIcon>
                  <ActivityContent>
                    <ActivityTitle>
                      {activity.type === "post" && activity.title}
                      {activity.type === "comment" && activity.content}
                      {activity.type === "photo" && activity.title}
                    </ActivityTitle>
                    <ActivityMeta>
                      <ActivityAuthor>{activity.author}</ActivityAuthor>
                      <ActivityDate>{activity.date}</ActivityDate>
                    </ActivityMeta>
                  </ActivityContent>
                </ActivityItem>
              ))}
            </ActivityList>
          </Section>

          <ButtonGroup>
            <Button variant="secondary" size="medium">
              게시글 작성
            </Button>
            <Button variant="secondary" size="medium">
              사진 업로드
            </Button>
          </ButtonGroup>
        </RightSection>
      </Container>
    </PageContainer>
  );
};

export default MoimDashboard;

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
  flex: 0 0 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1024px) {
    flex: none;
    width: 100%;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MoimInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MoimImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  background: #f3f4f6;
`;

const MoimTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const Section = styled.section`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 16px 0;
`;

const EventBox = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const EventTitle = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

const EventDate = styled.div`
  color: #374151;
  font-size: 0.95rem;
  margin-bottom: 4px;
`;

const EventLocation = styled.div`
  color: #6b7280;
  font-size: 0.95rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MemberItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }
`;

const MemberImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MemberName = styled.div`
  font-weight: 500;
  color: #111827;
`;

const MemberRole = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActivityItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }
`;

const ActivityIcon = styled.div`
  font-size: 1.25rem;
`;

const ActivityContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ActivityTitle = styled.div`
  color: #111827;
  font-weight: 500;
`;

const ActivityMeta = styled.div`
  display: flex;
  gap: 8px;
  font-size: 0.875rem;
  color: #6b7280;
`;

const ActivityAuthor = styled.span`
  font-weight: 500;
`;

const ActivityDate = styled.span``;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
`;
