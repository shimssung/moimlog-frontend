import axios from "./axios";

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
      // 토큰 확인
      if (typeof window !== "undefined") {
        const { useStore } = require("../stores/useStore");
        const token = useStore.getState().getToken();
        if (!token) {
          throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.");
        }
      }

      const response = await axios.get("/auth/moim-categories");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 온보딩 완료
  completeOnboarding: async (onboardingData) => {
    try {
      // 토큰 확인
      if (typeof window !== "undefined") {
        const { useStore } = require("../stores/useStore");
        const token = useStore.getState().getToken();
        if (!token) {
          throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.");
        }
      }

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
      const response = await axios.get("/auth/me");
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
};
