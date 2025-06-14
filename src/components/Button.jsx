import React from "react";
import styled, { css } from "styled-components";
import Link from "next/link";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  type = "button",
  href,
  ...props
}) => {
  if (href) {
    // Next.js의 Link로 감싸서 SPA 라우팅 지원
    return (
      <Link href={href} passHref>
        <ButtonBase
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          {...props}
        >
          {children}
        </ButtonBase>
      </Link>
    );
  }
  // 일반 버튼
  return (
    <ButtonBase
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      type={type}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;

const ButtonBase = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "fullWidth",
})`
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
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  text-decoration: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) =>
    props.variant === "primary" &&
    css`
      background-color: #0d6efd;
      color: #fff;
      border: none;
      &:hover:not(:disabled),
      &:active:not(:disabled) {
        background-color: #0b5ed7;
        color: #fff;
        border: none;
        cursor: pointer;
      }
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      background-color: #6c757d;
      color: #fff;
      border: 1.5px solid #6c757d;
      &:hover:not(:disabled),
      &:active:not(:disabled) {
        background-color: #5c636a;
        color: #fff;
        border: 1.5px solid #5c636a;
        cursor: pointer;
      }
    `}

  ${(props) =>
    props.variant === "light" &&
    css`
      background-color: #f8f9fa;
      color: #212529;
      border: 1.5px solid #f8f9fa;
      &:hover:not(:disabled),
      &:active:not(:disabled) {
        background-color: #e2e6ea;
        color: #212529;
        border: 1.5px solid #e2e6ea;
        cursor: pointer;
      }
    `}

  ${(props) =>
    props.size === "small" &&
    css`
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      height: 40px;
    `}

  ${(props) =>
    props.size === "large" &&
    css`
      padding: 1rem 1.5rem;
      font-size: 1rem;
    `}
`;
