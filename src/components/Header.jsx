import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
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

const LogoIcon = styled.div`
  width: 28px;
  height: 28px;
  color: #111827;
  svg {
    width: 100%;
    height: 100%;
  }
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
  gap: 0.5rem;
`;

const NavLink = styled.a`
  color: #111827;
  font-size: 0.98rem;
  font-weight: 500;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: #e5e7eb;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 0.5rem;
`;

const PrimaryButton = styled.a`
  background: #2563eb;
  color: #fff;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 0.98rem;
  text-decoration: none;
  transition: background 0.15s;
  &:hover {
    background: #1d4ed8;
  }
`;

const OutlinedButton = styled.a`
  background: #f1f5f9;
  color: #111827;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 0.98rem;
  text-decoration: none;
  border: none;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  &:hover {
    background: #e5e7eb;
  }
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

const Header = () => {
  return (
    <StyledHeader>
      <HeaderContent>
        <Logo>
          <LogoIcon>
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                fill="currentColor"
              />
            </svg>
          </LogoIcon>
          <LogoText>MoimLog</LogoText>
        </Logo>
        <Nav>
          <NavLink href="/moims">모임 보기</NavLink>
          <ButtonGroup>
            <PrimaryButton href="/create">모임 만들기</PrimaryButton>
            <OutlinedButton href="/login">
              로그인 <UserIcon />
            </OutlinedButton>
          </ButtonGroup>
        </Nav>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;
