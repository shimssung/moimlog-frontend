import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">서비스 소개</h3>
          <a href="/about" className="footer-link">
            MoimLog 소개
          </a>
          <a href="/guide" className="footer-link">
            이용 가이드
          </a>
          <a href="/updates" className="footer-link">
            업데이트 소식
          </a>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">고객 지원</h3>
          <a href="/faq" className="footer-link">
            자주 묻는 질문
          </a>
          <a href="/contact" className="footer-link">
            문의하기
          </a>
          <a href="/feedback" className="footer-link">
            피드백 남기기
          </a>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">법적 고지</h3>
          <a href="/terms" className="footer-link">
            이용약관
          </a>
          <a href="/privacy" className="footer-link">
            개인정보처리방침
          </a>
          <a href="/rules" className="footer-link">
            커뮤니티 가이드라인
          </a>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">팔로우</h3>
          <a href="https://github.com" target="_blank" className="footer-link">
            GitHub
          </a>
          <a href="https://twitter.com" target="_blank" className="footer-link">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" className="footer-link">
            Instagram
          </a>
        </div>
      </div>

      <div className="copyright">
        © {new Date().getFullYear()} MoimLog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
