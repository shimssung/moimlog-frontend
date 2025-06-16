import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";

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
];

const Notification = () => {
  const [notifications, setNotifications] = useState(dummyNotifications);

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
    return new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <PageContainer>
      <Header />
      <Container>
        <NotificationContainer>
          <NotificationHeader>
            <NotificationTitle>알림</NotificationTitle>
            <Button variant="light" size="small" onClick={markAllAsRead}>
              모두 읽음 표시
            </Button>
          </NotificationHeader>

          <NotificationList>
            {notifications.length === 0 ? (
              <EmptyState>알림이 없습니다.</EmptyState>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  isRead={notification.isRead}
                >
                  <NotificationContent>
                    <NotificationTitle>{notification.title}</NotificationTitle>
                    <NotificationMessage>
                      {notification.message}
                    </NotificationMessage>
                    <NotificationDate>
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
  background: #f8fafc;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 16px 60px 16px;
`;

const NotificationContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const NotificationTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
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
  background: ${(props) => (props.isRead ? "#fff" : "#f3f4f6")};
  border: 1px solid #e5e7eb;
  transition: background-color 0.2s;

  &:hover {
    background: #f9fafb;
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
  color: #374151;
`;

const NotificationDate = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 4px;
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 0;
  color: #6b7280;
  font-size: 0.875rem;
`;
