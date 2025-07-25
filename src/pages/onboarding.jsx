import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import { useTheme } from "../utils/ThemeContext";
import { useRouter } from "next/router";
import { useStore } from "../stores/useStore";
import { authAPI } from "../api/auth";
import toast from "react-hot-toast";

const Onboarding = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const {
    completeOnboarding,
    getToken,
    isAuthenticated,
    checkAuthAndRedirect,
    syncUserInfo,
    updateUser,
  } = useStore();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nickname: "",
    bio: "",
    moimCategories: [],
    profileImage: null,
  });

  // 닉네임 중복 체크 관련 상태
  const [nicknameError, setNicknameError] = useState("");
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);

  // 모임 카테고리 관련 상태
  const [moimCategories, setMoimCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  // 모임 카테고리 목록 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      // 토큰 확인 및 복원 시도
      let token = getToken();
      if (!token) {
        // 토큰이 없으면 복원 시도
        try {
          const { restoreToken } = useStore.getState();
          token = await restoreToken();
        } catch (error) {
          console.error("토큰 복원 실패:", error);
        }
      }

      if (!token) {
        console.error("토큰이 없어서 카테고리를 불러올 수 없습니다.");
        toast.error("인증 토큰이 없습니다. 다시 로그인해주세요.");
        router.push("/login");
        return;
      }

      setIsLoadingCategories(true);
      try {
        const response = await authAPI.getMoimCategories();

        if (response.categories && response.categories.length > 0) {
          setMoimCategories(response.categories);
        } else {
          console.error("모임 카테고리 API 실패:", response);
          toast.error("모임 카테고리를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("모임 카테고리 로딩 실패:", error);
        toast.error("모임 카테고리를 불러오는데 실패했습니다.");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [getToken, router]);

  // 토큰 확인 및 인증 상태 체크
  useEffect(() => {
    const checkAuth = () => {
      // 통합된 인증 확인 함수 사용
      if (!checkAuthAndRedirect()) {
        return;
      }
    };

    // 초기 로드 시에만 체크
    checkAuth();
  }, [isAuthenticated, router.pathname, checkAuthAndRedirect]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 닉네임 입력 시 에러 메시지 초기화
    if (name === "nickname") {
      setNicknameError("");
    }
  };

  const handleCategoryToggle = (categoryId) => {
    setFormData((prev) => ({
      ...prev,
      moimCategories: prev.moimCategories.includes(categoryId)
        ? prev.moimCategories.filter((id) => id !== categoryId)
        : [...prev.moimCategories, categoryId],
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          profileImage: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    // 첫 번째 단계에서 닉네임 중복 체크
    if (step === 1) {
      if (!formData.nickname.trim()) {
        toast.error("닉네임을 입력해주세요.");
        return;
      }

      setIsCheckingNickname(true);

      try {
        const result = await authAPI.checkNicknameDuplicate(formData.nickname);

        if (!result.duplicate) {
          // 중복되지 않은 경우 다음 단계로
          setStep(step + 1);
          setNicknameError("");
        } else {
          // 중복된 경우 에러 메시지 표시
          setNicknameError("이미 사용 중인 닉네임입니다.");
          toast.error("이미 사용 중인 닉네임입니다.");
        }
      } catch {
        setNicknameError("닉네임 확인 중 오류가 발생했습니다.");
        toast.error("닉네임 확인 중 오류가 발생했습니다.");
      } finally {
        setIsCheckingNickname(false);
      }
    } else if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // 필수 필드 검증
    if (!formData.nickname.trim()) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 온보딩 데이터를 백엔드 형식에 맞게 변환
      const onboardingData = {
        nickname: formData.nickname,
        bio: formData.bio || "",
        moimCategories: formData.moimCategories,
        profileImage: formData.profileImage || "",
      };

      const result = await completeOnboarding(onboardingData);

      if (result.success) {
        toast.success("프로필 설정이 완료되었습니다!");

        // 백엔드에서 최신 사용자 정보 동기화
        await syncUserInfo();

        // 상태 강제 업데이트
        updateUser({ onboardingCompleted: true });

        // 잠시 대기 후 홈으로 이동 (새로고침 포함)
        setTimeout(() => {
          router.push("/").then(() => {
            window.location.reload();
          });
        }, 1000);
      } else {
        toast.error(result.error || "프로필 설정에 실패했습니다.");
      }
    } catch {
      toast.error("프로필 설정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
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
        error={nicknameError}
      />
      {isCheckingNickname && (
        <CheckingMessage theme={theme}>닉네임 확인 중...</CheckingMessage>
      )}
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
      <StepTitle theme={theme}>모임 카테고리를 선택해주세요</StepTitle>
      <StepDescription theme={theme}>
        관심 있는 모임 카테고리를 선택하면 맞춤형 모임을 추천해드립니다.
      </StepDescription>
      {isLoadingCategories ? (
        <LoadingMessage theme={theme}>카테고리를 불러오는 중...</LoadingMessage>
      ) : (
        <InterestsGrid>
          {moimCategories.map((category) => (
            <InterestTag
              key={category.id}
              $selected={formData.moimCategories.includes(category.id)}
              onClick={() => handleCategoryToggle(category.id)}
              theme={theme}
            >
              {category.label}
            </InterestTag>
          ))}
        </InterestsGrid>
      )}
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
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <PageContainer theme={theme}>
      <Header>
        <ProgressBar>
          <ProgressStep $active={step >= 1} theme={theme} />
          <ProgressStep $active={step >= 2} theme={theme} />
          <ProgressStep $active={step >= 3} theme={theme} />
          <ProgressStep $active={step >= 4} theme={theme} />
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
              disabled={isSubmitting || isCheckingNickname}
            >
              이전
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleNext}
            theme={theme}
            disabled={isSubmitting || isCheckingNickname}
          >
            {isSubmitting || isCheckingNickname
              ? "처리 중..."
              : step === 4
              ? "완료"
              : "다음"}
          </Button>
        </ButtonGroup>
      </MainContent>
    </PageContainer>
  );
};

export default Onboarding;

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.background};
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
`;

const Header = styled.header`
  padding: 24px;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
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
  background: ${(props) =>
    props.$active ? props.theme.buttonPrimary : props.theme.borderLight};
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
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 12px;
  transition: color 0.3s ease;
`;

const StepDescription = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 32px;
  line-height: 1.5;
  transition: color 0.3s ease;
`;

const CheckingMessage = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.textTertiary};
  margin-top: 8px;
  transition: color 0.3s ease;
`;

const LoadingMessage = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.textTertiary};
  margin-top: 8px;
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
  border: 2px solid
    ${(props) =>
      props.$selected ? props.theme.buttonPrimary : props.theme.borderLight};
  background: ${(props) =>
    props.$selected ? props.theme.buttonPrimary : props.theme.surface};
  color: ${(props) => (props.$selected ? "white" : props.theme.textPrimary)};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${(props) => props.theme.buttonPrimary};
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
  border: 3px solid ${(props) => props.theme.borderLight};
`;

const UploadButton = styled.button`
  padding: 12px 24px;
  background: ${(props) => props.theme.buttonSecondary};
  color: ${(props) => props.theme.textPrimary};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.borderLight};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;
