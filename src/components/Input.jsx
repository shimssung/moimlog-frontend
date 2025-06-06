import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #111827;
  background-color: #ffffff;
  transition: border-color 0.15s ease;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Input = React.forwardRef(({ type = "text", ...props }, ref) => (
  <StyledInput type={type} ref={ref} {...props} />
));

export default Input;
