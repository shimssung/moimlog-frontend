import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { useStore } from "../stores/useStore";

const SocialLogin = () => {
  const { theme } = useStore();

  return (
    <>
      <Divider theme={theme}>
        <span>또는</span>
      </Divider>
      <SocialLoginContainer>
        <SocialLoginButton variant="kakao" fullWidth>
          <SocialIcon src="/kakao_icon.png" alt="카카오" />
          카카오로 로그인
        </SocialLoginButton>
        <SocialLoginButton variant="google" fullWidth>
          <SocialIcon src="/google_icon.png" alt="구글" />
          구글로 로그인
        </SocialLoginButton>
        <SocialLoginButton variant="naver" fullWidth>
          <SocialIcon src="/naver_icon.svg" alt="네이버" />
          네이버로 로그인
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
  margin: 1.5rem 0;
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
`;

const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SocialLoginButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 0.875rem;
  height: 44px;

  ${(props) =>
    props.variant === "kakao" &&
    `
    background-color: #FEE500;
    color: #000000;
    border: none;
    &:hover {
      background-color: #F6E000;
      border: none;
    }
  `}

  ${(props) =>
    props.variant === "google" &&
    `
    background-color: #ffffff;
    color: #000000;
    border: 1px solid #dadce0;
    &:hover {
      background-color: #f8f9fa;
      border-color: #dadce0;
    }
  `}

  ${(props) =>
    props.variant === "naver" &&
    `
    background-color: #03C75A;
    color: #fff;
    border: none;
    &:hover { background-color: #1EC800; }
  `}
`;

const SocialIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;
