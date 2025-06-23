import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Sidebar from "../../../components/Sidebar";
import Button from "../../../components/Button";
import { useTheme } from "../../../utils/ThemeContext";

const MoimBoardPage = () => {
  const { theme } = useTheme();
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
    <PageContainer theme={theme}>
      <Sidebar moimId={moimId} moimRole={moimInfo?.role} activeMenu="board" />

      <MainContent>
        <PageHeader>
          <HeaderInfo>
            <PageTitle theme={theme}>게시판</PageTitle>
            <PageSubtitle theme={theme}>
              {moimInfo?.title}의 소식을 확인하세요
            </PageSubtitle>
          </HeaderInfo>
          <CreateButton onClick={() => setShowCreateModal(true)} theme={theme}>
            <ButtonIcon>✏️</ButtonIcon>
            글쓰기
          </CreateButton>
        </PageHeader>

        <TabContainer theme={theme}>
          {["notice", "free", "photo"].map((tab) => (
            <Tab
              key={tab}
              $active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              theme={theme}
            >
              <TabIcon>{getTabIcon(tab)}</TabIcon>
              {getTabLabel(tab)}
            </Tab>
          ))}
        </TabContainer>

        <PostList>
          {getFilteredPosts().map((post) => (
            <PostCard key={post.id} theme={theme}>
              {post.isPinned && (
                <PinnedBadge theme={theme}>📌 고정</PinnedBadge>
              )}
              <PostHeader>
                <PostTitle theme={theme}>{post.title}</PostTitle>
                <PostMeta>
                  <Author theme={theme}>{post.author}</Author>
                  <Date theme={theme}>{formatDate(post.date)}</Date>
                </PostMeta>
              </PostHeader>
              <PostContent theme={theme}>{post.content}</PostContent>
              {post.image && <PostImage src={post.image} alt="게시글 이미지" />}
              <PostFooter>
                <PostActions>
                  <ActionButton theme={theme}>
                    <ActionIcon>👍</ActionIcon>
                    {post.likes}
                  </ActionButton>
                  <ActionButton theme={theme}>
                    <ActionIcon>💬</ActionIcon>
                    {post.comments}
                  </ActionButton>
                </PostActions>
              </PostFooter>
            </PostCard>
          ))}
        </PostList>

        {getFilteredPosts().length === 0 && (
          <EmptyState>
            <EmptyIcon>📝</EmptyIcon>
            <EmptyTitle theme={theme}>아직 게시글이 없어요</EmptyTitle>
            <EmptyText theme={theme}>첫 번째 게시글을 작성해보세요!</EmptyText>
          </EmptyState>
        )}

        {showCreateModal && (
          <ModalOverlay onClick={() => setShowCreateModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
              <ModalHeader theme={theme}>
                <ModalTitle theme={theme}>새 게시글 작성</ModalTitle>
                <CloseButton
                  onClick={() => setShowCreateModal(false)}
                  theme={theme}
                >
                  ✕
                </CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label theme={theme}>제목</Label>
                  <Input theme={theme} placeholder="제목을 입력하세요" />
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>게시판</Label>
                  <Select theme={theme}>
                    <option value="notice">공지사항</option>
                    <option value="free">자유게시판</option>
                    <option value="photo">사진게시판</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>내용</Label>
                  <Textarea
                    theme={theme}
                    rows={6}
                    placeholder="내용을 입력하세요"
                  />
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>이미지 첨부</Label>
                  <FileInput theme={theme} type="file" accept="image/*" />
                </FormGroup>
              </ModalBody>
              <ModalFooter theme={theme}>
                <Button
                  variant="light"
                  onClick={() => setShowCreateModal(false)}
                >
                  취소
                </Button>
                <Button variant="primary">작성하기</Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default MoimBoardPage;

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 250px;
  padding: 24px;
  overflow-y: auto;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 16px;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const HeaderInfo = styled.div``;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 8px 0;
  transition: color 0.3s ease;
`;

const PageSubtitle = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
  transition: color 0.3s ease;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${(props) => props.theme.buttonPrimary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.buttonHover};
  }
`;

const ButtonIcon = styled.span`
  font-size: 1rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
  transition: border-color 0.3s ease;
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 12px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ $active, theme }) =>
    $active ? theme.textPrimary : theme.textSecondary};
  cursor: pointer;
  border-bottom: 2px solid
    ${({ $active, theme }) => ($active ? theme.buttonPrimary : "transparent")};
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.textPrimary};
  }
`;

const TabIcon = styled.span`
  font-size: 1rem;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PostCard = styled.div`
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 12px;
  padding: 20px;
  position: relative;
  transition: all 0.3s ease;
`;

const PinnedBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${(props) => props.theme.buttonPrimary};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const PostHeader = styled.div`
  margin-bottom: 12px;
`;

const PostTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 8px 0;
  transition: color 0.3s ease;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
`;

const Author = styled.span`
  color: ${(props) => props.theme.textSecondary};
  font-weight: 500;
  transition: color 0.3s ease;
`;

const Date = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.textTertiary};
  transition: color 0.3s ease;
`;

const PostContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 16px;
  transition: color 0.3s ease;
`;

const PostImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostActions = styled.div`
  display: flex;
  gap: 16px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: ${(props) => props.theme.textTertiary};
  font-size: 0.9rem;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.surfaceSecondary};
    color: ${(props) => props.theme.textPrimary};
  }
`;

const ActionIcon = styled.span`
  font-size: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 8px 0;
  transition: color 0.3s ease;
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
  transition: color 0.3s ease;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.surface};
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
  transition: border-color 0.3s ease;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
  transition: color 0.3s ease;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${(props) => props.theme.textTertiary};
  cursor: pointer;
  padding: 4px;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.textPrimary};
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid ${(props) => props.theme.borderLight};
  transition: border-color 0.3s ease;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 6px;
  transition: color 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 6px;
  font-size: 0.9rem;
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

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  background: ${(props) => props.theme.surfaceSecondary};
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${(props) => props.theme.buttonPrimary};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  resize: vertical;
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

const FileInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  background: ${(props) => props.theme.surfaceSecondary};
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${(props) => props.theme.buttonPrimary};
  }
`;
