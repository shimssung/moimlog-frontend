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
import { authAPI } from "../api/auth";

const LoginPage = () => {
  const { theme, login, isLoading } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.success) {
        // 토큰 저장
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        
        // 사용자 정보 저장
        const userData = {
          id: response.userId,
          email: response.email,
          name: response.name,
          nickname: response.nickname,
          role: "user"
        };
        
        // 스토어에 사용자 정보 저장
        login(userData);
        
        toast.success("로그인 성공!");
        router.push("/");
      } else {
        toast.error(response.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      toast.error(error.message || "로그인에 실패했습니다.");
    }
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
      </Form>
    </AuthLayout>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* 반응형: 작은 화면에서 간격 축소 */
  @media (max-width: 480px) {
    gap: 0.75rem;
  }
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



export default LoginPage;
