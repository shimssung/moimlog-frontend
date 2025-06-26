import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { useTheme } from "../../utils/ThemeContext";
import { useStore } from "../../stores/useStore";
import { useRouter } from "next/router";

const AdminMoims = () => {
  const { theme } = useTheme();
  const { user } = useStore();
  const router = useRouter();
  const [moims, setMoims] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMoims, setSelectedMoims] = useState([]);

  // 관리자 권한 확인
  useEffect(() => {
    if (user.role !== "admin") {
      router.push("/");
      return;
    }
  }, [user.role, router]);

  // 더미 모임 데이터
  useEffect(() => {
    setMoims([
      {
        id: 1,
        title: "북클럽: 시크릿 가든",
        category: "독서",
        creator: "김철수",
        memberCount: 12,
        maxMembers: 20,
        status: "active",
        createdAt: "2024-01-15",
        lastActivity: "2024-03-15T14:30:00",
        reportCount: 0,
        image: "/img4.jpg",
      },
      {
        id: 2,
        title: "웹앱 개발 모임",
        category: "개발",
        creator: "이영희",
        memberCount: 8,
        maxMembers: 15,
        status: "active",
        createdAt: "2024-02-20",
        lastActivity: "2024-03-14T10:15:00",
        reportCount: 0,
        image: "/img2.jpg",
      },
      {
        id: 3,
        title: "어반 플레이팅 모임",
        category: "요리",
        creator: "박민수",
        memberCount: 6,
        maxMembers: 12,
        status: "suspended",
        createdAt: "2024-01-10",
        lastActivity: "2024-03-10T16:45:00",
        reportCount: 2,
        image: "/img3.jpg",
      },
      {
        id: 4,
        title: "주말 축구 동호회",
        category: "스포츠",
        creator: "최지영",
        memberCount: 18,
        maxMembers: 22,
        status: "active",
        createdAt: "2024-03-01",
        lastActivity: "2024-03-15T09:20:00",
        reportCount: 0,
        image: "/img5.jpg",
      },
      {
        id: 5,
        title: "아트 스터디 그룹",
        category: "예술",
        creator: "정현우",
        memberCount: 9,
        maxMembers: 15,
        status: "active",
        createdAt: "2024-02-05",
        lastActivity: "2024-03-12T11:30:00",
        reportCount: 1,
        image: "/img7.jpg",
      },
    ]);
  }, []);

  const handleMoimAction = (moimId, action) => {
    setMoims((prev) =>
      prev.map((moim) => {
        if (moim.id === moimId) {
          switch (action) {
            case "suspend":
              return { ...moim, status: "suspended" };
            case "activate":
              return { ...moim, status: "active" };
            case "delete":
              return { ...moim, status: "deleted" };
            default:
              return moim;
          }
        }
        return moim;
      })
    );
  };

  const handleBulkAction = (action) => {
    selectedMoims.forEach((moimId) => {
      handleMoimAction(moimId, action);
    });
    setSelectedMoims([]);
  };

  const handleSelectMoim = (moimId) => {
    setSelectedMoims((prev) =>
      prev.includes(moimId)
        ? prev.filter((id) => id !== moimId)
        : [...prev, moimId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMoims.length === filteredMoims.length) {
      setSelectedMoims([]);
    } else {
      setSelectedMoims(filteredMoims.map((moim) => moim.id));
    }
  };

  const filteredMoims = moims.filter((moim) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && moim.status === "active") ||
      (filter === "suspended" && moim.status === "suspended") ||
      (filter === "reported" && moim.reportCount > 0);

    const matchesSearch =
      moim.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moim.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moim.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatLastActivity = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "방금 전";
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    return formatDate(dateString);
  };

  return (
    <PageContainer theme={theme}>
      <Header />
      <Container>
        <PageHeader>
          <HeaderInfo>
            <PageTitle theme={theme}>모임 관리</PageTitle>
            <PageSubtitle theme={theme}>
              전체 모임을 조회하고 관리하세요
            </PageSubtitle>
          </HeaderInfo>
          <BackButton onClick={() => router.push("/admin/dashboard")} theme={theme}>
            ← 대시보드로 돌아가기
          </BackButton>
        </PageHeader>

        <Controls>
          <FilterSection>
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
              theme={theme}
            >
              전체 ({moims.length})
            </FilterButton>
            <FilterButton
              active={filter === "active"}
              onClick={() => setFilter("active")}
              theme={theme}
            >
              활성 ({moims.filter((m) => m.status === "active").length})
            </FilterButton>
            <FilterButton
              active={filter === "suspended"}
              onClick={() => setFilter("suspended")}
              theme={theme}
            >
              정지 ({moims.filter((m) => m.status === "suspended").length})
            </FilterButton>
            <FilterButton
              active={filter === "reported"}
              onClick={() => setFilter("reported")}
              theme={theme}
            >
              신고됨 ({moims.filter((m) => m.reportCount > 0).length})
            </FilterButton>
          </FilterSection>

          <SearchSection>
            <SearchInput
              type="text"
              placeholder="모임 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              theme={theme}
            />
          </SearchSection>
        </Controls>

        {selectedMoims.length > 0 && (
          <BulkActions>
            <BulkInfo theme={theme}>
              {selectedMoims.length}개 선택됨
            </BulkInfo>
            <BulkButtons>
              <Button
                variant="light"
                size="small"
                onClick={() => handleBulkAction("suspend")}
              >
                선택 정지
              </Button>
              <Button
                variant="light"
                size="small"
                onClick={() => handleBulkAction("activate")}
              >
                선택 활성화
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={() => handleBulkAction("delete")}
              >
                선택 삭제
              </Button>
            </BulkButtons>
          </BulkActions>
        )}

        <SelectAllSection>
          <SelectAllCheckbox
            type="checkbox"
            checked={selectedMoims.length === filteredMoims.length && filteredMoims.length > 0}
            onChange={handleSelectAll}
            theme={theme}
          />
          <SelectAllLabel theme={theme}>
            전체 선택 ({selectedMoims.length}/{filteredMoims.length})
          </SelectAllLabel>
        </SelectAllSection>

        <MoimGrid>
          {filteredMoims.map((moim) => (
            <MoimCard key={moim.id} theme={theme}>
              <CardHeader>
                <Checkbox
                  type="checkbox"
                  checked={selectedMoims.includes(moim.id)}
                  onChange={() => handleSelectMoim(moim.id)}
                  theme={theme}
                />
                <StatusBadge status={moim.status} theme={theme}>
                  {moim.status === "active" ? "활성" : "정지"}
                </StatusBadge>
              </CardHeader>

              <MoimImage src={moim.image} alt={moim.title} />
              
              <CardContent>
                <MoimTitle theme={theme}>{moim.title}</MoimTitle>
                <MoimCategory theme={theme}>{moim.category}</MoimCategory>
                
                <MoimInfo>
                  <InfoItem theme={theme}>
                    <InfoLabel>생성자:</InfoLabel>
                    <InfoValue>{moim.creator}</InfoValue>
                  </InfoItem>
                  <InfoItem theme={theme}>
                    <InfoLabel>멤버:</InfoLabel>
                    <InfoValue>{moim.memberCount}/{moim.maxMembers}</InfoValue>
                  </InfoItem>
                  <InfoItem theme={theme}>
                    <InfoLabel>생성일:</InfoLabel>
                    <InfoValue>{formatDate(moim.createdAt)}</InfoValue>
                  </InfoItem>
                  <InfoItem theme={theme}>
                    <InfoLabel>마지막 활동:</InfoLabel>
                    <InfoValue>{formatLastActivity(moim.lastActivity)}</InfoValue>
                  </InfoItem>
                  <InfoItem theme={theme}>
                    <InfoLabel>신고 수:</InfoLabel>
                    <InfoValue>{moim.reportCount}건</InfoValue>
                  </InfoItem>
                </MoimInfo>
              </CardContent>

              <CardActions>
                {moim.status === "active" ? (
                  <ActionButton
                    onClick={() => handleMoimAction(moim.id, "suspend")}
                    theme={theme}
                  >
                    정지
                  </ActionButton>
                ) : (
                  <ActionButton
                    onClick={() => handleMoimAction(moim.id, "activate")}
                    theme={theme}
                  >
                    활성화
                  </ActionButton>
                )}
                <ActionButton
                  danger
                  onClick={() => handleMoimAction(moim.id, "delete")}
                  theme={theme}
                >
                  삭제
                </ActionButton>
              </CardActions>
            </MoimCard>
          ))}
        </MoimGrid>

        {filteredMoims.length === 0 && (
          <EmptyState>
            <EmptyIcon>🏠</EmptyIcon>
            <EmptyTitle theme={theme}>모임이 없습니다</EmptyTitle>
            <EmptyText theme={theme}>
              {searchTerm ? "검색 결과가 없습니다." : "등록된 모임이 없습니다."}
            </EmptyText>
          </EmptyState>
        )}
      </Container>
    </PageContainer>
  );
};

