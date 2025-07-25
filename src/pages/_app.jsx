/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../utils/ThemeContext";
import OnboardingGuard from "../components/OnboardingGuard";
import { useStore } from "../stores/useStore";
import { setStoreRef } from "../api/axios";
import { isProtectedRoute } from "../utils/constants";
import "../index.css";

export default function App({ Component, pageProps }) {
  const store = useStore();
  const router = useRouter();
  const initialized = useRef(false);

  useEffect(() => {
    // 이미 초기화되었으면 건너뛰기
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    // Zustand 스토어 참조를 axios 인터셉터에 설정
    const storeWithFunctions = {
      ...store,
      getToken: store.getToken,
      setToken: store.setToken,
      removeToken: store.removeToken,
      logout: store.logout,
    };

    setStoreRef(storeWithFunctions);

    // 보호된 라우트에서만 인증 초기화 수행
    const currentPath = router.pathname;
    if (isProtectedRoute(currentPath)) {
      // 앱 시작 시 인증 상태 확인 (메모리 기반)
      const initializeAuth = async () => {
        try {
          // 페이지 새로고침 시에는 토큰이 메모리에 없으므로 리프레시 토큰으로 복원 시도
          const token = await store.restoreToken();

          if (token) {
            // 토큰이 복원되면 사용자 정보 동기화
            await store.syncUserInfo();
          } else {
            // 토큰 복원 실패 시 인증 상태 초기화 (이미 restoreToken에서 처리됨)
            console.log("토큰 복원 실패 - 인증되지 않은 상태로 유지");
          }
        } catch (error) {
          console.error("인증 초기화 중 오류:", error);
          // 오류 발생 시 조용한 로그아웃
          store.logoutSilently();
        }
      };

      // async 함수를 호출하되 반환값을 무시
      initializeAuth().catch(console.error);
    }
  }, [router.pathname]);

  return (
    <ThemeProvider>
      <OnboardingGuard>
        <Component {...pageProps} />
      </OnboardingGuard>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#10b981",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#ef4444",
            },
          },
        }}
      />
    </ThemeProvider>
  );
}
