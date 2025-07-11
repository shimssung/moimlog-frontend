import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import { useTheme } from "../utils/ThemeContext";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const INTERESTS = [
  "등산", "요리", "독서", "여행", "맛집", "사진", 
  "음악", "미술", "영화", "게임", "운동", "언어학습",
  "프로그래밍", "디자인", "창작", "봉사활동"
];

const Onboarding = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nickname: "",
    bio: "",
    interests: [],
    profileImage: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          profileImage: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      // 온보딩 데이터 저장 API 호출
      const response = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success("프로필 설정이 완료되었습니다!");
        router.push("/"); // 홈으로 이동
      }
    } catch {
      toast.error("설정 저장에 실패했습니다.");
    }
  };

  const renderStep1 = () => (
    <StepContent>
      <StepTitle theme={theme}>닉네임을 설정해주세요</StepTitle>
      <StepDescription theme={theme}>
        다른 사용자들에게 보여질 닉네임을 입력해주세요.
      </StepDescription>
      <Input
        name="nickname"
        placeholder="닉네임을 입력해주세요"
        value={formData.nickname}
        onChange={handleInputChange}
        theme={theme}
        required
      />
    </StepContent>
  );

  const renderStep2 = () => (
    <StepContent>
      <StepTitle theme={theme}>자기소개를 작성해주세요</StepTitle>
      <StepDescription theme={theme}>
        다른 사용자들에게 자신을 소개해보세요. (선택사항)
      </StepDescription>
      <Textarea
        name="bio"
        placeholder="예: 안녕하세요! 새로운 사람들과 만나고 대화하는 것을 좋아합니다. 여행과 독서가 취미입니다."
        value={formData.bio}
        onChange={handleInputChange}
        rows={4}
        theme={theme}
      />
    </StepContent>
  );

  const renderStep3 = () => (
    <StepContent>
      <StepTitle theme={theme}>관심사를 선택해주세요</StepTitle>
      <StepDescription theme={theme}>
        관심 있는 분야를 선택하면 맞춤형 모임을 추천해드립니다.
      </StepDescription>
      <InterestsGrid>
        {INTERESTS.map(interest => (
          <InterestTag
            key={interest}
            selected={formData.interests.includes(interest)}
            onClick={() => handleInterestToggle(interest)}
            theme={theme}
          >
            {interest}
          </InterestTag>
        ))}
      </InterestsGrid>
    </StepContent>
  );

  const renderStep4 = () => (
    <StepContent>
      <StepTitle theme={theme}>프로필 이미지를 설정해주세요</StepTitle>
      <StepDescription theme={theme}>
        프로필 이미지를 업로드하거나 나중에 설정할 수 있습니다.
      </StepDescription>
      <ImageUploadSection>
        <ProfileImagePreview
          src={formData.profileImage || "/default-avatar.png"}
          alt="프로필 이미지"
        />
        <UploadButton
          onClick={() => document.getElementById("profileImage").click()}
          theme={theme}
        >
          이미지 업로드
        </UploadButton>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </ImageUploadSection>
    </StepContent>
  );

  const renderStep = () => {
    switch (step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <PageContainer theme={theme}>
      <Header>
        <ProgressBar>
          <ProgressStep active={step >= 1} theme={theme} />
          <ProgressStep active={step >= 2} theme={theme} />
          <ProgressStep active={step >= 3} theme={theme} />
          <ProgressStep active={step >= 4} theme={theme} />
        </ProgressBar>
      </Header>
      
      <MainContent>
        {renderStep()}
        
        <ButtonGroup>
          {step > 1 && (
            <Button
              variant="secondary"
              onClick={() => setStep(step - 1)}
              theme={theme}
            >
              이전
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleNext}
            theme={theme}
          >
            {step === 4 ? "완료" : "다음"}
          </Button>
        </ButtonGroup>
      </MainContent>
    </PageContainer>
  );
};

export default Onboarding;

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.background};
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
`;

const Header = styled.header`
  padding: 24px;
  border-bottom: 1px solid ${props => props.theme.borderLight};
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  max-width: 400px;
  margin: 0 auto;
`;

const ProgressStep = styled.div`
  width: 40px;
  height: 4px;
  background: ${props => props.active ? props.theme.buttonPrimary : props.theme.borderLight};
  border-radius: 2px;
  transition: background-color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 24px;
  max-width: 600px;
  margin: 0 auto;
`;

const StepContent = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;

const StepTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: ${props => props.theme.textPrimary};
  margin-bottom: 12px;
  transition: color 0.3s ease;
`;

const StepDescription = styled.p`
  font-size: 16px;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 32px;
  line-height: 1.5;
  transition: color 0.3s ease;
`;

const InterestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 24px;
`;

const InterestTag = styled.button`
  padding: 12px 16px;
  border: 2px solid ${props => props.selected ? props.theme.buttonPrimary : props.theme.borderLight};
  background: ${props => props.selected ? props.theme.buttonPrimary : props.theme.surface};
  color: ${props => props.selected ? "white" : props.theme.textPrimary};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.buttonPrimary};
  }
`;

const ImageUploadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const ProfileImagePreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${props => props.theme.borderLight};
`;

const UploadButton = styled.button`
  padding: 12px 24px;
  background: ${props => props.theme.buttonSecondary};
  color: ${props => props.theme.textPrimary};
  border: 1px solid ${props => props.theme.borderLight};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.borderLight};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`; 