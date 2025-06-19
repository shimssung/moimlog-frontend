import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";

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
    <PageContainer>
      <Sidebar moimId={moimId} moimRole={moimInfo.role} activeMenu="chat" />
      
      <MainContent>
        <ChatHeader>
          <MoimInfo>
            <MoimImage src={moimInfo.image} alt={moimInfo.title} />
            <MoimDetails>
              <MoimTitle>{moimInfo.title}</MoimTitle>
              <MoimRole>{moimInfo.role}</MoimRole>
            </MoimDetails>
          </MoimInfo>
          <OnlineIndicator>
            <OnlineDot />
            <OnlineText>온라인</OnlineText>
          </OnlineIndicator>
        </ChatHeader>

        <ChatArea>
          <MessageList>
            {messages.map((msg) => (
              <MessageItem key={msg.id} $isMyMessage={msg.isMyMessage}>
                <MessageBubble $isMyMessage={msg.isMyMessage}>
                  {!msg.isMyMessage && (
                    <MessageAuthor>{msg.author}</MessageAuthor>
                  )}
                  <MessageContent>{msg.content}</MessageContent>
                  <MessageTime $isMyMessage={msg.isMyMessage}>{formatTime(msg.timestamp)}</MessageTime>
                </MessageBubble>
              </MessageItem>
            ))}
          </MessageList>
        </ChatArea>

        <MessageInput>
          <MessageForm onSubmit={handleSendMessage}>
            <InputField
              type="text"
              placeholder="메시지를 입력하세요..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <SendButton type="submit" disabled={!message.trim()}>
              <SendIcon>↑</SendIcon>
            </SendButton>
          </MessageForm>
        </MessageInput>
      </MainContent>
    </PageContainer>
  );
};

export default MoimChatPage;

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f8fafc;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
  background: #fff;

  @media (max-width: 768px) {
    margin-left: 0;
    height: calc(100vh - 60px);
  }
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
`;

const MoimInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MoimImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const MoimDetails = styled.div``;

const MoimTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 2px 0;
`;

const MoimRole = styled.span`
  font-size: 0.8rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 12px;
`;

const OnlineIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const OnlineDot = styled.div`
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
`;

const OnlineText = styled.span`
  font-size: 0.8rem;
  color: #6b7280;
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f8fafc;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageItem = styled.div`
  display: flex;
  justify-content: ${props => props.$isMyMessage ? "flex-end" : "flex-start"};
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  background: ${props => props.$isMyMessage ? "#3b82f6" : "#f3f4f6"};
  color: ${props => props.$isMyMessage ? "#fff" : "#111827"};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const MessageAuthor = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #6b7280;
`;

const MessageContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: 4px;
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  opacity: 0.7;
  text-align: ${props => props.$isMyMessage ? "right" : "left"};
`;

const MessageInput = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
  background: #fff;
`;

const MessageForm = styled.form`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const InputField = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 24px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #3b82f6;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #000;
    transform: scale(1.05);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const SendIcon = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  transform: rotate(0deg);
`; 