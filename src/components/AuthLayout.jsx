import React from "react";
import Link from "next/link";

const AuthLayout = ({
  leftTitle,
  leftDesc,
  formTitle,
  children,
  footerContent,
}) => {
  return (
    <>
      <header className="auth-layout__header">
        <div className="auth-layout__header-content">
          <div className="auth-layout__logo">
            <Link href="/" passHref prefetch={true}>
              <span className="auth-layout__logo-text">MoimLog</span>
            </Link>
          </div>
        </div>
      </header>
      <div className="auth-layout__page-wrap">
        <div className="auth-layout__left-section">
          <div className="auth-layout__left-content">
            <h2 className="auth-layout__left-title">{leftTitle}</h2>
            <p className="auth-layout__left-desc">{leftDesc}</p>
          </div>
        </div>
        <div className="auth-layout__right-section">
          <div className="auth-layout__form-container">
            <h2 className="auth-layout__title">{formTitle}</h2>
            {children}
            {footerContent && <div className="auth-layout__footer">{footerContent}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
