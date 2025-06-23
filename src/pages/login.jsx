import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../components/AuthLayout";
import SocialLogin from "../components/SocialLogin";
import Link from "next/link";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("로그인 시도: " + email);
    // 로그인 로직 구현
  };

  const footerContent = (
    <p>
      비밀번호를 잊으셨나요?{" "}
      <Link href="/forgot-password">
        <StyledLink>비밀번호 찾기</StyledLink>
      </Link>
    </p>
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
        <Button href="/signup" variant="secondary" fullWidth>
          이메일로 회원가입
        </Button>
      </Form>
      <SocialLogin />
    </AuthLayout>
  );
};

export default LoginPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled.span`
  color: #3b82f6;
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    color: #2563eb;
  }
`;
