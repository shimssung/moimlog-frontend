import Link from 'next/link';
import { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fef2f2;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  color: #dc2626 !important;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #b91c1c !important;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Message = styled.p`
  color: #334155 !important;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  text-align: center;
  max-width: 420px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const HomeButton = styled.button`
  padding: 0.75rem 2rem;
  background: #dc2626;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(220, 38, 38, 0.25);
  transition: all 0.2s ease;
  &:hover {
    background: #b91c1c;
  }
`;

const RetryButton = styled.button`
  padding: 0.75rem 2rem;
  background: #6b7280;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(107, 114, 128, 0.25);
  transition: all 0.2s ease;
  &:hover {
    background: #4b5563;
  }
`;

export default function Custom500() {
  useEffect(() => {
    document.body.classList.add('error-page');
    return () => document.body.classList.remove('error-page');
  }, []);
  return (
    <Container>
      <Title>500</Title>
      <Subtitle>서버 오류가 발생했습니다</Subtitle>
      <Message>
        일시적인 서버 문제로 페이지를 불러올 수 없습니다.<br />
        잠시 후 다시 시도해주세요.
      </Message>
      <ButtonGroup>
        <Link href="/">
          <HomeButton>홈으로 돌아가기</HomeButton>
        </Link>
        <RetryButton onClick={() => window.location.reload()}>
          다시 시도
        </RetryButton>
      </ButtonGroup>
    </Container>
  );
} 