import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { useStore } from "../stores/useStore";

const MoimDetailModal = ({ isOpen, onClose, moim }) => {
  const { theme } = useStore();

  if (!isOpen || !moim) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
        <ModalHeader theme={theme}>
          <TitleGroup>
            <ModalTitle theme={theme}>{moim.title}</ModalTitle>
            <OnlineStatus $isOnline={moim.onlineType === "online"}>
              {moim.onlineType === "online" ? "온라인" : "오프라인"}
            </OnlineStatus>
          </TitleGroup>
          <MemberCount theme={theme}>최대 {moim.maxMembers}명</MemberCount>
          <CloseButton onClick={onClose} theme={theme}>
            ✕
          </CloseButton>
        </ModalHeader>

        <ModalBody theme={theme}>
          <CreatorSection>
            <CreatorInfo>
              <CreatorImage src={moim.creatorImage} alt={moim.creatorName} />
              <CreatorDetails>
                <CreatorName theme={theme}>{moim.creatorName}</CreatorName>
                <CreatorDate theme={theme}>{moim.createdAt}</CreatorDate>
              </CreatorDetails>
            </CreatorInfo>
          </CreatorSection>

          <InfoSection>
            <InfoRow>
              <InfoLabel theme={theme}>카테고리</InfoLabel>
              <InfoValue theme={theme}>{moim.category}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel theme={theme}>위치</InfoLabel>
              <InfoValue theme={theme}>
                {moim.onlineType === "online" ? "온라인" : moim.location}
              </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel theme={theme}>참여자</InfoLabel>
              <AttendeeBadges>
                {moim.attendees.slice(0, 3).map((attendee, index) => (
                  <AttendeeImg
                    key={attendee.id}
                    src={attendee.image}
                    alt={attendee.name}
                    style={{ left: `${index * 20}px` }}
                  />
                ))}
                {moim.attendees.length > 3 && (
                  <AttendeeCount theme={theme}>
                    +{moim.attendees.length - 3}
                  </AttendeeCount>
                )}
              </AttendeeBadges>
            </InfoRow>
          </InfoSection>

          <DescriptionSection>
            <DescriptionTitle theme={theme}>모임 소개</DescriptionTitle>
            <DescriptionText theme={theme}>{moim.description}</DescriptionText>
          </DescriptionSection>

          <TagsSection>
            <TagsTitle theme={theme}>태그</TagsTitle>
            <TagsContainer>
              {moim.tags.map((tag, index) => (
                <Tag key={index} theme={theme}>
                  #{tag}
                </Tag>
              ))}
            </TagsContainer>
          </TagsSection>
        </ModalBody>

        <ModalFooter theme={theme}>
          <Button variant="light" onClick={onClose}>
            닫기
          </Button>
          <Button variant="primary">참여하기</Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MoimDetailModal;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.surface};
  border-radius: 16px;
  max-width: 600px;
  width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 24px;
  border: 1px solid ${(props) => props.theme.borderLight};

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
  padding: 24px;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
  transition: border-color 0.3s ease;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 16px;
`;

const ModalTitle = styled.h1`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 16px;
  transition: color 0.3s ease;
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
  color: ${(props) => props.theme.textTertiary};
  font-size: 14px;
  margin-left: 12px;
  transition: color 0.3s ease;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.textPrimary};
  }
`;

const ModalBody = styled.div`
  padding: 24px;
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
  color: ${(props) => props.theme.textPrimary};
  font-size: 14px;
  transition: color 0.3s ease;
`;

const CreatorDate = styled.span`
  color: ${(props) => props.theme.textTertiary};
  font-size: 12px;
  transition: color 0.3s ease;
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
  color: ${(props) => props.theme.textSecondary};
  min-width: 80px;
  font-size: 14px;
  transition: color 0.3s ease;
`;

const InfoValue = styled.span`
  color: ${(props) => props.theme.textPrimary};
  font-size: 14px;
  transition: color 0.3s ease;
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
  border: 2px solid ${(props) => props.theme.surface};
  position: absolute;
  object-fit: cover;
`;

const AttendeeCount = styled.span`
  color: ${(props) => props.theme.textTertiary};
  font-size: 14px;
  margin-left: 12px;
  transition: color 0.3s ease;
`;

const DescriptionSection = styled.div`
  margin-bottom: 24px;
`;

const DescriptionTitle = styled.h2`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
  transition: color 0.3s ease;
`;

const DescriptionText = styled.p`
  color: ${(props) => props.theme.textSecondary};
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  transition: color 0.3s ease;
`;

const TagsSection = styled.div`
  margin-bottom: 24px;
`;

const TagsTitle = styled.h2`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
  transition: color 0.3s ease;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background: ${(props) => props.theme.tagBackground};
  color: ${(props) => props.theme.tagText};
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid ${(props) => props.theme.borderLight};
`;
