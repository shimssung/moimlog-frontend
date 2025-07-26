import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "../stores/useStore";
import { isProtectedRoute, isPublicRoute } from "../utils/constants";

const OnboardingGuard = ({ children }) => {
  const { user, isAuthenticated, checkAuthAndRedirect } = useStore();
  const router = useRouter();

  useEffect(() => {
    const currentPath = router.pathname;

    // 공개 라우트는 인증 확인하지 않음
    if (isPublicRoute(currentPath)) {
      return;
    }

    // 보호된 라우트에서만 인증 확인
    if (isProtectedRoute(currentPath)) {
      // 통합된 인증 확인
      if (!checkAuthAndRedirect()) {
        // 인증되지 않은 경우 로그인 페이지로 리다이렉트
        if (currentPath !== "/login" && currentPath !== "/signup") {
          router.push("/login");
        }
        return;
      }

      // 온보딩이 완료되지 않은 사용자는 온보딩 페이지로 리다이렉트
      if (isAuthenticated && user && user.onboardingCompleted === false) {
        if (currentPath !== "/onboarding") {
          router.push("/onboarding");
        }
      } else if (isAuthenticated && user && user.onboardingCompleted === true) {
        // 온보딩이 완료된 사용자는 정상적으로 페이지 렌더링
        // 추가 로직이 필요하면 여기에 작성
      }
    }
  }, [
    isAuthenticated,
    user,
    user?.onboardingCompleted,
    router,
    router.pathname,
    checkAuthAndRedirect,
  ]);

  return children;
};

export default OnboardingGuard;
