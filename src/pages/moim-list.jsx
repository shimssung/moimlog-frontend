import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useTheme } from "../utils/ThemeContext";
import {
  mockMoims,
  filterMoimsByCategory,
  searchMoims,
} from "../utils/mockData";
import { CATEGORY_LABELS, CATEGORIES } from "../utils/constants";

const categories = ["All", ...Object.values(CATEGORIES)];

// 가장 많이 사용되는 isomorphic hook 패턴
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// 클라이언트 상태 체크 hook
const useClientOnly = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

const MoimListPage = () => {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [onlineType, setOnlineType] = useState("all"); // 온라인/오프라인 필터
  const [selectedLocation, setSelectedLocation] = useState("all"); // 지역 필터
  const [memberRange, setMemberRange] = useState({ min: 0, max: 100 }); // 인원수 범위
  const [sortBy, setSortBy] = useState("latest"); // 정렬 옵션
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false); // 고급 필터 표시 여부
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const isClient = useClientOnly();
  const loader = useRef();
  const observerRef = useRef();

  // 고급 필터링 로직
  const getFilteredMoims = () => {
    let filtered = mockMoims;

    // 카테고리 필터
    filtered = filterMoimsByCategory(
      filtered,
      selectedCategory === "All" ? null : selectedCategory
    );

    // 검색 필터
    filtered = searchMoims(filtered, search);

    // 온라인/오프라인 필터
    if (onlineType !== "all") {
      filtered = filtered.filter((moim) => moim.onlineType === onlineType);
    }

    // 지역 필터
    if (selectedLocation !== "all") {
      filtered = filtered.filter(
        (moim) =>
          moim.onlineType === "offline" &&
          moim.location &&
          moim.location.includes(selectedLocation)
      );
    }

    // 인원수 범위 필터
    filtered = filtered.filter(
      (moim) =>
        moim.maxMembers >= memberRange.min && moim.maxMembers <= memberRange.max
    );

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return b.id - a.id; // ID 기준 최신순 (실제로는 createdAt 사용)
        case "popular":
          return b.maxMembers - a.maxMembers; // 인원수 기준 인기순
        case "name":
          return a.title.localeCompare(b.title); // 이름순
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredMoims = getFilteredMoims();

  // 카테고리나 검색어가 변경될 때 visibleCount 리셋
  useEffect(() => {
    setVisibleCount(8);
  }, [
    selectedCategory,
    search,
    onlineType,
    selectedLocation,
    memberRange,
    sortBy,
  ]);

  // Intersection Observer로 무한 스크롤 구현
  useIsomorphicLayoutEffect(() => {
    if (!isClient) return;

    const currentLoader = loader.current;

    if (
      currentLoader &&
      typeof window !== "undefined" &&
      "IntersectionObserver" in window
    ) {
      observerRef.current = new IntersectionObserver(
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

  // 지역 목록 (실제로는 API에서 가져올 데이터)
  const locations = [
    "서울시 강남구",
    "서울시 마포구",
    "서울시 송파구",
    "서울시 종로구",
    "서울시 용산구",
    "서울시 강서구",
    "서울시 영등포구",
    "서울시 서초구",
    "서울시 중구",
    "서울시 노원구",
    "서울시 광진구",
    "서울시 성동구",
  ];

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Container theme={theme}>
      <Header />
      <LayoutContainer>
        <ContentContainer>
          <TopTitle theme={theme}>모임을 찾아보세요</TopTitle>

          {/* 기본 필터 */}
          <CategoryList>
            {categories.map((cat) => (
              <CategoryItem
                key={cat}
                $active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                theme={theme}
              >
                {cat === "All" ? "전체" : CATEGORY_LABELS[cat]}
              </CategoryItem>
            ))}
          </CategoryList>

          {/* 검색바 */}
          <SearchSection>
            <SearchLabel>
              <SearchInputWrapper theme={theme}>
                <SearchIcon theme={theme}>
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
                    background: "transparent",
                    borderRadius: "0 8px 8px 0",
                    height: 40,
                    fontSize: 16,
                    color: theme.textPrimary,
                  }}
                />
              </SearchInputWrapper>
            </SearchLabel>
          </SearchSection>

          {/* 고급 필터 토글 버튼 */}
          <Button
            variant="light"
            size="small"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            style={{
              width: "100%",
              marginTop: "16px",
              justifyContent: "space-between",
              padding: "12px 16px",
            }}
          >
            <span>고급 검색 옵션</span>
            <ToggleIcon $isOpen={showAdvancedFilters}>▼</ToggleIcon>
          </Button>

          {/* 고급 필터 */}
          {showAdvancedFilters && (
            <AdvancedFiltersContainer theme={theme}>
              <FilterRow>
                <FilterGroup>
                  <FilterLabel theme={theme}>모임 형태</FilterLabel>
                  <FilterSelect
                    value={onlineType}
                    onChange={(e) => setOnlineType(e.target.value)}
                    theme={theme}
                  >
                    <option value="all">전체</option>
                    <option value="online">온라인</option>
                    <option value="offline">오프라인</option>
                  </FilterSelect>
                </FilterGroup>

                <FilterGroup>
                  <FilterLabel theme={theme}>지역</FilterLabel>
                  <FilterSelect
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    theme={theme}
                  >
                    <option value="all">전체 지역</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>

                <FilterGroup>
                  <FilterLabel theme={theme}>정렬</FilterLabel>
                  <FilterSelect
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    theme={theme}
                  >
                    <option value="latest">최신순</option>
                    <option value="popular">인기순</option>
                    <option value="name">이름순</option>
                  </FilterSelect>
                </FilterGroup>
              </FilterRow>

              <FilterRow>
                <FilterGroup>
                  <FilterLabel theme={theme}>인원수 범위</FilterLabel>
                  <RangeContainer>
                    <RangeInput
                      type="number"
                      min="0"
                      max="100"
                      value={memberRange.min}
                      onChange={(e) =>
                        setMemberRange((prev) => ({
                          ...prev,
                          min: parseInt(e.target.value) || 0,
                        }))
                      }
                      placeholder="최소"
                      theme={theme}
                    />
                    <RangeSeparator theme={theme}>~</RangeSeparator>
                    <RangeInput
                      type="number"
                      min="0"
                      max="100"
                      value={memberRange.max}
                      onChange={(e) =>
                        setMemberRange((prev) => ({
                          ...prev,
                          max: parseInt(e.target.value) || 100,
                        }))
                      }
                      placeholder="최대"
                      theme={theme}
                    />
                    <RangeUnit theme={theme}>명</RangeUnit>
                  </RangeContainer>
                </FilterGroup>
              </FilterRow>
            </AdvancedFiltersContainer>
          )}

          <SectionTitle theme={theme}>
            추천 모임 ({filteredMoims.length}개)
          </SectionTitle>

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

      {/* 상단으로 이동 버튼 */}
      <Button
        variant="primary"
        size="small"
        onClick={handleScrollToTop}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          zIndex: 1000,
        }}
      >
        ↑
      </Button>
    </Container>
  );
};

