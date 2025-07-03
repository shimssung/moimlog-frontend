import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import Textarea from "../components/Textarea";
import Modal from "../components/Modal";
import { sanitizeFormData, sanitizeInput } from "../utils/sanitize";
import { useTheme } from "../utils/ThemeContext";

const ProfileEdit = () => {
  const { theme } = useTheme();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    interests: [],
    profileImage: null,
    notificationSettings: {
      email: true,
      push: true,
      sms: false,
    },
  });
  const [previewImage, setPreviewImage] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile");
        const data = await response.json();
        setUserData(data);
      } catch {
        setError("프로필 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // 1. useEffect: 컴포넌트가 마운트되거나 의존성이 변경될 때 실행되는 React 훅
    if (selectedFile && typeof window !== "undefined") {
      // 2. selectedFile: 파일이 선택되었는지 확인 (null이 아닌지 체크)
      // 3. typeof window !== "undefined": Next.js SSR에서 브라우저 환경인지 확인

      const reader = new FileReader();
      // 4. FileReader 객체 생성: 파일을 읽고 Base64로 변환하는 브라우저 API

      reader.onloadend = () => {
        // 5. onloadend: 파일 읽기가 완료되면 실행될 콜백 함수를 설정(알람 설정을 미리 해두고 파일 읽기 - readAsDataURL 실행)
        setPreviewImage(reader.result);
        // 6. setPreviewImage: React 상태 업데이트 함수로 미리보기 이미지 설정
        // 7. reader.result: FileReader가 읽은 파일의 Base64 문자열 (data:image/jpeg;base64,...)
      };

      reader.readAsDataURL(selectedFile);
      // 8. readAsDataURL: 파일을 Base64 문자열로 변환하는 메서드 호출
      // 9. selectedFile: 변환할 파일 객체를 전달
    }
  }, [selectedFile]);
  // 10. [selectedFile]: 의존성 배열 - selectedFile이 변경될 때만 useEffect 실행

  // Base64로 변환하는 이유:
  // 브라우저는 파일 객체 자체를 <img>에 바로 넣을 수 없기 때문에,
  // FileReader를 사용해 파일을 Base64 문자열로 변환하여 <img src="..." />로 보여줍니다.

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        setError("JPG 또는 PNG 파일만 업로드 가능합니다.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 입력값 sanitize
    const sanitizedValue = sanitizeInput(value);
    setUserData((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleNotificationChange = (type) => {
    setUserData((prev) => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [type]: !prev.notificationSettings[type],
      },
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // 폼 데이터 sanitize
      const sanitizedData = sanitizeFormData(userData);
      const formData = new FormData();

      Object.keys(sanitizedData).forEach((key) => {
        if (key === "profileImage" && sanitizedData[key]) {
          formData.append("profileImage", sanitizedData[key]);
        } else if (key !== "profileImage") {
          formData.append(key, JSON.stringify(sanitizedData[key]));
        }
      });

      // 실제 API 호출로 대체
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        setSuccess("프로필이 성공적으로 업데이트되었습니다.");
      } else {
        throw new Error("프로필 업데이트에 실패했습니다.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 실제 API 호출로 대체
      const response = await fetch("/api/user/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
      });

      if (response.ok) {
        setSuccess("비밀번호가 성공적으로 변경되었습니다.");
        setShowPasswordModal(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        throw new Error("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <PageContainer theme={theme}>
      <Header />
      <MainContent>
        <LayoutContainer>
          <MainSection>
            <Title theme={theme}>프로필 수정</Title>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}

            <FormSection>
              <Input
                label="이메일"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
                required
              />
              <Input
                label="닉네임"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                required
              />
              <Textarea
                label="자기소개"
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                rows={4}
              />
            </FormSection>

            <Section>
              <SectionTitle theme={theme}>관심사</SectionTitle>
              <InterestTags theme={theme}>
                {[
                  "등산",
                  "요리",
                  "독서",
                  "여행",
                  "맛집",
                  "사진",
                  "음악",
                  "미술",
                  "영화",
                  "게임",
                ].map((interest) => (
                  <InterestTag key={interest} theme={theme}>
                    {interest}
                  </InterestTag>
                ))}
              </InterestTags>
            </Section>

            <Section>
              <SectionTitle theme={theme}>알림 설정</SectionTitle>
              <NotificationItem theme={theme}>
                <NotificationLabel theme={theme}>이메일 알림</NotificationLabel>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={userData.notificationSettings.email}
                    onChange={() => handleNotificationChange("email")}
                  />
                  <span className="slider" />
                </ToggleSwitch>
              </NotificationItem>
            </Section>

            <ButtonContainer>
              <Button onClick={handleSubmit} variant="primary">
                저장하기
              </Button>
            </ButtonContainer>
          </MainSection>

          <SideSection>
            <PreviewContainer theme={theme}>
              <ProfileImagePreview
                src={previewImage || "/default-profile.png"}
                alt="프로필 이미지"
              />
              <PreviewText theme={theme}>미리보기</PreviewText>
            </PreviewContainer>
            <UploadButton
              onClick={() => {
                const fileInput = document.getElementById("profileImage");
                if (fileInput) fileInput.click();
              }}
              theme={theme}
            >
              이미지 업로드/변경
            </UploadButton>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </SideSection>
        </LayoutContainer>
      </MainContent>

      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="비밀번호 변경"
      >
        <PasswordForm onSubmit={handlePasswordSubmit}>
          <Input
            label="현재 비밀번호"
            name="currentPassword"
            type="password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            required
          />
          <Input
            label="새 비밀번호"
            name="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            required
          />
          <Input
            label="새 비밀번호 확인"
            name="confirmPassword"
            type="password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            required
          />
          <ModalButtonGroup>
            <Button
              type="button"
              variant="light"
              onClick={() => setShowPasswordModal(false)}
            >
              취소
            </Button>
            <Button type="submit" variant="primary">
              변경하기
            </Button>
          </ModalButtonGroup>
        </PasswordForm>
      </Modal>
    </PageContainer>
  );
};

export default ProfileEdit;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  font-family: "Manrope", "Noto Sans", sans-serif;
  transition: background-color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const LayoutContainer = styled.div`
  display: flex;
  gap: 24px;
  max-width: 1280px;
  width: 100%;
`;

const MainSection = styled.div`
  flex: 1;
  max-width: 920px;
`;

const SideSection = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textPrimary};
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
  transition: color 0.3s ease;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.textPrimary};
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
  transition: color 0.3s ease;
`;

const InterestTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
`;

const InterestTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.surfaceSecondary};
  border-radius: 12px;
  color: ${(props) => props.theme.textPrimary};
  font-size: 14px;
  font-weight: 500;
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${(props) => props.theme.surface};
  min-height: 56px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 12px;
  transition: all 0.3s ease;
`;

const NotificationLabel = styled.p`
  color: ${(props) => props.theme.textPrimary};
  font-size: 16px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px 16px;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
`;

const ProfileImagePreview = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  object-fit: cover;
`;

const PreviewText = styled.p`
  color: ${(props) => props.theme.textPrimary};
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  transition: color 0.3s ease;
`;

const UploadButton = styled.button`
  min-width: 84px;
  max-width: 480px;
  height: 40px;
  padding: 0 16px;
  background-color: ${(props) => props.theme.surfaceSecondary};
  color: ${(props) => props.theme.textPrimary};
  font-size: 14px;
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.borderLight};
  }
`;

const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
`;

const ErrorMessage = styled.div`
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  background-color: #dcfce7;
  border: 1px solid #bbf7d0;
  color: #16a34a;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;
