import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import JoinRequestModal from "./JoinRequestModal";
import { moimAPI } from "../api/moim";
import toast from "react-hot-toast";

const JoinRequestList = ({ moimId, userRole, onRefresh }) => {
  const [joinRequests, setJoinRequests] = useState([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // 운영자 권한 확인
  const isOperator = userRole === "ADMIN" || userRole === "MODERATOR";

  useEffect(() => {
    if (isOperator) {
      fetchJoinRequests();
      fetchStats();
    }
  }, [moimId, currentStatus, currentPage, isOperator]);

  const fetchJoinRequests = async () => {
    try {
      setIsLoading(true);
      const response = await moimAPI.getJoinRequests(
        moimId, 
        currentStatus, 
        currentPage, 
        10
      );
      
      if (response.success) {
        setJoinRequests(response.data.joinRequests);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("참여신청 목록 조회 실패:", error);
      toast.error("참여신청 목록을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await moimAPI.getJoinRequestStats(moimId);
      if (response.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("통계 조회 실패:", error);
    }
  };

  const handleApprove = async (message) => {
    try {
      await moimAPI.approveJoinRequest(moimId, selectedRequest.id, message);
      toast.success("참여신청이 승인되었습니다.");
      fetchJoinRequests();
      fetchStats();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("승인 처리 실패:", error);
      toast.error("승인 처리에 실패했습니다.");
    }
  };

  const handleReject = async (reason) => {
    try {
      await moimAPI.rejectJoinRequest(moimId, selectedRequest.id, reason);
      toast.success("참여신청이 거절되었습니다.");
      fetchJoinRequests();
      fetchStats();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("거절 처리 실패:", error);
      toast.error("거절 처리에 실패했습니다.");
    }
  };

  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { label: "승인 대기", color: "#f59e0b", bgColor: "#fef3c7" },
      APPROVED: { label: "승인 완료", color: "#10b981", bgColor: "#d1fae5" },
      REJECTED: { label: "거절됨", color: "#ef4444", bgColor: "#fee2e2" }
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    
    return (
      <StatusBadge 
        color={config.color} 
        bgColor={config.bgColor}
      >
        {config.label}
      </StatusBadge>
    );
  };

  if (!isOperator) {
    return (
      <NoAccessMessage>
        모임 운영자만 참여신청을 관리할 수 있습니다.
      </NoAccessMessage>
    );
  }

  return (
    <Container>
      {/* 통계 및 필터 */}
      <HeaderSection>
        <Title>참여신청 관리</Title>
        <StatsContainer>
          <StatItem>
            <StatLabel>승인 대기</StatLabel>
            <StatValue pending>{stats.pending}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>승인 완료</StatLabel>
            <StatValue approved>{stats.approved}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>거절됨</StatLabel>
            <StatValue rejected>{stats.rejected}</StatValue>
          </StatItem>
        </StatsContainer>
      </HeaderSection>

      {/* 상태 필터 */}
      <FilterSection>
        <FilterButton
          active={currentStatus === "ALL"}
          onClick={() => setCurrentStatus("ALL")}
        >
          전체
        </FilterButton>
        <FilterButton
          active={currentStatus === "PENDING"}
          onClick={() => setCurrentStatus("PENDING")}
        >
          승인 대기 ({stats.pending})
        </FilterButton>
        <FilterButton
          active={currentStatus === "APPROVED"}
          onClick={() => setCurrentStatus("APPROVED")}
        >
          승인 완료 ({stats.approved})
        </FilterButton>
        <FilterButton
          active={currentStatus === "REJECTED"}
          onClick={() => setCurrentStatus("REJECTED")}
        >
          거절됨 ({stats.rejected})
        </FilterButton>
      </FilterSection>

      {/* 참여신청 목록 */}
      <ListContainer>
        {isLoading ? (
          <LoadingMessage>로딩 중...</LoadingMessage>
        ) : joinRequests.length === 0 ? (
          <EmptyMessage>
            {currentStatus === "ALL" 
              ? "참여신청이 없습니다." 
              : `${currentStatus === "PENDING" ? "승인 대기" : currentStatus === "APPROVED" ? "승인 완료" : "거절됨"}인 참여신청이 없습니다.`
            }
          </EmptyMessage>
        ) : (
          joinRequests.map((request) => (
            <RequestItem key={request.id}>
              <UserInfo>
                <UserAvatar 
                  src={request.userProfileImage || "/blank-profile.png"} 
                  alt="프로필" 
                />
                <UserDetails>
                  <UserName>{request.userName}</UserName>
                  <UserEmail>{request.userEmail}</UserEmail>
                  <RequestDate>
                    {new Date(request.requestedAt).toLocaleDateString()}
                  </RequestDate>
                </UserDetails>
              </UserInfo>
              
              <RequestContent>
                <RequestMessage>
                  {request.message || "메시지가 없습니다."}
                </RequestMessage>
                {getStatusBadge(request.status)}
              </RequestContent>

              {request.status === "PENDING" && (
                <ActionButtons>
                  <ActionButton
                    onClick={() => openModal(request)}
                    variant="primary"
                    size="small"
                  >
                    처리하기
                  </ActionButton>
                </ActionButtons>
              )}
            </RequestItem>
          ))
        )}
      </ListContainer>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <PaginationContainer>
          <PaginationButton
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            이전
          </PaginationButton>
          
          <PageInfo>
            {currentPage} / {totalPages}
          </PageInfo>
          
          <PaginationButton
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            다음
          </PaginationButton>
        </PaginationContainer>
      )}

      {/* 승인/거절 모달 */}
      <JoinRequestModal
        isOpen={isModalOpen}
        onClose={closeModal}
        joinRequest={selectedRequest}
        onApprove={handleApprove}
        onReject={handleReject}
        isLoading={isLoading}
      />
    </Container>
  );
};

const Container = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const HeaderSection = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const Title = styled.h2`
  margin: 0 0 16px 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  
  ${({ pending }) => pending && `color: #fbbf24;`}
  ${({ approved }) => approved && `color: #34d399;`}
  ${({ rejected }) => rejected && `color: #f87171;`}
`;

const FilterSection = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  background: ${({ active }) => active ? "#3b82f6" : "white"};
  color: ${({ active }) => active ? "white" : "#374151"};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ active }) => active ? "#2563eb" : "#f9fafb"};
  }
`;

const ListContainer = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

const RequestItem = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  gap: 16px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9fafb;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
`;

const UserEmail = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 2px;
`;

const RequestDate = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
`;

const RequestContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RequestMessage = styled.div`
  color: #374151;
  line-height: 1.5;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  align-self: flex-start;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled(Button)`
  min-width: 80px;
`;

const PaginationContainer = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #f9fafb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

const LoadingMessage = styled.div`
  padding: 40px;
  text-align: center;
  color: #6b7280;
`;

const EmptyMessage = styled.div`
  padding: 40px;
  text-align: center;
  color: #9ca3af;
`;

const NoAccessMessage = styled.div`
  padding: 40px;
  text-align: center;
  color: #6b7280;
  background: #f9fafb;
  border-radius: 8px;
`;

export default JoinRequestList;
