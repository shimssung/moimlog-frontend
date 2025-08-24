import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { useTheme } from "../utils/ThemeContext";
import { useStore } from "../stores/useStore";
import { authAPI } from "../api/auth";
import { sanitizeFormData } from "../utils/sanitize";

const SETTINGS_SECTIONS = [
  { key: "profile", label: "프로필 설정", icon: "👤" },
  { key: "notifications", label: "알림 설정", icon: "🔔" },
  { key: "danger", label: "위험 영역", icon: "⚠️" },
];

const Settings = () => {
  const { theme } = useTheme();
  const { user, updateUser } = useStore();
  const [activeSection, setActiveSection] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nickname: "",
    bio: "",
    profileImage: "",
    phone: "",
    birthDate: "",
    gender: "",
    notificationEmail: true,
    notificationPush: true,
    notificationSchedule: true,
    notificationComment: true,
  });

  // 사용자 정보로 폼 데이터 초기화
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        nickname: user.nickname || "",
        bio: user.bio || "",
        profileImage: user.profileImage || "",
        phone: user.phone || "",
        birthDate: user.birthDate || "",
        gender: user.gender || "",
        notificationEmail:
          user.notificationEmail !== undefined ? user.notificationEmail : true,
        notificationPush:
          user.notificationPush !== undefined ? user.notificationPush : true,
        notificationSchedule:
          user.notificationSchedule !== undefined
            ? user.notificationSchedule
            : true,
        notificationComment:
          user.notificationComment !== undefined
            ? user.notificationComment
            : true,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
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

      setIsLoading(true);

      try {
        // 백엔드 API로 이미지 업로드
        const response = await authAPI.uploadProfileImage(file);

        if (response.success) {
          // S3 URL을 프록시 URL로 변환
          const imageUrl = response.imageUrl;

          // 폼 데이터 업데이트
          setFormData((prev) => ({
            ...prev,
            profileImage: imageUrl,
          }));

          toast.success("프로필 이미지가 업로드되었습니다.");
        } else {
          toast.error("이미지 업로드에 실패했습니다.");
        }
      } catch (error) {
        console.error("이미지 업로드 에러:", error);
        toast.error("이미지 업로드 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // 이미지 URL을 프록시 URL로 변환하는 함수
  const getProfileImageUrl = (imageUrl) => {
    if (!imageUrl) return "/blank-profile.png";

    // S3 URL인 경우 프록시 URL로 변환
    if (
      imageUrl.includes("s3.amazonaws.com") ||
      imageUrl.includes("moimlog-bucket")
    ) {
      const fileName = imageUrl.split("/").pop();
      return `http://localhost:8080/moimlog/auth/profile-image/${fileName}`;
    }

    return imageUrl;
  };

  // 프로필 수정 제출
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 입력 데이터 정제 및 빈 값 처리
      const sanitizedData = sanitizeFormData({
        name: formData.name,
        nickname: formData.nickname,
        bio: formData.bio,
        profileImage: formData.profileImage,
        phone: formData.phone,
        birthDate: formData.birthDate,
        gender: formData.gender || null, // 빈 문자열을 null로 처리
      });

      // 빈 값 제거 (null, undefined, 빈 문자열)
      const cleanData = Object.fromEntries(
        Object.entries(sanitizedData).filter(
          ([, value]) => value !== null && value !== undefined && value !== ""
        )
      );

      // API 호출
      await authAPI.updateProfile(cleanData);

      // 백엔드 API는 직접 데이터를 반환하므로 success 체크 불필요
      // 로컬 상태 업데이트
      updateUser({
        name: sanitizedData.name,
        nickname: sanitizedData.nickname,
        bio: sanitizedData.bio,
        profileImage: sanitizedData.profileImage,
        phone: sanitizedData.phone,
        birthDate: sanitizedData.birthDate,
        gender: formData.gender || null,
      });

      toast.success("프로필이 성공적으로 수정되었습니다!");
    } catch (error) {
      console.error("프로필 수정 에러:", error);
      toast.error(error.message || "프로필 수정 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 알림 설정 제출
  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authAPI.updateNotificationSettings({
        notificationEmail: formData.notificationEmail,
        notificationPush: formData.notificationPush,
        notificationSchedule: formData.notificationSchedule,
        notificationComment: formData.notificationComment,
      });

      // 백엔드 API는 success, message, data 구조로 응답
      if (response.success) {
        // 로컬 상태 업데이트
        updateUser({
          notificationEmail: formData.notificationEmail,
          notificationPush: formData.notificationPush,
          notificationSchedule: formData.notificationSchedule,
          notificationComment: formData.notificationComment,
        });

        toast.success(response.message || "알림 설정이 저장되었습니다!");
      } else {
        toast.error(response.message || "알림 설정 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("알림 설정 에러:", error);
      toast.error(error.message || "알림 설정 저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderProfileSection = () => (
    <SectionContent>
      <SectionTitle theme={theme}>프로필 설정</SectionTitle>
      <SectionDescription theme={theme}>
        프로필 정보를 수정하여 다른 사용자들에게 보여질 정보를 관리하세요.
      </SectionDescription>

      <form onSubmit={handleProfileSubmit}>
        <ProfileImageSection>
          <ProfileImageContainer>
            <ProfileImage
              src={getProfileImageUrl(formData.profileImage)}
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
            이름 *
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            theme={theme}
            required
            minLength={2}
            maxLength={100}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="nickname" theme={theme}>
            닉네임
          </Label>
          <Input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            theme={theme}
            maxLength={50}
            placeholder="닉네임을 입력하세요 (최대 50자)"
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
            disabled
            theme={theme}
          />
          <HelpText theme={theme}>
            이메일은 보안상 직접 수정할 수 없습니다. 계정 설정에서 변경하세요.
          </HelpText>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone" theme={theme}>
            전화번호
          </Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            theme={theme}
            maxLength={20}
            placeholder="010-1234-5678"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="birthDate" theme={theme}>
            생년월일
          </Label>
          <Input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            theme={theme}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="gender" theme={theme}>
            성별
          </Label>
          <Select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            theme={theme}
          >
            <option value="">선택하세요</option>
            <option value="MALE">남성</option>
            <option value="FEMALE">여성</option>
          </Select>
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
            maxLength={1000}
            placeholder="자기소개를 입력하세요 (최대 1000자)"
          />
          <CharCount theme={theme}>{formData.bio.length}/1000</CharCount>
        </FormGroup>

        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "저장 중..." : "프로필 저장"}
        </Button>
      </form>
    </SectionContent>
  );

  const renderNotificationsSection = () => (
    <SectionContent>
      <SectionTitle theme={theme}>알림 설정</SectionTitle>
      <SectionDescription theme={theme}>
        받고 싶은 알림 유형을 선택하세요.
      </SectionDescription>

      <form onSubmit={handleNotificationSubmit}>
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

        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "저장 중..." : "알림 설정 저장"}
        </Button>
      </form>
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
      case "notifications":
        return renderNotificationsSection();
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

const HelpText = styled.p`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textSecondary};
  margin-top: 8px;
  transition: color 0.3s ease;
`;

const CharCount = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textTertiary};
  margin-top: 8px;
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
