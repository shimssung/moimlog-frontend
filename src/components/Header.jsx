import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";

const Header = () => {
  return (
    <StyledHeader>
      <HeaderContent>
        <Logo>
          <Link href="/" passHref>
            <LogoText>MoimLog</LogoText>
          </Link>
        </Logo>
        <Nav>
          <NavLink href="/moim-list">모임 보기</NavLink>
          <ButtonGroup>
            <Button href="/moim-create" variant="light" size="small">
              모임 만들기
            </Button>
            <Button href="/login" variant="light" size="small">
              로그인 <UserIcon />
            </Button>
          </ButtonGroup>
        </Nav>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  background-color: #fff;
  border-bottom: 1.5px solid #e5e7eb;
  padding: 0.5rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

const LogoText = styled.h1`
  font-size: 1.15rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  color: #111827;
  text-decoration: none;
  font-size: 0.98rem;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 8px;
  height: 40px;
  display: flex;
  align-items: center;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: #f3f4f6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 0.5rem;
`;

const UserIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="#111827"
    strokeWidth="1.7"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" />
  </svg>
);
