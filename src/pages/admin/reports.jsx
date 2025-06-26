import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { useTheme } from "../../utils/ThemeContext";
import { useStore } from "../../stores/useStore";
import { useRouter } from "next/router";

const AdminReports = () => {
  const { theme } = useTheme();
  const { user } = useStore();
  const router = useRouter();
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [selectedReports, setSelectedReports] = useState([]);

  // 관리자 권한 확인
  useEffect(() => {
    if (user.role !== "admin") {
      router.push("/");
      return;
    }
  }, [user.role, router]);

  // 더미 신고 데이터
  useEffect(() => {
    setReports([
      {
        id: 1,
        type: "user",
        targetId: 3,
        targetName: "박민수",
        reporterId: 1,
        reporterName: "김철수",
        reason: "부적절한 게시글",
        description: "다른 사용자에게 불쾌감을 주는 내용을 게시했습니다.",
        status: "pending",
        createdAt: "2024-03-15T10:30:00",
        priority: "high",
      },
      {
        id: 2,
        type: "moim",
        targetId: 3,
        targetName: "어반 플레이팅 모임",
        reporterId: 2,
        reporterName: "이영희",
        reason: "부적절한 모임명",
        description: "모임명이 부적절하고 다른 사용자에게 혐오감을 줍니다.",
        status: "pending",
        createdAt: "2024-03-14T15:20:00",
        priority: "medium",
      },
      {
        id: 3,
        type: "user",
        targetId: 5,
        targetName: "정현우",
        reporterId: 4,
        reporterName: "최지영",
        reason: "스팸 활동",
        description: "지속적으로 광고성 메시지를 보내고 있습니다.",
        status: "resolved",
        createdAt: "2024-03-13T09:15:00",
        resolvedAt: "2024-03-14T11:30:00",
        resolution: "사용자 경고 조치",
        priority: "low",
      },
      {
        id: 4,
        type: "moim",
        targetId: 5,
        targetName: "아트 스터디 그룹",
        reporterId: 1,
        reporterName: "김철수",
        reason: "부적절한 내용",
        description: "모임 내에서 부적절한 이미지가 공유되고 있습니다.",
        status: "pending",
        createdAt: "2024-03-15T08:45:00",
        priority: "high",
      },
      {
        id: 5,
        type: "user",
        targetId: 2,
        targetName: "이영희",
        reporterId: 3,
        reporterName: "박민수",
        reason: "허위 정보",
        description: "프로필에 허위 정보를 기재하고 있습니다.",
        status: "dismissed",
        createdAt: "2024-03-12T14:20:00",
        dismissedAt: "2024-03-13T10:15:00",
        dismissReason: "신고 내용이 근거가 없음",
        priority: "low",
      },
    ]);
  }, []);

  const handleReportAction = (reportId, action, resolution = "") => {
    setReports((prev) =>
      prev.map((report) => {
        if (report.id === reportId) {
          switch (action) {
            case "resolve":
              return {
                ...report,
                status: "resolved",
                resolvedAt: new Date().toISOString(),
                resolution,
              };
            case "dismiss":
              return {
                ...report,
                status: "dismissed",
                dismissedAt: new Date().toISOString(),
                reason: resolution,
              };
            default:
              return report;
          }
        }
        return report;
      })
    );
  };

  const handleBulkAction = (action) => {
    selectedReports.forEach((reportId) => {
      handleReportAction(reportId, action);
    });
    setSelectedReports([]);
  };

  const handleSelectReport = (reportId) => {
    setSelectedReports((prev) =>
      prev.includes(reportId)
        ? prev.filter((id) => id !== reportId)
        : [...prev, reportId]
    );
  };

  const filteredReports = reports.filter((report) => {
    return (
      filter === "all" ||
      (filter === "pending" && report.status === "pending") ||
      (filter === "resolved" && report.status === "resolved") ||
      (filter === "dismissed" && report.status === "dismissed")
    );
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <PageContainer theme={theme}>
      <Header />
      <Container>
        <PageHeader>
          <HeaderInfo>
            <PageTitle theme={theme}>신고 관리</PageTitle>
            <PageSubtitle theme={theme}>
              사용자 신고를 처리하고 관리하세요
            </PageSubtitle>
          </HeaderInfo>
          <BackButton onClick={() => router.push("/admin/dashboard")} theme={theme}>
            ← 대시보드로 돌아가기
          </BackButton>
        </PageHeader>

        <Controls>
          <FilterSection>
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
              theme={theme}
            >
              전체 ({reports.length})
            </FilterButton>
            <FilterButton
              active={filter === "pending"}
              onClick={() => setFilter("pending")}
              theme={theme}
            >
              대기중 ({reports.filter((r) => r.status === "pending").length})
            </FilterButton>
            <FilterButton
              active={filter === "resolved"}
              onClick={() => setFilter("resolved")}
              theme={theme}
            >
              처리완료 ({reports.filter((r) => r.status === "resolved").length})
            </FilterButton>
            <FilterButton
              active={filter === "dismissed"}
              onClick={() => setFilter("dismissed")}
              theme={theme}
            >
              기각 ({reports.filter((r) => r.status === "dismissed").length})
            </FilterButton>
          </FilterSection>
        </Controls>

        {selectedReports.length > 0 && (
          <BulkActions>
            <BulkInfo theme={theme}>
              {selectedReports.length}건 선택됨
            </BulkInfo>
            <BulkButtons>
              <Button
                variant="light"
                size="small"
                onClick={() => handleBulkAction("resolve")}
              >
                선택 처리
              </Button>
              <Button
                variant="light"
                size="small"
                onClick={() => handleBulkAction("dismiss")}
              >
                선택 기각
              </Button>
            </BulkButtons>
          </BulkActions>
        )}

        <ReportList>
          {filteredReports.map((report) => (
            <ReportCard key={report.id} theme={theme}>
              <CardHeader>
                <HeaderLeft>
                  <Checkbox
                    type="checkbox"
                    checked={selectedReports.includes(report.id)}
                    onChange={() => handleSelectReport(report.id)}
                    theme={theme}
                  />
                  <ReportType theme={theme}>
                    {report.type === "user" ? "👤 사용자" : "🏠 모임"}
                  </ReportType>
                  <PriorityBadge priority={report.priority} theme={theme}>
                    {report.priority === "high" ? "높음" : 
                     report.priority === "medium" ? "보통" : "낮음"}
                  </PriorityBadge>
                </HeaderLeft>
                <StatusBadge status={report.status} theme={theme}>
                  {report.status === "pending" ? "대기중" : 
                   report.status === "resolved" ? "처리완료" : "기각"}
                </StatusBadge>
              </CardHeader>

              <CardContent>
                <ReportInfo>
                  <InfoRow>
                    <InfoLabel theme={theme}>신고 대상:</InfoLabel>
                    <InfoValue theme={theme}>{report.targetName}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel theme={theme}>신고자:</InfoLabel>
                    <InfoValue theme={theme}>{report.reporterName}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel theme={theme}>신고 사유:</InfoLabel>
                    <InfoValue theme={theme}>{report.reason}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel theme={theme}>신고 내용:</InfoLabel>
                    <InfoValue theme={theme}>{report.description}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel theme={theme}>신고일시:</InfoLabel>
                    <InfoValue theme={theme}>{formatDate(report.createdAt)}</InfoValue>
                  </InfoRow>
                  {report.status === "resolved" && (
                    <InfoRow>
                      <InfoLabel theme={theme}>처리 결과:</InfoLabel>
                      <InfoValue theme={theme}>{report.resolution}</InfoValue>
                    </InfoRow>
                  )}
                  {report.status === "dismissed" && (
                    <InfoRow>
                      <InfoLabel theme={theme}>기각 사유:</InfoLabel>
                      <InfoValue theme={theme}>{report.dismissReason}</InfoValue>
                    </InfoRow>
                  )}
                </ReportInfo>
              </CardContent>

              {report.status === "pending" && (
                <CardActions>
                  <ActionButton
                    onClick={() => handleReportAction(report.id, "resolve", "경고 조치")}
                    theme={theme}
                  >
                    경고 조치
                  </ActionButton>
                  <ActionButton
                    onClick={() => handleReportAction(report.id, "resolve", "계정 정지")}
                    theme={theme}
                  >
                    계정 정지
                  </ActionButton>
                  <ActionButton
                    danger
                    onClick={() => handleReportAction(report.id, "dismiss", "신고 내용이 근거가 없음")}
                    theme={theme}
                  >
                    기각
                  </ActionButton>
                </CardActions>
              )}
            </ReportCard>
          ))}
        </ReportList>

        {filteredReports.length === 0 && (
          <EmptyState>
            <EmptyIcon>⚠️</EmptyIcon>
            <EmptyTitle theme={theme}>신고가 없습니다</EmptyTitle>
            <EmptyText theme={theme}>
              {filter === "pending" ? "처리 대기 중인 신고가 없습니다." : 
               filter === "resolved" ? "처리 완료된 신고가 없습니다." :
               filter === "dismissed" ? "기각된 신고가 없습니다." : 
               "등록된 신고가 없습니다."}
            </EmptyText>
          </EmptyState>
        )}
      </Container>
    </PageContainer>
  );
};

export default AdminReports;

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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  gap: 16px;
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

const BackButton = styled.button`
  background: ${(props) => props.theme.buttonSecondary};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.borderLight};
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 8px;
`;

const FilterButton = styled.button`
  background: ${(props) =>
    props.active ? props.theme.buttonPrimary : props.theme.buttonSecondary};
  color: ${(props) => (props.active ? "white" : props.theme.textSecondary)};
  border: 1px solid
    ${(props) =>
      props.active ? props.theme.buttonPrimary : props.theme.border};
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.active ? props.theme.buttonHover : props.theme.borderLight};
  }
`;

const BulkActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 8px;
  margin-bottom: 24px;
`;

const BulkInfo = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
`;

const BulkButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ReportList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReportCard = styled.div`
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: ${(props) => props.theme.cardShadow};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const ReportType = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  font-weight: 500;
`;

const PriorityBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.priority) {
      case "high": return "#ef444420";
      case "medium": return "#f59e0b20";
      case "low": return "#10b98120";
      default: return "#6b728020";
    }
  }};
  color: ${(props) => {
    switch (props.priority) {
      case "high": return "#ef4444";
      case "medium": return "#f59e0b";
      case "low": return "#10b981";
      default: return "#6b7280";
    }
  }};
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.status) {
      case "pending": return "#f59e0b20";
      case "resolved": return "#10b98120";
      case "dismissed": return "#6b728020";
      default: return "#6b728020";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "pending": return "#f59e0b";
      case "resolved": return "#10b981";
      case "dismissed": return "#6b7280";
      default: return "#6b7280";
    }
  }};
`;

const CardContent = styled.div`
  padding: 16px;
`;

const ReportInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  font-weight: 500;
  min-width: 80px;
`;

const InfoValue = styled.span`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textPrimary};
  flex: 1;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid ${(props) => props.theme.borderLight};
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  background: ${(props) =>
    props.danger ? props.theme.error + "20" : props.theme.buttonSecondary};
  color: ${(props) =>
    props.danger ? props.theme.error : props.theme.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.danger ? props.theme.error : props.theme.borderLight};
    color: ${(props) => (props.danger ? "white" : props.theme.textPrimary)};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 0;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 8px 0;
`;

const EmptyText = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
`; 