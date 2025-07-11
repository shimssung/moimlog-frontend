/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../utils/ThemeContext";
import OnboardingGuard from "../components/OnboardingGuard";
import { useStore } from "../stores/useStore";
import { setStoreRef } from "../api/axios";
import "../index.css";

export default function App({ Component, pageProps }) {
  const store = useStore();
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

    // 앱 시작 시 인증 상태 확인 (단순화)
    const initializeAuth = async () => {
      // 통합된 인증 확인
      if (!store.checkAuthAndRedirect()) {
        return;
      }

      // 로그인된 상태이거나 사용자 정보가 있으면 토큰 복원 시도
      if (store.isAuthenticated || (store.user && store.user.id)) {
        const token = await store.restoreToken();

        if (token) {
          // 사용자 정보 동기화
          await store.syncUserInfo();
        }
      }
    };

    initializeAuth();
  }, []);

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
