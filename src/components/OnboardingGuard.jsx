import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "../stores/useStore";

const OnboardingGuard = ({ children }) => {
  const { user, isAuthenticated, checkAuthAndRedirect } = useStore();
  const router = useRouter();

  useEffect(() => {
    // 통합된 인증 확인
    if (!checkAuthAndRedirect()) {
      return;
    }

    // 로그인된 상태이고 온보딩이 완료되지 않은 경우에만 리다이렉트
    if (isAuthenticated && user && user.isOnboardingCompleted === false) {
      if (router.pathname !== "/onboarding") {
        router.push("/onboarding");
      }
    } else if (isAuthenticated && user && user.isOnboardingCompleted === true) {
      if (router.pathname === "/onboarding") {
        router.push("/");
      }
    }
  }, [
    isAuthenticated,
    user?.isOnboardingCompleted,
    router.pathname,
    checkAuthAndRedirect,
  ]);

  return children;
};

export default OnboardingGuard;
