import { create } from "zustand";
import { persist } from "zustand/middleware";

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

      // 로그인
      login: async (email, password) => {
        set({ isLoading: true });

        try {
          // API 호출 (실제 구현에서는 axios 등 사용)
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error("로그인 실패");
          }

          const data = await response.json();

          // 사용자 정보와 토큰 저장
          const userData = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            profileImage: data.user.profileImage,
            role: data.user.role,
          };

          // 상태 업데이트
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
          });

          // 토큰 저장
          localStorage.setItem("token", data.token);

          return { success: true };
        } catch (error) {
          console.error("로그인 오류:", error);
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // 로그아웃
      logout: () => {
        // 상태 초기화
        set({
          user: defaultUser,
          isAuthenticated: false,
        });

        // 로컬스토리지에서 토큰 제거
        localStorage.removeItem("token");

        // API 호출 (토큰 무효화)
        fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).catch(console.error);
      },

      // 사용자 정보 업데이트
      updateUser: (newUserData) => {
        set((state) => ({
          user: { ...state.user, ...newUserData },
        }));
      },

      // 토큰 가져오기
      getToken: () => {
        return localStorage.getItem("token");
      },

      // 인증 상태 확인
      checkAuth: () => {
        const token = localStorage.getItem("token");
        if (!token) {
          get().logout();
          return false;
        }
        return true;
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
      }),
    }
  )
);
