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
      background-color: #111827;
      color: #fff;
      border: 1.5px solid #111827;
      &:hover:not(:disabled),
      &:active:not(:disabled) {
        background-color: #111827;
        color: #fff;
        border: 1.5px solid #111827;
        cursor: pointer;
      }
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      background-color: #fff;
      color: #111827;
      border: 1.5px solid #111827;
      &:hover:not(:disabled),
      &:active:not(:disabled) {
        background-color: #fff;
        color: #111827;
        border: 1.5px solid #111827;
        cursor: pointer;
      }
    `}

  ${(props) =>
    props.size === "small" &&
    css`
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
    `}

  ${(props) =>
    props.size === "large" &&
    css`
      padding: 1rem 1.5rem;
      font-size: 1rem;
    `}
`;
