import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { useTheme } from "../../utils/ThemeContext";
import { useStore } from "../../stores/useStore";
import { useRouter } from "next/router";

const AdminDashboard = () => {
  const { theme } = useTheme();
  const { user } = useStore();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMoims: 0,
    totalReports: 0,
    activeUsers: 0,
    pendingReports: 0,
    todayNewUsers: 0,
    todayNewMoims: 0,
    systemStatus: "healthy",
  });

  // 관리자 권한 확인
  useEffect(() => {
    if (user.role !== "admin") {
      router.push("/");
      return;
    }
  }, [user.role, router]);

  // 더미 통계 데이터
  useEffect(() => {
    setStats({
      totalUsers: 1247,
      totalMoims: 89,
      totalReports: 12,
      activeUsers: 342,
      pendingReports: 5,
      todayNewUsers: 23,
      todayNewMoims: 7,
      systemStatus: "healthy",
    });
  }, []);

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <PageContainer theme={theme}>
      <Header />
      <Container>
        <PageHeader>
          <HeaderInfo>
            <PageTitle theme={theme}>관리자 대시보드</PageTitle>
            <PageSubtitle theme={theme}>
              MoimLog 플랫폼 전체 현황을 확인하세요
            </PageSubtitle>
          </HeaderInfo>
        </PageHeader>

        <StatsGrid>
          <StatCard theme={theme}>
            <StatLabel theme={theme}>전체 사용자</StatLabel>
            <StatRow>
              <StatIcon>👥</StatIcon>
              <StatContent>
                <StatNumber theme={theme}>{stats.totalUsers.toLocaleString()}명</StatNumber>
                <StatToday theme={theme}>+{stats.todayNewUsers}명 (오늘)</StatToday>
              </StatContent>
            </StatRow>
          </StatCard>

          <StatCard theme={theme}>
            <StatLabel theme={theme}>전체 모임</StatLabel>
            <StatRow>
              <StatIcon>🏠</StatIcon>
              <StatContent>
                <StatNumber theme={theme}>{stats.totalMoims.toLocaleString()}개</StatNumber>
                <StatToday theme={theme}>+{stats.todayNewMoims}개 (오늘)</StatToday>
              </StatContent>
            </StatRow>
          </StatCard>

          <StatCard theme={theme}>
            <StatLabel theme={theme}>전체 신고</StatLabel>
            <StatRow>
              <StatIcon>⚠️</StatIcon>
              <StatContent>
                <StatNumber theme={theme}>{stats.totalReports.toLocaleString()}건</StatNumber>
                <StatToday theme={theme}>+3건 (오늘)</StatToday>
              </StatContent>
            </StatRow>
          </StatCard>

          <StatCard theme={theme}>
            <StatLabel theme={theme}>활성 사용자</StatLabel>
            <StatRow>
              <StatIcon>🟢</StatIcon>
              <StatContent>
                <StatNumber theme={theme}>{stats.activeUsers.toLocaleString()}명</StatNumber>
              </StatContent>
            </StatRow>
          </StatCard>
        </StatsGrid>

        <QuickActions>
          <SectionTitle theme={theme}>빠른 관리</SectionTitle>
          <ActionGrid>
            <ActionCard onClick={() => handleNavigate("/admin/users")} theme={theme}>
              <ActionIcon>👤</ActionIcon>
              <ActionTitle theme={theme}>사용자 관리</ActionTitle>
              <ActionDesc theme={theme}>전체 사용자 조회 및 관리</ActionDesc>
            </ActionCard>

            <ActionCard onClick={() => handleNavigate("/admin/moims")} theme={theme}>
              <ActionIcon>🏠</ActionIcon>
              <ActionTitle theme={theme}>모임 관리</ActionTitle>
              <ActionDesc theme={theme}>전체 모임 조회 및 관리</ActionDesc>
            </ActionCard>

            <ActionCard onClick={() => handleNavigate("/admin/reports")} theme={theme}>
              <ActionIcon style={{ position: 'relative' }}>
                ⚠️
                {stats.pendingReports > 0 && (
                  <PendingBadge>{stats.pendingReports}</PendingBadge>
                )}
              </ActionIcon>
              <ActionTitle theme={theme}>신고 관리</ActionTitle>
              <ActionDesc theme={theme}>신고된 내용 처리</ActionDesc>
            </ActionCard>
          </ActionGrid>
        </QuickActions>

        <ChartSection>
          <SectionTitle theme={theme}>주요 지표 추이</SectionTitle>
          <ChartGrid>
            <ChartCard theme={theme}>
              <ChartHeader>
                <ChartTitle theme={theme}>사용자 증가율</ChartTitle>
                <ChartPeriod theme={theme}>최근 7일</ChartPeriod>
              </ChartHeader>
              <ChartContent>
                <ChartBar>
                  <ChartBarItem height="60%" theme={theme}></ChartBarItem>
                  <ChartBarItem height="75%" theme={theme}></ChartBarItem>
                  <ChartBarItem height="45%" theme={theme}></ChartBarItem>
                  <ChartBarItem height="90%" theme={theme}></ChartBarItem>
                  <ChartBarItem height="65%" theme={theme}></ChartBarItem>
                  <ChartBarItem height="80%" theme={theme}></ChartBarItem>
                  <ChartBarItem height="70%" theme={theme}></ChartBarItem>
                </ChartBar>
                <ChartLabels>
                  <ChartLabel theme={theme}>월</ChartLabel>
                  <ChartLabel theme={theme}>화</ChartLabel>
                  <ChartLabel theme={theme}>수</ChartLabel>
                  <ChartLabel theme={theme}>목</ChartLabel>
                  <ChartLabel theme={theme}>금</ChartLabel>
                  <ChartLabel theme={theme}>토</ChartLabel>
                  <ChartLabel theme={theme}>일</ChartLabel>
                </ChartLabels>
              </ChartContent>
            </ChartCard>

            <ChartCard theme={theme}>
              <ChartHeader>
                <ChartTitle theme={theme}>신고 트렌드</ChartTitle>
                <ChartPeriod theme={theme}>최근 7일</ChartPeriod>
              </ChartHeader>
              <ChartContent>
                <ChartBar>
                  <ChartBarItem height="30%" theme={theme} color="#ef4444"></ChartBarItem>
                  <ChartBarItem height="45%" theme={theme} color="#ef4444"></ChartBarItem>
                  <ChartBarItem height="25%" theme={theme} color="#ef4444"></ChartBarItem>
                  <ChartBarItem height="60%" theme={theme} color="#ef4444"></ChartBarItem>
                  <ChartBarItem height="35%" theme={theme} color="#ef4444"></ChartBarItem>
                  <ChartBarItem height="20%" theme={theme} color="#ef4444"></ChartBarItem>
                  <ChartBarItem height="40%" theme={theme} color="#ef4444"></ChartBarItem>
                </ChartBar>
                <ChartLabels>
                  <ChartLabel theme={theme}>월</ChartLabel>
                  <ChartLabel theme={theme}>화</ChartLabel>
                  <ChartLabel theme={theme}>수</ChartLabel>
                  <ChartLabel theme={theme}>목</ChartLabel>
                  <ChartLabel theme={theme}>금</ChartLabel>
                  <ChartLabel theme={theme}>토</ChartLabel>
                  <ChartLabel theme={theme}>일</ChartLabel>
                </ChartLabels>
              </ChartContent>
            </ChartCard>

            <ChartCard theme={theme}>
              <ChartHeader>
                <ChartTitle theme={theme}>모임 생성 추이</ChartTitle>
                <ChartPeriod theme={theme}>최근 7일</ChartPeriod>
              </ChartHeader>
              <ChartContent>
                <ChartBar>
                  <ChartBarItem height="50%" theme={theme} color="#10b981"></ChartBarItem>
                  <ChartBarItem height="65%" theme={theme} color="#10b981"></ChartBarItem>
                  <ChartBarItem height="40%" theme={theme} color="#10b981"></ChartBarItem>
                  <ChartBarItem height="75%" theme={theme} color="#10b981"></ChartBarItem>
                  <ChartBarItem height="55%" theme={theme} color="#10b981"></ChartBarItem>
                  <ChartBarItem height="85%" theme={theme} color="#10b981"></ChartBarItem>
                  <ChartBarItem height="60%" theme={theme} color="#10b981"></ChartBarItem>
                </ChartBar>
                <ChartLabels>
                  <ChartLabel theme={theme}>월</ChartLabel>
                  <ChartLabel theme={theme}>화</ChartLabel>
                  <ChartLabel theme={theme}>수</ChartLabel>
                  <ChartLabel theme={theme}>목</ChartLabel>
                  <ChartLabel theme={theme}>금</ChartLabel>
                  <ChartLabel theme={theme}>토</ChartLabel>
                  <ChartLabel theme={theme}>일</ChartLabel>
                </ChartLabels>
              </ChartContent>
            </ChartCard>
          </ChartGrid>
        </ChartSection>
      </Container>
    </PageContainer>
  );
};

