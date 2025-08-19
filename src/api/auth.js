import axios from "./axios";

// OAuth2 에러 타입
export const OAUTH2_ERROR_TYPES = {
  USER_NOT_FOUND: "oauth2_user_not_found",
  LOGIN_FAILED: "oauth2_login_failed",
  UNSUPPORTED_PROVIDER: "unsupported_provider",
  UNKNOWN_ERROR: "unknown_error",
};

// 인증 관련 API 함수들
export const authAPI = {
  // 회원가입
  signup: async (signupData) => {
    try {
      const response = await axios.post("/auth/signup", {
        email: signupData.email,
        password: signupData.password,
        name: signupData.name,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 로그인
  login: async (loginData) => {
    try {
      const response = await axios.post("/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 이메일 중복 확인
  // encodeURIComponent 란 URL에 사용할 수 없는 문자를 인코딩하는 함수(@기호가 URL에서 문제를 일으킬 수 있음)
  checkEmailDuplicate: async (email) => {
    try {
      const response = await axios.get(
        `/auth/check-email?email=${encodeURIComponent(email)}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 닉네임 중복 확인
  checkNicknameDuplicate: async (nickname) => {
    try {
      const response = await axios.get(
        `/auth/check-nickname?nickname=${encodeURIComponent(nickname)}`
      );

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 이메일 인증 코드 발송
  sendVerificationCode: async (email) => {
    try {
      const response = await axios.post("/auth/send-verification", {
        email: email,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 이메일 인증 코드 검증
  verifyEmailCode: async (email, verificationCode) => {
    try {
      const response = await axios.post("/auth/verify-email", {
        email: email,
        verificationCode: verificationCode,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 비밀번호 찾기 요청 (1단계: 이메일 입력 및 인증 코드 발송)
  forgotPassword: async (email) => {
    try {
      const response = await axios.post("/auth/forgot-password", {
        email: email,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 인증 코드 검증 (2단계: 인증 코드 검증)
  verifyResetCode: async (email, verificationCode) => {
    try {
      const response = await axios.post("/auth/verify-reset-code", {
        email: email,
        verificationCode: verificationCode,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 비밀번호 재설정 (3단계: 새 비밀번호 설정)
  resetPassword: async (resetData) => {
    try {
      const response = await axios.post("/auth/reset-password", {
        email: resetData.email,
        newPassword: resetData.newPassword,
        confirmPassword: resetData.confirmPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 모임 카테고리 목록 조회
  getMoimCategories: async () => {
    try {
      const response = await axios.get("/auth/moim-categories");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 온보딩 완료
  completeOnboarding: async (onboardingData) => {
    try {
      const response = await axios.post("/auth/onboarding", onboardingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 온보딩 상태 확인
  checkOnboardingStatus: async () => {
    try {
      const response = await axios.get("/auth/onboarding/status");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 내 프로필 조회
  getProfile: async () => {
    try {
      console.log("🔍 authAPI.getProfile() 호출 시작");
      console.log("🌐 요청 URL: /auth/me");
      
      const response = await axios.get("/auth/me");
      console.log("✅ getProfile API 응답 성공:", response);
      console.log("📊 응답 데이터:", response.data);
      
      return response;
    } catch (error) {
      console.error("❌ getProfile API 실패:", error);
      console.error("🚨 에러 상세:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      throw error.response?.data || error.message;
    }
  },

  // 프로필 수정
  updateProfile: async (profileData) => {
    try {
      const response = await axios.put("/auth/profile", profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 토큰 갱신
  refreshToken: async () => {
    try {
      const response = await axios.post("/auth/refresh", {});
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 로그아웃
  logout: async () => {
    try {
      const response = await axios.post("/auth/logout", {});
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 소셜 로그인 URL 조회
  getSocialLoginUrls: async () => {
    try {
      const response = await axios.get("/oauth2/urls");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 네이버 소셜 로그인 시작
  startNaverLogin: () => {
    window.location.href =
      "http://localhost:8080/moimlog/oauth2/authorization/naver";
  },

  // 구글 소셜 로그인 시작
  startGoogleLogin: () => {
    window.location.href =
      "http://localhost:8080/moimlog/oauth2/authorization/google";
  },

  // 카카오 소셜 로그인 시작
  startKakaoLogin: () => {
    window.location.href =
      "http://localhost:8080/moimlog/oauth2/authorization/kakao";
  },

  // OAuth2 콜백 처리
  handleOAuth2Callback: async (searchParams) => {
    const success = searchParams.get("success");
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    if (success === "true") {
      return { success: true };
    } else {
      // 에러 타입에 따른 메시지 처리
      let errorMessage = message || "로그인에 실패했습니다.";

      switch (error) {
        case OAUTH2_ERROR_TYPES.USER_NOT_FOUND:
          errorMessage = "OAuth2 사용자 정보를 찾을 수 없습니다.";
          break;
        case OAUTH2_ERROR_TYPES.LOGIN_FAILED:
          errorMessage = "OAuth2 로그인에 실패했습니다.";
          break;
        case OAUTH2_ERROR_TYPES.UNSUPPORTED_PROVIDER:
          errorMessage = "지원하지 않는 OAuth2 제공자입니다.";
          break;
        default:
          errorMessage = message || "소셜 로그인에 실패했습니다.";
      }

      return {
        success: false,
        error: error || OAUTH2_ERROR_TYPES.UNKNOWN_ERROR,
        message: errorMessage,
      };
    }
  },
};
