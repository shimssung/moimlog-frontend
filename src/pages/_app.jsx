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
    };

    setStoreRef(storeWithFunctions);

    // 이미 초기화되었으면 건너뛰기
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    // 공개 페이지라도 조건부로 토큰 복원 시도
    const initializeAuth = async () => {
      try {
        // 공개 페이지라도 리프레시 토큰이 있으면 토큰 복원 시도
        if (isPublicPath(router.pathname)) {
          console.log("공개 페이지 - 조건부 토큰 복원 시도");
          
          // 이미 인증된 상태라면 건너뛰기
          if (store.isAuthenticated) {
            console.log("이미 인증된 상태 - 토큰 복원 건너뛰기");
            return;
          }
          
          // 리프레시 토큰이 있는지 확인
          const hasRefreshToken = typeof window !== "undefined" && 
                                 document.cookie.includes('refreshToken=');
          
          if (!hasRefreshToken) {
            console.log("리프레시 토큰 없음1 - 토큰 복원 건너뛰기");
            return;
          }
          
          console.log("리프레시 토큰 있음 - 토큰 복원 시도");
        }

        console.log("토큰 복원 시도...");
        const token = await store.restoreToken();

        if (token) {
          console.log("토큰 복원 성공, 사용자 정보 동기화...");
          // 토큰이 복원되면 사용자 정보 동기화
          try {
            await store.syncUserInfo();
            console.log("사용자 정보 동기화 완료");
          } catch (error) {
            console.error("사용자 정보 동기화 실패:", error);
            // 사용자 정보 동기화 실패 시에도 토큰은 유지
          }
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
