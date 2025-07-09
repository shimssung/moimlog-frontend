import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useStore } from "../../stores/useStore";
import { useRouter } from "next/router";

const AdminDashboard = () => {
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
    <div className="admin-dashboard-page-container">
      <Header />
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-page-header">
          <div className="admin-dashboard-header-info">
            <h1 className="admin-dashboard-page-title">관리자 대시보드</h1>
            <p className="admin-dashboard-page-subtitle">
              MoimLog 플랫폼 전체 현황을 확인하세요
            </p>
          </div>
        </div>

        <div className="admin-dashboard-stats-grid">
          <div className="admin-dashboard-stat-card">
            <div className="admin-dashboard-stat-label">전체 사용자</div>
            <div className="admin-dashboard-stat-row">
              <div className="admin-dashboard-stat-icon">👥</div>
              <div className="admin-dashboard-stat-content">
                <div className="admin-dashboard-stat-number">{stats.totalUsers.toLocaleString()}명</div>
                <div className="admin-dashboard-stat-today">+{stats.todayNewUsers}명 (오늘)</div>
              </div>
            </div>
          </div>

          <div className="admin-dashboard-stat-card">
            <div className="admin-dashboard-stat-label">전체 모임</div>
            <div className="admin-dashboard-stat-row">
              <div className="admin-dashboard-stat-icon">🏠</div>
              <div className="admin-dashboard-stat-content">
                <div className="admin-dashboard-stat-number">{stats.totalMoims.toLocaleString()}개</div>
                <div className="admin-dashboard-stat-today">+{stats.todayNewMoims}개 (오늘)</div>
              </div>
            </div>
          </div>

          <div className="admin-dashboard-stat-card">
            <div className="admin-dashboard-stat-label">전체 신고</div>
            <div className="admin-dashboard-stat-row">
              <div className="admin-dashboard-stat-icon">⚠️</div>
              <div className="admin-dashboard-stat-content">
                <div className="admin-dashboard-stat-number">{stats.totalReports.toLocaleString()}건</div>
                <div className="admin-dashboard-stat-today">+3건 (오늘)</div>
              </div>
            </div>
          </div>

          <div className="admin-dashboard-stat-card">
            <div className="admin-dashboard-stat-label">활성 사용자</div>
            <div className="admin-dashboard-stat-row">
              <div className="admin-dashboard-stat-icon">🟢</div>
              <div className="admin-dashboard-stat-content">
                <div className="admin-dashboard-stat-number">{stats.activeUsers.toLocaleString()}명</div>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-dashboard-quick-actions">
          <h2 className="admin-dashboard-section-title">빠른 관리</h2>
          <div className="admin-dashboard-action-grid">
            <div className="admin-dashboard-action-card" onClick={() => handleNavigate("/admin/users")}>
              <div className="admin-dashboard-action-icon">👤</div>
              <h3 className="admin-dashboard-action-title">사용자 관리</h3>
              <p className="admin-dashboard-action-desc">전체 사용자 조회 및 관리</p>
            </div>

            <div className="admin-dashboard-action-card" onClick={() => handleNavigate("/admin/moims")}>
              <div className="admin-dashboard-action-icon">🏠</div>
              <h3 className="admin-dashboard-action-title">모임 관리</h3>
              <p className="admin-dashboard-action-desc">전체 모임 조회 및 관리</p>
            </div>

            <div className="admin-dashboard-action-card" onClick={() => handleNavigate("/admin/reports")}>
              <div className="admin-dashboard-action-icon" style={{ position: 'relative' }}>
                ⚠️
                {stats.pendingReports > 0 && (
                  <div className="admin-dashboard-pending-badge">{stats.pendingReports}</div>
                )}
              </div>
              <h3 className="admin-dashboard-action-title">신고 관리</h3>
              <p className="admin-dashboard-action-desc">신고된 내용 처리</p>
            </div>
          </div>
        </div>

        <div className="admin-dashboard-chart-section">
          <h2 className="admin-dashboard-section-title">주요 지표 추이</h2>
          <div className="admin-dashboard-chart-grid">
            <div className="admin-dashboard-chart-card">
              <div className="admin-dashboard-chart-header">
                <h3 className="admin-dashboard-chart-title">사용자 증가율</h3>
                <p className="admin-dashboard-chart-period">최근 7일</p>
              </div>
              <div className="admin-dashboard-chart-content">
                <div className="admin-dashboard-chart-bar">
                  <div className="admin-dashboard-chart-bar-item" style={{ height: '60%' }}></div>
                  <div className="admin-dashboard-chart-bar-item" style={{ height: '75%' }}></div>
                  <div className="admin-dashboard-chart-bar-item" style={{ height: '45%' }}></div>
                  <div className="admin-dashboard-chart-bar-item" style={{ height: '90%' }}></div>
                  <div className="admin-dashboard-chart-bar-item" style={{ height: '65%' }}></div>
                  <div className="admin-dashboard-chart-bar-item" style={{ height: '80%' }}></div>
                  <div className="admin-dashboard-chart-bar-item" style={{ height: '70%' }}></div>
                </div>
                <div className="admin-dashboard-chart-labels">
                  <span className="admin-dashboard-chart-label">월</span>
                  <span className="admin-dashboard-chart-label">화</span>
                  <span className="admin-dashboard-chart-label">수</span>
                  <span className="admin-dashboard-chart-label">목</span>
                  <span className="admin-dashboard-chart-label">금</span>
                  <span className="admin-dashboard-chart-label">토</span>
                  <span className="admin-dashboard-chart-label">일</span>
                </div>
              </div>
            </div>

            <div className="admin-dashboard-chart-card">
              <div className="admin-dashboard-chart-header">
                <h3 className="admin-dashboard-chart-title">신고 트렌드</h3>
                <p className="admin-dashboard-chart-period">최근 7일</p>
              </div>
              <div className="admin-dashboard-chart-content">
                <div className="admin-dashboard-chart-bar">
                  <div className="admin-dashboard-chart-bar-item red" style={{ height: '30%' }}></div>
                  <div className="admin-dashboard-chart-bar-item red" style={{ height: '45%' }}></div>
                  <div className="admin-dashboard-chart-bar-item red" style={{ height: '25%' }}></div>
                  <div className="admin-dashboard-chart-bar-item red" style={{ height: '60%' }}></div>
                  <div className="admin-dashboard-chart-bar-item red" style={{ height: '35%' }}></div>
                  <div className="admin-dashboard-chart-bar-item red" style={{ height: '20%' }}></div>
                  <div className="admin-dashboard-chart-bar-item red" style={{ height: '40%' }}></div>
                </div>
                <div className="admin-dashboard-chart-labels">
                  <span className="admin-dashboard-chart-label">월</span>
                  <span className="admin-dashboard-chart-label">화</span>
                  <span className="admin-dashboard-chart-label">수</span>
                  <span className="admin-dashboard-chart-label">목</span>
                  <span className="admin-dashboard-chart-label">금</span>
                  <span className="admin-dashboard-chart-label">토</span>
                  <span className="admin-dashboard-chart-label">일</span>
                </div>
              </div>
            </div>

            <div className="admin-dashboard-chart-card">
              <div className="admin-dashboard-chart-header">
                <h3 className="admin-dashboard-chart-title">모임 생성 추이</h3>
                <p className="admin-dashboard-chart-period">최근 7일</p>
              </div>
              <div className="admin-dashboard-chart-content">
                <div className="admin-dashboard-chart-bar">
                  <div className="admin-dashboard-chart-bar-item green" style={{ height: '50%' }}></div>
                  <div className="admin-dashboard-chart-bar-item green" style={{ height: '65%' }}></div>
                  <div className="admin-dashboard-chart-bar-item green" style={{ height: '40%' }}></div>
                  <div className="admin-dashboard-chart-bar-item green" style={{ height: '75%' }}></div>
                  <div className="admin-dashboard-chart-bar-item green" style={{ height: '55%' }}></div>
                  <div className="admin-dashboard-chart-bar-item green" style={{ height: '85%' }}></div>
                  <div className="admin-dashboard-chart-bar-item green" style={{ height: '60%' }}></div>
                </div>
                <div className="admin-dashboard-chart-labels">
                  <span className="admin-dashboard-chart-label">월</span>
                  <span className="admin-dashboard-chart-label">화</span>
                  <span className="admin-dashboard-chart-label">수</span>
                  <span className="admin-dashboard-chart-label">목</span>
                  <span className="admin-dashboard-chart-label">금</span>
                  <span className="admin-dashboard-chart-label">토</span>
                  <span className="admin-dashboard-chart-label">일</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 