import React from "react";
import styled from "styled-components";
import { useTheme } from "../utils/ThemeContext";

const Textarea = React.forwardRef((props, ref) => {
  const { theme } = useTheme();
  return <StyledTextarea ref={ref} theme={theme} {...props} />;
});

export default Textarea;

const StyledTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 0.5rem;
  font-size: 1rem;
  color: ${(props) => props.theme.textPrimary};
  background-color: ${(props) => props.theme.inputBackground};
  min-height: 120px;
  resize: vertical;
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
