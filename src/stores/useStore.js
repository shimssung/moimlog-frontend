import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authAPI } from "../api/auth";

// 테마 색상 정의
export const lightTheme = {
  // 배경색
  background: "#f9fafb",
  surface: "#ffffff",
  surfaceSecondary: "#f3f4f6",

  // 텍스트 색상
  textPrimary: "#111827",
  textSecondary: "#374151",
  textTertiary: "#6b7280",

  // 테두리 색상
  border: "#d1d5db",
  borderLight: "#e5e7eb",

  // 버튼 색상
  buttonPrimary: "#3b82f6",
  buttonSecondary: "#f3f4f6",
  buttonHover: "#2563eb",

  // 카드 및 컴포넌트
  cardBackground: "#ffffff",
  cardShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",

  // 입력 필드
  inputBackground: "#ffffff",
  inputBorder: "#d1d5db",
  inputFocus: "#3b82f6",

  // 태그
  tagBackground: "#e5e7eb",
  tagText: "#374151",

  // 상태 색상
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
};

export const darkTheme = {
  // 배경색
  background: "#111827",
  surface: "#1f2937",
  surfaceSecondary: "#374151",

  // 텍스트 색상
  textPrimary: "#f9fafb",
  textSecondary: "#d1d5db",
  textTertiary: "#9ca3af",

  // 테두리 색상
  border: "#4b5563",
  borderLight: "#6b7280",

  // 버튼 색상
  buttonPrimary: "#3b82f6",
  buttonSecondary: "#374151",
  buttonHover: "#2563eb",

  // 카드 및 컴포넌트
  cardBackground: "#1f2937",
  cardShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",

  // 입력 필드
  inputBackground: "#374151",
  inputBorder: "#4b5563",
  inputFocus: "#3b82f6",

  // 태그
  tagBackground: "#4b5563",
  tagText: "#d1d5db",

  // 상태 색상
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
};

// 기본 사용자 정보
const defaultUser = {
  id: null,
  email: "",
  name: "",
  profileImage: "",
  role: "user",
  isOnboardingCompleted: false, // 온보딩 상태 추가
};

