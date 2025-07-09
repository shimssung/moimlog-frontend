import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Button from "../../../components/Button";

const MoimMembersPage = () => {
  const router = useRouter();
  const { id: moimId } = router.query;
  const [moimInfo, setMoimInfo] = useState(null);
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  // 더미 데이터
  useEffect(() => {
    if (moimId) {
      setMoimInfo({
        id: moimId,
        title: "북클럽: 시크릿 가든",
        image: "/img4.jpg",
        role: "운영자",
      });

      setMembers([
        {
          id: 1,
          name: "소피아",
          email: "sophia@example.com",
          image: "/img1.jpg",
          role: "운영자",
          joinDate: "2024-01-15",
          lastActive: "2024-03-18T10:30:00",
          status: "online",
        },
        {
          id: 2,
          name: "앨리스",
          email: "alice@example.com",
          image: "/img2.jpg",
          role: "멤버",
          joinDate: "2024-01-20",
          lastActive: "2024-03-18T09:15:00",
          status: "online",
        },
        {
          id: 3,
          name: "밥",
          email: "bob@example.com",
          image: "/img3.jpg",
          role: "멤버",
          joinDate: "2024-02-01",
          lastActive: "2024-03-17T16:45:00",
          status: "offline",
        },
        {
          id: 4,
          name: "캐롤",
          email: "carol@example.com",
          image: "/img4.jpg",
          role: "멤버",
          joinDate: "2024-02-10",
          lastActive: "2024-03-18T11:20:00",
          status: "online",
        },
        {
          id: 5,
          name: "데이비드",
          email: "david@example.com",
          image: "/img5.jpg",
          role: "멤버",
          joinDate: "2024-02-15",
          lastActive: "2024-03-16T14:30:00",
          status: "offline",
        },
        {
          id: 6,
          name: "이브",
          email: "eve@example.com",
          image: "/img6.jpg",
          role: "멤버",
          joinDate: "2024-03-01",
          lastActive: "2024-03-18T08:45:00",
          status: "online",
        },
      ]);
    }
  }, [moimId]);

  const getFilteredMembers = () => {
    switch (activeTab) {
      case "online":
        return members.filter((member) => member.status === "online");
      case "offline":
        return members.filter((member) => member.status === "offline");
      case "admin":
        return members.filter((member) => member.role === "운영자");
      default:
        return members;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "날짜 없음";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return "날짜 오류";
      }

      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("날짜 파싱 오류:", error);
      return "날짜 오류";
    }
  };

  const formatLastActive = (dateString) => {
    if (!dateString) return "활동 기록 없음";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return "날짜 오류";
      }

      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

      if (diffInHours < 1) return "방금 전";
      if (diffInHours < 24) return `${diffInHours}시간 전`;
      return formatDate(dateString);
    } catch (error) {
      console.error("날짜 파싱 오류:", error);
      return "날짜 오류";
    }
  };

  const handleRoleChange = (memberId, newRole) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
  };

  const handleRemoveMember = (memberId) => {
    if (
      typeof window !== "undefined" &&
      window.confirm("정말로 이 멤버를 제거하시겠습니까?")
    ) {
      setMembers((prev) => prev.filter((member) => member.id !== memberId));
    }
  };

  const handleExportMembers = () => {
    if (typeof window !== "undefined") {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "이름,이메일,역할,가입일,마지막 활동\n" +
        members
          .map(
            (member) =>
              `${member.name},${member.email},${member.role},${formatDate(
                member.joinDate
              )},${formatLastActive(member.lastActive)}`
          )
          .join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `모임_멤버_목록_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="moim-members-page">
      <Header />
      <div className="moim-members-content">
        <Sidebar moimId={moimId} moimRole={moimInfo?.role} activeMenu="members" />

        <div className="moim-members-main">
          <div className="page-header">
            <div className="header-info">
              <h1 className="page-title">멤버 관리</h1>
              <p className="page-subtitle">
                {moimInfo?.title}의 멤버들을 관리하세요
              </p>
            </div>
            <div className="header-actions">
              <button className="export-button" onClick={handleExportMembers}>
                <span className="button-icon">📊</span>
                멤버 목록 내보내기
              </button>
            </div>
          </div>

          <div className="tab-container">
            <button
              className={`tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              전체 ({members.length})
            </button>
            <button
              className={`tab ${activeTab === "online" ? "active" : ""}`}
              onClick={() => setActiveTab("online")}
            >
              온라인 ({members.filter((m) => m.status === "online").length})
            </button>
            <button
              className={`tab ${activeTab === "offline" ? "active" : ""}`}
              onClick={() => setActiveTab("offline")}
            >
              오프라인 ({members.filter((m) => m.status === "offline").length})
            </button>
            <button
              className={`tab ${activeTab === "admin" ? "active" : ""}`}
              onClick={() => setActiveTab("admin")}
            >
              운영자 ({members.filter((m) => m.role === "운영자").length})
            </button>
          </div>

          <div className="members-grid">
            {getFilteredMembers().map((member) => (
              <div key={member.id} className="member-card">
                <div className="member-header">
                  <div className="member-avatar">
                    <img src={member.image} alt={member.name} />
                    <span className={`status-dot ${member.status}`}></span>
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-email">{member.email}</p>
                    <span className={`role-badge ${member.role}`}>
                      {member.role}
                    </span>
                  </div>
                </div>
                <div className="member-details">
                  <div className="detail-item">
                    <span className="detail-label">가입일:</span>
                    <span className="detail-value">{formatDate(member.joinDate)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">마지막 활동:</span>
                    <span className="detail-value">{formatLastActive(member.lastActive)}</span>
                  </div>
                </div>
                {moimInfo?.role === "운영자" && member.role !== "운영자" && (
                  <div className="member-actions">
                    <select
                      className="role-select"
                      value={member.role}
                      onChange={(e) => handleRoleChange(member.id, e.target.value)}
                    >
                      <option value="멤버">멤버</option>
                      <option value="운영자">운영자</option>
                    </select>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      제거
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoimMembersPage;
