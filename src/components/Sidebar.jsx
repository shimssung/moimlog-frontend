import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const Sidebar = ({ moimId, moimRole = "멤버", activeMenu = "chat" }) => {
  const router = useRouter();

  const menuItems = [
    { id: "chat", label: "채팅", icon: "💬", path: `/moim/${moimId}/chat` },
    { id: "schedule", label: "일정", icon: "📅", path: `/moim/${moimId}/schedule` },
    { id: "board", label: "게시판", icon: "📝", path: `/moim/${moimId}/board` },
    { id: "members", label: "멤버", icon: "👥", path: `/moim/${moimId}/members` },
    { id: "settings", label: "설정", icon: "⚙️", path: `/moim/${moimId}/settings` },
  ];

  // 멤버 권한에 따라 메뉴 필터링
  const filteredMenuItems = moimRole === "운영자" 
    ? menuItems 
    : menuItems.filter(item => item.id !== "settings");

  const handleMenuClick = (path) => {
    router.push(path);
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <BackButton onClick={() => router.push("/my-moims")}>
          <BackIcon>←</BackIcon>
          <BackText>내 모임</BackText>
        </BackButton>
      </SidebarHeader>

      <MenuList>
        {filteredMenuItems.map((item) => (
          <MenuItem
            key={item.id}
            $active={activeMenu === item.id}
            onClick={() => handleMenuClick(item.path)}
          >
            <MenuIcon>{item.icon}</MenuIcon>
            <MenuLabel>{item.label}</MenuLabel>
            {activeMenu === item.id && <ActiveIndicator />}
          </MenuItem>
        ))}
      </MenuList>

      <SidebarFooter>
        <FooterText>MoimLog</FooterText>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 280px;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #f3f4f6;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }
`;

const BackIcon = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const BackText = styled.span``;

const MenuList = styled.div`
  flex: 1;
  padding: 16px 0;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  background: ${props => props.$active ? "#f0f9ff" : "transparent"};
  color: ${props => props.$active ? "#0369a1" : "#6b7280"};

  &:hover {
    background: ${props => props.$active ? "#e0f2fe" : "#f9fafb"};
    color: ${props => props.$active ? "#0369a1" : "#111827"};
  }
`;

const MenuIcon = styled.span`
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
`;

const MenuLabel = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: #3b82f6;
  border-radius: 2px 0 0 2px;
`;

const SidebarFooter = styled.div`
  padding: 20px;
  border-top: 1px solid #f3f4f6;
  text-align: center;
`;

const FooterText = styled.span`
  font-size: 0.8rem;
  color: #9ca3af;
  font-weight: 500;
`; 