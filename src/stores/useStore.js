import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authAPI } from "../api/auth";
import { isPublicPath } from "../utils/constants";

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
  onboardingCompleted: true, // 기본적으로 온보딩 완료 상태로 설정 (기존 사용자 호환성)
};

// Zustand 스토어 생성 - 액세스 토큰은 메모리에서만 관리
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
      // accessToken은 메모리에서만 관리 (persist에서 제외됨)
      
      // 앱 시작 시 인증 상태 초기화 (백엔드 연결 상태 확인 후 결정)
      initializeAuthState: () => {
        // 앱 시작 시 인증 상태를 false로 초기화
        // 실제 인증 상태는 백엔드 연결 확인 후 결정됨
        set({ isAuthenticated: false });
      },

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
            // 백엔드에서 onboardingCompleted (소문자)로 전송됨
            onboardingCompleted: data.onboardingCompleted || false,
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

           // 유효한 세션 플래그 설정
           localStorage.setItem('hasValidSession', 'true');

          return {
            success: true,
            isOnboardingCompleted: data.onboardingCompleted || false,
            // 온보딩이 완료되지 않은 경우에만 온보딩 페이지로 리다이렉트
            shouldRedirectToOnboarding: !(data.onboardingCompleted || false),
          };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // 앱 시작 시 사용자 정보 동기화
      syncUserInfo: async () => {
        try {
          let token = get().accessToken;

          // 액세스 토큰이 없으면 실패 (refreshToken 호출하지 않음)
          if (!token) {
            console.error(
              "액세스 토큰이 없습니다. syncUserInfo를 호출하기 전에 restoreToken을 먼저 호출하세요."
            );
            return false;
          }

          // 백엔드에서 최신 사용자 정보 가져오기
          const userData = await authAPI.getProfile();

          // 디버깅: 백엔드 응답 확인
          console.log("백엔드에서 받은 사용자 정보:", userData);
          console.log(
            "온보딩 완료 상태 (백엔드):",
            userData.onboardingCompleted
          );

          // 사용자 정보 업데이트
          set((state) => ({
            user: {
              ...state.user,
              ...userData,
              // 백엔드에서 onboardingCompleted가 없으면 기존 상태 유지
              onboardingCompleted: userData.onboardingCompleted !== undefined ? userData.onboardingCompleted : state.user.onboardingCompleted,
            },
            isAuthenticated: true,
          }));

          // 디버깅: 업데이트 후 상태 확인
          const updatedUser = get().user;
          console.log("업데이트 후 사용자 정보:", updatedUser);
          console.log(
            "온보딩 완료 상태 (업데이트 후):",
            updatedUser.onboardingCompleted
          );

          return true;
        } catch (error) {
          console.error("사용자 정보 동기화 실패:", error);
          // 백엔드 연결 실패 시 인증 상태를 false로 설정
          set({ isAuthenticated: false });
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
              user: { ...state.user, onboardingCompleted: true },
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
            user: { ...state.user, onboardingCompleted: data.isCompleted },
          }));

          return data.isCompleted;
        } catch {
          return false;
        }
      },

      // 로그아웃 (API 호출 포함)
      logout: async () => {
        try {
          // 백엔드에 로그아웃 요청 (리프레시 토큰 쿠키 삭제)
          await authAPI.logout();

          // API 호출이 성공했을 때만 로컬 상태 초기화
          // 쿠키 삭제 (리프레시 토큰만) - 다양한 방법으로 시도
          if (typeof window !== "undefined") {
            // 방법 1: 기본 삭제
            document.cookie =
              "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

            // 방법 2: 도메인 없이 삭제
            document.cookie =
              "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

            // 방법 3: 루트 경로로 삭제
            document.cookie =
              "refreshToken=; path=/; domain=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

            // 방법 4: 현재 도메인으로 삭제
            const currentDomain = window.location.hostname;
            document.cookie = `refreshToken=; path=/; domain=${currentDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          }

                     // 상태 초기화
           set({
             user: defaultUser,
             isAuthenticated: false,
             accessToken: null,
           });

           // 세션 플래그 제거
           localStorage.removeItem('hasValidSession');
         } catch (error) {
           console.error("로그아웃 API 호출 실패:", error);
           // API 호출 실패 시에도 로컬 상태는 초기화
           if (typeof window !== "undefined") {
             // 강제 쿠키 삭제 시도
             document.cookie =
               "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
             document.cookie =
               "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
             document.cookie =
               "refreshToken=; path=/; domain=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
           }

           set({
             user: defaultUser,
             isAuthenticated: false,
             accessToken: null,
           });

           // 세션 플래그 제거
           localStorage.removeItem('hasValidSession');
        }
      },

      // 졩용한 로그아웃 (API 호출 없이 상태만 초기화)
      logoutSilently: () => {
        // 쿠키 삭제 (리프레시 토큰만)
        if (typeof window !== "undefined") {
          document.cookie =
            "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

        // 상태 초기화
        set({
          user: defaultUser,
          isAuthenticated: false,
          accessToken: null,
        });

        // 세션 플래그 제거
        localStorage.removeItem('hasValidSession');

        // 공개 페이지가 아닌 경우에만 로그인 페이지로 리다이렉트
        if (
          typeof window !== "undefined" &&
          !isPublicPath(window.location.pathname)
        ) {
          window.localStorage.setItem(
            "logoutReason",
            "세션이 만료되었습니다. 다시 로그인 해주세요."
          );
          window.location.href = "/login";
        }
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

                     // 앱 시작 시 토큰 복원 (메모리 기반)
        restoreToken: async () => {
          try {
            // 인증 초기화 시작
            set({ isAuthInitializing: true });
            
            // 메모리에 토큰이 있으면 유효성 확인 후 사용
            let token = get().accessToken;
            if (token) {
              // 토큰이 있으면 유효성 확인
              if (get().isTokenValid()) {
                console.log("메모리에 유효한 토큰 있음 - 인증 상태 설정");
                set({ 
                  isAuthenticated: true,
                  isAuthInitializing: false
                });
                return token;
              } else {
                console.log("메모리에 있는 토큰이 만료됨 - 제거");
                set({ 
                  accessToken: null,
                  isAuthenticated: false,
                  isAuthInitializing: false
                });
              }
            }

           console.log("메모리에 토큰 없음 - 리프레시 토큰으로 복원 시도");

           // 로컬스토리지에 유효한 세션이 있는지 확인
           const hasValidSession = localStorage.getItem('hasValidSession') === 'true';
           console.log("로컬스토리지 세션 플래그:", hasValidSession);
           console.log("로컬스토리지 전체 내용:", localStorage.getItem('hasValidSession'));
           console.log("로컬스토리지 키들:", Object.keys(localStorage));

           // 세션이 없으면 토큰 복원 시도하지 않음
           if (!hasValidSession) {
             console.log("유효한 세션 플래그 없음 - 하지만 HttpOnly 쿠키가 있을 수 있으므로 토큰 복원 시도");
             // 세션 플래그가 없어도 HttpOnly 쿠키가 있을 수 있으므로 시도
           }

           // HttpOnly 쿠키는 JavaScript에서 접근할 수 없으므로
           // 백엔드 API 호출로 refreshToken 유효성 확인
           console.log("백엔드에 refreshToken 요청 시도");
           const response = await authAPI.refreshToken();

                       if (response.accessToken) {
              console.log("토큰 복원 성공");
              set({ 
                accessToken: response.accessToken,
                // 토큰 복원 성공 시 인증 상태도 true로 설정
                isAuthenticated: true,
                isAuthInitializing: false
              });
              
              // 토큰 복원 성공 시 세션 플래그 설정
              localStorage.setItem('hasValidSession', 'true');
              console.log("세션 플래그 설정됨: hasValidSession = true");
              
              return response.accessToken;
            } else {
              console.log("리프레시 토큰으로 액세스 토큰 발급 실패");
              // 세션 플래그 제거
              localStorage.removeItem('hasValidSession');
              // 인증 상태도 false로 설정
              set({ 
                isAuthenticated: false,
                isAuthInitializing: false
              });
              return null;
            }
                   } catch (error) {
            console.error("토큰 복원 중 오류:", error);
            // 오류 발생 시 세션 플래그 제거 및 인증 상태 초기화
            localStorage.removeItem('hasValidSession');
            set({ 
              isAuthenticated: false,
              accessToken: null,
              isAuthInitializing: false
            });
            return null;
          }
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

      // 인증 상태 확인 (메모리 기반)
      checkAuth: () => {
        const token = get().accessToken;
        if (!token) {
          // 토큰이 없으면 인증되지 않은 상태로 처리 (로그아웃하지 않음)
          return false;
        }

        // 토큰 유효성도 확인
        if (!get().isTokenValid()) {
          return false;
        }

        return true;
      },

      // 통합된 인증 확인 및 리다이렉트 함수 (메모리 기반)
      checkAuthAndRedirect: () => {
        const state = get();

        // 토큰이 없으면 인증되지 않은 상태
        if (!state.accessToken) {
          console.log("액세스 토큰 없음 - 인증되지 않은 상태로 유지");
          return false;
        }

        // 토큰 유효성 확인
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
          // 사용자 정보가 업데이트되면 인증된 상태로 설정
          isAuthenticated: true,
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
        // 저장할 상태만 선택 (액세스 토큰과 인증 상태 제외)
        isDarkMode: state.isDarkMode,
        user: state.user,
        // isAuthenticated는 로컬스토리지에 저장하지 않음 (백엔드 연결 상태에 따라 결정)
        // accessToken은 메모리에서만 관리 (보안상 로컬스토리지에 저장하지 않음)
      }),
    }
  )
);
