import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid var(--input-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  color: var(--text-primary);
  background-color: var(--input-background);
  transition: all 0.15s ease;
  width: 100%;

  &::placeholder {
    color: var(--text-tertiary);
  }

  &:focus {
    outline: none;
    border-color: var(--input-focus);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Input = React.forwardRef(({ type = "text", className = "", ...props }, ref) => {
  const inputClasses = ["input", className].filter(Boolean).join(" ");
  return <StyledInput type={type} ref={ref} className={inputClasses} {...props} />;
});

export default Input;
