import React from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { useStore } from "../stores/useStore";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  type = "button",
  href,
  ...props
}) => {
  const { theme } = useStore();

  if (href) {
    // Next.js의 Link로 감싸서 SPA 라우팅 지원
    return (
      <Link href={href} passHref>
        <ButtonBase
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          theme={theme}
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
      theme={theme}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;

// withConfig로 DOM 속성으로 전달되지 않을 props 필터링
// shouldForwardProp: fullWidth와 theme은 DOM 속성으로 추가되지 않지만, CSS props로는 여전히 사용 가능
const ButtonBase = styled.button.withConfig({
  shouldForwardProp: (prop) => !["fullWidth", "theme"].includes(prop),
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
      background-color: ${props.theme.buttonPrimary};
      color: #fff;
      border: none;
      &:hover:not(:disabled),
      &:active:not(:disabled) {
        background-color: ${props.theme.buttonHover};
        color: #fff;
        border: none;
        cursor: pointer;
      }
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      background-color: ${props.theme.surfaceSecondary};
      color: ${props.theme.textPrimary};
      border: 1px solid ${props.theme.border};
      &:hover:not(:disabled),
      &:active:not(:disabled) {
        background-color: ${props.theme.borderLight};
        color: ${props.theme.textPrimary};
        border: 1px solid ${props.theme.border};
        cursor: pointer;
      }
    `}

  ${(props) =>
    props.variant === "light" &&
    css`
      background-color: ${props.theme.buttonSecondary};
      color: ${props.theme.textSecondary};
      border: 1px solid ${props.theme.border};
      &:hover:not(:disabled),
      &:active:not(:disabled) {
        background-color: ${props.theme.borderLight};
        color: ${props.theme.textPrimary};
        border: 1px solid ${props.theme.border};
        cursor: pointer;
      }
    `}

  ${(props) =>
    props.variant === "warning" &&
    css`
      background-color: #fef3c7;
      color: #f59e0b;
      border: 1px solid #fbbf24;
      &:hover:not(:disabled),
      &:active:not(:disabled) {
        background-color: #fde68a;
        color: #d97706;
        border: 1px solid #f59e0b;
        cursor: pointer;
      }
    `}

  ${(props) =>
    props.variant === "danger" &&
    css`
      background-color: #fee2e2;
      color: #dc2626;
      border: 1px solid #f87171;
      &:hover:not(:disabled),
      &:active:not(:disabled) {
        background-color: #fecaca;
        color: #b91c1c;
        border: 1px solid #ef4444;
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
