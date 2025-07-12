import React from "react";
import styled from "styled-components";
import { useTheme } from "../utils/ThemeContext";

const Input = React.forwardRef(({ type = "text", error, ...props }, ref) => {
  const { theme } = useTheme();
  return (
    <InputContainer>
      <StyledInput
        type={type}
        ref={ref}
        theme={theme}
        $error={error}
        {...props}
      />
      {error && <ErrorMessage theme={theme}>{error}</ErrorMessage>}
    </InputContainer>
  );
});

export default Input;

const InputContainer = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid
    ${(props) => (props.$error ? props.theme.error : props.theme.inputBorder)};
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
    border-color: ${(props) =>
      props.$error ? props.theme.error : props.theme.inputFocus};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$error ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"};
  }
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: left;
`;
