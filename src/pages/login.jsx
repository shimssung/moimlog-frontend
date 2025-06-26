import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStore } from "../stores/useStore";

import Button from "../components/Button";
import Input from "../components/Input";
import SocialLogin from "../components/SocialLogin";
import AuthLayout from "../components/AuthLayout";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { theme, login, isLoading, tempLogin, tempAdminLogin } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    const result = await login(email, password);
    if (result.success) {
      toast.success("로그인 성공!");
      router.push("/");
    } else {
      toast.error(result.error || "로그인에 실패했습니다.");
    }
  };

  const handleTempLogin = () => {
    tempLogin();
    toast.success("임시 사용자로 로그인되었습니다!");
    router.push("/");
  };

  const handleTempAdminLogin = () => {
    tempAdminLogin();
    toast.success("임시 관리자로 로그인되었습니다!");
    router.push("/admin/dashboard");
  };

  const footerContent = (
    <FooterText theme={theme}>
      비밀번호를 잊으셨나요?{" "}
      <StyledLink href="/forgot-password" theme={theme}>
        비밀번호 찾기
      </StyledLink>
    </FooterText>
  );

  return (
    <AuthLayout
      leftTitle="MoimLog에 오신 걸 환영합니다!"
      leftDesc={
        <>
          다양한 모임을 만들고, 참여하며
          <br />
          새로운 사람들과 함께 성장해보세요.
        </>
      }
      formTitle="로그인"
      footerContent={footerContent}
    >
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </FormGroup>
        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>
        <Button
          href="/signup"
          variant="secondary"
          fullWidth
          disabled={isLoading}
        >
          이메일로 회원가입
        </Button>
        <SocialLogin />
        
        {/* 임시 로그인 버튼들 */}
        <TempLoginSection>
          <TempLoginTitle theme={theme}>테스트용 임시 로그인</TempLoginTitle>
          <TempLoginButtons>
            <TempLoginButton onClick={handleTempLogin} theme={theme}>
              임시 사용자 로그인
            </TempLoginButton>
            <TempLoginButton onClick={handleTempAdminLogin} theme={theme}>
              임시 관리자 로그인
            </TempLoginButton>
          </TempLoginButtons>
        </TempLoginSection>
      </Form>
    </AuthLayout>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  font-weight: 600;
  color: ${({ theme }) => theme.buttonPrimary};
  &:hover {
    text-decoration: underline;
  }
`;

const FooterText = styled.p`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const TempLoginSection = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const TempLoginTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textPrimary};
`;

const TempLoginButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TempLoginButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.buttonSecondary};
  color: ${({ theme }) => theme.textPrimary};
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.buttonSecondaryHover};
  }
`;

export default LoginPage;
