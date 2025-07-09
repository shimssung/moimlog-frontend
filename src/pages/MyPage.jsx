import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useRouter } from "next/router";

const TABS = [
  { key: "all", label: "전체 모임" },
  { key: "created", label: "내가 만든 모임" },
  { key: "joined", label: "참여한 모임" },
  { key: "favorites", label: "즐겨찾기" },
];

const mockProfile = {
  name: "올리비아 베넷",
  email: "olivia.bennett@email.com",
  joined: "2023-01-15",
  about:
    "여행과 맛집 탐방을 좋아하는 모험가입니다. 새로운 사람들과 문화를 경험하는 것을 즐깁니다. 여가 시간에는 등산, 독서, 요리하기를 좋아합니다.",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDYhudJVFm4j1jvaC3VWtkGNFmVFgvExkuGOiCq6wb6n7E4J9xxEqElvphiAZC0gj5eBA_7iZgjBRvQo-9Gxw8JoY_kWlISZJ50bITlmXdYj57pGxsbk6KKMfELeMhLrns-rtFui-xzTQShRZX3NVMfl7dfHr6tUYvsvy_alUFaMe6a3euW23fOmmrjFpi3shfKFXu-nkXQNxR7dsB2s_X6eCXyewLkF_HPECgXPDn2yaaxF-BZRZzDxExVJeWp_v0pylmwt9R_2g",
};

// my-moims.jsx의 상세 모임 데이터
const myMoims = [
  {
    id: 1,
    title: "북클럽: 시크릿 가든",
    image: "/img4.jpg",
    category: "독서",
    nextEvent: {
      title: "북클럽 정기모임",
      date: "2024-03-20T14:00:00",
      location: "중앙 도서관 3층 세미나실",
    },
    newMessages: 5,
    newPosts: 2,
    members: 12,
    maxMembers: 20,
    role: "운영자",
    onlineType: "offline",
    location: "서울시 강남구",
  },
  {
    id: 2,
    title: "웹앱 개발 모임",
    image: "/img2.jpg",
    category: "개발",
    nextEvent: {
      title: "프로젝트 데모 데이",
      date: "2024-03-25T19:00:00",
      location: "온라인(Zoom)",
    },
    newMessages: 3,
    newPosts: 1,
    members: 8,
    maxMembers: 15,
    role: "멤버",
    onlineType: "online",
    location: "",
  },
  {
    id: 3,
    title: "어반 플레이팅 모임",
    image: "/img3.jpg",
    category: "요리",
    nextEvent: null,
    newMessages: 0,
    newPosts: 0,
    members: 6,
    maxMembers: 12,
    role: "멤버",
    onlineType: "offline",
    location: "서울시 마포구",
  },
  {
    id: 4,
    title: "주말 축구 동호회",
    image: "/img5.jpg",
    category: "스포츠",
    nextEvent: {
      title: "정기 축구 경기",
      date: "2024-03-23T09:00:00",
      location: "올림픽공원 축구장",
    },
    newMessages: 8,
    newPosts: 3,
    members: 18,
    maxMembers: 22,
    role: "멤버",
    onlineType: "offline",
    location: "서울시 송파구",
  },
  {
    id: 5,
    title: "아트 스터디 그룹",
    image: "/img7.jpg",
    category: "예술",
    nextEvent: {
      title: "전시회 관람",
      date: "2024-03-28T15:00:00",
      location: "국립현대미술관",
    },
    newMessages: 2,
    newPosts: 1,
    members: 9,
    maxMembers: 15,
    role: "운영자",
    onlineType: "offline",
    location: "서울시 종로구",
  },
  {
    id: 6,
    title: "재즈 음악 애호가",
    image: "/img6.jpg",
    category: "음악",
    nextEvent: {
      title: "재즈 클럽 나이트",
      date: "2024-03-22T20:00:00",
      location: "블루노트 재즈클럽",
    },
    newMessages: 4,
    newPosts: 0,
    members: 11,
    maxMembers: 18,
    role: "멤버",
    onlineType: "offline",
    location: "서울시 용산구",
  },
];

