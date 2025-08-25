import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import JoinRequestList from "../../../components/JoinRequestList";
import { useTheme } from "../../../utils/ThemeContext";
import { useStore } from "../../../stores/useStore";
import { moimAPI } from "../../../api/moim";
import toast from "react-hot-toast";

const JoinRequestsPage = () => {
  const router = useRouter();
  const { moimId } = router.query;
  const { theme } = useTheme();
  const { user, moim } = useStore();
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (moimId && user && moim) {
      fetchUserRole();
    }
  }, [moimId, user, moim]);

  const fetchUserRole = async () => {
    try {
      setIsLoading(true);
      // 사용자의 모임 내 역할 조회
      const response = await moimAPI.getMoimDetail(moimId);
      if (response.success) {
        // 모임 생성자인지 확인
        if (response.data.created_by === user.id) {
          setUserRole("ADMIN");
        } else {
          // 멤버 테이블에서 역할 조회 (실제로는 별도 API 필요)
          // 임시로 기본값 설정
          setUserRole("MEMBER");
        }
      }
    } catch (error) {
      console.error("사용자 역할 조회 실패:", error);
      toast.error("사용자 정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    // 모임 정보 새로고침
    if (moim && moim.refresh) {
      moim.refresh();
    }
  };

  if (isLoading) {
    return (
      <PageContainer theme={theme}>
        <Header />
        <LoadingContainer>
          <LoadingMessage>로딩 중...</LoadingMessage>
        </LoadingContainer>
      </PageContainer>
    );
  }

  // 권한이 없는 경우
  if (userRole !== "ADMIN" && userRole !== "MODERATOR") {
    return (
      <PageContainer theme={theme}>
        <Header />
        <NoAccessContainer>
          <NoAccessMessage>
            <h2>접근 권한이 없습니다</h2>
            <p>모임 운영자만 참여신청을 관리할 수 있습니다.</p>
            <BackButton onClick={() => router.back()}>
              이전 페이지로 돌아가기
            </BackButton>
          </NoAccessMessage>
        </NoAccessContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer theme={theme}>
      <Header />
      <MainContent>
        <Sidebar 
          moimId={moimId} 
          moimRole={userRole === "ADMIN" || userRole === "MODERATOR" ? "운영자" : "멤버"} 
          activeMenu="join-requests" 
        />
        <ContentArea>
          <PageHeader>
            <PageTitle>참여신청 관리</PageTitle>
            <PageDescription>
              모임 참여 신청을 승인하거나 거절할 수 있습니다.
            </PageDescription>
          </PageHeader>
          
          <JoinRequestList
            moimId={moimId}
            userRole={userRole}
            onRefresh={handleRefresh}
          />
        </ContentArea>
      </MainContent>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const MainContent = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;
`;

const PageDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  font-size: 1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
`;

const LoadingMessage = styled.div`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const NoAccessContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
`;

const NoAccessMessage = styled.div`
  text-align: center;
  padding: 48px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);

  h2 {
    margin: 0 0 16px 0;
    color: ${({ theme }) => theme.colors.error};
    font-size: 1.5rem;
  }

  p {
    margin: 0 0 24px 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1rem;
  }
`;

const BackButton = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export default JoinRequestsPage;
