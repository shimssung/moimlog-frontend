import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTheme } from "../utils/ThemeContext";

const Sidebar = ({ moimId, moimRole = "멤버", activeMenu = "chat" }) => {
  const { theme } = useTheme();
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
    <SidebarContainer theme={theme}>
      <SidebarHeader theme={theme}>
        <BackButton onClick={() => router.push("/MyPage")} theme={theme}>
          <BackIcon>←</BackIcon>
          <BackText theme={theme}>돌아가기</BackText>
        </BackButton>
      </SidebarHeader>

      <MenuList>
        {filteredMenuItems.map((item) => (
          <MenuItem
            key={item.id}
            $active={activeMenu === item.id}
            onClick={() => handleMenuClick(item.path)}
            theme={theme}
          >
            <MenuIcon>{item.icon}</MenuIcon>
            <MenuLabel theme={theme}>{item.label}</MenuLabel>
            {activeMenu === item.id && <ActiveIndicator theme={theme} />}
          </MenuItem>
        ))}
      </MenuList>

      <SidebarFooter theme={theme}>
        <FooterText theme={theme}>MoimLog</FooterText>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: ${(props) => props.theme.surface};
  border-right: 1px solid ${(props) => props.theme.borderLight};
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 1px solid ${(props) => props.theme.borderLight};
  }
`;

const SidebarHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
  transition: border-color 0.3s ease;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.surfaceSecondary};
    color: ${(props) => props.theme.textPrimary};
  }
`;

const BackIcon = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const BackText = styled.span`
  transition: color 0.3s ease;
`;

const MenuList = styled.div`
  flex: 1;
  padding: 12px 0;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  background: ${({ $active, theme }) =>
    $active ? theme.surfaceSecondary : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.buttonPrimary : theme.textSecondary};

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.borderLight : theme.surfaceSecondary};
    color: ${({ $active, theme }) =>
      $active ? theme.buttonPrimary : theme.textPrimary};
  }
`;

const MenuIcon = styled.span`
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
`;

const MenuLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: ${(props) => props.theme.buttonPrimary};
  border-radius: 2px 0 0 2px;
  transition: background-color 0.3s ease;
`;

const SidebarFooter = styled.div`
  padding: 16px;
  border-top: 1px solid ${(props) => props.theme.borderLight};
  text-align: center;
  transition: border-color 0.3s ease;
`;

const FooterText = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.textTertiary};
  font-weight: 500;
  transition: color 0.3s ease;
`;
