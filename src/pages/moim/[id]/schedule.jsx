import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Button from "../../../components/Button";

const MoimSchedulePage = () => {
  const router = useRouter();
  const { id: moimId } = router.query;
  const [moimInfo, setMoimInfo] = useState(null);
  const [events, setEvents] = useState([]);

  // 더미 데이터
  useEffect(() => {
    if (moimId) {
      setMoimInfo({
        id: moimId,
        title: "북클럽: 시크릿 가든",
        image: "/img4.jpg",
        role: "운영자",
      });

      setEvents([
        {
          id: 1,
          title: "북클럽 정기모임",
          date: "2024-03-20T14:00:00",
          location: "중앙 도서관 3층 세미나실",
          description: "시크릿 가든 3-4장 토론",
          attendees: 8,
          maxAttendees: 12,
          type: "meeting",
        },
        {
          id: 2,
          title: "독서 후기 작성",
          date: "2024-03-25T18:00:00",
          location: "온라인",
          description: "개인 독서 후기 공유",
          attendees: 5,
          maxAttendees: 12,
          type: "task",
        },
        {
          id: 3,
          title: "다음 책 선정 회의",
          date: "2024-03-30T15:00:00",
          location: "카페",
          description: "4월 독서 목록 선정",
          attendees: 3,
          maxAttendees: 12,
          type: "meeting",
        },
      ]);
    }
  }, [moimId]);

  const formatDate = (dateString) => {
    if (!dateString) return "날짜 없음";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return "날짜 오류";
      }

      return date.toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
        weekday: "short",
      });
    } catch (error) {
      console.error("날짜 파싱 오류:", error);
      return "날짜 오류";
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "시간 없음";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return "시간 오류";
      }

      return date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("시간 파싱 오류:", error);
      return "시간 오류";
    }
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter((event) => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case "meeting":
        return "🤝";
      case "task":
        return "📝";
      case "deadline":
        return "⏰";
      default:
        return "📅";
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case "meeting":
        return "#3b82f6";
      case "task":
        return "#10b981";
      case "deadline":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="moim-schedule-page-container">
      <Header />
      <div className="moim-schedule-content-container">
        <Sidebar
          moimId={moimId}
          moimRole={moimInfo?.role}
          activeMenu="schedule"
        />

        <div className="moim-schedule-main-content">
          <div className="moim-schedule-page-header">
            <div className="moim-schedule-header-info">
              <h1 className="moim-schedule-page-title">일정 관리</h1>
              <p className="moim-schedule-page-subtitle">
                {moimInfo?.title}의 일정을 관리하세요
              </p>
            </div>
            <button className="moim-schedule-create-button">
              <span className="moim-schedule-button-icon">➕</span>
              일정 만들기
            </button>
          </div>

          <div className="moim-schedule-content-grid">
            <div className="moim-schedule-upcoming-section">
              <h2 className="moim-schedule-section-title">다가오는 일정</h2>
              <div className="moim-schedule-event-list">
                {getUpcomingEvents().map((event) => (
                  <div key={event.id} className="moim-schedule-event-card">
                    <div className="moim-schedule-event-header">
                      <span
                        className="moim-schedule-event-type-icon"
                        style={{ color: getEventTypeColor(event.type) }}
                      >
                        {getEventTypeIcon(event.type)}
                      </span>
                      <h3 className="moim-schedule-event-title">{event.title}</h3>
                    </div>
                    <div className="moim-schedule-event-details">
                      <div className="moim-schedule-event-date">
                        {formatDate(event.date)} {formatTime(event.date)}
                      </div>
                      <div className="moim-schedule-event-location">
                        📍 {event.location}
                      </div>
                      <div className="moim-schedule-event-description">
                        {event.description}
                      </div>
                      <div className="moim-schedule-event-attendees">
                        참석자: {event.attendees}/{event.maxAttendees}명
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="moim-schedule-calendar-section">
              <h2 className="moim-schedule-section-title">캘린더</h2>
              <div className="moim-schedule-calendar-placeholder">
                <div className="moim-schedule-calendar-icon">📅</div>
                <div className="moim-schedule-calendar-text">
                  캘린더 기능은 추후 구현 예정입니다
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoimSchedulePage;
