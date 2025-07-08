import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import Link from "next/link";
import { useStore } from "../stores/useStore";

const Header = () => {
  const { isDarkMode, toggleTheme, mounted, isAuthenticated, user } = useStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const handleThemeToggle = () => {
    console.log("Header: Theme toggle button clicked");
    console.log("Header: Current isDarkMode:", isDarkMode);
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
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link href="/" passHref>
            <h1 className="logo-text">MoimLog</h1>
          </Link>
        </div>
        <nav className="nav">
          <div className="nav-links">
            <Link href="/" className="nav-link">
              홈
            </Link>
            {/* 관리자가 아닌 경우에만 모임 찾기 표시 */}
            {user.role !== "admin" && (
              <Link href="/moim-list" className="nav-link">
                모임 찾기
              </Link>
            )}
          </div>
          <div className="button-group">
            <button className="theme-toggle-button" onClick={handleThemeToggle}>
              {mounted && (isDarkMode ? <SunIcon /> : <MoonIcon />)}
            </button>
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
                  <Link href="/notification" className="notification-button">
                    <BellIcon />
                    <span className="notification-badge">3</span>
                  </Link>
                )}
                
                {/* 관리자 버튼 */}
                {user.role === "admin" && (
                  <Link href="/admin/dashboard" className="admin-button">
                    관리
                  </Link>
                )}
                
                <div className="user-menu" ref={userMenuRef}>
                  <button className="user-button" onClick={toggleUserMenu}>
                    <div className="user-avatar">
                      {user.profileImage ? (
                        <img src={user.profileImage} alt={user.name} />
                      ) : (
                        <div className="user-initial">
                          {user.name ? user.name.charAt(0) : "U"}
                        </div>
                      )}
                    </div>
                    <span className="user-name">{user.name || "사용자"}</span>
                    <ChevronDownIcon isOpen={isUserMenuOpen} />
                  </button>
                  {isUserMenuOpen && (
                    <div className="user-dropdown">
                      {/* 관리자가 아닌 경우에만 마이페이지 표시 */}
                      {user.role !== "admin" && (
                        <Link href="/MyPage" className="user-dropdown-item">
                          마이페이지
                        </Link>
                      )}
                      <Link href="/settings" className="user-dropdown-item">
                        설정
                      </Link>
                      <div className="user-dropdown-divider" />
                      <button
                        className="user-dropdown-item"
                        onClick={() => useStore.getState().logout()}
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Button href="/login" variant="light" size="small">
                로그인 <UserIcon />
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

// 아이콘 컴포넌트들
const ChevronDownIcon = ({ isOpen }) => (
  <svg
    className={`chevron-down-icon ${isOpen ? 'open' : ''}`}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

const UserIcon = () => (
  <svg
    className="user-icon"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const SunIcon = () => (
  <svg
    className="sun-icon"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg
    className="moon-icon"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const BellIcon = () => (
  <svg
    className="bell-icon"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

export default Header;
