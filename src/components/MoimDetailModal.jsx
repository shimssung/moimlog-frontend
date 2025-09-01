import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useStore } from "../stores/useStore";
import { CATEGORY_LABELS } from "../utils/constants";
import { moimAPI } from "../api/moim";

const MoimDetailModal = ({ isOpen, onClose, moim, onJoin, isJoining }) => {
  const { theme } = useStore();
  const [userJoinStatus, setUserJoinStatus] = useState(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);

  // 모달이 열릴 때 사용자의 참여 상태 확인
  useEffect(() => {
    if (isOpen && moim) {
      checkUserJoinStatus();
    }
  }, [isOpen, moim]);

  // 사용자의 모임 참여 상태 확인
  const checkUserJoinStatus = async () => {
    if (!moim) return;

    setIsLoadingStatus(true);
    try {
      const response = await moimAPI.getMoimDetail(moim.id);
      if (response.success) {
        console.log("모임 상세 조회 성공 :", response.data);
        const moimData = response.data;
        setUserJoinStatus({
          isMember: moimData.isMember || false,
          userRole: moimData.userRole || null,
          joinStatus: moimData.joinStatus || null, // PENDING, ACTIVE, BANNED
        });
      }
    } catch (error) {
      console.error("참여 상태 확인 실패:", error);
      // 에러 시 기본값 설정
      setUserJoinStatus({
        isMember: false,
        userRole: null,
        joinStatus: null,
      });
    } finally {
      setIsLoadingStatus(false);
    }
  };

  if (!isOpen || !moim) return null;

  // 새로운 카테고리 구조에 맞춰 카테고리 라벨 가져오기
  const categoryLabel =
    CATEGORY_LABELS[moim.categoryId] || moim.category || "기타";

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
        {/* 모임 썸네일 섹션 */}
        <ThumbnailSection>
          <MoimThumbnail src={moim.thumbnail || "/img1.jpg"} alt={moim.title} />
        </ThumbnailSection>

        <ModalBody theme={theme}>
          {/* 모임 제목 및 기본 정보 */}
          <TitleSection>
            <TitleGroup>
              <ModalTitle theme={theme}>{moim.title}</ModalTitle>
              <OnlineStatus $isOnline={moim.onlineType === "online"}>
                {moim.onlineType === "online"
                  ? "온라인"
                  : moim.onlineType === "hybrid"
                  ? "하이브리드"
                  : "오프라인"}
              </OnlineStatus>
            </TitleGroup>
          </TitleSection>

          <CreatorSection>
            <CreatorInfo>
              <CreatorImage
                src={moim.creatorProfileImage || "/blank-profile.png"}
                alt={moim.createdBy}
              />
              <CreatorDetails>
                <CreatorName theme={theme}>
                  {moim.createdBy || "알 수 없음"}
                </CreatorName>
                <CreatorDate theme={theme}>
                  {new Date(moim.createdAt).toLocaleDateString("ko-KR")}
                </CreatorDate>
              </CreatorDetails>
            </CreatorInfo>
          </CreatorSection>

          <InfoSection>
            <InfoRow>
              <InfoLabel theme={theme}>카테고리</InfoLabel>
              <InfoValue theme={theme}>{categoryLabel}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel theme={theme}>위치</InfoLabel>
              <InfoValue theme={theme}>
                {moim.onlineType === "online"
                  ? "온라인"
                  : moim.onlineType === "hybrid"
                  ? "하이브리드"
                  : moim.location}
              </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel theme={theme}>현재 인원</InfoLabel>
              <InfoValue theme={theme}>
                {moim.currentMembers || 0}/{moim.maxMembers}명
              </InfoValue>
            </InfoRow>
            {userJoinStatus?.isMember &&
              userJoinStatus?.joinStatus === "PENDING" && (
                <InfoRow>
                  <InfoLabel theme={theme}>참여 상태</InfoLabel>
                  <InfoValue theme={theme}>
                    <StatusBadge $status="pending">승인 대기 중</StatusBadge>
                  </InfoValue>
                </InfoRow>
              )}
          </InfoSection>

          <DescriptionSection>
            <DescriptionTitle theme={theme}>모임 소개</DescriptionTitle>
            <DescriptionText theme={theme}>{moim.description}</DescriptionText>
          </DescriptionSection>

          <TagsSection>
            <TagsTitle theme={theme}>태그</TagsTitle>
            <TagsContainer>
              {moim.tags?.map((tag, index) => (
                <Tag key={index} theme={theme}>
                  #{tag}
                </Tag>
              ))}
            </TagsContainer>
          </TagsSection>
        </ModalBody>

        <ModalFooter theme={theme}>
          {isLoadingStatus ? (
            <Button variant="light" disabled fullWidth>
              로딩 중...
            </Button>
          ) : userJoinStatus?.isMember ? (
            userJoinStatus?.joinStatus === "PENDING" ? (
              <Button variant="warning" disabled fullWidth>
                승인 대기 중
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  onClose();
                  // 상세페이지로 이동
                  window.location.href = `/moim/${moim.id}`;
                }}
                fullWidth
              >
                모임 입장하기
              </Button>
            )
          ) : (
            <Button
              variant="primary"
              onClick={onJoin}
              disabled={isJoining}
              fullWidth
            >
              {isJoining ? "참여 중..." : "참여하기"}
            </Button>
          )}
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
  padding: 0;
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

const TitleSection = styled.div`
  margin-bottom: 24px;
`;

const ModalTitle = styled.h1`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 16px;
  transition: color 0.3s ease;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 8px;
`;

const OnlineStatus = styled.span`
  color: ${(props) => (props.$isOnline ? "#15803d" : "#b91c1c")};
  background: ${(props) => (props.$isOnline ? "#dcfce7" : "#fee2e2")};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ThumbnailSection = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  margin: 0 0 0 0;
  background-color: ${(props) => props.theme.surface};
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
  position: relative;
`;

const MoimThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CreatorSection = styled.div`
  margin-bottom: 24px;
  background: ${(props) => props.theme.surfaceSecondary};
  border-radius: 12px;
`;

const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CreatorImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const CreatorDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CreatorName = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  font-size: 16px;
  transition: color 0.3s ease;
`;

const CreatorDate = styled.span`
  color: ${(props) => props.theme.textTertiary};
  font-size: 14px;
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
  justify-content: stretch;
  padding: 24px;
  border-top: 1px solid ${(props) => props.theme.borderLight};
  gap: 0;
`;

const StatusBadge = styled.span`
  background: ${({ $status }) =>
    $status === "pending" ? "#fef3c7" : "#d1fae5"};
  color: ${({ $status }) => ($status === "pending" ? "#f59e0b" : "#10b981")};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;
