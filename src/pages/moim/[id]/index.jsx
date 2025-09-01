import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Button from "../../../components/Button";
import { useTheme } from "../../../utils/ThemeContext";
import { useStore } from "../../../stores/useStore";
import { moimAPI } from "../../../api/moim";
import toast from "react-hot-toast";

const MoimDetailPage = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { id: moimId } = router.query;
  const { isAuthenticated, accessToken } = useStore();

  const [moimInfo, setMoimInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  // 인증 체크
  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      toast.error("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
  }, [isAuthenticated, accessToken, router]);

  // 모임 정보 로드
  useEffect(() => {
    const fetchMoimDetail = async () => {
      if (!moimId || !isAuthenticated) return;

      try {
        setIsLoading(true);
        const response = await moimAPI.getMoimDetail(moimId);

        if (response.success) {
          const moimData = response.data;

          // 참여하지 않은 사용자인 경우 모임 목록으로 리다이렉트
          if (!moimData.isMember) {
            toast.error("모임에 참여해야 접근할 수 있습니다.");
            router.push("/moim-list");
            return;
          }

          setMoimInfo(moimData);
        } else {
          toast.error("모임 정보를 불러올 수 없습니다.");
        }
      } catch (error) {
        console.error("모임 상세 정보 조회 실패:", error);
        toast.error(error.message || "모임 정보를 불러올 수 없습니다.");

        // 에러 발생 시 기본 데이터로 폴백 (개발용)
        setMoimInfo({
          id: moimId,
          title: "북클럽: 시크릿 가든",
          description:
            "함께 읽고 토론하는 독서 모임입니다. 매월 한 권의 책을 선정하여 깊이 있는 독서와 의미 있는 대화를 나눕니다.",
          categoryId: 3,
          categoryName: "독서/스터디",
          categoryLabel: "독서/스터디",
          categoryColor: "#3b82f6",
          tags: ["독서", "토론", "문학", "성장"], // 배열로 확실히 설정
          thumbnail: "/img4.jpg",
          maxMembers: 20,
          currentMembers: 15,
          isPrivate: false,
          isActive: true,
          onlineType: "OFFLINE",
          location: "서울시 강남구",
          locationDetail: "중앙 도서관 3층 세미나실",
          createdBy: 123,
          creatorName: "소피아",
          creatorProfileImage: "/img1.jpg",
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:00:00Z",
          isMember: true,
          userRole: "MEMBER",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoimDetail();
  }, [moimId, isAuthenticated, router]);

  // 모임 참여
  const handleJoinMoim = async () => {
    if (!moimInfo) return;

    setIsJoining(true);
    try {
      const response = await moimAPI.joinMoim(moimId);

      if (response.success) {
        setMoimInfo((prev) => ({
          ...prev,
          isMember: true,
          userRole: "MEMBER",
          currentMembers: prev.currentMembers + 1,
        }));
        toast.success("모임에 성공적으로 참여했습니다!");
      } else {
        toast.error(response.message || "모임 참여에 실패했습니다.");
      }
    } catch (error) {
      console.error("모임 참여 실패:", error);
      toast.error(error.message || "모임 참여에 실패했습니다.");
    } finally {
      setIsJoining(false);
    }
  };

  // 모임 탈퇴
  const handleLeaveMoim = async () => {
    if (!moimInfo) return;

    setIsLeaving(true);
    try {
      const response = await moimAPI.leaveMoim(moimId);

      if (response.success) {
        setMoimInfo((prev) => ({
          ...prev,
          isMember: false,
          userRole: null,
          currentMembers: prev.currentMembers - 1,
        }));
        toast.success("모임에서 탈퇴했습니다.");
      } else {
        toast.error(response.message || "모임 탈퇴에 실패했습니다.");
      }
    } catch (error) {
      console.error("모임 탈퇴 실패:", error);
      toast.error(error.message || "모임 탈퇴에 실패했습니다.");
    } finally {
      setIsLeaving(false);
    }
  };

  // 로딩 중일 때
  if (isLoading) {
    return (
      <PageContainer theme={theme}>
        <Header />
        <LoadingContainer>
          <LoadingText theme={theme}>모임 정보를 불러오는 중...</LoadingText>
        </LoadingContainer>
      </PageContainer>
    );
  }

  // 모임 정보가 없을 때
  if (!moimInfo) {
    return (
      <PageContainer theme={theme}>
        <Header />
        <ErrorContainer>
          <ErrorText theme={theme}>모임을 찾을 수 없습니다.</ErrorText>
          <Button onClick={() => router.push("/moim-list")} variant="primary">
            모임 목록으로 돌아가기
          </Button>
        </ErrorContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer theme={theme}>
      <Header />
      <ContentContainer>
        <Sidebar
          moimId={moimId}
          moimRole={moimInfo.userRole === "ADMIN" ? "운영자" : "멤버"}
          activeMenu="overview"
        />

        <MainContent theme={theme}>
          {/* 모임 헤더 섹션 */}
          <MoimHeader theme={theme}>
            <HeaderLeft>
              <MoimThumbnail src={moimInfo.thumbnail} alt={moimInfo.title} />
              <HeaderInfo>
                <MoimTitle theme={theme}>{moimInfo.title}</MoimTitle>
                <MoimMeta theme={theme}>
                  <CategoryBadge
                    style={{ backgroundColor: moimInfo.categoryColor }}
                  >
                    {moimInfo.categoryLabel}
                  </CategoryBadge>
                  <OnlineStatus $isOnline={moimInfo.onlineType === "ONLINE"}>
                    {moimInfo.onlineType === "ONLINE"
                      ? "온라인"
                      : moimInfo.onlineType === "HYBRID"
                      ? "하이브리드"
                      : "오프라인"}
                  </OnlineStatus>
                  <MemberCount theme={theme}>
                    {moimInfo.currentMembers}/{moimInfo.maxMembers}명
                  </MemberCount>
                </MoimMeta>
              </HeaderInfo>
            </HeaderLeft>

            <HeaderRight>
              {moimInfo.isMember ? (
                <Button
                  variant="danger"
                  onClick={handleLeaveMoim}
                  disabled={isLeaving}
                >
                  {isLeaving ? "탈퇴 중..." : "모임 탈퇴"}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleJoinMoim}
                  disabled={isJoining}
                >
                  {isJoining ? "참여 중..." : "모임 참여"}
                </Button>
              )}
            </HeaderRight>
          </MoimHeader>

          {/* 모임 소개 섹션 */}
          <MoimDescription theme={theme}>
            <DescriptionTitle theme={theme}>모임 소개</DescriptionTitle>
            <DescriptionText theme={theme}>
              {moimInfo.description}
            </DescriptionText>
          </MoimDescription>

          {/* 모임 정보 섹션 */}
          <MoimInfoSection theme={theme}>
            <InfoTitle theme={theme}>모임 정보</InfoTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel theme={theme}>생성자</InfoLabel>
                <InfoValue theme={theme}>
                  <CreatorInfo>
                    <CreatorImage
                      src={moimInfo.creatorProfileImage}
                      alt={moimInfo.creatorName}
                    />
                    <CreatorName theme={theme}>
                      {moimInfo.creatorName}
                    </CreatorName>
                  </CreatorInfo>
                </InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel theme={theme}>생성일</InfoLabel>
                <InfoValue theme={theme}>
                  {new Date(moimInfo.createdAt).toLocaleDateString("ko-KR")}
                </InfoValue>
              </InfoItem>

              {moimInfo.onlineType !== "ONLINE" && (
                <InfoItem>
                  <InfoLabel theme={theme}>활동 지역</InfoLabel>
                  <InfoValue theme={theme}>
                    {moimInfo.location}
                    {moimInfo.locationDetail && (
                      <LocationDetail theme={theme}>
                        {moimInfo.locationDetail}
                      </LocationDetail>
                    )}
                  </InfoValue>
                </InfoItem>
              )}

              <InfoItem>
                <InfoLabel theme={theme}>태그</InfoLabel>
                <InfoValue theme={theme}>
                  <TagsContainer>
                    {Array.isArray(moimInfo.tags) &&
                    moimInfo.tags.length > 0 ? (
                      moimInfo.tags.map((tag, index) => (
                        <Tag key={index} theme={theme}>
                          #{tag}
                        </Tag>
                      ))
                    ) : (
                      <NoTagsMessage theme={theme}>
                        태그가 없습니다
                      </NoTagsMessage>
                    )}
                  </TagsContainer>
                </InfoValue>
              </InfoItem>
            </InfoGrid>
          </MoimInfoSection>

          {/* 빠른 액션 섹션 */}
          <QuickActions theme={theme}>
            <ActionTitle theme={theme}>빠른 액션</ActionTitle>
            <ActionButtons>
              <Button
                variant="secondary"
                onClick={() => router.push(`/moim/${moimId}/board`)}
              >
                📝 게시판 보기
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push(`/moim/${moimId}/schedule`)}
              >
                📅 일정 보기
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push(`/moim/${moimId}/members`)}
              >
                👥 멤버 보기
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push(`/moim/${moimId}/chat`)}
              >
                💬 채팅 참여
              </Button>
              {/* 운영자만 참여신청 관리 표시 */}
              {(moimInfo.userRole === "ADMIN" ||
                moimInfo.userRole === "MODERATOR") && (
                <Button
                  variant="primary"
                  onClick={() => router.push(`/moim/${moimId}/join-requests`)}
                >
                  📋 참여신청 관리
                </Button>
              )}
            </ActionButtons>
          </QuickActions>
        </MainContent>
      </ContentContainer>
    </PageContainer>
  );
};

