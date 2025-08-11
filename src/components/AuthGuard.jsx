import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "../stores/useStore";
import { isPublicPath } from "../utils/constants";

const AuthGuard = ({ children }) => {
  const { user, isAuthenticated, restoreToken } = useStore();
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      // 중앙 집중식 설정 사용
      if (isPublicPath(router.pathname)) {
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

      // _app.jsx의 토큰 복원이 완료될 때까지 대기
      let retryCount = 0;
      const maxRetries = 20; // 최대 20번 시도 (10초)
      
      while (!isAuthenticated && retryCount < maxRetries) {
        console.log(`AuthGuard: 토큰 복원 대기 중... (${retryCount + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms 대기
        retryCount++;
      }

      if (!isAuthenticated) {
        console.log("AuthGuard: 토큰 복원 대기 시간 초과, 직접 복원 시도...");
        try {
          const token = await restoreToken();
          if (token) {
            console.log("AuthGuard: 토큰 복원 성공");
            // 토큰 복원 후 사용자 정보 동기화 시도
            try {
              await store.syncUserInfo();
            } catch (error) {
              console.error("AuthGuard: 사용자 정보 동기화 실패:", error);
            }
          }
        } catch (error) {
          console.error("AuthGuard: 토큰 복원 실패:", error);
        }
      }

      // 토큰 복원이 완료되었으므로 초기화 완료
      setIsInitializing(false);
    };

    initializeAuth();
  }, [router.pathname, user?.onboardingCompleted, isAuthenticated]);

  // 초기화 중에는 로딩 상태 표시
  if (isInitializing) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        인증 확인 중...
      </div>
    );
  }

  return children;
};

export default AuthGuard;
