import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Sidebar from "../../../components/Sidebar";
import Button from "../../../components/Button";

const MoimSettingsPage = () => {
  const router = useRouter();
  const { id: moimId } = router.query;
  const [moimInfo, setMoimInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("general");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 더미 데이터
  useEffect(() => {
    if (moimId) {
      setMoimInfo({
        id: moimId,
        title: "북클럽: 시크릿 가든",
        description: "함께 읽고 토론하는 독서 모임입니다. 매월 한 권의 책을 선정하여 깊이 있는 독서와 의미 있는 대화를 나눕니다.",
        image: "/img4.jpg",
        category: "독서",
        maxMembers: 20,
        isPublic: true,
        allowInvite: true,
        notifications: {
          newMessage: true,
          newPost: true,
          newEvent: true,
          memberJoin: false,
        },
        role: "운영자",
      });
    }
  }, [moimId]);

  const handleSaveSettings = () => {
    // 설정 저장 로직
    toast.success("설정이 저장되었습니다!");
  };

  const handleDeleteMoim = () => {
    // 모임 삭제 로직
    toast.success("모임이 삭제되었습니다!");
    router.push("/my-moims");
  };

  return (
    <PageContainer>
      <Sidebar moimId={moimId} moimRole={moimInfo?.role} activeMenu="settings" />
      
      <MainContent>
        <PageHeader>
          <HeaderInfo>
            <PageTitle>모임 설정</PageTitle>
            <PageSubtitle>{moimInfo?.title}의 설정을 관리하세요</PageSubtitle>
          </HeaderInfo>
        </PageHeader>

        <SettingsContainer>
          <SettingsTabs>
            <SettingsTab $active={activeTab === "general"} onClick={() => setActiveTab("general")}>
              일반 설정
            </SettingsTab>
            <SettingsTab $active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")}>
              알림 설정
            </SettingsTab>
            <SettingsTab $active={activeTab === "privacy"} onClick={() => setActiveTab("privacy")}>
              개인정보
            </SettingsTab>
            <SettingsTab $active={activeTab === "danger"} onClick={() => setActiveTab("danger")}>
              위험 영역
            </SettingsTab>
          </SettingsTabs>

          <SettingsContent>
            {activeTab === "general" && (
              <GeneralSettings>
                <SectionTitle>모임 정보</SectionTitle>
                <FormGroup>
                  <Label>모임명</Label>
                  <Input 
                    type="text" 
                    defaultValue={moimInfo?.title}
                    placeholder="모임명을 입력하세요"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>모임 설명</Label>
                  <Textarea 
                    defaultValue={moimInfo?.description}
                    placeholder="모임에 대한 설명을 입력하세요"
                    rows="4"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>카테고리</Label>
                  <Select defaultValue={moimInfo?.category}>
                    <option value="독서">독서</option>
                    <option value="개발">개발</option>
                    <option value="요리">요리</option>
                    <option value="스포츠">스포츠</option>
                    <option value="예술">예술</option>
                    <option value="음악">음악</option>
                    <option value="운동">운동</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>최대 멤버 수</Label>
                  <Input 
                    type="number" 
                    min="2" 
                    max="100"
                    defaultValue={moimInfo?.maxMembers}
                  />
                </FormGroup>
                <SaveButton onClick={handleSaveSettings}>
                  설정 저장
                </SaveButton>
              </GeneralSettings>
            )}

            {activeTab === "notifications" && (
              <NotificationSettings>
                <SectionTitle>알림 설정</SectionTitle>
                <NotificationItem>
                  <NotificationInfo>
                    <NotificationLabel>새 메시지 알림</NotificationLabel>
                    <NotificationDesc>채팅에 새 메시지가 올 때 알림을 받습니다</NotificationDesc>
                  </NotificationInfo>
                  <ToggleSwitch defaultChecked={moimInfo?.notifications?.newMessage} />
                </NotificationItem>
                <NotificationItem>
                  <NotificationInfo>
                    <NotificationLabel>새 게시글 알림</NotificationLabel>
                    <NotificationDesc>게시판에 새 글이 올 때 알림을 받습니다</NotificationDesc>
                  </NotificationInfo>
                  <ToggleSwitch defaultChecked={moimInfo?.notifications?.newPost} />
                </NotificationItem>
                <NotificationItem>
                  <NotificationInfo>
                    <NotificationLabel>새 일정 알림</NotificationLabel>
                    <NotificationDesc>새로운 일정이 생성될 때 알림을 받습니다</NotificationDesc>
                  </NotificationInfo>
                  <ToggleSwitch defaultChecked={moimInfo?.notifications?.newEvent} />
                </NotificationItem>
                <NotificationItem>
                  <NotificationInfo>
                    <NotificationLabel>멤버 가입 알림</NotificationLabel>
                    <NotificationDesc>새로운 멤버가 가입할 때 알림을 받습니다</NotificationDesc>
                  </NotificationInfo>
                  <ToggleSwitch defaultChecked={moimInfo?.notifications?.memberJoin} />
                </NotificationItem>
                <SaveButton onClick={handleSaveSettings}>
                  알림 설정 저장
                </SaveButton>
              </NotificationSettings>
            )}

            {activeTab === "privacy" && (
              <PrivacySettings>
                <SectionTitle>개인정보 설정</SectionTitle>
                <PrivacyItem>
                  <PrivacyInfo>
                    <PrivacyLabel>공개 모임</PrivacyLabel>
                    <PrivacyDesc>모임이 검색 결과에 표시됩니다</PrivacyDesc>
                  </PrivacyInfo>
                  <ToggleSwitch defaultChecked={moimInfo?.isPublic} />
                </PrivacyItem>
                <PrivacyItem>
                  <PrivacyInfo>
                    <PrivacyLabel>멤버 초대 허용</PrivacyLabel>
                    <PrivacyDesc>멤버가 다른 사람을 초대할 수 있습니다</PrivacyDesc>
                  </PrivacyInfo>
                  <ToggleSwitch defaultChecked={moimInfo?.allowInvite} />
                </PrivacyItem>
                <SaveButton onClick={handleSaveSettings}>
                  개인정보 설정 저장
                </SaveButton>
              </PrivacySettings>
            )}

            {activeTab === "danger" && (
              <DangerSettings>
                <SectionTitle>위험 영역</SectionTitle>
                <DangerItem>
                  <DangerInfo>
                    <DangerLabel>모임 삭제</DangerLabel>
                    <DangerDesc>모임을 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없습니다.</DangerDesc>
                  </DangerInfo>
                  <DeleteButton onClick={() => setShowDeleteModal(true)}>
                    모임 삭제
                  </DeleteButton>
                </DangerItem>
              </DangerSettings>
            )}
          </SettingsContent>
        </SettingsContainer>

        {showDeleteModal && (
          <ModalOverlay onClick={() => setShowDeleteModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>모임 삭제 확인</ModalTitle>
                <CloseButton onClick={() => setShowDeleteModal(false)}>✕</CloseButton>
              </ModalHeader>
              <ModalBody>
                <WarningIcon>⚠️</WarningIcon>
                <WarningTitle>정말로 모임을 삭제하시겠습니까?</WarningTitle>
                <WarningText>
                  이 작업은 되돌릴 수 없으며, 모든 데이터가 영구적으로 삭제됩니다.
                </WarningText>
                <ConfirmInput 
                  type="text" 
                  placeholder="삭제를 확인하려면 'DELETE'를 입력하세요"
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                  취소
                </Button>
                <Button variant="danger" onClick={handleDeleteMoim}>
                  모임 삭제
                </Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default MoimSettingsPage;

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

const SettingsContainer = styled.div`
  display: flex;
  flex: 1;
`;

const SettingsTabs = styled.div`
  width: 250px;
  background: #f9fafb;
  border-right: 1px solid #e5e7eb;
  padding: 24px 0;
`;

const SettingsTab = styled.button`
  width: 100%;
  padding: 12px 24px;
  border: none;
  background: ${props => props.$active ? "#3b82f6" : "#f3f4f6"};
  color: ${props => props.$active ? "#fff" : "#6b7280"};
  text-align: left;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$active ? "#2563eb" : "#e5e7eb"};
  }
`;

const SettingsContent = styled.div`
  flex: 1;
  padding: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 24px 0;
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

const SaveButton = styled.button`
  padding: 12px 24px;
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

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;
`;

const NotificationInfo = styled.div`
  flex: 1;
`;

const NotificationLabel = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 4px;
`;

const NotificationDesc = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
`;

const ToggleSwitch = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 48px;
  height: 24px;
  background: #d1d5db;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;

  &:checked {
    background: #3b82f6;
  }

  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: all 0.2s ease;
  }

  &:checked::before {
    transform: translateX(24px);
  }
`;

const PrivacyItem = styled(NotificationItem)``;
const PrivacyInfo = styled(NotificationInfo)``;
const PrivacyLabel = styled(NotificationLabel)``;
const PrivacyDesc = styled(NotificationDesc)``;

const GeneralSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const NotificationSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PrivacySettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const DangerSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const DangerItem = styled(NotificationItem)`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const DangerInfo = styled(NotificationInfo)``;
const DangerLabel = styled(NotificationLabel)``;
const DangerDesc = styled(NotificationDesc)``;

const DeleteButton = styled.button`
  padding: 8px 16px;
  background: #ef4444;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
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
  text-align: center;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #e5e7eb;
`;

const WarningIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
`;

const WarningTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
`;

const WarningText = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 20px 0;
  line-height: 1.5;
`;

const ConfirmInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #ef4444;
  }
`;