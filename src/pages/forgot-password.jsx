import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../components/AuthLayout";
import Link from "next/link";
import toast from "react-hot-toast";

const ForgotPassword = () => {
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
        <StyledLink>로그인 하기</StyledLink>
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
  color: #3b82f6;
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    color: #2563eb;
  }
`;
