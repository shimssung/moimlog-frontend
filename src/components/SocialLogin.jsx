import React from "react";
import Button from "./Button";

const SocialLogin = () => {
  return (
    <>
      <div className="social-login__divider">
        <span>또는</span>
      </div>
      <div className="social-login__container">
        <Button 
          variant="kakao" 
          fullWidth 
          className="social-login__button social-login__button--kakao"
        >
          <img 
            className="social-login__icon" 
            src="/kakao_icon.png" 
            alt="카카오" 
          />
          카카오로 로그인
        </Button>
        <Button 
          variant="google" 
          fullWidth 
          className="social-login__button social-login__button--google"
        >
          <img 
            className="social-login__icon" 
            src="/google_icon.png" 
            alt="구글" 
          />
          구글로 로그인
        </Button>
        <Button 
          variant="naver" 
          fullWidth 
          className="social-login__button social-login__button--naver"
        >
          <img 
            className="social-login__icon" 
            src="/naver_icon.svg" 
            alt="네이버" 
          />
          네이버로 로그인
        </Button>
      </div>
    </>
  );
};

export default SocialLogin;
