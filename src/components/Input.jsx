import React from "react";
import styled from "styled-components";
import { useTheme } from "../utils/ThemeContext";

const Input = React.forwardRef(({ type = "text", ...props }, ref) => {
  const { theme } = useTheme();
  return <StyledInput type={type} ref={ref} theme={theme} {...props} />;
});

export default Input;

const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 0.5rem;
  font-size: 1rem;
  color: ${(props) => props.theme.textPrimary};
  background-color: ${(props) => props.theme.inputBackground};
  transition: all 0.15s ease;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.textTertiary};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.inputFocus};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;
