import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "../stores/useStore";
import { authAPI } from "../api/auth";
import { isPublicPath } from "../utils/constants";

const OnboardingGuard = ({ children }) => {
  const { user, isAuthenticated, checkAuthAndRedirect, updateUser } = useStore();
  const router = useRouter();

  useEffect(() => {
    // 중앙 집중식 설정 사용
    if (isPublicPath(router.pathname)) {
      return;
    }

    // 통합된 인증 확인
    if (!checkAuthAndRedirect()) {
      return;
    }

    // 로그인된 상태에서 온보딩 상태 확인
    if (isAuthenticated && user) {
      const checkOnboardingStatus = async () => {
        try {
          const response = await authAPI.checkOnboardingStatus();
          
          if (response.isCompleted !== user.isOnboardingCompleted) {
            // 온보딩 상태가 변경된 경우 사용자 정보 업데이트
            updateUser({ isOnboardingCompleted: response.isCompleted });
          }
          
          // 온보딩이 완료되지 않은 경우 온보딩 페이지로 리다이렉트
          if (!response.isCompleted && router.pathname !== "/onboarding") {
            router.push("/onboarding");
          } else if (response.isCompleted && router.pathname === "/onboarding") {
            // 온보딩이 완료된 경우 메인 페이지로 리다이렉트
            router.push("/");
          }
        } catch (error) {
          console.error("온보딩 상태 확인 실패:", error);
          // API 호출 실패 시 기존 로직 사용
          if (user.isOnboardingCompleted === false && router.pathname !== "/onboarding") {
            router.push("/onboarding");
          } else if (user.isOnboardingCompleted === true && router.pathname === "/onboarding") {
            router.push("/");
          }
        }
      };

      checkOnboardingStatus();
    }
  }, [
    isAuthenticated,
    user,
    user?.onboardingCompleted,
    router,
    router.pathname,
    checkAuthAndRedirect,
    updateUser,
  ]);

  return children;
};

export default OnboardingGuard;
