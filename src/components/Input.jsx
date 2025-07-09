import React from "react";

const Input = React.forwardRef(({ type = "text", className = "", ...props }, ref) => {
  const inputClasses = ["input", className].filter(Boolean).join(" ");
  return <input type={type} ref={ref} className={inputClasses} {...props} />;
});

export default Input;