const MyPage = () => {
  const router = useRouter();
  const [tab, setTab] = useState("all");

  const handleSettingsClick = () => {
    router.push("/settings");
  };

  const handleCardClick = (moimId) => {
    router.push(`/moim/${moimId}/chat`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 필터링된 모임
  const filteredMoims = myMoims.filter((moim) => {
    if (tab === "created") return moim.role === "운영자";
    if (tab === "joined") return moim.role === "멤버";
    if (tab === "favorites") return moim.favorite; // 즐겨찾기 기능은 나중에 구현
    return true; // 전체 모임
  });

  return (
    <>
      <Header />
      <div className="mypage-container">
        <section className="profile-section">
          <div className="profile-left">
            <div 
              className="avatar"
              style={{ backgroundImage: `url(${mockProfile.avatar})` }}
            />
            <div className="profile-info">
              <p className="profile-name">{mockProfile.name}</p>
              <p className="profile-email">{mockProfile.email}</p>
              <p className="profile-joined">
                Joined on {mockProfile.joined}
              </p>
            </div>
          </div>
          <button className="settings-button" onClick={handleSettingsClick}>
            <SettingsIcon />
          </button>
        </section>

        <section className="about-section">
          <h2 className="about-title">About Me</h2>
          <p className="about-desc">{mockProfile.about}</p>
        </section>

        <div className="tab-bar">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`tab-item ${tab === t.key ? 'active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="moim-grid">
          {filteredMoims.map((moim) => (
            <div
              key={moim.id}
              className="moim-card"
              onClick={() => handleCardClick(moim.id)}
            >
              <img className="card-image" src={moim.image} alt={moim.title} />
              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{moim.title}</h3>
                  <span className="category-tag">{moim.category}</span>
                </div>

                <div className="card-info">
                  <div className="info-item">
                    <span className="info-icon">👥</span>
                    <span className="info-text">
                      {moim.members}/{moim.maxMembers}명
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">🏷️</span>
                    <span className={`online-status-badge ${moim.onlineType}`}>
                      {moim.onlineType === "online" ? "온라인" : "오프라인"}
                    </span>
                  </div>
                </div>

                {moim.onlineType === "offline" && moim.location && (
                  <div className="location-info">
                    <span className="location-icon">📍</span>
                    <span className="location-text">{moim.location}</span>
                  </div>
                )}

                {moim.nextEvent && (
                  <div className="next-event">
                    <span className="event-icon">📅</span>
                    <div className="event-info">
                      <h4 className="event-title">
                        {moim.nextEvent.title}
                      </h4>
                      <p className="event-date">{formatDate(moim.nextEvent.date)}</p>
                      <p className="event-location">
                        {moim.nextEvent.location}
                      </p>
                    </div>
                  </div>
                )}

                <div className="activity-info">
                  {(moim.newMessages > 0 || moim.newPosts > 0) && (
                    <>
                      {moim.newMessages > 0 && (
                        <div className="activity-item">
                          <span className="activity-icon">💬</span>
                          <span className="activity-text">
                            새 메시지 {moim.newMessages}개
                          </span>
                        </div>
                      )}
                      {moim.newPosts > 0 && (
                        <div className="activity-item">
                          <span className="activity-icon">📝</span>
                          <span className="activity-text">
                            새 게시글 {moim.newPosts}개
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMoims.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🤝</span>
            <h3 className="empty-title">
              {tab === "all" && "아직 참여한 모임이 없어요"}
              {tab === "created" && "아직 만든 모임이 없어요"}
              {tab === "joined" && "아직 참여한 모임이 없어요"}
              {tab === "favorites" && "즐겨찾기한 모임이 없어요"}
            </h3>
            <p className="empty-text">
              {tab === "favorites"
                ? "관심 있는 모임을 즐겨찾기에 추가해보세요!"
                : "새로운 모임에 참여해보세요!"}
            </p>
            <Button href="/moim-list" variant="primary">
              모임 찾아보기
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

const SettingsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </svg>
);

export default MyPage;