export default MoimListPage;

const Container = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const LayoutContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
`;

const ContentContainer = styled.div`
  padding: 32px 0 60px 0;
`;

const TopTitle = styled.h1`
  color: ${(props) => props.theme.textPrimary};
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  padding: 32px 0 12px 0;
  text-align: left;
  transition: color 0.3s ease;
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
  background: ${(props) => props.theme.surfaceSecondary};
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.15s;
  border: 1px solid ${(props) => props.theme.borderLight};

  ${({ $active, theme }) =>
    $active &&
    `
    background: ${theme.buttonPrimary};
    color: #fff;
    border-color: ${theme.buttonPrimary};
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
  background: ${(props) => props.theme.surfaceSecondary};
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const SearchIcon = styled.div`
  color: ${(props) => props.theme.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  border-radius: 8px 0 0 8px;
  transition: color 0.3s ease;
`;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.textPrimary};
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  padding: 32px 0 12px 0;
  transition: color 0.3s ease;
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

const ToggleIcon = styled.span`
  transition: transform 0.2s;
  font-size: 12px;
  ${({ $isOpen }) =>
    $isOpen &&
    `
    transform: rotate(180deg);
  `}
`;

const AdvancedFiltersContainer = styled.div`
  padding: 20px;
  background: ${(props) => props.theme.surfaceSecondary};
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 12px;
  margin-top: 8px;
  transition: all 0.3s ease;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  color: ${(props) => props.theme.textPrimary};
  font-size: 14px;
  transition: color 0.3s ease;
`;

const FilterSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 8px;
  background: ${(props) => props.theme.surface};
  font-size: 14px;
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.buttonPrimary};
  }
`;

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RangeInput = styled.input`
  padding: 10px 12px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 8px;
  width: 80px;
  font-size: 14px;
  text-align: center;
  background: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.buttonPrimary};
  }

  &::placeholder {
    color: ${(props) => props.theme.textTertiary};
  }
`;

const RangeSeparator = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.3s ease;
`;

const RangeUnit = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.textSecondary};
  font-size: 14px;
  transition: color 0.3s ease;
`;
