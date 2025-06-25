import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { useTheme } from "../utils/ThemeContext";

const SETTINGS_SECTIONS = [
  { key: "profile", label: "프로필 설정", icon: "👤" },
  { key: "account", label: "계정 설정", icon: "🔐" },
  { key: "notifications", label: "알림 설정", icon: "🔔" },
  { key: "privacy", label: "개인정보", icon: "🔒" },
  { key: "danger", label: "위험 영역", icon: "⚠️" },
];

const Settings = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("profile");
  const [formData, setFormData] = useState({
    name: "테스트 사용자",
    email: "user@example.com",
    bio: "안녕하세요! 모임을 통해 새로운 경험을 만들어가고 있습니다.",
    profileImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYhudJVFm4j1jvaC3VWtkGNFmVFgvExkuGOiCq6wb6n7E4J9xxEqElvphiAZC0gj5eBA_7iZgjBRvQo-9Gxw8JoY_kWlISZJ50bITlmXdYj57pGxsbk6KKMfELeMhLrns-rtFui-xzTQShRZX3NVMfl7dfHr6tUYvsvy_alUFaMe6a3euW23fOmmrjFpi3shfKFXu-nkXQNxR7dsB2s_X6eCXyewLkF_HPECgXPDn2yaaxF-BZRZzDxExVJeWp_v0pylmwt9R_2g",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notificationEmail: true,
    notificationPush: true,
    notificationSchedule: true,
    notificationComment: true,
    profileVisibility: "public",
    emailVisibility: "private",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      // 파일 타입 체크
      if (!file.type.startsWith("image/")) {
        toast.error("이미지 파일만 업로드 가능합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          profileImage: event.target.result,
        }));
        toast.success("프로필 이미지가 업로드되었습니다.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("설정이 저장되었습니다!");
  };

  const renderProfileSection = () => (
    <SectionContent>
      <SectionTitle theme={theme}>프로필 설정</SectionTitle>
      <SectionDescription theme={theme}>
        프로필 정보를 수정하여 다른 사용자들에게 보여질 정보를 관리하세요.
      </SectionDescription>

      <ProfileImageSection>
        <ProfileImageContainer>
          <ProfileImage
            src={formData.profileImage}
            alt="프로필 이미지"
            theme={theme}
          />
          <ImageOverlay>
            <ImageUploadLabel htmlFor="profileImageUpload" theme={theme}>
              <CameraIcon />
              <span>이미지 변경</span>
            </ImageUploadLabel>
          </ImageOverlay>
        </ProfileImageContainer>
        <ImageUploadInput
          type="file"
          id="profileImageUpload"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <ImageHelpText theme={theme}>
          JPG, PNG, GIF 파일만 업로드 가능합니다. (최대 5MB)
        </ImageHelpText>
      </ProfileImageSection>

      <FormGroup>
        <Label htmlFor="name" theme={theme}>
          이름
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          theme={theme}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email" theme={theme}>
          이메일
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          theme={theme}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="bio" theme={theme}>
          자기소개
        </Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          theme={theme}
        />
      </FormGroup>

      <Button variant="primary" onClick={handleSubmit}>
        프로필 저장
      </Button>
    </SectionContent>
  );

  const renderAccountSection = () => (
    <SectionContent>
      <SectionTitle theme={theme}>계정 설정</SectionTitle>
      <SectionDescription theme={theme}>
        계정 보안을 위해 비밀번호를 변경하세요.
      </SectionDescription>

      <FormGroup>
        <Label htmlFor="currentPassword" theme={theme}>
          현재 비밀번호
        </Label>
        <Input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          theme={theme}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="newPassword" theme={theme}>
          새 비밀번호
        </Label>
        <Input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          theme={theme}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="confirmPassword" theme={theme}>
          새 비밀번호 확인
        </Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          theme={theme}
        />
      </FormGroup>

      <Button variant="primary" onClick={handleSubmit}>
        비밀번호 변경
      </Button>
    </SectionContent>
  );

  const renderNotificationsSection = () => (
    <SectionContent>
      <SectionTitle theme={theme}>알림 설정</SectionTitle>
      <SectionDescription theme={theme}>
        받고 싶은 알림 유형을 선택하세요.
      </SectionDescription>

      <CheckboxGroup>
        <CheckboxItem>
          <Checkbox
            type="checkbox"
            id="notificationEmail"
            name="notificationEmail"
            checked={formData.notificationEmail}
            onChange={handleChange}
            theme={theme}
          />
          <CheckboxLabel htmlFor="notificationEmail" theme={theme}>
            이메일 알림
          </CheckboxLabel>
        </CheckboxItem>

        <CheckboxItem>
          <Checkbox
            type="checkbox"
            id="notificationPush"
            name="notificationPush"
            checked={formData.notificationPush}
            onChange={handleChange}
            theme={theme}
          />
          <CheckboxLabel htmlFor="notificationPush" theme={theme}>
            푸시 알림
          </CheckboxLabel>
        </CheckboxItem>

        <CheckboxItem>
          <Checkbox
            type="checkbox"
            id="notificationSchedule"
            name="notificationSchedule"
            checked={formData.notificationSchedule}
            onChange={handleChange}
            theme={theme}
          />
          <CheckboxLabel htmlFor="notificationSchedule" theme={theme}>
            일정 알림
          </CheckboxLabel>
        </CheckboxItem>

        <CheckboxItem>
          <Checkbox
            type="checkbox"
            id="notificationComment"
            name="notificationComment"
            checked={formData.notificationComment}
            onChange={handleChange}
            theme={theme}
          />
          <CheckboxLabel htmlFor="notificationComment" theme={theme}>
            댓글 알림
          </CheckboxLabel>
        </CheckboxItem>
      </CheckboxGroup>

      <Button variant="primary" onClick={handleSubmit}>
        알림 설정 저장
      </Button>
    </SectionContent>
  );

  const renderPrivacySection = () => (
    <SectionContent>
      <SectionTitle theme={theme}>개인정보</SectionTitle>
      <SectionDescription theme={theme}>
        프로필과 이메일의 공개 범위를 설정하세요.
      </SectionDescription>

      <FormGroup>
        <Label htmlFor="profileVisibility" theme={theme}>
          프로필 공개 범위
        </Label>
        <Select
          id="profileVisibility"
          name="profileVisibility"
          value={formData.profileVisibility}
          onChange={handleChange}
          theme={theme}
        >
          <option value="public">전체 공개</option>
          <option value="friends">친구만</option>
          <option value="private">비공개</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="emailVisibility" theme={theme}>
          이메일 공개 범위
        </Label>
        <Select
          id="emailVisibility"
          name="emailVisibility"
          value={formData.emailVisibility}
          onChange={handleChange}
          theme={theme}
        >
          <option value="private">비공개</option>
          <option value="friends">친구만</option>
          <option value="public">전체 공개</option>
        </Select>
      </FormGroup>

      <Button variant="primary" onClick={handleSubmit}>
        개인정보 설정 저장
      </Button>
    </SectionContent>
  );

  const renderDangerSection = () => (
    <SectionContent>
      <SectionTitle theme={theme}>위험 영역</SectionTitle>
      <SectionDescription theme={theme}>
        계정 삭제는 되돌릴 수 없습니다. 신중하게 결정하세요.
      </SectionDescription>

      <DangerZone theme={theme}>
        <DangerTitle theme={theme}>계정 삭제</DangerTitle>
        <DangerDescription theme={theme}>
          계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.
        </DangerDescription>
        <Button
          variant="danger"
          onClick={() => toast.error("계정 삭제 기능은 구현되지 않았습니다.")}
        >
          계정 삭제
        </Button>
      </DangerZone>
    </SectionContent>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "account":
        return renderAccountSection();
      case "notifications":
        return renderNotificationsSection();
      case "privacy":
        return renderPrivacySection();
      case "danger":
        return renderDangerSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <PageContainer theme={theme}>
      <Header />
      <Container>
        <SettingsLayout>
          <Sidebar theme={theme}>
            <SidebarTitle theme={theme}>설정</SidebarTitle>
            <SidebarMenu>
              {SETTINGS_SECTIONS.map((section) => (
                <SidebarItem
                  key={section.key}
                  active={activeSection === section.key}
                  onClick={() => setActiveSection(section.key)}
                  theme={theme}
                >
                  <SidebarIcon>{section.icon}</SidebarIcon>
                  {section.label}
                </SidebarItem>
              ))}
            </SidebarMenu>
          </Sidebar>

          <MainContent theme={theme}>{renderSection()}</MainContent>
        </SettingsLayout>
      </Container>
    </PageContainer>
  );
};

