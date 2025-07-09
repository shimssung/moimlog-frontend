import React, { useState } from "react";
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
    <div className="notification-page">
      <Header />
      <div className="notification-container">
        <div className="notification-content">
          <div className="notification-header">
            <div className="header-left">
              <h1 className="notification-title">알림</h1>
              <p className="notification-count">
                {unreadCount}개의 읽지 않은 알림
              </p>
            </div>
            <div className="header-right">
              <div className="filter-buttons">
                <button
                  className={`filter-button ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                >
                  전체
                </button>
                <button
                  className={`filter-button ${filter === "unread" ? "active" : ""}`}
                  onClick={() => setFilter("unread")}
                >
                  읽지 않음
                </button>
                <button
                  className={`filter-button ${filter === "read" ? "active" : ""}`}
                  onClick={() => setFilter("read")}
                >
                  읽음
                </button>
              </div>
              {unreadCount > 0 && (
                <Button variant="light" size="small" onClick={markAllAsRead}>
                  모두 읽음 표시
                </Button>
              )}
            </div>
          </div>

          <div className="notification-list">
            {filteredNotifications.length === 0 ? (
              <div className="empty-state">
                {filter === "all"
                  ? "알림이 없습니다."
                  : filter === "unread"
                  ? "읽지 않은 알림이 없습니다."
                  : "읽은 알림이 없습니다."}
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.isRead ? "read" : "unread"}`}
                >
                  <div className="notification-content">
                    <h3 className="notification-item-title">
                      {notification.title}
                    </h3>
                    <p className="notification-message">
                      {notification.message}
                    </p>
                    <p className="notification-date">
                      {formatDate(notification.date)}
                    </p>
                  </div>
                  <div className="notification-actions">
                    {!notification.isRead && (
                      <button
                        className="action-button"
                        onClick={() => markAsRead(notification.id)}
                      >
                        읽음 표시
                      </button>
                    )}
                    <button
                      className="action-button delete"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
