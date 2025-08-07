import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useStore } from "../stores/useStore";
import { authAPI } from "../api/auth";
import { OAUTH_PROVIDERS } from "../utils/constants";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { theme } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);

    try {
      if (provider === OAUTH_PROVIDERS.NAVER) {
        authAPI.startNaverLogin();
      } else if (provider === OAUTH_PROVIDERS.GOOGLE) {
        authAPI.startGoogleLogin();
      } else if (provider === OAUTH_PROVIDERS.KAKAO) {
        authAPI.startKakaoLogin();
      } else {
        // 기존 방식 (백엔드에서 URL 조회)
        const urls = await authAPI.getSocialLoginUrls();
        window.location.href = urls[provider];
      }
    } catch (error) {
      console.error("소셜 로그인 시작 실패:", error);
      toast.error("소셜 로그인을 시작할 수 없습니다.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Divider theme={theme}>
        <span>또는</span>
      </Divider>
      <SocialLoginContainer>
        <SocialLoginButton
          variant="google"
          fullWidth
          onClick={() => handleSocialLogin(OAUTH_PROVIDERS.GOOGLE)}
          disabled={isLoading}
        >
          <SocialIcon src="/google_icon.png" alt="구글" />
          {isLoading ? "로그인 중..." : "구글로 로그인"}
        </SocialLoginButton>

        <SocialLoginButton 
          variant="naver" 
          fullWidth 
          onClick={() => handleSocialLogin(OAUTH_PROVIDERS.NAVER)}
          disabled={isLoading}
        >
          <SocialIcon src="/naver_icon.png" alt="네이버" />
          {isLoading ? "로그인 중..." : "네이버로 로그인"}
        </SocialLoginButton>

        <SocialLoginButton 
          variant="kakao" 
          fullWidth 
          onClick={() => handleSocialLogin(OAUTH_PROVIDERS.KAKAO)}
          disabled={isLoading}
        >
          <SocialIcon src="/kakao_icon.png" alt="카카오" />
          {isLoading ? "로그인 중..." : "카카오로 로그인"}
        </SocialLoginButton>
      </SocialLoginContainer>
    </>
  );
};

export default SocialLogin;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
  color: ${(props) => props.theme.textTertiary};

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${(props) => props.theme.borderLight};
  }

  span {
    margin: 0 0.75rem;
    font-size: 0.875rem;
  }

  /* 반응형: 작은 화면에서 마진 축소 */
  @media (max-width: 480px) {
    margin: 0.75rem 0;
  }
`;

const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  /* 반응형: 작은 화면에서 간격 축소 */
  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`;

const SocialLoginButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 0.875rem;
  height: 40px;
  transition: all 0.2s ease;

  /* 반응형: 작은 화면에서 높이 축소 */
  @media (max-width: 480px) {
    height: 36px;
    font-size: 0.8rem;
  }

  /* 비활성화 상태 */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) =>
    props.variant === "kakao" &&
    `
    background-color: #FEE500;
    color: #000000;
    border: none;
    &:hover:not(:disabled) {
      background-color: #F6E000;
      border: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `}

  ${(props) =>
    props.variant === "google" &&
    `
    background-color: #ffffff;
    color: #5f6368;
    border: 1px solid #dadce0;
    &:hover:not(:disabled) {
      background-color: #f8f9fa;
      border-color: #dadce0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `}

  ${(props) =>
    props.variant === "naver" &&
    `
    background-color: #03C75A;
    color: #fff;
    border: none;
    &:hover:not(:disabled) { 
      background-color: #1EC800;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `}
`;

const SocialIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;
