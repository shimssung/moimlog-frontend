import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../components/AuthLayout";
import Link from "next/link";
import toast from "react-hot-toast";
import { useTheme } from "../utils/ThemeContext";

const ForgotPassword = () => {
  const { theme } = useTheme();
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`입력한 아이디: ${userId}`);
    // 비밀번호 재설정 로직 구현
  };

  const footerContent = (
    <p>
      로그인이 기억나셨나요?{" "}
      <Link href="/login">
        <StyledLink theme={theme}>로그인 하기</StyledLink>
      </Link>
    </p>
  );

  return (
    <AuthLayout
      leftTitle="비밀번호를 잊으셨나요?"
      leftDesc={
        <>
          가입하신 이메일을 입력하시면
          <br />
          비밀번호 재설정 링크를 보내드립니다.
        </>
      }
      formTitle="비밀번호 찾기"
      footerContent={footerContent}
    >
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="email"
            placeholder="가입한 이메일 주소"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit" fullWidth style={{ marginTop: "1rem" }}>
          다음
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled.span`
  color: ${(props) => props.theme.buttonPrimary};
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.buttonHover};
  }
`;
