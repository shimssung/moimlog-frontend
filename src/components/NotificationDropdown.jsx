import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";

const dummyNotifications = [
  {
    id: 1,
    type: "moim_join",
    title: "새로운 멤버 가입",
    message: "김철수님이 시크릿 가든 북클럽에 가입했습니다.",
    date: "2024-03-15T14:30:00",
    isRead: false,
  },
  {
    id: 2,
    type: "moim_schedule",
    title: "모임 일정 알림",
    message: "내일 오후 2시에 정기 모임이 있습니다.",
    date: "2024-03-14T10:00:00",
    isRead: true,
  },
  {
    id: 3,
    type: "moim_comment",
    title: "새로운 댓글",
    message: "이영희님이 게시글에 댓글을 남겼습니다.",
    date: "2024-03-13T16:45:00",
    isRead: true,
  },
  {
    id: 4,
    type: "moim_invite",
    title: "모임 초대",
    message: "웹개발 스터디에 초대되었습니다.",
    date: "2024-03-12T09:15:00",
    isRead: false,
  },
];

const NotificationDropdown = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const dropdownRef = useRef(null);

  // 읽지 않은 알림 개수
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "방금 전";
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      return date.toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <NotificationContainer ref={dropdownRef}>
      <NotificationButton onClick={toggleDropdown} theme={theme}>
        <BellIcon theme={theme} />
        {unreadCount > 0 && (
          <NotificationBadge theme={theme}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </NotificationBadge>
        )}
      </NotificationButton>

      {isOpen && (
        <DropdownMenu theme={theme}>
          <DropdownHeader>
            <DropdownTitle theme={theme}>알림</DropdownTitle>
            {unreadCount > 0 && (
              <MarkAllReadButton onClick={markAllAsRead} theme={theme}>
                모두 읽음
              </MarkAllReadButton>
            )}
          </DropdownHeader>

          <NotificationList>
            {notifications.length === 0 ? (
              <EmptyState theme={theme}>알림이 없습니다.</EmptyState>
            ) : (
              notifications.slice(0, 5).map((notification) => (
                <NotificationItem
                  key={notification.id}
                  isRead={notification.isRead}
                  theme={theme}
                >
                  <NotificationContent>
                    <NotificationTitle theme={theme}>
                      {notification.title}
                    </NotificationTitle>
                    <NotificationMessage theme={theme}>
                      {notification.message}
                    </NotificationMessage>
                    <NotificationDate theme={theme}>
                      {formatDate(notification.date)}
                    </NotificationDate>
                  </NotificationContent>
                  <NotificationActions>
                    {!notification.isRead && (
                      <ActionButton
                        onClick={() => markAsRead(notification.id)}
                        theme={theme}
                      >
                        읽음
                      </ActionButton>
                    )}
                    <ActionButton
                      onClick={() => deleteNotification(notification.id)}
                      theme={theme}
                    >
                      삭제
                    </ActionButton>
                  </NotificationActions>
                </NotificationItem>
              ))
            )}
          </NotificationList>

          {notifications.length > 5 && (
            <Link href="/notification" passHref>
              <ViewAllButton theme={theme}>모든 알림 보기</ViewAllButton>
            </Link>
          )}
        </DropdownMenu>
      )}
    </NotificationContainer>
  );
};

export default NotificationDropdown;

const NotificationContainer = styled.div`
  position: relative;
`;

const NotificationButton = styled.button`
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

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 360px;
  max-height: 480px;
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
`;

const DropdownTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
`;

const MarkAllReadButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.buttonPrimary};
  font-size: 0.875rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.borderLight};
  }
`;

const NotificationList = styled.div`
  max-height: 360px;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
  background: ${(props) =>
    props.isRead ? props.theme.surface : props.theme.surfaceSecondary};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.borderLight};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NotificationTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
`;

const NotificationMessage = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.4;
`;

const NotificationDate = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textTertiary};
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 4px;
  align-items: flex-start;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.textTertiary};
  font-size: 0.75rem;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 3px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.borderLight};
    color: ${(props) => props.theme.textPrimary};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: ${(props) => props.theme.textTertiary};
  font-size: 0.875rem;
`;

const ViewAllButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  border-top: 1px solid ${(props) => props.theme.borderLight};
  color: ${(props) => props.theme.buttonPrimary};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  padding: 12px 16px;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.borderLight};
  }
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