// Zustand 스토어 생성
export const useStore = create(
  persist(
    (set, get) => ({
      // ===== 다크모드 관련 상태 =====
      isDarkMode: false,
      mounted: false,
      theme: lightTheme, // theme을 상태로 관리

      // 다크모드 토글
      toggleTheme: () => {
        const currentState = get();
        const newIsDarkMode = !currentState.isDarkMode;
        const newTheme = newIsDarkMode ? darkTheme : lightTheme;

        console.log(
          "Zustand: Toggling theme to",
          newIsDarkMode ? "dark" : "light"
        );

        set({
          isDarkMode: newIsDarkMode,
          theme: newTheme,
        });
      },

      // 마운트 상태 설정
      // 서버와 클라이언트 간의 렌더링 불일치를 방지하기 위한 안전장치
      setMounted: (mounted) => set({ mounted }),

      // 테마 초기화 (로컬스토리지에서 가져온 후)
      initializeTheme: () => {
        const currentState = get();
        const newTheme = currentState.isDarkMode ? darkTheme : lightTheme;
        set({ theme: newTheme });
      },

      // ===== 인증 관련 상태 =====
      user: defaultUser,
      isAuthenticated: false,
      isLoading: false,

      // 로그인 함수 수정 - 온보딩 상태 체크 추가
      login: async (email, password) => {
        set({ isLoading: true });

        try {
          // authAPI를 사용하여 로그인
          const data = await authAPI.login({ email, password });

          // 사용자 정보와 토큰 저장
          const userData = {
            id: data.userId,
            email: data.email,
            name: data.name,
            nickname: data.nickname,
            role: data.user?.role || "user",
            isOnboardingCompleted: data.isOnboardingCompleted || false,
          };

          // 토큰 저장
          const accessToken = data.accessToken;
          if (!accessToken) {
            throw new Error("로그인 응답에 토큰이 없습니다.");
          }

          // 로딩 상태 먼저 해제
          set({ isLoading: false });

          // 상태 업데이트 - 토큰을 먼저 저장
          set({
            accessToken: accessToken,
            user: userData,
            isAuthenticated: true,
          });

          return {
            success: true,
            isOnboardingCompleted: data.isOnboardingCompleted || false,
          };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // 앱 시작 시 사용자 정보 동기화 (단순화)
      syncUserInfo: async () => {
        try {
          const token = get().accessToken;
          if (!token) return false;

          // 백엔드에서 최신 사용자 정보 가져오기
          const userData = await authAPI.getProfile();

          // 사용자 정보 업데이트
          set((state) => ({
            user: {
              ...state.user,
              ...userData,
              isOnboardingCompleted: userData.isOnboardingCompleted || false,
            },
            isAuthenticated: true,
          }));

          return true;
        } catch {
          return false;
        }
      },

      // 온보딩 완료 함수
      completeOnboarding: async (onboardingData) => {
        try {
          const data = await authAPI.completeOnboarding(onboardingData);

          if (data.success) {
            // 사용자 정보 업데이트
            set((state) => ({
              user: { ...state.user, isOnboardingCompleted: true },
            }));
            return { success: true };
          } else {
            return { success: false, error: data.message };
          }
        } catch (error) {
          return { success: false, error: error.message };
        }
      },

      // 온보딩 상태 확인 함수
      checkOnboardingStatus: async () => {
        try {
          const data = await authAPI.checkOnboardingStatus();

          // 사용자 정보 업데이트
          set((state) => ({
            user: { ...state.user, isOnboardingCompleted: data.isCompleted },
          }));

          return data.isCompleted;
        } catch {
          return false;
        }
      },

      // 로그아웃 (API 호출 포함)
      logout: async () => {
        try {
          // 백엔드에 로그아웃 요청 (쿠키 삭제)
          await authAPI.logout();
        } catch {
          // 로그아웃 API 실패는 무시하고 계속 진행
        }

        // 상태 초기화
        set({
          user: defaultUser,
          isAuthenticated: false,
          accessToken: null,
        });
      },

      // 조용한 로그아웃 (API 호출 없이 상태만 초기화)
      logoutSilently: () => {
        set({
          user: defaultUser,
          isAuthenticated: false,
          accessToken: null,
        });
      },

      // 토큰 설정 (단순화)
      setToken: (accessToken) => {
        set({ accessToken });
      },

      // 토큰 가져오기
      getToken: () => {
        return get().accessToken;
      },

      // 토큰 제거
      removeToken: () => {
        set({ accessToken: null });
      },

      // 앱 시작 시 토큰 복원 (단순화)
      restoreToken: async () => {
        try {
          const token = get().accessToken;
          if (token) return token; // 이미 토큰이 있으면 그대로 사용

          // 리프레시 토큰으로 새로운 액세스 토큰 발급
          const response = await authAPI.refreshToken();

          if (response.accessToken) {
            set({ accessToken: response.accessToken });
            return response.accessToken;
          }
        } catch {
          // 토큰 복원 실패 시 조용히 로그아웃
          get().logoutSilently();
        }
        return null;
      },

      // 토큰 유효성 확인
      isTokenValid: () => {
        const token = get().accessToken;
        if (!token) return false;

        try {
          // JWT 토큰 디코딩 (payload 확인)
          const payload = JSON.parse(atob(token.split(".")[1]));
          const currentTime = Date.now() / 1000;

          // 토큰이 만료되었으면 조용한 로그아웃
          if (payload.exp <= currentTime) {
            console.log("토큰이 만료되어 조용한 로그아웃 처리");
            get().logoutSilently();
            return false;
          }

          return true;
        } catch {
          console.log("토큰 디코딩 실패 - 조용한 로그아웃 처리");
          get().logoutSilently();
          return false;
        }
      },

      // 인증 상태 확인 (단순화)
      checkAuth: () => {
        const token = get().accessToken;
        if (!token) {
          get().logoutSilently();
          return false;
        }

        // 토큰 유효성도 확인
        if (!get().isTokenValid()) {
          return false;
        }

        return true;
      },

      // 통합된 인증 확인 및 리다이렉트 함수
      checkAuthAndRedirect: () => {
        const state = get();

        if (!state.isAuthenticated || !state.accessToken) {
          console.log("인증되지 않음 - 조용한 로그아웃 처리");
          state.logoutSilently();
          return false;
        }

        if (!state.isTokenValid()) {
          console.log("토큰이 만료됨 - 조용한 로그아웃 처리");
          state.logoutSilently();
          return false;
        }

        return true;
      },

      // 사용자 정보 업데이트
      updateUser: (newUserData) => {
        set((state) => ({
          user: { ...state.user, ...newUserData },
        }));
      },

      // 사용자 정보로 로그인 (로그인 페이지에서 사용)
      loginWithUserData: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
        });
      },

      // ===== 기타 전역 상태들 =====
      notifications: [],

      // 알림 추가
      addNotification: (notification) => {
        set((state) => ({
          notifications: [...state.notifications, notification],
        }));
      },

      // 알림 제거
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      // 알림 모두 제거
      clearNotifications: () => {
        set({ notifications: [] });
      },
    }),
    {
      name: "moimlog-storage", // 로컬스토리지 키 이름
      partialize: (state) => ({
        // 저장할 상태만 선택
        isDarkMode: state.isDarkMode,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken, // 토큰도 저장
      }),
    }
  )
);
