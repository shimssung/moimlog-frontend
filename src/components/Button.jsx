import React from "react";
import styled, { css } from "styled-components";

const ButtonBase = styled.button`
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) =>
    props.variant === "primary" &&
    css`
      background-color: #3b82f6;
      color: #ffffff;

      &:hover:not(:disabled) {
        background-color: #2563eb;
      }

      &:active:not(:disabled) {
        background-color: #1d4ed8;
      }
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      background-color: #ffffff;
      color: #374151;
      border: 1px solid #d1d5db;

      &:hover:not(:disabled) {
        background-color: #f3f4f6;
      }

      &:active:not(:disabled) {
        background-color: #e5e7eb;
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

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  type = "button",
  ...props
}) => {
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
