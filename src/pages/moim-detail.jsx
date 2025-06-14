import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";

const dummyMoim = {
  title: '북클럽: "시크릿 가든"',
  description:
    '프랜시스 호지슨 버넷의 "시크릿 가든"을 함께 읽고 토론하는 모임입니다. 자연, 치유, 우정이라는 주제로 다양한 생각을 나눠보아요. 모임은 중앙 도서관에서 진행됩니다.',
  image: "/bookclub.jpg",
  category: "북클럽",
  attendees: [
    { name: "Alice", image: "/profile1.jpg" },
    { name: "Bob", image: "/profile2.jpg" },
    { name: "Carol", image: "/profile3.jpg" },
    { name: "David", image: "/profile4.jpg" },
    { name: "Eve", image: "/profile5.jpg" },
    { name: "Frank", image: "/profile6.jpg" },
  ],
  organizer: "소피아 카터",
  nextEvent: {
    title: "북클럽 정기모임",
    date: "2026-07-20T14:00:00",
  },
  about:
    "우리 북클럽은 고전 및 현대 문학을 함께 읽고 토론하는 모임입니다. 매달 한 권의 책을 선정해 다양한 생각과 감상을 나누며, 새로운 회원도 언제든 환영합니다!",
  rules: [
    "타인의 의견을 존중해 주세요.",
    "책을 미리 읽고 모임에 참여해 주세요.",
    "즐겁고 열린 마음으로 대화에 참여해 주세요!",
  ],
  joined: false, // 참여 여부
};

const MoimDetail = () => {
  const [joined, setJoined] = useState(dummyMoim.joined);

  // 날짜 포맷팅
  const nextDate = dummyMoim.nextEvent?.date
    ? new Date(dummyMoim.nextEvent.date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <Bg>
      <Header />
      <Container>
        <Title>{dummyMoim.title}</Title>
        <Description>{dummyMoim.description}</Description>
        <ImageBox>
          <MainImage src={dummyMoim.image} alt="대표 이미지" />
        </ImageBox>
        <InfoTable>
          <tbody>
            <tr>
              <th>카테고리</th>
              <td>{dummyMoim.category}</td>
            </tr>
            <tr>
              <th>참여 인원</th>
              <td>
                <AttendeeBadges>
                  {dummyMoim.attendees.slice(0, 5).map((user, idx) => (
                    <AttendeeImg
                      key={user.name}
                      src={user.image}
                      alt={user.name}
                      style={{ left: `${idx * 22}px`, zIndex: 10 - idx }}
                      title={user.name}
                    />
                  ))}
                  {dummyMoim.attendees.length > 5 && (
                    <MoreBadge style={{ left: `${5 * 22}px` }}>
                      +{dummyMoim.attendees.length - 5}
                    </MoreBadge>
                  )}
                </AttendeeBadges>
              </td>
            </tr>
            <tr>
              <th>운영자</th>
              <td>{dummyMoim.organizer}</td>
            </tr>
          </tbody>
        </InfoTable>

        <Section>
          <SectionTitle>다음 일정</SectionTitle>
          {nextDate ? (
            <EventBox>
              <EventTitle>📅 {dummyMoim.nextEvent.title}</EventTitle>
              <EventDate>{nextDate}</EventDate>
            </EventBox>
          ) : (
            <EventBox>예정된 일정이 없습니다.</EventBox>
          )}
          {!joined ? (
            <>
              <JoinGuide>
                👉 전체 일정을 확인하려면 모임에 참여하세요!
              </JoinGuide>
              <ButtonWrap>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => setJoined(true)}
                >
                  모임 참여하기
                </Button>
              </ButtonWrap>
            </>
          ) : (
            <ButtonWrap>
              <Button
                variant="secondary"
                size="medium"
                onClick={() => setJoined(false)}
              >
                모임 탈퇴하기
              </Button>
            </ButtonWrap>
          )}
        </Section>

        <Section>
          <SectionTitle>모임 소개</SectionTitle>
          <SectionText>{dummyMoim.about}</SectionText>
        </Section>

        <Section>
          <SectionTitle>운영 규칙</SectionTitle>
          <RuleList>
            {dummyMoim.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </RuleList>
        </Section>
      </Container>
    </Bg>
  );
};

export default MoimDetail;

const Bg = styled.div`
  min-height: 100vh;
  background: #181c23;
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 16px 60px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Description = styled.p`
  color: #cbd5e1;
  font-size: 1.1rem;
  margin-bottom: 0;
`;

const ImageBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 24px 0 16px 0;
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  background: #222;
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0;
  th,
  td {
    text-align: left;
    padding: 10px 0;
    color: #cbd5e1;
    font-size: 1rem;
    font-weight: 400;
  }
  th {
    width: 120px;
    color: #94a3b8;
    font-weight: 500;
  }
`;

const Section = styled.section`
  background: transparent;
  border-radius: 12px;
  padding: 0;
  margin-bottom: 0;
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const EventBox = styled.div`
  color: #cbd5e1;
  font-size: 1rem;
  margin-bottom: 8px;
`;
const EventTitle = styled.div`
  font-weight: 600;
  color: #fff;
`;
const EventDate = styled.div`
  color: #cbd5e1;
  font-size: 0.98rem;
`;
const JoinGuide = styled.div`
  color: #94a3b8;
  font-size: 0.98rem;
  margin: 10px 0 0 0;
`;
const ButtonWrap = styled.div`
  margin: 16px 0 0 0;
`;
const SectionText = styled.p`
  color: #cbd5e1;
  font-size: 1rem;
`;
const RuleList = styled.ul`
  color: #cbd5e1;
  font-size: 0.98rem;
  padding-left: 18px;
  margin: 0;
  li {
    margin-bottom: 6px;
  }
`;

const AttendeeBadges = styled.div`
  display: flex;
  align-items: center;
`;

const AttendeeImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #181c23;
  background: #222;
  margin-left: -8px;
  &:first-child {
    margin-left: 0;
  }
`;

const MoreBadge = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  font-weight: 600;
  margin-left: -8px;
`;
