import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Card from "../components/Card";
import Input from "../components/Input";
import { mockMoims, filterMoimsByCategory, searchMoims } from "../utils/mockData";
import { CATEGORY_LABELS, CATEGORIES } from "../utils/constants";

const categories = ["All", ...Object.values(CATEGORIES)];

// 가장 많이 사용되는 isomorphic hook 패턴
const useIsomorphicLayoutEffect = typeof window !== 'undefined' 
  ? useLayoutEffect 
  : useEffect;

// 클라이언트 상태 체크 hook
const useClientOnly = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
};

const MoimListPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const isClient = useClientOnly();
  const loader = useRef();
  const observerRef = useRef();

  // 필터링 로직 (카테고리, 검색)
  const filteredMoims = searchMoims(
    filterMoimsByCategory(mockMoims, selectedCategory === "All" ? null : selectedCategory),
    search
  );

  // 카테고리나 검색어가 변경될 때 visibleCount 리셋
  useEffect(() => {
    setVisibleCount(8);
  }, [selectedCategory, search]);

  // Intersection Observer로 무한 스크롤 구현
  useIsomorphicLayoutEffect(() => {
    if (!isClient) return;

    const currentLoader = loader.current;
    
    // eslint-disable-next-line no-undef
    if (currentLoader && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      // eslint-disable-next-line no-undef
      observerRef.current = new window.IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            !loading &&
            visibleCount < filteredMoims.length
          ) {
            setLoading(true);
            setTimeout(() => {
              setVisibleCount((prev) =>
                Math.min(prev + 8, filteredMoims.length)
              );
              setLoading(false);
            }, 800);
          }
        },
        { threshold: 0.1, rootMargin: "100px" }
      );
      
      observerRef.current.observe(currentLoader);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredMoims.length, loading, visibleCount, isClient]);

  return (
    <Container>
      <Header />
      <LayoutContainer>
        <ContentContainer>
          <TopTitle>모임을 찾아보세요</TopTitle>
          <CategoryList>
            {categories.map((cat) => (
              <CategoryItem
                key={cat}
                $active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "All" ? "전체" : CATEGORY_LABELS[cat]}
              </CategoryItem>
            ))}
          </CategoryList>
          <SearchSection>
            <SearchLabel>
              <SearchInputWrapper>
                <SearchIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                  </svg>
                </SearchIcon>
                <Input
                  placeholder="모임 검색"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    border: "none",
                    background: "#e7edf4",
                    borderRadius: "0 8px 8px 0",
                    height: 40,
                    fontSize: 16,
                    color: "#0d141c",
                  }}
                />
              </SearchInputWrapper>
            </SearchLabel>
          </SearchSection>
          <SectionTitle>추천 모임</SectionTitle>
          <MoimGrid>
            {filteredMoims.slice(0, visibleCount).map((moim) => (
              <CardWrapper key={moim.id}>
                <Card moim={moim} />
              </CardWrapper>
            ))}
          </MoimGrid>
          {visibleCount < filteredMoims.length && (
            <LoadingContainer ref={loader}>
              {loading && <Spinner />}
            </LoadingContainer>
          )}
        </ContentContainer>
      </LayoutContainer>
    </Container>
  );
};

export default MoimListPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
`;

const LayoutContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 0 0;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 20px;
`;

const TopTitle = styled.h2`
  color: #0d141c;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  padding: 32px 0 12px 0;
  text-align: left;
`;

const CategoryList = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0 0 0;
  flex-wrap: wrap;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 32px;
  padding: 0 16px;
  background: #e7edf4;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: #0d141c;
  transition: background 0.15s;
  ${({ $active }) =>
    $active &&
    `
    background: #0b80ee;
    color: #fff;
  `}
`;

const SearchSection = styled.div`
  padding: 16px 0 0 0;
`;

const SearchLabel = styled.label`
  display: flex;
  flex-direction: column;
  min-width: 160px;
  height: 40px;
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: stretch;
  border-radius: 8px;
  height: 100%;
  background: #e7edf4;
`;

const SearchIcon = styled.div`
  color: #49739c;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  border-radius: 8px 0 0 8px;
`;

const SectionTitle = styled.h2`
  color: #0d141c;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  padding: 32px 0 12px 0;
`;

const MoimGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 32px;
`;

const CardWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const LoadingContainer = styled.div`
  height: 250px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #b3d4fc;
  border-top: 4px solid #49749c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`; 