export default Settings;

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const SettingsLayout = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  min-height: 600px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Sidebar = styled.div`
  background: ${(props) => props.theme.surface};
  border-radius: 12px;
  padding: 24px;
  border: 1px solid ${(props) => props.theme.borderLight};
  height: fit-content;
  transition: all 0.3s ease;
`;

const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 20px 0;
  transition: color 0.3s ease;
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) =>
    props.active ? props.theme.textPrimary : props.theme.textSecondary};
  background: ${(props) =>
    props.active ? props.theme.buttonPrimary : "transparent"};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.active ? props.theme.buttonPrimary : props.theme.borderLight};
  }
`;

const SidebarIcon = styled.span`
  font-size: 1rem;
`;

const MainContent = styled.div`
  background: ${(props) => props.theme.surface};
  border-radius: 12px;
  padding: 32px;
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const SectionContent = styled.div`
  max-width: 600px;
`;

const SectionTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 8px 0;
  transition: color 0.3s ease;
`;

const SectionDescription = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0 0 24px 0;
  line-height: 1.5;
  transition: color 0.3s ease;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 8px;
  transition: color 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  font-size: 0.875rem;
  background: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.inputFocus};
    box-shadow: 0 0 0 3px ${(props) => props.theme.inputFocus}20;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  font-size: 0.875rem;
  background: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.textPrimary};
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.inputFocus};
    box-shadow: 0 0 0 3px ${(props) => props.theme.inputFocus}20;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  font-size: 0.875rem;
  background: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.inputFocus};
    box-shadow: 0 0 0 3px ${(props) => props.theme.inputFocus}20;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${(props) => props.theme.buttonPrimary};
`;

const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textPrimary};
  cursor: pointer;
  transition: color 0.3s ease;
`;

const DangerZone = styled.div`
  border: 1px solid ${(props) => props.theme.error};
  border-radius: 8px;
  padding: 20px;
  background: ${(props) => props.theme.error}10;
`;

const DangerTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.error};
  margin: 0 0 8px 0;
`;

const DangerDescription = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0 0 16px 0;
  line-height: 1.5;
`;

const ProfileImageSection = styled.div`
  margin-bottom: 24px;
  text-align: center;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 12px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;

  ${ProfileImageContainer}:hover & {
    opacity: 1;
  }
`;

const ImageUploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const ImageHelpText = styled.p`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textTertiary};
  margin: 0;
  transition: color 0.3s ease;
`;

const CameraIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);
