import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #111827;
  background-color: #ffffff;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.15s ease;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Textarea = React.forwardRef((props, ref) => (
  <StyledTextarea ref={ref} {...props} />
));

export default Textarea;
