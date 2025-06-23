import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Button from "./Button";

const MoimDetailModal = ({ isOpen, onClose, moim }) => {
  const [joined, setJoined] = useState(false);

  if (!moim) return null;

  // 날짜 포맷팅 (다음 일정이 있는 경우)
  const nextDate = moim.nextEvent?.date
    ? new Date(moim.nextEvent.date).toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContainer>
        <ModalHeader>
          <ModalImage src={moim.thumbnail || moim.image} alt={moim.title} />
        </ModalHeader>

        <ModalContent>
          <ModalTitleSection>
            <TitleGroup>
              <ModalTitle>{moim.title}</ModalTitle>
              <OnlineStatus $isOnline={moim.onlineType === "online"}>
                {moim.onlineType === "online" ? "온라인" : "오프라인"}
              </OnlineStatus>
              {moim.members && moim.maxMembers && (
                <MemberCount>
                  {moim.members}/{moim.maxMembers}명
                </MemberCount>
              )}
            </TitleGroup>
          </ModalTitleSection>

          {moim.creator && (
            <CreatorSection>
              <CreatorInfo>
                <CreatorImage
                  src={moim.creator.profileImage}
                  alt={moim.creator.name}
                />
                <CreatorDetails>
                  <CreatorDate>{moim.creator.createdAt} 생성</CreatorDate>
                  <CreatorName>{moim.creator.name}</CreatorName>
                </CreatorDetails>
              </CreatorInfo>
            </CreatorSection>
          )}

          {/* 모임 정보 */}
          <InfoSection>
            <InfoRow>
              <InfoLabel>최대 인원</InfoLabel>
              <InfoValue>{moim.maxMembers}명</InfoValue>
            </InfoRow>
            {moim.onlineType === "offline" && moim.location && (
              <InfoRow>
                <InfoLabel>활동 지역</InfoLabel>
                <InfoValue>{moim.location}</InfoValue>
              </InfoRow>
            )}
          </InfoSection>

          {/* 모임 소개 */}
          <Section>
            <SectionTitle>모임 소개</SectionTitle>
            <SectionText>{moim.description}</SectionText>
          </Section>

          {/* 운영 규칙 */}
          {moim.rules && moim.rules.length > 0 && (
            <Section>
              <SectionTitle>운영 규칙</SectionTitle>
              <RuleList>
                {moim.rules.map((rule, idx) => (
                  <RuleItem key={idx}>{rule}</RuleItem>
                ))}
              </RuleList>
            </Section>
          )}

          {/* 다음 일정 */}
          <Section>
            <SectionTitle>다음 일정</SectionTitle>
            {nextDate ? (
              <EventBox>
                <EventTitle>📅 {moim.nextEvent.title}</EventTitle>
                <EventDate>{nextDate}</EventDate>
              </EventBox>
            ) : (
              <EventBox>예정된 일정이 없습니다.</EventBox>
            )}
          </Section>

          {/* 태그 */}
          {moim.tags && moim.tags.length > 0 && (
            <TagSection>
              <TagList>
                {moim.tags.map((tag, index) => (
                  <Tag key={index}>#{tag}</Tag>
                ))}
              </TagList>
            </TagSection>
          )}

          {/* 액션 버튼 */}
          <ActionSection>
            {!joined ? (
              <>
                <JoinGuide>
                  👉 전체 일정을 확인하려면 모임에 참여하세요!
                </JoinGuide>
                <ButtonGroup>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => setJoined(true)}
                  >
                    모임 참여하기
                  </Button>
                </ButtonGroup>
              </>
            ) : (
              <ButtonGroup>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => setJoined(false)}
                >
                  모임 탈퇴하기
                </Button>
              </ButtonGroup>
            )}
          </ActionSection>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default MoimDetailModal;

// Styled Components
const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding-right: 8px;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

const ModalHeader = styled.div`
  position: relative;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ModalContent = styled.div`
  padding: 24px;
`;

const ModalTitleSection = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 16px;
`;

const ModalTitle = styled.h1`
  color: #111827;
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 16px;
`;

const OnlineStatus = styled.span`
  color: ${(props) => (props.$isOnline ? "#15803d" : "#b91c1c")};
  background: ${(props) => (props.$isOnline ? "#dcfce7" : "#fee2e2")};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

const MemberCount = styled.span`
  color: #6b7280;
  font-size: 14px;
  margin-left: 12px;
`;

const CreatorSection = styled.div`
  margin-bottom: 24px;
`;

const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CreatorImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

const CreatorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreatorName = styled.span`
  font-weight: 600;
  color: #111827;
  font-size: 14px;
`;

const CreatorDate = styled.span`
  color: #6b7280;
  font-size: 12px;
`;

const InfoSection = styled.div`
  margin-bottom: 24px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #374151;
  min-width: 80px;
  font-size: 14px;
`;

const InfoValue = styled.span`
  color: #111827;
  font-size: 14px;
`;

const AttendeeBadges = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const AttendeeImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid white;
  position: absolute;
  object-fit: cover;
`;

const MoreBadge = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  border: 2px solid white;
  position: absolute;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  color: #111827;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
`;

const SectionText = styled.p`
  color: #374151;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`;

const RuleList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RuleItem = styled.li`
  color: #374151;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
  padding-left: 16px;
  position: relative;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: #6b7280;
  }
`;

const EventBox = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
`;

const EventTitle = styled.h3`
  color: #111827;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

const EventDate = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin: 0;
`;

const TagSection = styled.div`
  margin-bottom: 24px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background: #e7edf4;
  color: #49749c;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
`;

const ActionSection = styled.div`
  margin-top: 24px;
`;

const JoinGuide = styled.p`
  color: #6b7280;
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
