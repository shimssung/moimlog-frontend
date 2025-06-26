import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { useTheme } from "../../utils/ThemeContext";
import { useStore } from "../../stores/useStore";
import { useRouter } from "next/router";

const AdminUsers = () => {
  const { theme } = useTheme();
  const { user } = useStore();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // 관리자 권한 확인
  useEffect(() => {
    if (user.role !== "admin") {
      router.push("/");
      return;
    }
  }, [user.role, router]);

  // 더미 사용자 데이터
  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: "김철수",
        email: "kim@example.com",
        joinDate: "2024-01-15",
        lastActive: "2024-03-15T14:30:00",
        status: "active",
        role: "user",
        moimCount: 3,
        reportCount: 0,
      },
      {
        id: 2,
        name: "이영희",
        email: "lee@example.com",
        joinDate: "2024-02-20",
        lastActive: "2024-03-14T10:15:00",
        status: "active",
        role: "user",
        moimCount: 1,
        reportCount: 0,
      },
      {
        id: 3,
        name: "박민수",
        email: "park@example.com",
        joinDate: "2024-01-10",
        lastActive: "2024-03-10T16:45:00",
        status: "suspended",
        role: "user",
        moimCount: 0,
        reportCount: 2,
      },
      {
        id: 4,
        name: "최지영",
        email: "choi@example.com",
        joinDate: "2024-03-01",
        lastActive: "2024-03-15T09:20:00",
        status: "active",
        role: "user",
        moimCount: 2,
        reportCount: 0,
      },
      {
        id: 5,
        name: "정현우",
        email: "jung@example.com",
        joinDate: "2024-02-05",
        lastActive: "2024-03-12T11:30:00",
        status: "active",
        role: "user",
        moimCount: 4,
        reportCount: 1,
      },
    ]);
  }, []);

  const handleUserAction = (userId, action) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          switch (action) {
            case "suspend":
              return { ...user, status: "suspended" };
            case "activate":
              return { ...user, status: "active" };
            case "delete":
              return { ...user, status: "deleted" };
            default:
              return user;
          }
        }
        return user;
      })
    );
  };

  const handleBulkAction = (action) => {
    selectedUsers.forEach((userId) => {
      handleUserAction(userId, action);
    });
    setSelectedUsers([]);
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && user.status === "active") ||
      (filter === "suspended" && user.status === "suspended") ||
      (filter === "reported" && user.reportCount > 0);

    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

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

  const formatLastActive = (dateString) => {
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
            <PageTitle theme={theme}>사용자 관리</PageTitle>
            <PageSubtitle theme={theme}>
              전체 사용자를 조회하고 관리하세요
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
              전체 ({users.length})
            </FilterButton>
            <FilterButton
              active={filter === "active"}
              onClick={() => setFilter("active")}
              theme={theme}
            >
              활성 ({users.filter((u) => u.status === "active").length})
            </FilterButton>
            <FilterButton
              active={filter === "suspended"}
              onClick={() => setFilter("suspended")}
              theme={theme}
            >
              정지 ({users.filter((u) => u.status === "suspended").length})
            </FilterButton>
            <FilterButton
              active={filter === "reported"}
              onClick={() => setFilter("reported")}
              theme={theme}
            >
              신고됨 ({users.filter((u) => u.reportCount > 0).length})
            </FilterButton>
          </FilterSection>

          <SearchSection>
            <SearchInput
              type="text"
              placeholder="사용자 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              theme={theme}
            />
          </SearchSection>
        </Controls>

        {selectedUsers.length > 0 && (
          <BulkActions>
            <BulkInfo theme={theme}>
              {selectedUsers.length}명 선택됨
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

        <UserTable>
          <TableHeader>
            <Checkbox
              type="checkbox"
              checked={selectedUsers.length === filteredUsers.length}
              onChange={handleSelectAll}
              theme={theme}
            />
            <HeaderCell theme={theme}>사용자</HeaderCell>
            <HeaderCell theme={theme}>가입일</HeaderCell>
            <HeaderCell theme={theme}>마지막 활동</HeaderCell>
            <HeaderCell theme={theme}>모임 수</HeaderCell>
            <HeaderCell theme={theme}>신고 수</HeaderCell>
            <HeaderCell theme={theme}>상태</HeaderCell>
            <HeaderCell theme={theme}>작업</HeaderCell>
          </TableHeader>

          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} theme={theme}>
                <TableCell>
                  <Checkbox
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    theme={theme}
                  />
                </TableCell>
                <TableCell>
                  <UserInfo>
                    <UserName theme={theme}>{user.name}</UserName>
                    <UserEmail theme={theme}>{user.email}</UserEmail>
                  </UserInfo>
                </TableCell>
                <TableCell theme={theme}>{formatDate(user.joinDate)}</TableCell>
                <TableCell theme={theme}>{formatLastActive(user.lastActive)}</TableCell>
                <TableCell theme={theme}>{user.moimCount}개</TableCell>
                <TableCell theme={theme}>{user.reportCount}건</TableCell>
                <TableCell>
                  <StatusBadge status={user.status} theme={theme}>
                    {user.status === "active" ? "활성" : "정지"}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <ActionButtons>
                    {user.status === "active" ? (
                      <ActionButton
                        onClick={() => handleUserAction(user.id, "suspend")}
                        theme={theme}
                      >
                        정지
                      </ActionButton>
                    ) : (
                      <ActionButton
                        onClick={() => handleUserAction(user.id, "activate")}
                        theme={theme}
                      >
                        활성화
                      </ActionButton>
                    )}
                    <ActionButton
                      danger
                      onClick={() => handleUserAction(user.id, "delete")}
                      theme={theme}
                    >
                      삭제
                    </ActionButton>
                  </ActionButtons>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </UserTable>

        {filteredUsers.length === 0 && (
          <EmptyState>
            <EmptyIcon>👥</EmptyIcon>
            <EmptyTitle theme={theme}>사용자가 없습니다</EmptyTitle>
            <EmptyText theme={theme}>
              {searchTerm ? "검색 결과가 없습니다." : "등록된 사용자가 없습니다."}
            </EmptyText>
          </EmptyState>
        )}
      </Container>
    </PageContainer>
  );
};

export default AdminUsers;

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

const UserTable = styled.div`
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 16px;
  background: ${(props) => props.theme.borderLight};
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
  font-weight: 600;
  font-size: 0.875rem;
  color: ${(props) => props.theme.textPrimary};

  @media (max-width: 768px) {
    grid-template-columns: 50px 1fr;
    gap: 8px;
  }
`;

const HeaderCell = styled.div`
  color: ${(props) => props.theme.textPrimary};
  font-weight: 600;
  font-size: 0.875rem;
`;

const TableBody = styled.div``;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 50px 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.borderLight};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 50px 1fr;
    gap: 8px;
  }
`;

const TableCell = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.textPrimary};
  font-size: 0.875rem;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const UserName = styled.div`
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
`;

const UserEmail = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textSecondary};
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

const ActionButtons = styled.div`
  display: flex;
  gap: 4px;
`;

const ActionButton = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
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