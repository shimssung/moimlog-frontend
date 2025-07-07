import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useTheme } from "../utils/ThemeContext";

const AuthLayout = ({
  leftTitle,
  leftDesc,
  formTitle,
  children,
  footerContent,
}) => {
  const { theme } = useTheme();

  return (
    <>
      <Header theme={theme}>
        <HeaderContent>
          <Logo>
            <Link href="/" passHref prefetch={true}>
              <LogoText theme={theme}>MoimLog</LogoText>
            </Link>
          </Logo>
        </HeaderContent>
      </Header>
      <PageWrap theme={theme}>
        <LeftSection>
          <LeftContent>
            <LeftTitle theme={theme}>{leftTitle}</LeftTitle>
            <LeftDesc theme={theme}>{leftDesc}</LeftDesc>
          </LeftContent>
        </LeftSection>
        <RightSection>
          <FormContainer theme={theme}>
            <Title theme={theme}>{formTitle}</Title>
            {children}
            {footerContent && <Footer theme={theme}>{footerContent}</Footer>}
          </FormContainer>
        </RightSection>
      </PageWrap>
    </>
  );
};

export default AuthLayout;

const PageWrap = styled.div`
  display: flex;
  height: 100vh;
  background: ${(props) => props.theme.background};
  justify-content: center;
  align-items: center;
  padding: 64px 32px 32px 32px;
  gap: 48px;
  transition: background-color 0.3s ease;
  overflow: hidden;

  /* 반응형: 1230px 이하에서는 세로로 쌓이고, 패딩/정렬 변경 */
  @media (max-width: 1230px) {
    flex-direction: column; // 좌우 → 상하로 쌓임
    gap: 0;
    padding: 64px 16px 16px 16px; // 패딩 축소
    align-items: stretch; // stretch로 영역 확장
    overflow-y: auto; // 세로 스크롤 허용 (필요한 경우만)
  }
`;

const LeftSection = styled.div`
  flex: 0 0 620px;
  background: transparent;
  color: ${(props) => props.theme.textPrimary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 32px 0 32px 32px;
  gap: 24px;

  /* 반응형: 1230px 이하에서 패딩/정렬/텍스트 중앙 정렬로 변경 */
  @media (max-width: 1230px) {
    flex: none;
    padding: 24px 16px 24px 16px; // 패딩 축소
    align-items: center; // 중앙 정렬
    text-align: center; // 텍스트 중앙 정렬
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
  color: ${(props) => props.theme.textPrimary};
  transition: color 0.3s ease;

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
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.3s ease;

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
  background-color: ${(props) => props.theme.surface};
  border-radius: 0.75rem;
  box-shadow: ${(props) => props.theme.cardShadow};
  padding: 2rem 1.5rem;
  width: 100%;
  max-width: 28rem;
  position: relative;
  top: 0;
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;

  /* 반응형: 작은 화면에서 패딩 축소 */
  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.textPrimary};
  text-align: center;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;

  /* 반응형: 작은 화면에서 폰트 크기 축소 */
  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${(props) => props.theme.textTertiary};
  transition: color 0.3s ease;

  p {
    margin: 0.25rem 0;
  }

  /* 반응형: 작은 화면에서 마진 축소 */
  @media (max-width: 480px) {
    margin-top: 0.75rem;
    font-size: 0.8rem;
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

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${(props) => props.theme.textPrimary};
  letter-spacing: -1px;
  margin: 0;
  transition: color 0.3s ease;

  /* 반응형: 1230px 이하에서 폰트 크기 축소 */
  @media (max-width: 1230px) {
    font-size: 2rem;
  }
`;
