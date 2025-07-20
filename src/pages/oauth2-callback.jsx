import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useStore } from "../stores/useStore";
import toast from "react-hot-toast";

const OAuth2CallbackPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessed, setIsProcessed] = useState(false); // 중복 실행 방지
  const { setToken, syncUserInfo } = useStore();

  useEffect(() => {
    // 중복 실행 방지
    if (isProcessed) return;

    const handleCallback = async () => {
      try {
        setIsProcessed(true); // 처리 시작 표시

        // URL 파라미터에서 토큰 확인
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const error = urlParams.get("error");

        if (error) {
          setError("소셜 로그인에 실패했습니다.");
          return;
        }

        if (token) {
          // 토큰을 스토어에 저장
          setToken(token);

          // 사용자 정보 동기화
          await syncUserInfo();

          // 디버깅: 사용자 정보 확인
          const currentUser = useStore.getState().user;
          console.log("소셜 로그인 후 사용자 정보:", currentUser);
          console.log("온보딩 완료 상태:", currentUser.isOnboardingCompleted);

          toast.success("소셜 로그인 성공!");

          // 온보딩 상태에 따라 리다이렉트
          if (currentUser.isOnboardingCompleted === false) {
            console.log("온보딩 미완료 - 온보딩 페이지로 이동");
            router.push("/onboarding");
          } else {
            console.log("온보딩 완료 - 메인 페이지로 이동");
            router.push("/");
          }
        } else {
          setError("로그인에 실패했습니다.");
        }
      } catch (error) {
        console.error("OAuth2 콜백 처리 중 오류:", error);
        setError("로그인 처리 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [router, setToken, syncUserInfo, isProcessed]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>로그인 처리 중...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorTitle>로그인 실패</ErrorTitle>
        <ErrorMessage>{error}</ErrorMessage>
        <BackButton onClick={() => router.push("/login")}>
          로그인 페이지로 돌아가기
        </BackButton>
      </ErrorContainer>
    );
  }

  return null;
};

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 16px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 16px;
  text-align: center;
  padding: 20px;
`;

const ErrorTitle = styled.h2`
  color: #ef4444;
  margin: 0;
  font-size: 24px;
`;

const ErrorMessage = styled.p`
  color: #6b7280;
  margin: 0;
  font-size: 16px;
`;

const BackButton = styled.button`
  padding: 12px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: #2563eb;
  }
`;

export default OAuth2CallbackPage;
