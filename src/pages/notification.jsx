import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import { useTheme } from "../utils/ThemeContext";

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
    type: "moim_update",
    title: "모임 정보 업데이트",
    message: "웹개발 스터디의 모임 정보가 업데이트되었습니다.",
    date: "2024-03-12T09:15:00",
    isRead: false,
  },
  {
    id: 5,
    type: "moim_schedule",
    title: "모임 일정 변경",
    message: "다음 주 모임 일정이 변경되었습니다.",
    date: "2024-03-11T15:20:00",
    isRead: true,
  },
  {
    id: 6,
    type: "moim_join",
    title: "새로운 멤버 가입",
    message: "박영희님이 러닝 크루에 가입했습니다.",
    date: "2024-03-10T11:30:00",
    isRead: true,
  },
  {
    id: 7,
    type: "moim_comment",
    title: "새로운 댓글",
    message: "최민수님이 공지사항에 댓글을 남겼습니다.",
    date: "2024-03-09T14:15:00",
    isRead: true,
  },
  {
    id: 8,
    type: "moim_update",
    title: "모임 정보 업데이트",
    message: "독서 모임의 모임 정보가 업데이트되었습니다.",
    date: "2024-03-08T16:45:00",
    isRead: true,
  },
];

const Notification = () => {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [filter, setFilter] = useState("all"); // all, unread, read

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
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  // 필터링된 알림
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.isRead;
    if (filter === "read") return notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <PageContainer theme={theme}>
      <Header />
      <Container>
        <NotificationContainer theme={theme}>
          <NotificationHeader>
            <HeaderLeft>
              <NotificationTitle theme={theme}>알림</NotificationTitle>
              <NotificationCount theme={theme}>
                {unreadCount}개의 읽지 않은 알림
              </NotificationCount>
            </HeaderLeft>
            <HeaderRight>
              <FilterButtons>
                <FilterButton
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                  theme={theme}
                >
                  전체
                </FilterButton>
                <FilterButton
                  active={filter === "unread"}
                  onClick={() => setFilter("unread")}
                  theme={theme}
                >
                  읽지 않음
                </FilterButton>
                <FilterButton
                  active={filter === "read"}
                  onClick={() => setFilter("read")}
                  theme={theme}
                >
                  읽음
                </FilterButton>
              </FilterButtons>
              {unreadCount > 0 && (
                <Button variant="light" size="small" onClick={markAllAsRead}>
                  모두 읽음 표시
                </Button>
              )}
            </HeaderRight>
          </NotificationHeader>

          <NotificationList>
            {filteredNotifications.length === 0 ? (
              <EmptyState theme={theme}>
                {filter === "all"
                  ? "알림이 없습니다."
                  : filter === "unread"
                  ? "읽지 않은 알림이 없습니다."
                  : "읽은 알림이 없습니다."}
              </EmptyState>
            ) : (
              filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  isRead={notification.isRead}
                  theme={theme}
                >
                  <NotificationContent>
                    <NotificationItemTitle theme={theme}>
                      {notification.title}
                    </NotificationItemTitle>
                    <NotificationMessage theme={theme}>
                      {notification.message}
                    </NotificationMessage>
                    <NotificationDate theme={theme}>
                      {formatDate(notification.date)}
                    </NotificationDate>
                  </NotificationContent>
                  <NotificationActions>
                    {!notification.isRead && (
                      <Button
                        variant="light"
                        size="small"
                        onClick={() => markAsRead(notification.id)}
                      >
                        읽음 표시
                      </Button>
                    )}
                    <Button
                      variant="light"
                      size="small"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      삭제
                    </Button>
                  </NotificationActions>
                </NotificationItem>
              ))
            )}
          </NotificationList>
        </NotificationContainer>
      </Container>
    </PageContainer>
  );
};

export default Notification;

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 16px 60px 16px;
`;

const NotificationContainer = styled.div`
  background: ${(props) => props.theme.surface};
  border-radius: 12px;
  padding: 24px;
  box-shadow: ${(props) => props.theme.cardShadow};
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const NotificationTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
  transition: color 0.3s ease;
`;

const NotificationCount = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.3s ease;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const FilterButton = styled.button`
  background: ${(props) =>
    props.active ? props.theme.buttonPrimary : props.theme.buttonSecondary};
  color: ${(props) => (props.active ? "white" : props.theme.textSecondary)};
  border: 1px solid
    ${(props) =>
      props.active ? props.theme.buttonPrimary : props.theme.border};
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.active ? props.theme.buttonHover : props.theme.borderLight};
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background: ${(props) =>
    props.isRead ? props.theme.surface : props.theme.surfaceSecondary};
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.borderLight};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const NotificationContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NotificationMessage = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.3s ease;
`;

const NotificationDate = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textTertiary};
  margin-top: 4px;
  transition: color 0.3s ease;
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 0;
  color: ${(props) => props.theme.textTertiary};
  font-size: 0.875rem;
  transition: color 0.3s ease;
`;

const NotificationItemTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
  transition: color 0.3s ease;
`;