export default AdminDashboard;

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 16px 60px 16px;
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
  transition: color 0.3s ease;
`;

const PageSubtitle = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
  transition: color 0.3s ease;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 12px;
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: ${(props) => props.theme.cardShadow};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const StatLabel = styled.div`
  position: absolute;
  top: 16px;
  left: 20px;
  font-size: 0.92rem;
  font-weight: 500;
  color: ${(props) => props.theme.textTertiary};
  letter-spacing: -0.5px;
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-top: 12px;
  margin-bottom: 18px;
  color: ${(props) => props.theme.textSecondary};
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StatNumber = styled.div`
  font-size: 2.1rem;
  font-weight: 700;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 4px;
  text-align: center;
`;

const StatToday = styled.div`
  font-size: 1rem;
  color: #3b82f6;
  font-weight: 600;
  text-align: center;
`;

const QuickActions = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 24px 0;
  transition: color 0.3s ease;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const ActionCard = styled.div`
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${(props) => props.theme.cardShadow};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: ${(props) => props.theme.buttonPrimary};
  }
`;

const ActionIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 16px;
`;

const ActionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 8px 0;
  transition: color 0.3s ease;
`;

const ActionDesc = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
  transition: color 0.3s ease;
`;

const ChartSection = styled.div``;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

const ChartCard = styled.div`
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  box-shadow: ${(props) => props.theme.cardShadow};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ChartTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
  transition: color 0.3s ease;
`;

const ChartPeriod = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
  transition: color 0.3s ease;
`;

const ChartContent = styled.div`
  position: relative;
`;

const ChartBar = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  height: 150px;
  padding: 20px 0;
  gap: 8px;
`;

const ChartBarItem = styled.div`
  flex: 1;
  height: ${(props) => props.height};
  background: ${(props) => props.color || props.theme.buttonPrimary};
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
  min-height: 10px;

  &:hover {
    opacity: 0.8;
    transform: scaleY(1.05);
  }
`;

const ChartLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 4px;
`;

const ChartLabel = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textSecondary};
  text-align: center;
  flex: 1;
`;

const PendingBadge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
`; 