import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useStore } from "../stores/useStore";

const Header = () => {
  const { theme, isDarkMode, toggleTheme, mounted, isAuthenticated, user } =
    useStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  // 사용자 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <StyledHeader theme={theme}>
      <HeaderContent>
        <Logo>
          <Link href="/" passHref>
            <LogoText theme={theme}>MoimLog</LogoText>
          </Link>
        </Logo>
        <Nav>
          <NavLinks>
            <NavLink href="/" theme={theme}>
              홈
            </NavLink>
            {/* 관리자가 아닌 경우에만 모임 찾기 표시 */}
            {user.role !== "admin" && (
              <NavLink href="/moim-list" theme={theme}>
                모임 찾기
              </NavLink>
            )}
          </NavLinks>
          <ButtonGroup>
            <ThemeToggleButton onClick={handleThemeToggle} theme={theme}>
              {mounted && (isDarkMode ? <SunIcon /> : <MoonIcon />)}
            </ThemeToggleButton>
            {/* 관리자가 아닌 경우에만 모임 만들기 버튼 표시 */}
            {user.role !== "admin" && (
              <Button href="/moim-create" variant="light" size="small">
                모임 만들기
              </Button>
            )}

            {/* 로그인된 경우 알림 버튼과 사용자 메뉴 표시 */}
            {isAuthenticated ? (
              <>
                {/* 관리자가 아닌 경우에만 알림 버튼 표시 */}
                {user.role !== "admin" && (
                  <NotificationButton href="/notification" theme={theme}>
                    <BellIcon theme={theme} />
                    <NotificationBadge theme={theme}>3</NotificationBadge>
                  </NotificationButton>
                )}

                {/* 관리자 버튼 */}
                {user.role === "admin" && (
                  <AdminButton href="/admin/dashboard" theme={theme}>
                    관리
                  </AdminButton>
                )}

                <UserMenu ref={userMenuRef}>
                  <UserButton onClick={toggleUserMenu} theme={theme}>
                    <UserAvatar theme={theme}>
                      {user.profileImage ? (
                        <img src={user.profileImage} alt={user.name} />
                      ) : (
                        <UserInitial>
                          {user.name ? user.name.charAt(0) : "U"}
                        </UserInitial>
                      )}
                    </UserAvatar>
                    <UserName theme={theme}>{user.name || "사용자"}</UserName>
                    <ChevronDownIcon theme={theme} isOpen={isUserMenuOpen} />
                  </UserButton>
                  {isUserMenuOpen && (
                    <UserDropdown theme={theme}>
                      {/* 관리자가 아닌 경우에만 마이페이지 표시 */}
                      {user.role !== "admin" && (
                        <UserDropdownItem href="/MyPage" theme={theme}>
                          마이페이지
                        </UserDropdownItem>
                      )}
                      <UserDropdownItem href="/settings" theme={theme}>
                        설정
                      </UserDropdownItem>
                      <UserDropdownDivider theme={theme} />
                      <UserDropdownItem
                        onClick={() => useStore.getState().logout()}
                        theme={theme}
                      >
                        로그아웃
                      </UserDropdownItem>
                    </UserDropdown>
                  )}
                </UserMenu>
              </>
            ) : (
              <Button href="/login" variant="light" size="small">
                로그인 <UserIcon theme={theme} />
              </Button>
            )}
          </ButtonGroup>
        </Nav>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.background};
  border-bottom: 1.5px solid ${(props) => props.theme.borderLight};
  padding: 0.5rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

const LogoText = styled.h1`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
  transition: color 0.3s ease;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${(props) => props.theme.textTertiary};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.textPrimary};
    border-bottom-color: ${(props) => props.theme.buttonPrimary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 0.5rem;
  align-items: center;
`;

const ThemeToggleButton = styled.button`
  background: ${(props) => props.theme.buttonSecondary};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: ${(props) => props.theme.textSecondary};

  &:hover {
    background: ${(props) => props.theme.borderLight};
    border-color: ${(props) => props.theme.border};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserButton = styled.button`
  background: ${(props) => props.theme.buttonSecondary};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  color: ${(props) => props.theme.textSecondary};

  &:hover {
    background: ${(props) => props.theme.borderLight};
    border-color: ${(props) => props.theme.border};
  }
`;

const UserAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${(props) => props.theme.buttonPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInitial = styled.span`
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 160px;
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 8px;
  overflow: hidden;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const UserDropdownItem = styled.a`
  display: block;
  padding: 12px 16px;
  color: ${(props) => props.theme.textPrimary};
  text-decoration: none;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.borderLight};
  }
`;

const UserDropdownDivider = styled.div`
  height: 1px;
  background: ${(props) => props.theme.borderLight};
  margin: 4px 0;
`;

const ChevronDownIcon = ({ theme, isOpen }) => (
  <svg
    width="14"
    height="14"
    fill="none"
    stroke={theme.textSecondary}
    strokeWidth="2"
    viewBox="0 0 24 24"
    style={{
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s ease",
    }}
  >
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

const UserIcon = ({ theme }) => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke={theme.textPrimary}
    strokeWidth="1.7"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" />
  </svg>
);

const SunIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const NotificationButton = styled(Link)`
  background: ${(props) => props.theme.buttonSecondary};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;
  color: ${(props) => props.theme.textSecondary};
  text-decoration: none;

  &:hover {
    background: ${(props) => props.theme.borderLight};
    border-color: ${(props) => props.theme.border};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: ${(props) => props.theme.error};
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  border: 2px solid ${(props) => props.theme.background};
`;

const BellIcon = ({ theme }) => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke={theme.textSecondary}
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const AdminButton = styled(Link)`
  background: ${(props) => props.theme.buttonSecondary};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: ${(props) => props.theme.textSecondary};
  text-decoration: none;
  margin-left: 0.5rem;

  &:hover {
    background: ${(props) => props.theme.borderLight};
    border-color: ${(props) => props.theme.border};
  }
`;

const AdminIcon = ({ theme }) => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke={theme.textPrimary}
    strokeWidth="1.7"
    viewBox="0 0 24 24"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8-8zm4-8c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4 4zm2 9c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4 4" />
  </svg>
);
