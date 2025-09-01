import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "../stores/useStore";
import { isPublicPath } from "../utils/constants";

const AuthGuard = ({ children }) => {
  const { user, isAuthenticated, isAuthInitializing } = useStore();
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      // 공개 페이지는 즉시 렌더링 (로딩 없음)
      if (isPublicPath(router.pathname)) {
        console.log("AuthGuard: 공개 페이지 - 즉시 렌더링");
        setIsInitializing(false);
        return;
      }

      // 온보딩 페이지 특별 처리
      if (router.pathname === "/onboarding") {
        // 로그인하지 않은 사용자는 로그인 페이지로
        if (!isAuthenticated) {
          router.push("/login");
          setIsInitializing(false);
          return;
        }

        // 이미 온보딩을 완료한 사용자는 홈페이지로
        if (user?.onboardingCompleted) {
          router.push("/");
          setIsInitializing(false);
          return;
        }

        // 온보딩이 필요한 사용자는 온보딩 페이지 유지
        setIsInitializing(false);
        return;
      }

      // 보호된 페이지에서만 인증 확인 수행
      console.log("AuthGuard: 보호된 페이지 - 인증 확인 시작");

      // _app.jsx의 인증 초기화가 완료될 때까지 대기
      if (isAuthInitializing) {
        console.log("AuthGuard: _app.jsx 인증 초기화 대기 중");
        return; // 아직 초기화하지 않음
      }

      // 인증 초기화 완료 후 상태 확인
      if (isAuthenticated) {
        console.log("AuthGuard: 인증된 상태 - 페이지 렌더링 허용");
        setIsInitializing(false);
        return;
      }

      // 인증되지 않은 상태 - 로그인 페이지로 리다이렉트
      console.log("AuthGuard: 인증되지 않은 상태 - 로그인 페이지로 리다이렉트");
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "logoutReason",
          "로그인이 필요한 페이지입니다. 로그인 후 이용해주세요."
        );
        try {
          window.localStorage.setItem("redirectAfterLogin", router.asPath);
        } catch {
          // no-op
        }
      }
      router.replace("/login");
      return;
    };

    initializeAuth();
  }, [
    router.pathname,
    user?.onboardingCompleted,
    isAuthenticated,
    isAuthInitializing,
  ]);

  // 초기화 중에는 로딩 상태 표시
  if (isInitializing) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#666",
        }}
      >
        인증 확인 중...
      </div>
    );
  }

  return children;
};

export default AuthGuard;
