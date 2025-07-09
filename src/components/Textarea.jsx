import React from "react";

const Textarea = React.forwardRef(({ className = "", ...props }, ref) => {
  const textareaClasses = ["textarea", className].filter(Boolean).join(" ");
  return <textarea ref={ref} className={textareaClasses} {...props} />;
});

export default Textarea;
