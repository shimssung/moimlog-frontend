import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import { useTheme } from "../../../utils/ThemeContext";
import { useMoim } from "../../../hooks/useMoim";

const MoimSettingsPage = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { id: moimId } = router.query;
  const { deleteMoim, isLoading } = useMoim();
  const [moimInfo, setMoimInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("general");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 더미 데이터
  useEffect(() => {
    if (moimId) {
      setMoimInfo({
        id: moimId,
        title: "북클럽: 시크릿 가든",
        description:
          "함께 읽고 토론하는 독서 모임입니다. 매월 한 권의 책을 선정하여 깊이 있는 독서와 의미 있는 대화를 나눕니다.",
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

  const handleDeleteMoim = async () => {
    try {
      // 모임 삭제 API 호출
      const result = await deleteMoim(moimId);

      if (result.success) {
        // 성공 시 deleteMoim 훅에서 자동으로 리다이렉트 처리
        return;
      }
    } catch (error) {
      console.error("모임 삭제 실패:", error);
      toast.error("모임 삭제에 실패했습니다.");
    }
  };

  return (
    <PageContainer theme={theme}>
      <Header />
      <ContentContainer>
        <Sidebar
          moimId={moimId}
          moimRole={moimInfo?.role}
          activeMenu="settings"
        />

        <MainContent theme={theme}>
          <PageHeader>
            <HeaderInfo>
              <PageTitle theme={theme}>모임 설정</PageTitle>
              <PageSubtitle theme={theme}>
                {moimInfo?.title}의 설정을 관리하세요
              </PageSubtitle>
            </HeaderInfo>
          </PageHeader>

          <SettingsContainer theme={theme}>
            <SettingsTabs theme={theme}>
              <SettingsTab
                $active={activeTab === "general"}
                onClick={() => setActiveTab("general")}
                theme={theme}
              >
                일반 설정
              </SettingsTab>
              <SettingsTab
                $active={activeTab === "notifications"}
                onClick={() => setActiveTab("notifications")}
                theme={theme}
              >
                알림 설정
              </SettingsTab>
              <SettingsTab
                $active={activeTab === "privacy"}
                onClick={() => setActiveTab("privacy")}
                theme={theme}
              >
                개인정보
              </SettingsTab>
              <SettingsTab
                $active={activeTab === "danger"}
                onClick={() => setActiveTab("danger")}
                theme={theme}
              >
                위험 영역
              </SettingsTab>
            </SettingsTabs>

            <SettingsContent>
              {activeTab === "general" && (
                <GeneralSettings>
                  <SectionTitle theme={theme}>모임 정보</SectionTitle>
                  <FormGroup>
                    <Label theme={theme}>모임명</Label>
                    <Input
                      type="text"
                      defaultValue={moimInfo?.title}
                      placeholder="모임명을 입력하세요"
                      theme={theme}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label theme={theme}>모임 설명</Label>
                    <Textarea
                      defaultValue={moimInfo?.description}
                      placeholder="모임에 대한 설명을 입력하세요"
                      rows="4"
                      theme={theme}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label theme={theme}>카테고리</Label>
                    <Select defaultValue={moimInfo?.category} theme={theme}>
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
                    <Label theme={theme}>최대 멤버 수</Label>
                    <Input
                      type="number"
                      min="2"
                      max="100"
                      defaultValue={moimInfo?.maxMembers}
                      theme={theme}
                    />
                  </FormGroup>
                  <SaveButton onClick={handleSaveSettings} theme={theme}>
                    설정 저장
                  </SaveButton>
                </GeneralSettings>
              )}

              {activeTab === "notifications" && (
                <NotificationSettings>
                  <SectionTitle theme={theme}>알림 설정</SectionTitle>
                  <NotificationItem theme={theme}>
                    <NotificationInfo>
                      <NotificationLabel theme={theme}>
                        새 메시지 알림
                      </NotificationLabel>
                      <NotificationDesc theme={theme}>
                        채팅에 새 메시지가 올 때 알림을 받습니다
                      </NotificationDesc>
                    </NotificationInfo>
                    <ToggleSwitch
                      defaultChecked={moimInfo?.notifications?.newMessage}
                    />
                  </NotificationItem>
                  <NotificationItem theme={theme}>
                    <NotificationInfo>
                      <NotificationLabel theme={theme}>
                        새 게시글 알림
                      </NotificationLabel>
                      <NotificationDesc theme={theme}>
                        게시판에 새 글이 올 때 알림을 받습니다
                      </NotificationDesc>
                    </NotificationInfo>
                    <ToggleSwitch
                      defaultChecked={moimInfo?.notifications?.newPost}
                    />
                  </NotificationItem>
                  <NotificationItem theme={theme}>
                    <NotificationInfo>
                      <NotificationLabel theme={theme}>
                        새 일정 알림
                      </NotificationLabel>
                      <NotificationDesc theme={theme}>
                        새로운 일정이 생성될 때 알림을 받습니다
                      </NotificationDesc>
                    </NotificationInfo>
                    <ToggleSwitch
                      defaultChecked={moimInfo?.notifications?.newEvent}
                    />
                  </NotificationItem>
                  <NotificationItem theme={theme}>
                    <NotificationInfo>
                      <NotificationLabel theme={theme}>
                        멤버 가입 알림
                      </NotificationLabel>
                      <NotificationDesc theme={theme}>
                        새로운 멤버가 가입할 때 알림을 받습니다
                      </NotificationDesc>
                    </NotificationInfo>
                    <ToggleSwitch
                      defaultChecked={moimInfo?.notifications?.memberJoin}
                    />
                  </NotificationItem>
                  <SaveButton onClick={handleSaveSettings} theme={theme}>
                    알림 설정 저장
                  </SaveButton>
                </NotificationSettings>
              )}

              {activeTab === "privacy" && (
                <PrivacySettings>
                  <SectionTitle theme={theme}>개인정보 설정</SectionTitle>
                  <PrivacyItem theme={theme}>
                    <PrivacyInfo>
                      <PrivacyLabel theme={theme}>공개 모임</PrivacyLabel>
                      <PrivacyDesc theme={theme}>
                        모임이 검색 결과에 표시됩니다
                      </PrivacyDesc>
                    </PrivacyInfo>
                    <ToggleSwitch defaultChecked={moimInfo?.isPublic} />
                  </PrivacyItem>
                  <SaveButton onClick={handleSaveSettings} theme={theme}>
                    개인정보 설정 저장
                  </SaveButton>
                </PrivacySettings>
              )}

              {activeTab === "danger" && (
                <DangerSettings>
                  <SectionTitle theme={theme}>위험 영역</SectionTitle>
                  <DangerItem theme={theme}>
                    <DangerInfo>
                      <DangerLabel theme={theme}>모임 삭제</DangerLabel>
                      <DangerDesc theme={theme}>
                        모임을 영구적으로 삭제합니다. 이 작업은 되돌릴 수
                        없습니다.
                      </DangerDesc>
                    </DangerInfo>
                    <DeleteButton
                      onClick={() => setShowDeleteModal(true)}
                      theme={theme}
                    >
                      모임 삭제
                    </DeleteButton>
                  </DangerItem>
                </DangerSettings>
              )}
            </SettingsContent>
          </SettingsContainer>

          {showDeleteModal && (
            <ModalOverlay onClick={() => setShowDeleteModal(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
                <ModalHeader theme={theme}>
                  <ModalTitle theme={theme}>모임 삭제 확인</ModalTitle>
                  <CloseButton
                    onClick={() => setShowDeleteModal(false)}
                    theme={theme}
                  >
                    ✕
                  </CloseButton>
                </ModalHeader>
                <ModalBody>
                  <ModalText theme={theme}>
                    정말로 "{moimInfo?.title}" 모임을 삭제하시겠습니까?
                    <br />이 작업은 되돌릴 수 없으며, 모든 데이터가 영구적으로
                    삭제됩니다.
                  </ModalText>
                </ModalBody>
                <ModalFooter theme={theme}>
                  <Button
                    variant="light"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    취소
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleDeleteMoim}
                    disabled={isLoading}
                  >
                    {isLoading ? "삭제 중..." : "모임 삭제"}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          )}
        </MainContent>
      </ContentContainer>
    </PageContainer>
  );
};

export default MoimSettingsPage;

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

const SettingsContainer = styled.div`
  display: flex;
  flex: 1;
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const SettingsTabs = styled.div`
  width: 250px;
  background: ${(props) => props.theme.surfaceSecondary};
  border-right: 1px solid ${(props) => props.theme.borderLight};
  padding: 24px 0;
  transition: border-color 0.3s ease;
`;

const SettingsTab = styled.button`
  width: 100%;
  padding: 12px 24px;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.buttonPrimary : "transparent"};
  color: ${({ $active, theme }) => ($active ? "white" : theme.textSecondary)};
  text-align: left;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.buttonHover : theme.borderLight};
    color: ${({ $active, theme }) => ($active ? "white" : theme.textPrimary)};
  }
`;

const SettingsContent = styled.div`
  flex: 1;
  padding: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 24px 0;
  transition: color 0.3s ease;
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

const SaveButton = styled.button`
  background: ${(props) => props.theme.buttonPrimary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.buttonHover};
  }
`;

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
  transition: border-color 0.3s ease;

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationInfo = styled.div`
  flex: 1;
`;

const NotificationLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 4px;
  transition: color 0.3s ease;
`;

const NotificationDesc = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.3s ease;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 51px;
  height: 31px;
  cursor: pointer;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.borderLight};
    transition: 0.4s;
    border-radius: 34px;
    padding: 4px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 23px;
    width: 23px;
    left: 4px;
    bottom: 4px;
    background-color: ${(props) => props.theme.surface};
    transition: 0.4s;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px;
  }

  input:checked + .slider {
    background-color: ${(props) => props.theme.buttonPrimary};
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }
`;

const PrivacyItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
  transition: border-color 0.3s ease;

  &:last-child {
    border-bottom: none;
  }
`;

const PrivacyInfo = styled.div`
  flex: 1;
`;

const PrivacyLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 4px;
  transition: color 0.3s ease;
`;

const PrivacyDesc = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.3s ease;
`;

const DangerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${(props) =>
    props.theme.mode === "dark" ? "#1f1f1f" : "#fef2f2"};
  border: 1px solid
    ${(props) => (props.theme.mode === "dark" ? "#dc2626" : "#fecaca")};
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DangerInfo = styled.div`
  flex: 1;
`;

const DangerLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(props) => (props.theme.mode === "dark" ? "#fca5a5" : "#dc2626")};
  margin-bottom: 4px;
  transition: color 0.3s ease;
`;

const DangerDesc = styled.div`
  font-size: 0.8rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#fecaca" : "#ef4444")};
  transition: color 0.3s ease;
`;

const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 600;
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

const ModalText = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.6;
  margin: 0;
  transition: color 0.3s ease;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid ${(props) => props.theme.borderLight};
  transition: border-color 0.3s ease;
`;

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
