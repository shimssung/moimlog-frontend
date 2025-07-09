import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

const MoimChatPage = () => {
  const router = useRouter();
  const { id: moimId } = router.query;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [moimInfo, setMoimInfo] = useState(null);

  // 더미 데이터 - 실제로는 API에서 가져올 데이터
  useEffect(() => {
    if (moimId) {
      // 모임 정보 가져오기
      setMoimInfo({
        id: moimId,
        title: "북클럽: 시크릿 가든",
        image: "/img4.jpg",
        role: "운영자",
      });

      // 더미 메시지 데이터
      setMessages([
        {
          id: 1,
          author: "소피아",
          content: "안녕하세요! 다음 모임 준비는 어떻게 되고 계신가요?",
          timestamp: "2024-03-18T10:30:00",
          isMyMessage: false,
        },
        {
          id: 2,
          author: "앨리스",
          content: "저는 3장까지 읽어봤어요. 정말 재미있네요!",
          timestamp: "2024-03-18T10:32:00",
          isMyMessage: false,
        },
        {
          id: 3,
          author: "나",
          content: "저도 2장까지 읽었습니다. 토론할 내용이 많을 것 같아요!",
          timestamp: "2024-03-18T10:35:00",
          isMyMessage: true,
        },
        {
          id: 4,
          author: "밥",
          content: "다음 모임 시간이 언제인가요?",
          timestamp: "2024-03-18T11:00:00",
          isMyMessage: false,
        },
      ]);
    }
  }, [moimId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      author: "나",
      content: message,
      timestamp: new Date().toISOString(),
      isMyMessage: true,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!moimInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="moim-chat-page">
      <Header />
      <div className="moim-chat-content">
        <Sidebar moimId={moimId} moimRole={moimInfo.role} activeMenu="chat" />

        <div className="moim-chat-main">
          <div className="chat-header">
            <div className="moim-info">
              <img className="moim-image" src={moimInfo.image} alt={moimInfo.title} />
              <div className="moim-details">
                <h2 className="moim-title">{moimInfo.title}</h2>
                <p className="moim-role">{moimInfo.role}</p>
              </div>
            </div>
            <div className="online-indicator">
              <span className="online-dot"></span>
              <span className="online-text">온라인</span>
            </div>
          </div>

          <div className="chat-area">
            <div className="message-list">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-item ${msg.isMyMessage ? 'my-message' : ''}`}>
                  <div className={`message-bubble ${msg.isMyMessage ? 'my-message' : ''}`}>
                    {!msg.isMyMessage && (
                      <div className="message-author">{msg.author}</div>
                    )}
                    <div className="message-content">{msg.content}</div>
                    <div className={`message-time ${msg.isMyMessage ? 'my-message' : ''}`}>
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="message-input">
            <form className="message-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                className="input-field"
                placeholder="메시지를 입력하세요..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="send-button" disabled={!message.trim()}>
                <span className="send-icon">↑</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoimChatPage;
