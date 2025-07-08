import React from "react";
import Link from "next/link";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0.75rem 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.15s ease;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props => props.fullWidth && `
    width: 100%;
  `}

  ${props => props.size === 'small' && `
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    height: 40px;
  `}

  ${props => props.size === 'large' && `
    padding: 1rem 1.5rem;
    font-size: 1rem;
  `}
`;

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  type = "button",
  href,
  className = "",
  ...props
}) => {
  // CSS 클래스로 variant 스타일 적용
  const variantClasses = {
    primary: "button--primary",
    secondary: "button--secondary", 
    light: "button--light"
  };

  const buttonClasses = [
    variantClasses[variant],
    className
  ].filter(Boolean).join(" ");

  if (href) {
    // Next.js의 Link로 감싸서 SPA 라우팅 지원
    return (
      <Link href={href} passHref>
        <StyledButton
          size={size}
          fullWidth={fullWidth}
          className={buttonClasses}
          {...props}
        >
          {children}
        </StyledButton>
      </Link>
    );
  }
  
  // 일반 버튼
  return (
    <StyledButton
      size={size}
      fullWidth={fullWidth}
      type={type}
      className={buttonClasses}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
