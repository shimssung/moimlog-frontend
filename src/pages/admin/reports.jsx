import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { useStore } from "../../stores/useStore";
import { useRouter } from "next/router";

const AdminReports = () => {
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
    <div className="admin-reports-page-container">
      <Header />
      <div className="admin-reports-container">
        <div className="admin-reports-page-header">
          <div className="admin-reports-header-info">
            <h1 className="admin-reports-page-title">신고 관리</h1>
            <p className="admin-reports-page-subtitle">
              사용자 신고를 처리하고 관리하세요
            </p>
          </div>
          <button className="admin-reports-back-button" onClick={() => router.push("/admin/dashboard")}>
            ← 대시보드로 돌아가기
          </button>
        </div>

        <div className="admin-reports-controls">
          <div className="admin-reports-filter-section">
            <button
              className={`admin-reports-filter-button ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              전체 ({reports.length})
            </button>
            <button
              className={`admin-reports-filter-button ${filter === "pending" ? "active" : ""}`}
              onClick={() => setFilter("pending")}
            >
              대기중 ({reports.filter((r) => r.status === "pending").length})
            </button>
            <button
              className={`admin-reports-filter-button ${filter === "resolved" ? "active" : ""}`}
              onClick={() => setFilter("resolved")}
            >
              처리완료 ({reports.filter((r) => r.status === "resolved").length})
            </button>
            <button
              className={`admin-reports-filter-button ${filter === "dismissed" ? "active" : ""}`}
              onClick={() => setFilter("dismissed")}
            >
              기각 ({reports.filter((r) => r.status === "dismissed").length})
            </button>
          </div>
        </div>

        {selectedReports.length > 0 && (
          <div className="admin-reports-bulk-actions">
            <div className="admin-reports-bulk-info">
              {selectedReports.length}건 선택됨
            </div>
            <div className="admin-reports-bulk-buttons">
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
            </div>
          </div>
        )}

        <div className="admin-reports-list">
          {filteredReports.map((report) => (
            <div key={report.id} className="admin-reports-card">
              <div className="admin-reports-card-header">
                <div className="admin-reports-header-left">
                  <input
                    type="checkbox"
                    className="admin-reports-checkbox"
                    checked={selectedReports.includes(report.id)}
                    onChange={() => handleSelectReport(report.id)}
                  />
                  <div className="admin-reports-type">
                    {report.type === "user" ? "👤 사용자" : "🏠 모임"}
                  </div>
                  <span className={`admin-reports-priority-badge ${report.priority}`}>
                    {report.priority === "high" ? "높음" : 
                     report.priority === "medium" ? "보통" : "낮음"}
                  </span>
                </div>
                <span className={`admin-reports-status-badge ${report.status}`}>
                  {report.status === "pending" ? "대기중" : 
                   report.status === "resolved" ? "처리완료" : "기각"}
                </span>
              </div>

              <div className="admin-reports-card-content">
                <div className="admin-reports-info">
                  <div className="admin-reports-info-row">
                    <span className="admin-reports-info-label">신고 대상:</span>
                    <span className="admin-reports-info-value">{report.targetName}</span>
                  </div>
                  <div className="admin-reports-info-row">
                    <span className="admin-reports-info-label">신고자:</span>
                    <span className="admin-reports-info-value">{report.reporterName}</span>
                  </div>
                  <div className="admin-reports-info-row">
                    <span className="admin-reports-info-label">신고 사유:</span>
                    <span className="admin-reports-info-value">{report.reason}</span>
                  </div>
                  <div className="admin-reports-info-row">
                    <span className="admin-reports-info-label">신고 내용:</span>
                    <span className="admin-reports-info-value">{report.description}</span>
                  </div>
                  <div className="admin-reports-info-row">
                    <span className="admin-reports-info-label">신고일시:</span>
                    <span className="admin-reports-info-value">{formatDate(report.createdAt)}</span>
                  </div>
                  {report.status === "resolved" && (
                    <div className="admin-reports-info-row">
                      <span className="admin-reports-info-label">처리 결과:</span>
                      <span className="admin-reports-info-value">{report.resolution}</span>
                    </div>
                  )}
                  {report.status === "dismissed" && (
                    <div className="admin-reports-info-row">
                      <span className="admin-reports-info-label">기각 사유:</span>
                      <span className="admin-reports-info-value">{report.dismissReason}</span>
                    </div>
                  )}
                </div>
              </div>

              {report.status === "pending" && (
                <div className="admin-reports-card-actions">
                  <button
                    className="admin-reports-action-button"
                    onClick={() => handleReportAction(report.id, "resolve", "경고 조치")}
                  >
                    경고 조치
                  </button>
                  <button
                    className="admin-reports-action-button"
                    onClick={() => handleReportAction(report.id, "resolve", "계정 정지")}
                  >
                    계정 정지
                  </button>
                  <button
                    className="admin-reports-action-button danger"
                    onClick={() => handleReportAction(report.id, "dismiss", "신고 내용이 근거가 없음")}
                  >
                    기각
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="admin-reports-empty-state">
            <div className="admin-reports-empty-icon">⚠️</div>
            <h3 className="admin-reports-empty-title">신고가 없습니다</h3>
            <p className="admin-reports-empty-text">
              {filter === "pending" ? "처리 대기 중인 신고가 없습니다." : 
               filter === "resolved" ? "처리 완료된 신고가 없습니다." :
               filter === "dismissed" ? "기각된 신고가 없습니다." : 
               "등록된 신고가 없습니다."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReports; 