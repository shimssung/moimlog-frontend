import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #1f2937;
  color: #ffffff;
  padding: 4rem 0;
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
  color: #f3f4f6;
  margin: 0 0 1rem;
`;

const FooterLink = styled.a`
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;

  &:hover {
    color: #f3f4f6;
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #374151;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <FooterSection>
          <FooterTitle>서비스 소개</FooterTitle>
          <FooterLink href="/about">MoimLog 소개</FooterLink>
          <FooterLink href="/guide">이용 가이드</FooterLink>
          <FooterLink href="/updates">업데이트 소식</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>고객 지원</FooterTitle>
          <FooterLink href="/faq">자주 묻는 질문</FooterLink>
          <FooterLink href="/contact">문의하기</FooterLink>
          <FooterLink href="/feedback">피드백 남기기</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>법적 고지</FooterTitle>
          <FooterLink href="/terms">이용약관</FooterLink>
          <FooterLink href="/privacy">개인정보처리방침</FooterLink>
          <FooterLink href="/rules">커뮤니티 가이드라인</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>팔로우</FooterTitle>
          <FooterLink href="https://github.com" target="_blank">
            GitHub
          </FooterLink>
          <FooterLink href="https://twitter.com" target="_blank">
            Twitter
          </FooterLink>
          <FooterLink href="https://instagram.com" target="_blank">
            Instagram
          </FooterLink>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} MoimLog. All rights reserved.
      </Copyright>
    </StyledFooter>
  );
};

export default Footer;
