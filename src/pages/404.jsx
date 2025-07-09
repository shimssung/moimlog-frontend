import Link from 'next/link';
import { useEffect } from 'react';

export default function Custom404() {
  useEffect(() => {
    document.body.classList.add('error-page');
    return () => document.body.classList.remove('error-page');
  }, []);
  return (
    <div className="error-page-container">
      <h1 className="error-page-title">404</h1>
      <h2 className="error-page-subtitle">페이지를 찾을 수 없습니다</h2>
      <p className="error-page-message">요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.</p>
      <Link href="/">
        <button className="error-page-home-button">홈으로 돌아가기</button>
      </Link>
    </div>
  );
} 