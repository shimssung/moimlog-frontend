import React from "react";
import { useRouter } from "next/router";

const Sidebar = ({ moimId, moimRole = "멤버", activeMenu = "chat" }) => {
  const router = useRouter();

  const menuItems = [
    { id: "chat", label: "채팅", icon: "💬", path: `/moim/${moimId}/chat` },
    {
      id: "schedule",
      label: "일정",
      icon: "📅",
      path: `/moim/${moimId}/schedule`,
    },
    { id: "board", label: "게시판", icon: "📝", path: `/moim/${moimId}/board` },
    {
      id: "members",
      label: "멤버",
      icon: "👥",
      path: `/moim/${moimId}/members`,
    },
    {
      id: "settings",
      label: "설정",
      icon: "⚙️",
      path: `/moim/${moimId}/settings`,
    },
  ];

  // 멤버 권한에 따라 메뉴 필터링
  const filteredMenuItems =
    moimRole === "운영자"
      ? menuItems
      : menuItems.filter((item) => item.id !== "settings");

  const handleMenuClick = (path) => {
    router.push(path);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <button 
          className="sidebar__back-button" 
          onClick={() => router.push("/MyPage")}
        >
          <span className="sidebar__back-icon">←</span>
          <span className="sidebar__back-text">돌아가기</span>
        </button>
      </div>

      <div className="sidebar__menu-list">
        {filteredMenuItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar__menu-item ${activeMenu === item.id ? 'sidebar__menu-item--active' : ''}`}
            onClick={() => handleMenuClick(item.path)}
          >
            <span className="sidebar__menu-icon">{item.icon}</span>
            <span className="sidebar__menu-label">{item.label}</span>
            {activeMenu === item.id && <div className="sidebar__active-indicator" />}
          </div>
        ))}
      </div>

      <div className="sidebar__footer">
        <span className="sidebar__footer-text">MoimLog</span>
      </div>
    </div>
  );
};

export default Sidebar;
