import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";

const LOGO_SRC = "/logo.png"; // public 폴더 내 로고 경로로 수정

const ForgotPassword = () => {
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`입력한 아이디: ${userId}`);
  };

  return (
    <ForgotPasswordWrap>
      <Logo src={LOGO_SRC} alt="로고" />
      <Title>비밀번호 찾기</Title>
      <SubTitle>비밀번호를 찾고자 하는 아이디를 입력해주세요.</SubTitle>
      <form onSubmit={handleSubmit}>
        <InputBox>
          <InputIcon>👤</InputIcon>
          <Input
            type="text"
            placeholder="아이디 또는 이메일"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            style={{ border: "none", boxShadow: "none", padding: 0, margin: 0, background: "transparent" }}
          />
        </InputBox>
        <Button type="submit" fullWidth size="large" variant="primary">
          다음
        </Button>
      </form>
    </ForgotPasswordWrap>
  );
};

export default ForgotPassword;

const ForgotPasswordWrap = styled.div`
  max-width: 400px;
  margin: 80px auto;
  text-align: center;
  background: #fff;
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  color: #18c964;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: 1px;
`;

const SubTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 24px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1.5px solid #ddd;
  border-radius: 6px;
  padding: 0 12px;
  margin-bottom: 18px;
`;

const InputIcon = styled.span`
  color: #bbb;
  margin-right: 8px;
  font-size: 18px;
`;