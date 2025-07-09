import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { useStore } from "../../stores/useStore";
import { useRouter } from "next/router";

const AdminMoims = () => {
  const { user } = useStore();
  const router = useRouter();
  const [moims, setMoims] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMoims, setSelectedMoims] = useState([]);

  // 관리자 권한 확인
  useEffect(() => {
    if (user.role !== "admin") {
      router.push("/");
      return;
    }
  }, [user.role, router]);

  // 더미 모임 데이터
  useEffect(() => {
    setMoims([
      {
        id: 1,
        title: "북클럽: 시크릿 가든",
        category: "독서",
        creator: "김철수",
        memberCount: 12,
        maxMembers: 20,
        status: "active",
        createdAt: "2024-01-15",
        lastActivity: "2024-03-15T14:30:00",
        reportCount: 0,
        image: "/img4.jpg",
      },
      {
        id: 2,
        title: "웹앱 개발 모임",
        category: "개발",
        creator: "이영희",
        memberCount: 8,
        maxMembers: 15,
        status: "active",
        createdAt: "2024-02-20",
        lastActivity: "2024-03-14T10:15:00",
        reportCount: 0,
        image: "/img2.jpg",
      },
      {
        id: 3,
        title: "어반 플레이팅 모임",
        category: "요리",
        creator: "박민수",
        memberCount: 6,
        maxMembers: 12,
        status: "suspended",
        createdAt: "2024-01-10",
        lastActivity: "2024-03-10T16:45:00",
        reportCount: 2,
        image: "/img3.jpg",
      },
      {
        id: 4,
        title: "주말 축구 동호회",
        category: "스포츠",
        creator: "최지영",
        memberCount: 18,
        maxMembers: 22,
        status: "active",
        createdAt: "2024-03-01",
        lastActivity: "2024-03-15T09:20:00",
        reportCount: 0,
        image: "/img5.jpg",
      },
      {
        id: 5,
        title: "아트 스터디 그룹",
        category: "예술",
        creator: "정현우",
        memberCount: 9,
        maxMembers: 15,
        status: "active",
        createdAt: "2024-02-05",
        lastActivity: "2024-03-12T11:30:00",
        reportCount: 1,
        image: "/img7.jpg",
      },
    ]);
  }, []);

  const handleMoimAction = (moimId, action) => {
    setMoims((prev) =>
      prev.map((moim) => {
        if (moim.id === moimId) {
          switch (action) {
            case "suspend":
              return { ...moim, status: "suspended" };
            case "activate":
              return { ...moim, status: "active" };
            case "delete":
              return { ...moim, status: "deleted" };
            default:
              return moim;
          }
        }
        return moim;
      })
    );
  };

  const handleBulkAction = (action) => {
    selectedMoims.forEach((moimId) => {
      handleMoimAction(moimId, action);
    });
    setSelectedMoims([]);
  };

  const handleSelectMoim = (moimId) => {
    setSelectedMoims((prev) =>
      prev.includes(moimId)
        ? prev.filter((id) => id !== moimId)
        : [...prev, moimId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMoims.length === filteredMoims.length) {
      setSelectedMoims([]);
    } else {
      setSelectedMoims(filteredMoims.map((moim) => moim.id));
    }
  };

  const filteredMoims = moims.filter((moim) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && moim.status === "active") ||
      (filter === "suspended" && moim.status === "suspended") ||
      (filter === "reported" && moim.reportCount > 0);

    const matchesSearch =
      moim.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moim.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moim.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatLastActivity = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "방금 전";
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    return formatDate(dateString);
  };

  return (
    <div className="admin-moims-page-container">
      <Header />
      <div className="admin-moims-container">
        <div className="admin-moims-page-header">
          <div className="admin-moims-header-info">
            <h1 className="admin-moims-page-title">모임 관리</h1>
            <p className="admin-moims-page-subtitle">
              전체 모임을 조회하고 관리하세요
            </p>
          </div>
          <button className="admin-moims-back-button" onClick={() => router.push("/admin/dashboard")}>
            ← 대시보드로 돌아가기
          </button>
        </div>

        <div className="admin-moims-controls">
          <div className="admin-moims-filter-section">
            <button
              className={`admin-moims-filter-button ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              전체 ({moims.length})
            </button>
            <button
              className={`admin-moims-filter-button ${filter === "active" ? "active" : ""}`}
              onClick={() => setFilter("active")}
            >
              활성 ({moims.filter((m) => m.status === "active").length})
            </button>
            <button
              className={`admin-moims-filter-button ${filter === "suspended" ? "active" : ""}`}
              onClick={() => setFilter("suspended")}
            >
              정지 ({moims.filter((m) => m.status === "suspended").length})
            </button>
            <button
              className={`admin-moims-filter-button ${filter === "reported" ? "active" : ""}`}
              onClick={() => setFilter("reported")}
            >
              신고됨 ({moims.filter((m) => m.reportCount > 0).length})
            </button>
          </div>

          <div className="admin-moims-search-section">
            <input
              type="text"
              className="admin-moims-search-input"
              placeholder="모임 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {selectedMoims.length > 0 && (
          <div className="admin-moims-bulk-actions">
            <div className="admin-moims-bulk-info">
              {selectedMoims.length}개 선택됨
            </div>
            <div className="admin-moims-bulk-buttons">
              <Button
                variant="light"
                size="small"
                onClick={() => handleBulkAction("suspend")}
              >
                선택 정지
              </Button>
              <Button
                variant="light"
                size="small"
                onClick={() => handleBulkAction("activate")}
              >
                선택 활성화
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={() => handleBulkAction("delete")}
              >
                선택 삭제
              </Button>
            </div>
          </div>
        )}

        <div className="admin-moims-select-all-section">
          <input
            type="checkbox"
            className="admin-moims-select-all-checkbox"
            checked={selectedMoims.length === filteredMoims.length && filteredMoims.length > 0}
            onChange={handleSelectAll}
          />
          <span className="admin-moims-select-all-label">
            전체 선택 ({selectedMoims.length}/{filteredMoims.length})
          </span>
        </div>

        <div className="admin-moims-grid">
          {filteredMoims.map((moim) => (
            <div key={moim.id} className="admin-moims-card">
              <div className="admin-moims-card-header">
                <input
                  type="checkbox"
                  className="admin-moims-checkbox"
                  checked={selectedMoims.includes(moim.id)}
                  onChange={() => handleSelectMoim(moim.id)}
                />
                <span className={`admin-moims-status-badge ${moim.status}`}>
                  {moim.status === "active" ? "활성" : "정지"}
                </span>
              </div>

              <img className="admin-moims-image" src={moim.image} alt={moim.title} />
              
              <div className="admin-moims-card-content">
                <h3 className="admin-moims-title">{moim.title}</h3>
                <div className="admin-moims-category">{moim.category}</div>
                
                <div className="admin-moims-info">
                  <div className="admin-moims-info-item">
                    <span className="admin-moims-info-label">생성자:</span>
                    <span className="admin-moims-info-value">{moim.creator}</span>
                  </div>
                  <div className="admin-moims-info-item">
                    <span className="admin-moims-info-label">멤버:</span>
                    <span className="admin-moims-info-value">{moim.memberCount}/{moim.maxMembers}</span>
                  </div>
                  <div className="admin-moims-info-item">
                    <span className="admin-moims-info-label">생성일:</span>
                    <span className="admin-moims-info-value">{formatDate(moim.createdAt)}</span>
                  </div>
                  <div className="admin-moims-info-item">
                    <span className="admin-moims-info-label">마지막 활동:</span>
                    <span className="admin-moims-info-value">{formatLastActivity(moim.lastActivity)}</span>
                  </div>
                  <div className="admin-moims-info-item">
                    <span className="admin-moims-info-label">신고 수:</span>
                    <span className="admin-moims-info-value">{moim.reportCount}건</span>
                  </div>
                </div>
              </div>

              <div className="admin-moims-card-actions">
                {moim.status === "active" ? (
                  <button
                    className="admin-moims-action-button"
                    onClick={() => handleMoimAction(moim.id, "suspend")}
                  >
                    정지
                  </button>
                ) : (
                  <button
                    className="admin-moims-action-button"
                    onClick={() => handleMoimAction(moim.id, "activate")}
                  >
                    활성화
                  </button>
                )}
                <button
                  className="admin-moims-action-button danger"
                  onClick={() => handleMoimAction(moim.id, "delete")}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMoims.length === 0 && (
          <div className="admin-moims-empty-state">
            <div className="admin-moims-empty-icon">🏠</div>
            <h3 className="admin-moims-empty-title">모임이 없습니다</h3>
            <p className="admin-moims-empty-text">
              {searchTerm ? "검색 결과가 없습니다." : "등록된 모임이 없습니다."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMoims; 