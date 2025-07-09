import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Button from "../../../components/Button";

const MoimBoardPage = () => {
  const router = useRouter();
  const { id: moimId } = router.query;
  const [moimInfo, setMoimInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("notice");
  const [posts, setPosts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // 더미 데이터
  useEffect(() => {
    if (moimId) {
      setMoimInfo({
        id: moimId,
        title: "북클럽: 시크릿 가든",
        image: "/img4.jpg",
        role: "운영자",
      });

      setPosts([
        {
          id: 1,
          title: "다음 모임 준비물 안내",
          content:
            "다음 모임에서는 시크릿 가든 3-4장을 읽고 토론할 예정입니다. 미리 읽어보시고 질문이나 의견을 준비해주세요.",
          author: "소피아",
          date: "2024-03-18T10:00:00",
          type: "notice",
          likes: 5,
          comments: 3,
          isPinned: true,
        },
        {
          id: 2,
          title: "지난 모임 후기",
          content:
            "지난 모임에서 시크릿 가든 1-2장을 토론했는데, 정말 흥미로운 이야기가 많았습니다. 특히 주인공의 성장 과정이 인상적이었어요.",
          author: "앨리스",
          date: "2024-03-17T15:30:00",
          type: "free",
          likes: 8,
          comments: 5,
          isPinned: false,
        },
        {
          id: 3,
          title: "독서 노트 공유",
          content:
            "시크릿 가든을 읽으면서 작성한 독서 노트를 공유합니다. 다른 분들의 노트도 궁금하네요!",
          author: "밥",
          date: "2024-03-16T14:20:00",
          type: "free",
          likes: 12,
          comments: 7,
          isPinned: false,
        },
        {
          id: 4,
          title: "모임 사진",
          content:
            "지난 모임에서 찍은 사진입니다. 모두 즐거운 시간을 보내고 계시네요!",
          author: "캐롤",
          date: "2024-03-15T16:45:00",
          type: "photo",
          likes: 15,
          comments: 4,
          isPinned: false,
          image: "/img4.jpg",
        },
      ]);
    }
  }, [moimId]);

  const getFilteredPosts = () => {
    return posts.filter((post) => post.type === activeTab);
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "날짜 없음";
    }

    // dateString이 문자열이 아닌 경우 문자열로 변환
    const dateStr = String(dateString);

    try {
      // Date 생성자를 직접 호출
      const date = new (global.Date || Date)(dateStr);

      // 유효하지 않은 날짜인지 확인
      if (isNaN(date.getTime())) {
        return "날짜 오류";
      }

      const result = date.toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      return result;
    } catch (error) {
      console.error("날짜 파싱 오류:", error, "dateString:", dateString);
      return "날짜 오류";
    }
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case "notice":
        return "📢";
      case "free":
        return "💬";
      case "photo":
        return "📸";
      default:
        return "📝";
    }
  };

  const getTabLabel = (tab) => {
    switch (tab) {
      case "notice":
        return "공지사항";
      case "free":
        return "자유게시판";
      case "photo":
        return "사진게시판";
      default:
        return "게시판";
    }
  };

  return (
    <div className="moim-board-page">
      <Header />
      <div className="moim-board-content">
        <Sidebar moimId={moimId} moimRole={moimInfo?.role} activeMenu="board" />

        <div className="moim-board-main">
          <div className="page-header">
            <div className="header-info">
              <h1 className="page-title">게시판</h1>
              <p className="page-subtitle">
                {moimInfo?.title}의 소식을 확인하세요
              </p>
            </div>
            <button className="create-button" onClick={() => setShowCreateModal(true)}>
              <span className="button-icon">✏️</span>
              글쓰기
            </button>
          </div>

          <div className="tab-container">
            {["notice", "free", "photo"].map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="tab-icon">{getTabIcon(tab)}</span>
                {getTabLabel(tab)}
              </button>
            ))}
          </div>

          <div className="post-list">
            {getFilteredPosts().map((post) => (
              <div key={post.id} className="post-card">
                {post.isPinned && (
                  <div className="pinned-badge">📌 고정</div>
                )}
                <div className="post-header">
                  <h3 className="post-title">{post.title}</h3>
                  <div className="post-meta">
                    <span className="author">{post.author}</span>
                    <span className="date">{formatDate(post.date)}</span>
                  </div>
                </div>
                <div className="post-content">{post.content}</div>
                {post.image && <img className="post-image" src={post.image} alt="게시글 이미지" />}
                <div className="post-footer">
                  <div className="post-actions">
                    <button className="action-button">
                      <span className="action-icon">👍</span>
                      {post.likes}
                    </button>
                    <button className="action-button">
                      <span className="action-icon">💬</span>
                      {post.comments}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoimBoardPage;
