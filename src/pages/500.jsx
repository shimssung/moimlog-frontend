import Link from 'next/link';
import { useEffect } from 'react';

export default function Custom500() {
  useEffect(() => {
    document.body.classList.add('error-page');
    return () => document.body.classList.remove('error-page');
  }, []);
  return (
    <div className="error-page-container">
      <h1 className="error-page-title-red">500</h1>
      <h2 className="error-page-subtitle-red">서버 오류가 발생했습니다</h2>
      <p className="error-page-message-red">
        일시적인 서버 문제로 페이지를 불러올 수 없습니다.<br />
        잠시 후 다시 시도해주세요.
      </p>
      <div className="error-page-button-group">
        <Link href="/">
          <button className="error-page-home-button-red">홈으로 돌아가기</button>
        </Link>
        <button className="error-page-retry-button" onClick={() => window.location.reload()}>
          다시 시도
        </button>
      </div>
    </div>
  );
} 