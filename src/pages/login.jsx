import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("로그인 시도: " + email);
  };

  return (
    <PageWrap>
      <LeftSection>
        <LeftTitle>MoimLog에 오신 걸 환영합니다!</LeftTitle>
        <LeftDesc>
          다양한 모임을 만들고, 참여하며<br />
          새로운 사람들과 함께 성장해보세요.
        </LeftDesc>
      </LeftSection>
      <RightSection>
        <FormContainer>
          <Title>로그인</Title>
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <Button type="submit" fullWidth>
              로그인
            </Button>
          </Form>
          <Divider>
            <span>또는</span>
          </Divider>
          <SocialLogin>
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
          </SocialLogin>
          <Footer>
            <p>아직 회원이 아니신가요? <a href="/signup">회원가입</a></p>
            <p>비밀번호를 잊으셨나요? <a href="/forgot-password">비밀번호 찾기</a></p>
          </Footer>
        </FormContainer>
      </RightSection>
    </PageWrap>
  );
};

export default LoginPage; 

const PageWrap = styled.div`
  display: flex;
  min-height: 100vh;
  background: #111827;
  justify-content: center;
  align-items: center;
  padding: 32px;
  gap: 48px;
`;

const LeftSection = styled.div`
  flex: 0 0 620px;
  background: transparent;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px 24px;
`;

const LeftTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 16px;
`;

const LeftDesc = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  opacity: 0.85;
`;

const RightSection = styled.div`
  flex: 0 0 620px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 28rem;
  position: relative;
  top: 0;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  color: #6b7280;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #e5e7eb;
  }

  span {
    margin: 0 0.75rem;
    font-size: 0.875rem;
  }
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

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Footer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;

  p {
    margin: 0.5rem 0;
  }
`;