export default AdminMoims;

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 16px 60px 16px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  gap: 16px;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
  transition: color 0.3s ease;
`;

const PageSubtitle = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
  transition: color 0.3s ease;
`;

const BackButton = styled.button`
  background: ${(props) => props.theme.buttonSecondary};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.borderLight};
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 8px;
`;

const FilterButton = styled.button`
  background: ${(props) =>
    props.active ? props.theme.buttonPrimary : props.theme.buttonSecondary};
  color: ${(props) => (props.active ? "white" : props.theme.textSecondary)};
  border: 1px solid
    ${(props) =>
      props.active ? props.theme.buttonPrimary : props.theme.border};
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.active ? props.theme.buttonHover : props.theme.borderLight};
  }
`;

const SearchSection = styled.div`
  flex: 1;
  max-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 6px;
  background: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.textPrimary};
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.buttonPrimary};
  }

  &::placeholder {
    color: ${(props) => props.theme.textTertiary};
  }
`;

const BulkActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 8px;
  margin-bottom: 24px;
`;

const BulkInfo = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
`;

const BulkButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const SelectAllSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const SelectAllCheckbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const SelectAllLabel = styled.span`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  margin-left: 8px;
`;

const MoimGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`;

const MoimCard = styled.div`
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: ${(props) => props.theme.cardShadow};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${(props) =>
    props.status === "active"
      ? props.theme.success + "20"
      : props.theme.error + "20"};
  color: ${(props) =>
    props.status === "active" ? props.theme.success : props.theme.error};
`;

const MoimImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const MoimTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 8px 0;
  transition: color 0.3s ease;
`;

const MoimCategory = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 16px;
  transition: color 0.3s ease;
`;

const MoimInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
`;

const InfoLabel = styled.span`
  color: ${(props) => props.theme.textSecondary};
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: ${(props) => props.theme.textPrimary};
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid ${(props) => props.theme.borderLight};
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  background: ${(props) =>
    props.danger ? props.theme.error + "20" : props.theme.buttonSecondary};
  color: ${(props) =>
    props.danger ? props.theme.error : props.theme.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.danger ? props.theme.error : props.theme.borderLight};
    color: ${(props) => (props.danger ? "white" : props.theme.textPrimary)};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 0;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 8px 0;
`;

const EmptyText = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
`; 