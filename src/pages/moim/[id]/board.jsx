import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Sidebar from "../../../components/Sidebar";
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
          content: "다음 모임에서는 시크릿 가든 3-4장을 읽고 토론할 예정입니다. 미리 읽어보시고 질문이나 의견을 준비해주세요.",
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
          content: "지난 모임에서 시크릿 가든 1-2장을 토론했는데, 정말 흥미로운 이야기가 많았습니다. 특히 주인공의 성장 과정이 인상적이었어요.",
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
          content: "시크릿 가든을 읽으면서 작성한 독서 노트를 공유합니다. 다른 분들의 노트도 궁금하네요!",
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
          content: "지난 모임에서 찍은 사진입니다. 모두 즐거운 시간을 보내고 계시네요!",
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
    return posts.filter(post => post.type === activeTab);
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
      case "notice": return "📢";
      case "free": return "💬";
      case "photo": return "📸";
      default: return "📝";
    }
  };

  const getTabLabel = (tab) => {
    switch (tab) {
      case "notice": return "공지사항";
      case "free": return "자유게시판";
      case "photo": return "사진게시판";
      default: return "게시판";
    }
  };

  return (
    <PageContainer>
      <Sidebar moimId={moimId} moimRole={moimInfo?.role} activeMenu="board" />
      
      <MainContent>
        <PageHeader>
          <HeaderInfo>
            <PageTitle>게시판</PageTitle>
            <PageSubtitle>{moimInfo?.title}의 소식을 확인하세요</PageSubtitle>
          </HeaderInfo>
          <CreateButton onClick={() => setShowCreateModal(true)}>
            <ButtonIcon>✏️</ButtonIcon>
            글쓰기
          </CreateButton>
        </PageHeader>

        <TabContainer>
          {["notice", "free", "photo"].map((tab) => (
            <Tab
              key={tab}
              $active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              <TabIcon>{getTabIcon(tab)}</TabIcon>
              {getTabLabel(tab)}
            </Tab>
          ))}
        </TabContainer>

        <PostList>
          {getFilteredPosts().map((post) => (
            <PostCard key={post.id}>
              {post.isPinned && <PinnedBadge>📌 고정</PinnedBadge>}
              <PostHeader>
                <PostTitle>{post.title}</PostTitle>
                <PostMeta>
                  <Author>{post.author}</Author>
                  <Date>{formatDate(post.date)}</Date>
                </PostMeta>
              </PostHeader>
              <PostContent>{post.content}</PostContent>
              {post.image && (
                <PostImage src={post.image} alt="게시글 이미지" />
              )}
              <PostFooter>
                <PostActions>
                  <ActionButton>
                    <ActionIcon>👍</ActionIcon>
                    {post.likes}
                  </ActionButton>
                  <ActionButton>
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
            <EmptyTitle>아직 게시글이 없어요</EmptyTitle>
            <EmptyText>첫 번째 게시글을 작성해보세요!</EmptyText>
          </EmptyState>
        )}

        {showCreateModal && (
          <ModalOverlay onClick={() => setShowCreateModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>새 게시글 작성</ModalTitle>
                <CloseButton onClick={() => setShowCreateModal(false)}>✕</CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label>게시판 선택</Label>
                  <Select>
                    <option value="notice">공지사항</option>
                    <option value="free">자유게시판</option>
                    <option value="photo">사진게시판</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>제목</Label>
                  <Input type="text" placeholder="제목을 입력하세요" />
                </FormGroup>
                <FormGroup>
                  <Label>내용</Label>
                  <Textarea placeholder="내용을 입력하세요" rows="6" />
                </FormGroup>
                <FormGroup>
                  <Label>이미지 첨부 (선택사항)</Label>
                  <FileInput type="file" accept="image/*" />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                  취소
                </Button>
                <Button variant="primary" onClick={() => {
                  toast.success("게시글이 작성되었습니다!");
                  setShowCreateModal(false);
                }}>
                  게시하기
                </Button>
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
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
`;

const HeaderInfo = styled.div``;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
`;

const PageSubtitle = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
  }
`;

const ButtonIcon = styled.span`
  font-size: 1rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 20px 32px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background: ${props => props.$active ? "#3b82f6" : "#f3f4f6"};
  color: ${props => props.$active ? "#fff" : "#6b7280"};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$active ? "#2563eb" : "#e5e7eb"};
  }
`;

const TabIcon = styled.span`
  font-size: 1rem;
`;

const PostList = styled.div`
  flex: 1;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PostCard = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
  }
`;

const PinnedBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #fef3c7;
  color: #92400e;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
`;

const PostHeader = styled.div`
  margin-bottom: 16px;
`;

const PostTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Author = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 0.8rem;
  color: #9ca3af;
`;

const PostContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #374151;
  margin-bottom: 16px;
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
  color: #6b7280;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #111827;
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
  color: #111827;
  margin: 0 0 8px 0;
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
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
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #111827;
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
  border-top: 1px solid #e5e7eb;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
  }
`; 