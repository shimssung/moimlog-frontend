import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  overflow: hidden;
`;

const Header = styled.header`
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2.5rem;
  flex-shrink: 0;
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoIcon = styled.div`
  width: 24px;
  height: 24px;
  color: #111827;
`;

const LogoText = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 28rem;
  position: relative;
  top: -2.5rem; /* 헤더의 높이만큼 위로 올려서 진짜 중앙에 위치하도록 조정 */
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

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #111827;
  background-color: #ffffff;
  transition: border-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
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

const StyledLink = styled(Link)`
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", { email, password });
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <LogoSection>
            <LogoIcon>
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                  fill="currentColor"
                />
              </svg>
            </LogoIcon>
            <LogoText>MoimLog</LogoText>
          </LogoSection>
        </HeaderContent>
      </Header>

      <Main>
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
            <SocialLoginButton
              variant="kakao"
              fullWidth
              onClick={() => console.log("Kakao로 로그인")}
            >
              <SocialIcon src="/kakao_icon.png" alt="Kakao" />
              카카오로 로그인
            </SocialLoginButton>
            <SocialLoginButton
              variant="google"
              fullWidth
              onClick={() => console.log("Google 로그인")}
            >
              <SocialIcon src="/google_icon.png" alt="Google" />
              Google로 로그인
            </SocialLoginButton>
          </SocialLogin>

          <Footer>
            <p>
              계정이 없으신가요? <StyledLink to="/signup">회원가입</StyledLink>
            </p>
            <p>
              비밀번호를 잊으셨나요?{" "}
              <StyledLink to="/reset-password">비밀번호 재설정</StyledLink>
            </p>
          </Footer>
        </FormContainer>
      </Main>
    </Container>
  );
};

export default LoginPage;
