import styled from 'styled-components';
import Link from 'next/link';
import { useEffect } from 'react';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.background || '#f8fafc'};
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  color: #3b82f6;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #0f172a;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Message = styled.p`
  color: #334155;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  text-align: center;
  max-width: 400px;
`;

const HomeButton = styled.button`
  padding: 0.75rem 2rem;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.25);
  transition: all 0.2s ease;
`;

export default function Custom404() {
  useEffect(() => {
    document.body.classList.add('error-page');
    return () => document.body.classList.remove('error-page');
  }, []);
  return (
    <Container>
      <Title>404</Title>
      <Subtitle>페이지를 찾을 수 없습니다</Subtitle>
      <Message>요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.</Message>
      <Link href="/">
        <HomeButton>홈으로 돌아가기</HomeButton>
      </Link>
    </Container>
  );
} 