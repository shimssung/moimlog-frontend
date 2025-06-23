import React from "react";
import styled from "styled-components";
import { useStore } from "../stores/useStore";

const Footer = () => {
  const { theme } = useStore();

  return (
    <StyledFooter theme={theme}>
      <FooterContent>
        <FooterSection>
          <FooterTitle theme={theme}>서비스 소개</FooterTitle>
          <FooterLink href="/about" theme={theme}>
            MoimLog 소개
          </FooterLink>
          <FooterLink href="/guide" theme={theme}>
            이용 가이드
          </FooterLink>
          <FooterLink href="/updates" theme={theme}>
            업데이트 소식
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle theme={theme}>고객 지원</FooterTitle>
          <FooterLink href="/faq" theme={theme}>
            자주 묻는 질문
          </FooterLink>
          <FooterLink href="/contact" theme={theme}>
            문의하기
          </FooterLink>
          <FooterLink href="/feedback" theme={theme}>
            피드백 남기기
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle theme={theme}>법적 고지</FooterTitle>
          <FooterLink href="/terms" theme={theme}>
            이용약관
          </FooterLink>
          <FooterLink href="/privacy" theme={theme}>
            개인정보처리방침
          </FooterLink>
          <FooterLink href="/rules" theme={theme}>
            커뮤니티 가이드라인
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle theme={theme}>팔로우</FooterTitle>
          <FooterLink href="https://github.com" target="_blank" theme={theme}>
            GitHub
          </FooterLink>
          <FooterLink href="https://twitter.com" target="_blank" theme={theme}>
            Twitter
          </FooterLink>
          <FooterLink
            href="https://instagram.com"
            target="_blank"
            theme={theme}
          >
            Instagram
          </FooterLink>
        </FooterSection>
      </FooterContent>

      <Copyright theme={theme}>
        © {new Date().getFullYear()} MoimLog. All rights reserved.
      </Copyright>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.textPrimary};
  padding: 4rem 0;
  border-top: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1320px) {
    padding: 0 40px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 1rem;
  transition: color 0.3s ease;
`;

const FooterLink = styled.a`
  color: ${(props) => props.theme.textSecondary};
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.textPrimary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: ${(props) => props.theme.textTertiary};
  font-size: 0.875rem;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;
