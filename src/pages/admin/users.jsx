import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { useStore } from "../../stores/useStore";
import { useRouter } from "next/router";

const AdminUsers = () => {
  const { user } = useStore();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // 관리자 권한 확인
  useEffect(() => {
    if (user.role !== "admin") {
      router.push("/");
      return;
    }
  }, [user.role, router]);

  // 더미 사용자 데이터
  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: "김철수",
        email: "kim@example.com",
        joinDate: "2024-01-15",
        lastActive: "2024-03-15T14:30:00",
        status: "active",
        role: "user",
        moimCount: 3,
        reportCount: 0,
      },
      {
        id: 2,
        name: "이영희",
        email: "lee@example.com",
        joinDate: "2024-02-20",
        lastActive: "2024-03-14T10:15:00",
        status: "active",
        role: "user",
        moimCount: 1,
        reportCount: 0,
      },
      {
        id: 3,
        name: "박민수",
        email: "park@example.com",
        joinDate: "2024-01-10",
        lastActive: "2024-03-10T16:45:00",
        status: "suspended",
        role: "user",
        moimCount: 0,
        reportCount: 2,
      },
      {
        id: 4,
        name: "최지영",
        email: "choi@example.com",
        joinDate: "2024-03-01",
        lastActive: "2024-03-15T09:20:00",
        status: "active",
        role: "user",
        moimCount: 2,
        reportCount: 0,
      },
      {
        id: 5,
        name: "정현우",
        email: "jung@example.com",
        joinDate: "2024-02-05",
        lastActive: "2024-03-12T11:30:00",
        status: "active",
        role: "user",
        moimCount: 4,
        reportCount: 1,
      },
    ]);
  }, []);

  const handleUserAction = (userId, action) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          switch (action) {
            case "suspend":
              return { ...user, status: "suspended" };
            case "activate":
              return { ...user, status: "active" };
            case "delete":
              return { ...user, status: "deleted" };
            default:
              return user;
          }
        }
        return user;
      })
    );
  };

  const handleBulkAction = (action) => {
    selectedUsers.forEach((userId) => {
      handleUserAction(userId, action);
    });
    setSelectedUsers([]);
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && user.status === "active") ||
      (filter === "suspended" && user.status === "suspended") ||
      (filter === "reported" && user.reportCount > 0);

    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

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

  const formatLastActive = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "방금 전";
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    return formatDate(dateString);
  };

  return (
    <div className="admin-users-page-container">
      <Header />
      <div className="admin-users-container">
        <div className="admin-users-page-header">
          <div className="admin-users-header-info">
            <h1 className="admin-users-page-title">사용자 관리</h1>
            <p className="admin-users-page-subtitle">
              전체 사용자를 조회하고 관리하세요
            </p>
          </div>
          <button className="admin-users-back-button" onClick={() => router.push("/admin/dashboard")}>
            ← 대시보드로 돌아가기
          </button>
        </div>

        <div className="admin-users-controls">
          <div className="admin-users-filter-section">
            <button
              className={`admin-users-filter-button ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              전체 ({users.length})
            </button>
            <button
              className={`admin-users-filter-button ${filter === "active" ? "active" : ""}`}
              onClick={() => setFilter("active")}
            >
              활성 ({users.filter((u) => u.status === "active").length})
            </button>
            <button
              className={`admin-users-filter-button ${filter === "suspended" ? "active" : ""}`}
              onClick={() => setFilter("suspended")}
            >
              정지 ({users.filter((u) => u.status === "suspended").length})
            </button>
            <button
              className={`admin-users-filter-button ${filter === "reported" ? "active" : ""}`}
              onClick={() => setFilter("reported")}
            >
              신고됨 ({users.filter((u) => u.reportCount > 0).length})
            </button>
          </div>

          <div className="admin-users-search-section">
            <input
              type="text"
              className="admin-users-search-input"
              placeholder="사용자 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {selectedUsers.length > 0 && (
          <div className="admin-users-bulk-actions">
            <div className="admin-users-bulk-info">
              {selectedUsers.length}명 선택됨
            </div>
            <div className="admin-users-bulk-buttons">
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

        <div className="admin-users-table">
          <div className="admin-users-table-header">
            <input
              type="checkbox"
              className="admin-users-checkbox"
              checked={selectedUsers.length === filteredUsers.length}
              onChange={handleSelectAll}
            />
            <div className="admin-users-header-cell">사용자</div>
            <div className="admin-users-header-cell">가입일</div>
            <div className="admin-users-header-cell">마지막 활동</div>
            <div className="admin-users-header-cell">모임 수</div>
            <div className="admin-users-header-cell">신고 수</div>
            <div className="admin-users-header-cell">상태</div>
            <div className="admin-users-header-cell">작업</div>
          </div>

          <div className="admin-users-table-body">
            {filteredUsers.map((user) => (
              <div key={user.id} className="admin-users-table-row">
                <div className="admin-users-table-cell">
                  <input
                    type="checkbox"
                    className="admin-users-checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </div>
                <div className="admin-users-table-cell">
                  <div className="admin-users-user-info">
                    <div className="admin-users-user-name">{user.name}</div>
                    <div className="admin-users-user-email">{user.email}</div>
                  </div>
                </div>
                <div className="admin-users-table-cell">{formatDate(user.joinDate)}</div>
                <div className="admin-users-table-cell">{formatLastActive(user.lastActive)}</div>
                <div className="admin-users-table-cell">{user.moimCount}개</div>
                <div className="admin-users-table-cell">{user.reportCount}건</div>
                <div className="admin-users-table-cell">
                  <span className={`admin-users-status-badge ${user.status}`}>
                    {user.status === "active" ? "활성" : "정지"}
                  </span>
                </div>
                <div className="admin-users-table-cell">
                  <div className="admin-users-action-buttons">
                    {user.status === "active" ? (
                      <button
                        className="admin-users-action-button"
                        onClick={() => handleUserAction(user.id, "suspend")}
                      >
                        정지
                      </button>
                    ) : (
                      <button
                        className="admin-users-action-button"
                        onClick={() => handleUserAction(user.id, "activate")}
                      >
                        활성화
                      </button>
                    )}
                    <button
                      className="admin-users-action-button danger"
                      onClick={() => handleUserAction(user.id, "delete")}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="admin-users-empty-state">
            <div className="admin-users-empty-icon">👥</div>
            <h3 className="admin-users-empty-title">사용자가 없습니다</h3>
            <p className="admin-users-empty-text">
              {searchTerm ? "검색 결과가 없습니다." : "등록된 사용자가 없습니다."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers; 