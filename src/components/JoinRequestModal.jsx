import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import Textarea from "./Textarea";

const JoinRequestModal = ({ 
  isOpen, 
  onClose, 
  joinRequest, 
  onApprove, 
  onReject,
  isLoading = false 
}) => {
  const [approveMessage, setApproveMessage] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !joinRequest) return null;

  const handleApprove = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onApprove(approveMessage);
      setApproveMessage("");
      onClose();
    } catch (error) {
      console.error("승인 처리 중 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (isSubmitting || !rejectReason.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onReject(rejectReason);
      setRejectReason("");
      onClose();
    } catch (error) {
      console.error("거절 처리 중 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setApproveMessage("");
    setRejectReason("");
    onClose();
  };

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>참여신청 처리</h2>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>

        <ModalBody>
          {/* 신청자 정보 */}
          <UserInfoSection>
            <UserAvatar src={joinRequest.userProfileImage || "/blank-profile.png"} alt="프로필" />
            <UserDetails>
              <UserName>{joinRequest.userName}</UserName>
              <UserEmail>{joinRequest.userEmail}</UserEmail>
              <RequestDate>
                신청일: {new Date(joinRequest.requestedAt).toLocaleDateString()}
              </RequestDate>
            </UserDetails>
          </UserInfoSection>

          {/* 참여 신청 메시지 */}
          <MessageSection>
            <SectionTitle>참여 신청 메시지</SectionTitle>
            <MessageContent>
              {joinRequest.message || "메시지가 없습니다."}
            </MessageContent>
          </MessageSection>

          {/* 승인 폼 */}
          <ActionSection>
            <SectionTitle>승인</SectionTitle>
            <Input
              placeholder="환영 메시지를 입력하세요 (선택사항)"
              value={approveMessage}
              onChange={(e) => setApproveMessage(e.target.value)}
              maxLength={200}
            />
            <ApproveButton
              onClick={handleApprove}
              disabled={isSubmitting || isLoading}
              variant="primary"
            >
              {isSubmitting ? "처리 중..." : "승인"}
            </ApproveButton>
          </ActionSection>

          {/* 거절 폼 */}
          <ActionSection>
            <SectionTitle>거절</SectionTitle>
            <Textarea
              placeholder="거절 사유를 입력하세요 (필수)"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              maxLength={500}
              required
            />
            <RejectButton
              onClick={handleReject}
              disabled={isSubmitting || isLoading || !rejectReason.trim()}
              variant="danger"
            >
              {isSubmitting ? "처리 중..." : "거절"}
            </RejectButton>
          </ActionSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const UserInfoSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 8px;
`;

const UserAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 1.125rem;
  color: #111827;
  margin-bottom: 4px;
`;

const UserEmail = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 4px;
`;

const RequestDate = styled.div`
  color: #9ca3af;
  font-size: 0.75rem;
`;

const MessageSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
`;

const MessageContent = styled.div`
  padding: 16px;
  background-color: #f3f4f6;
  border-radius: 8px;
  color: #374151;
  line-height: 1.5;
  min-height: 60px;
  display: flex;
  align-items: center;
`;

const ActionSection = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ApproveButton = styled(Button)`
  margin-top: 12px;
  width: 100%;
`;

const RejectButton = styled(Button)`
  margin-top: 12px;
  width: 100%;
`;

export default JoinRequestModal;
