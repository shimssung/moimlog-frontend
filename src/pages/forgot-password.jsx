import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import Link from "next/link";

const ForgotPassword = () => {
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`입력한 아이디: ${userId}`);
  };

  return (
    <>
      <Header>
        <HeaderContent>
          <Logo>
            <Link href="/" passHref>
              <LogoText>MoimLog</LogoText>
            </Link>
          </Logo>
        </HeaderContent>
      </Header>
      <PageWrap>
        <LeftSection>
          <LeftContent>
            <LeftTitle>비밀번호를 잊으셨나요?</LeftTitle>
            <LeftDesc>
              가입하신 이메일을 입력하시면
              <br />
              비밀번호 재설정 링크를 보내드립니다.
            </LeftDesc>
          </LeftContent>
        </LeftSection>
        <RightSection>
          <FormContainer>
            <Title>비밀번호 찾기</Title>
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
              <Footer>
                <p>
                  로그인이 기억나셨나요? <a href="/login">로그인 하기</a>
                </p>
              </Footer>
            </form>
          </FormContainer>
        </RightSection>
      </PageWrap>
    </>
  );
};

export default ForgotPassword;

const PageWrap = styled.div`
  display: flex;
  min-height: 100vh;
  background: #111827;
  justify-content: center;
  align-items: center;
  padding: 32px;
  gap: 48px;

  /* 반응형: 1230px 이하에서는 세로로 쌓이고, 패딩/정렬 변경 */
  @media (max-width: 1230px) {
    flex-direction: column; // 좌우 → 상하로 쌓임
    gap: 0;
    padding: 24px 0 0 0; // 상단 패딩만 남김
    align-items: stretch; // stretch로 영역 확장
  }
`;

const LeftSection = styled.div`
  flex: 0 0 620px;
  background: transparent;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 48px 0 48px 48px;
  gap: 32px;

  /* 반응형: 1230px 이하에서 패딩/정렬/텍스트 중앙 정렬로 변경 */
  @media (max-width: 1230px) {
    flex: none;
    padding: 32px 16px 32px 16px; // 패딩 축소
    align-items: center; // 중앙 정렬
    text-align: center; // 텍스트 중앙 정렬
  }
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  letter-spacing: -1px;

  /* 반응형: 1230px 이하에서 폰트 크기 축소 */
  @media (max-width: 1230px) {
    font-size: 2rem;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LeftTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 16px;

  /* 반응형: 900px 이하에서 폰트 크기/마진 축소 */
  @media (max-width: 900px) {
    font-size: 1.3rem;
    margin-bottom: 10px;
  }
`;

const LeftDesc = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  opacity: 0.85;

  /* 반응형: 900px 이하에서 폰트 크기 축소 */
  @media (max-width: 900px) {
    font-size: 0.95rem;
  }
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
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
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
const Header = styled.header`
  width: 100vw;
  min-width: 360px;
  height: 64px;
  display: flex;
  align-items: center;
  background: transparent;
  padding: 0 48px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  /* 반응형: 1230px 이하에서 패딩/높이 축소 */
  @media (max-width: 1230px) {
    justify-content: center;
  }
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;
