/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../utils/ThemeContext";
import AuthGuard from "../components/AuthGuard";
import { useStore } from "../stores/useStore";
import { setStoreRef } from "../api/axios";
import { isPublicPath } from "../utils/constants";
import "../index.css";

export default function App({ Component, pageProps }) {
  const store = useStore();
  const router = useRouter();
  const initialized = useRef(false);

  useEffect(() => {
    // Zustand 스토어 참조를 axios 인터셉터에 설정 (항상 먼저 실행)
    const storeWithFunctions = {
      ...store,
      getToken: store.getToken,
      setToken: store.setToken,
      removeToken: store.removeToken,
      logout: store.logout,
      logoutSilently: store.logoutSilently,
    };

    setStoreRef(storeWithFunctions);

    // 이미 초기화되었으면 건너뛰기
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    // 앱 시작 시 인증 상태 확인
    const initializeAuth = async () => {
      try {
        // 현재 경로가 설정되지 않은 경우만 건너뛰기
        if (!router.pathname) {
          console.log("경로 미설정 - 인증 상태 확인 건너뛰기");
          return;
        }

        // 모든 페이지에서 토큰 복원 시도 (공개 페이지라도 토큰이 있으면 인증 상태 확인)
        console.log("백엔드 연결 상태 확인 중...");

        // 토큰 복원 시도
        const token = await store.restoreToken();

        if (token) {
          console.log("토큰 복원 성공 - 백엔드 연결됨");
          // 토큰이 복원되면 인증 상태는 자동으로 true로 설정됨 (restoreToken에서 처리)
        } else {
          console.log("토큰 복원 실패 - 인증되지 않은 상태로 유지");
        }
      } catch (error) {
        console.error("인증 초기화 중 오류:", error);
        console.log("인증 초기화 오류로 인증되지 않은 상태로 유지");
      }
    };

    initializeAuth();
  }, []);

  return (
    <ThemeProvider>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
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