export default MoimDetailPage;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const ContentContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 80px); // 헤더 높이를 뺀 높이
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 32px;
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 16px;
  }
`;

const MoimHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  padding: 24px;
  background: ${(props) => props.theme.surface};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const MoimThumbnail = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 16px;
  object-fit: cover;
  border: 2px solid ${(props) => props.theme.borderLight};
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MoimTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
  transition: color 0.3s ease;
`;

const MoimMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const CategoryBadge = styled.span`
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
`;

const OnlineStatus = styled.span`
  color: ${(props) => (props.$isOnline ? "#15803d" : "#b91c1c")};
  background: ${(props) => (props.$isOnline ? "#dcfce7" : "#fee2e2")};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
`;

const MemberCount = styled.span`
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.3s ease;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 12px;
`;

const MoimDescription = styled.section`
  margin-bottom: 32px;
  padding: 24px;
  background: ${(props) => props.theme.surface};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const DescriptionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 16px 0;
  transition: color 0.3s ease;
`;

const DescriptionText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
  transition: color 0.3s ease;
`;

const MoimInfoSection = styled.section`
  margin-bottom: 32px;
  padding: 24px;
  background: ${(props) => props.theme.surface};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const InfoTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 20px 0;
  transition: color 0.3s ease;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.875rem;
  transition: color 0.3s ease;
`;

const InfoValue = styled.span`
  color: ${(props) => props.theme.textPrimary};
  font-size: 0.875rem;
  transition: color 0.3s ease;
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

const CreatorName = styled.span`
  font-weight: 500;
  transition: color 0.3s ease;
`;

const LocationDetail = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textTertiary};
  margin-top: 4px;
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
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
`;

const NoTagsMessage = styled.span`
  color: ${(props) => props.theme.textTertiary};
  font-size: 0.875rem;
  font-style: italic;
`;

const QuickActions = styled.section`
  margin-bottom: 32px;
  padding: 24px;
  background: ${(props) => props.theme.surface};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const ActionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 20px 0;
  transition: color 0.3s ease;
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
`;

const LoadingText = styled.p`
  font-size: 1.125rem;
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.3s ease;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  gap: 16px;
`;

const ErrorText = styled.p`
  font-size: 1.125rem;
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.3s ease;
`;
