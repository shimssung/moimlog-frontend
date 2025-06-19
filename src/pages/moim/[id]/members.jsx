import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import Button from "../../../components/Button";

const MoimMembersPage = () => {
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
        return members.filter(member => member.status === "online");
      case "offline":
        return members.filter(member => member.status === "offline");
      case "admin":
        return members.filter(member => member.role === "운영자");
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
    setMembers(prev => 
      prev.map(member => 
        member.id === memberId 
          ? { ...member, role: newRole }
          : member
      )
    );
  };

  const handleRemoveMember = (memberId) => {
    if (typeof window !== 'undefined' && window.confirm("정말로 이 멤버를 제거하시겠습니까?")) {
      setMembers(prev => prev.filter(member => member.id !== memberId));
    }
  };

  const handleExportMembers = () => {
    if (typeof window !== 'undefined') {
      const csvContent = "data:text/csv;charset=utf-8," 
        + "이름,이메일,역할,가입일,마지막 활동\n"
        + members.map(member => 
            `${member.name},${member.email},${member.role},${formatDate(member.joinDate)},${formatLastActive(member.lastActive)}`
          ).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `모임_멤버_목록_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <PageContainer>
      <Sidebar moimId={moimId} moimRole={moimInfo?.role} activeMenu="members" />
      
      <MainContent>
        <PageHeader>
          <HeaderInfo>
            <PageTitle>멤버 관리</PageTitle>
            <PageSubtitle>{moimInfo?.title}의 멤버를 관리하세요</PageSubtitle>
          </HeaderInfo>
          <InviteButton onClick={() => setShowInviteModal(true)}>
            <ButtonIcon>👥</ButtonIcon>
            멤버 초대
          </InviteButton>
        </PageHeader>

        <StatsContainer>
          <StatCard>
            <StatNumber>{members.length}</StatNumber>
            <StatLabel>전체 멤버</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{members.filter(m => m.status === "online").length}</StatNumber>
            <StatLabel>온라인</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{members.filter(m => m.role === "운영자").length}</StatNumber>
            <StatLabel>운영자</StatLabel>
          </StatCard>
        </StatsContainer>

        <TabContainer>
          <Tab $active={activeTab === "all"} onClick={() => setActiveTab("all")}>
            전체 ({members.length})
          </Tab>
          <Tab $active={activeTab === "online"} onClick={() => setActiveTab("online")}>
            온라인 ({members.filter(m => m.status === "online").length})
          </Tab>
          <Tab $active={activeTab === "offline"} onClick={() => setActiveTab("offline")}>
            오프라인 ({members.filter(m => m.status === "offline").length})
          </Tab>
          <Tab $active={activeTab === "admin"} onClick={() => setActiveTab("admin")}>
            운영자 ({members.filter(m => m.role === "운영자").length})
          </Tab>
        </TabContainer>

        <MemberList>
          {getFilteredMembers().map((member) => (
            <MemberCard key={member.id}>
              <MemberInfo>
                <MemberAvatar>
                  <AvatarImage src={member.image} alt={member.name} />
                  <StatusIndicator status={member.status} />
                </MemberAvatar>
                <MemberDetails>
                  <MemberName>{member.name}</MemberName>
                  <MemberEmail>{member.email}</MemberEmail>
                  <MemberMeta>
                    가입일: {formatDate(member.joinDate)} • 
                    마지막 활동: {formatLastActive(member.lastActive)}
                  </MemberMeta>
                </MemberDetails>
              </MemberInfo>
              
              <MemberActions>
                <RoleSelect
                  value={member.role}
                  onChange={(e) => handleRoleChange(member.id, e.target.value)}
                  disabled={member.role === "운영자" && members.filter(m => m.role === "운영자").length === 1}
                >
                  <option value="멤버">멤버</option>
                  <option value="운영자">운영자</option>
                </RoleSelect>
                <RemoveButton 
                  onClick={() => handleRemoveMember(member.id)}
                  disabled={member.role === "운영자" && members.filter(m => m.role === "운영자").length === 1}
                >
                  제거
                </RemoveButton>
              </MemberActions>
            </MemberCard>
          ))}
        </MemberList>

        {showInviteModal && (
          <ModalOverlay onClick={() => setShowInviteModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>멤버 초대</ModalTitle>
                <CloseButton onClick={() => setShowInviteModal(false)}>✕</CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label>이메일 주소</Label>
                  <Input type="email" placeholder="초대할 멤버의 이메일을 입력하세요" />
                </FormGroup>
                <FormGroup>
                  <Label>초대 메시지 (선택사항)</Label>
                  <Textarea 
                    placeholder="초대 메시지를 입력하세요" 
                    rows="3"
                    defaultValue={`안녕하세요! ${moimInfo?.title}에 초대합니다.`}
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowInviteModal(false)}>
                  취소
                </Button>
                <Button variant="primary">
                  초대 보내기
                </Button>
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

const InviteButton = styled.button`
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

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  padding: 24px 32px;
  background: #fff;
`;

const StatCard = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 20px 32px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
`;

const Tab = styled.button`
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

const MemberList = styled.div`
  flex: 1;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MemberCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
  }
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MemberAvatar = styled.div`
  position: relative;
`;

const AvatarImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const StatusIndicator = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.status === "online" ? "#10b981" : "#9ca3af"};
  border: 2px solid #fff;
`;

const MemberDetails = styled.div``;

const MemberName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
`;

const MemberEmail = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 4px;
`;

const MemberMeta = styled.div`
  font-size: 0.8rem;
  color: #9ca3af;
`;

const MemberActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RoleSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
  }

  &:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  padding: 8px 16px;
  background: #ef4444;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #dc2626;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
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
  max-width: 500px;
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