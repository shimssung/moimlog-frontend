import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { useTheme } from "../../../utils/ThemeContext";

const MoimChatPage = () => {
  const { theme } = useTheme();
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
    <PageContainer theme={theme}>
      <Header />
      <ContentContainer>
        <Sidebar moimId={moimId} moimRole={moimInfo.role} activeMenu="chat" />

        <MainContent theme={theme}>
        <ChatHeader theme={theme}>
          <MoimInfo>
            <MoimImage src={moimInfo.image} alt={moimInfo.title} />
            <MoimDetails>
              <MoimTitle theme={theme}>{moimInfo.title}</MoimTitle>
              <MoimRole theme={theme}>{moimInfo.role}</MoimRole>
            </MoimDetails>
          </MoimInfo>
          <OnlineIndicator>
            <OnlineDot />
            <OnlineText theme={theme}>온라인</OnlineText>
          </OnlineIndicator>
        </ChatHeader>

        <ChatArea theme={theme}>
          <MessageList>
            {messages.map((msg) => (
              <MessageItem key={msg.id} $isMyMessage={msg.isMyMessage}>
                <MessageBubble $isMyMessage={msg.isMyMessage} theme={theme}>
                  {!msg.isMyMessage && (
                    <MessageAuthor theme={theme}>{msg.author}</MessageAuthor>
                  )}
                  <MessageContent>{msg.content}</MessageContent>
                  <MessageTime $isMyMessage={msg.isMyMessage} theme={theme}>
                    {formatTime(msg.timestamp)}
                  </MessageTime>
                </MessageBubble>
              </MessageItem>
            ))}
          </MessageList>
        </ChatArea>

        <MessageInput theme={theme}>
          <MessageForm onSubmit={handleSendMessage}>
            <InputField
              type="text"
              placeholder="메시지를 입력하세요..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              theme={theme}
            />
            <SendButton type="submit" disabled={!message.trim()}>
              <SendIcon>↑</SendIcon>
            </SendButton>
          </MessageForm>
        </MessageInput>
      </MainContent>
      </ContentContainer>
    </PageContainer>
  );
};

export default MoimChatPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 80px); // 헤더 높이를 뺀 높이

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 250px;
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 80px); // 헤더 높이를 뺀 높이

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 16px;
  }
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
  background: ${(props) => props.theme.surface};
  transition: all 0.3s ease;
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
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 2px 0;
  transition: color 0.3s ease;
`;

const MoimRole = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.textSecondary};
  background: ${(props) => props.theme.surfaceSecondary};
  padding: 2px 8px;
  border-radius: 12px;
  transition: all 0.3s ease;
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
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.3s ease;
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageItem = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.$isMyMessage ? "flex-end" : "flex-start"};
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  background: ${(props) =>
    props.$isMyMessage
      ? props.theme.buttonPrimary
      : props.theme.surfaceSecondary};
  color: ${(props) => (props.$isMyMessage ? "#fff" : props.theme.textPrimary)};
  box-shadow: ${(props) => props.theme.cardShadow};
  position: relative;
  transition: all 0.3s ease;
`;

const MessageAuthor = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.3s ease;
`;

const MessageContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: 4px;
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  opacity: 0.7;
  text-align: ${(props) => (props.$isMyMessage ? "right" : "left")};
  color: ${(props) =>
    props.$isMyMessage ? "rgba(255, 255, 255, 0.7)" : props.theme.textTertiary};
  transition: color 0.3s ease;
`;

const MessageInput = styled.div`
  padding: 20px 24px;
  border-top: 1px solid ${(props) => props.theme.borderLight};
  background: ${(props) => props.theme.surface};
  transition: all 0.3s ease;
`;

const MessageForm = styled.form`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const InputField = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 24px;
  font-size: 0.95rem;
  outline: none;
  background: ${(props) => props.theme.surfaceSecondary};
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${(props) => props.theme.buttonPrimary};
  }

  &::placeholder {
    color: ${(props) => props.theme.textTertiary};
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
