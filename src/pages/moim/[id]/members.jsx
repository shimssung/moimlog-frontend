import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import Button from "../../../components/Button";
import { useTheme } from "../../../utils/ThemeContext";

const MoimMembersPage = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { id: moimId } = router.query;
  const [moimInfo, setMoimInfo] = useState(null);
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showInviteModal, setShowInviteModal] = useState(false);

  // 더미 데이터
  useEffect(() => {
    if (moimId) {
      setMoimInfo({
        id: moimId,
        title: "북클럽: 시크릿 가든",
        image: "/img4.jpg",
        role: "운영자",
      });

      setMembers([
        {
          id: 1,
          name: "소피아",
          email: "sophia@example.com",
          image: "/img1.jpg",
          role: "운영자",
          joinDate: "2024-01-15",
          lastActive: "2024-03-18T10:30:00",
          status: "online",
        },
        {
          id: 2,
          name: "앨리스",
          email: "alice@example.com",
          image: "/img2.jpg",
          role: "멤버",
          joinDate: "2024-01-20",
          lastActive: "2024-03-18T09:15:00",
          status: "online",
        },
        {
          id: 3,
          name: "밥",
          email: "bob@example.com",
          image: "/img3.jpg",
          role: "멤버",
          joinDate: "2024-02-01",
          lastActive: "2024-03-17T16:45:00",
          status: "offline",
        },
        {
          id: 4,
          name: "캐롤",
          email: "carol@example.com",
          image: "/img4.jpg",
          role: "멤버",
          joinDate: "2024-02-10",
          lastActive: "2024-03-18T11:20:00",
          status: "online",
        },
        {
          id: 5,
          name: "데이비드",
          email: "david@example.com",
          image: "/img5.jpg",
          role: "멤버",
          joinDate: "2024-02-15",
          lastActive: "2024-03-16T14:30:00",
          status: "offline",
        },
        {
          id: 6,
          name: "이브",
          email: "eve@example.com",
          image: "/img6.jpg",
          role: "멤버",
          joinDate: "2024-03-01",
          lastActive: "2024-03-18T08:45:00",
          status: "online",
        },
      ]);
    }
  }, [moimId]);

  const getFilteredMembers = () => {
    switch (activeTab) {
      case "online":
        return members.filter((member) => member.status === "online");
      case "offline":
        return members.filter((member) => member.status === "offline");
      case "admin":
        return members.filter((member) => member.role === "운영자");
      default:
        return members;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "날짜 없음";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return "날짜 오류";
      }

      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("날짜 파싱 오류:", error);
      return "날짜 오류";
    }
  };

  const formatLastActive = (dateString) => {
    if (!dateString) return "활동 기록 없음";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return "날짜 오류";
      }

      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

      if (diffInHours < 1) return "방금 전";
      if (diffInHours < 24) return `${diffInHours}시간 전`;
      return formatDate(dateString);
    } catch (error) {
      console.error("날짜 파싱 오류:", error);
      return "날짜 오류";
    }
  };

  const handleRoleChange = (memberId, newRole) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
  };

  const handleRemoveMember = (memberId) => {
    if (
      typeof window !== "undefined" &&
      window.confirm("정말로 이 멤버를 제거하시겠습니까?")
    ) {
      setMembers((prev) => prev.filter((member) => member.id !== memberId));
    }
  };

  const handleExportMembers = () => {
    if (typeof window !== "undefined") {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "이름,이메일,역할,가입일,마지막 활동\n" +
        members
          .map(
            (member) =>
              `${member.name},${member.email},${member.role},${formatDate(
                member.joinDate
              )},${formatLastActive(member.lastActive)}`
          )
          .join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `모임_멤버_목록_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <PageContainer theme={theme}>
      <Sidebar moimId={moimId} moimRole={moimInfo?.role} activeMenu="members" />

      <MainContent>
        <PageHeader>
          <HeaderInfo>
            <PageTitle theme={theme}>멤버 관리</PageTitle>
            <PageSubtitle theme={theme}>
              {moimInfo?.title}의 멤버를 관리하세요
            </PageSubtitle>
          </HeaderInfo>
          <InviteButton onClick={() => setShowInviteModal(true)} theme={theme}>
            <ButtonIcon>👥</ButtonIcon>
            멤버 초대
          </InviteButton>
        </PageHeader>

        <StatsContainer>
          <StatCard theme={theme}>
            <StatNumber theme={theme}>{members.length}</StatNumber>
            <StatLabel theme={theme}>전체 멤버</StatLabel>
          </StatCard>
          <StatCard theme={theme}>
            <StatNumber theme={theme}>
              {members.filter((m) => m.status === "online").length}
            </StatNumber>
            <StatLabel theme={theme}>온라인</StatLabel>
          </StatCard>
          <StatCard theme={theme}>
            <StatNumber theme={theme}>
              {members.filter((m) => m.role === "운영자").length}
            </StatNumber>
            <StatLabel theme={theme}>운영자</StatLabel>
          </StatCard>
        </StatsContainer>

        <TabContainer theme={theme}>
          {[
            { key: "all", label: "전체", count: members.length },
            {
              key: "online",
              label: "온라인",
              count: members.filter((m) => m.status === "online").length,
            },
            {
              key: "offline",
              label: "오프라인",
              count: members.filter((m) => m.status === "offline").length,
            },
            {
              key: "admin",
              label: "운영자",
              count: members.filter((m) => m.role === "운영자").length,
            },
          ].map((tab) => (
            <Tab
              key={tab.key}
              $active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              theme={theme}
            >
              {tab.label} ({tab.count})
            </Tab>
          ))}
        </TabContainer>

        <ActionBar>
          <SearchInput type="text" placeholder="멤버 검색..." theme={theme} />
          <Button variant="light" onClick={handleExportMembers}>
            📊 내보내기
          </Button>
        </ActionBar>

        <MemberList>
          {getFilteredMembers().map((member) => (
            <MemberCard key={member.id} theme={theme}>
              <MemberInfo>
                <MemberAvatar
                  src={member.image}
                  alt={member.name}
                  $status={member.status}
                />
                <MemberDetails>
                  <MemberName theme={theme}>{member.name}</MemberName>
                  <MemberEmail theme={theme}>{member.email}</MemberEmail>
                  <MemberMeta>
                    <JoinDate theme={theme}>
                      가입일: {formatDate(member.joinDate)}
                    </JoinDate>
                    <LastActive theme={theme}>
                      마지막 활동: {formatLastActive(member.lastActive)}
                    </LastActive>
                  </MemberMeta>
                </MemberDetails>
              </MemberInfo>
              <MemberActions>
                <RoleSelect
                  value={member.role}
                  onChange={(e) => handleRoleChange(member.id, e.target.value)}
                  theme={theme}
                >
                  <option value="멤버">멤버</option>
                  <option value="운영자">운영자</option>
                </RoleSelect>
                <RemoveButton
                  onClick={() => handleRemoveMember(member.id)}
                  theme={theme}
                >
                  제거
                </RemoveButton>
              </MemberActions>
            </MemberCard>
          ))}
        </MemberList>

        {getFilteredMembers().length === 0 && (
          <EmptyState>
            <EmptyIcon>👥</EmptyIcon>
            <EmptyTitle theme={theme}>멤버가 없습니다</EmptyTitle>
            <EmptyText theme={theme}>멤버를 초대해보세요!</EmptyText>
          </EmptyState>
        )}

        {showInviteModal && (
          <ModalOverlay onClick={() => setShowInviteModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
              <ModalHeader theme={theme}>
                <ModalTitle theme={theme}>멤버 초대</ModalTitle>
                <CloseButton
                  onClick={() => setShowInviteModal(false)}
                  theme={theme}
                >
                  ✕
                </CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label theme={theme}>이메일 주소</Label>
                  <Input
                    type="email"
                    placeholder="초대할 이메일을 입력하세요"
                    theme={theme}
                  />
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>초대 메시지 (선택사항)</Label>
                  <Textarea
                    placeholder="초대 메시지를 입력하세요"
                    rows={3}
                    theme={theme}
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter theme={theme}>
                <Button
                  variant="light"
                  onClick={() => setShowInviteModal(false)}
                >
                  취소
                </Button>
                <Button variant="primary">초대하기</Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default MoimMembersPage;

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

const InviteButton = styled.button`
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

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 8px;
  transition: color 0.3s ease;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.3s ease;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
  transition: border-color 0.3s ease;
`;

const Tab = styled.button`
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

const ActionBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  max-width: 300px;
  padding: 10px 12px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 8px;
  font-size: 0.9rem;
  background: ${(props) => props.theme.surfaceSecondary};
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.buttonPrimary};
  }

  &::placeholder {
    color: ${(props) => props.theme.textTertiary};
  }
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MemberCard = styled.div`
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

const MemberAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid
    ${(props) =>
      props.$status === "online" ? "#10b981" : props.theme.borderLight};
`;

const MemberDetails = styled.div`
  flex: 1;
`;

const MemberName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 4px;
  transition: color 0.3s ease;
`;

const MemberEmail = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 8px;
  transition: color 0.3s ease;
`;

const MemberMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 0.8rem;
`;

const JoinDate = styled.span`
  color: ${(props) => props.theme.textTertiary};
  transition: color 0.3s ease;
`;

const LastActive = styled.span`
  color: ${(props) => props.theme.textTertiary};
  transition: color 0.3s ease;
`;

const MemberActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const RoleSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 6px;
  font-size: 0.9rem;
  background: ${(props) => props.theme.surfaceSecondary};
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.buttonPrimary};
  }
`;

const RemoveButton = styled.button`
  padding: 8px 12px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
  }
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
  max-width: 500px;
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
