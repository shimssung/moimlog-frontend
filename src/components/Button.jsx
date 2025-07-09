import React from "react";
import Link from "next/link";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  type = "button",
  href,
  className = "",
  ...props
}) => {
  // CSS 클래스로 variant와 size 스타일 적용
  const variantClasses = {
    primary: "button--primary",
    secondary: "button--secondary", 
    light: "button--light",
    kakao: "button--kakao",
    google: "button--google",
    naver: "button--naver"
  };

  const sizeClasses = {
    small: "button--small",
    medium: "button--medium",
    large: "button--large"
  };

  const buttonClasses = [
    "button",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "button--full-width",
    className
  ].filter(Boolean).join(" ");

  if (href) {
    // Next.js의 Link로 감싸서 SPA 라우팅 지원
    return (
      <Link href={href} passHref>
        <button
          className={buttonClasses}
          {...props}
        >
          {children}
        </button>
      </Link>
    );
  }
  
  // 일반 버튼
  return (
    <button
      type={type}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
