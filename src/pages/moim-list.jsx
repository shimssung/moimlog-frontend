import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
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
    <div className="moim-list-container">
      <Header />
      <div className="moim-list-layout">
        <div className="moim-list-content">
          <h1 className="moim-list-title">모임을 찾아보세요</h1>

          {/* 기본 필터 */}
          <div className="category-list">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "All" ? "전체" : CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* 검색바 */}
          <div className="search-section">
            <div className="search-input-wrapper">
              <span className="search-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </span>
              <Input
                type="text"
                placeholder="모임명, 키워드로 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* 고급 필터 토글 */}
          <div className="advanced-filter-toggle">
            <button
              className="filter-toggle-button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <span>고급 필터</span>
              <span className={`toggle-icon ${showAdvancedFilters ? 'open' : ''}`}>
                ▼
              </span>
            </button>
          </div>

          {/* 고급 필터 */}
          {showAdvancedFilters && (
            <div className="advanced-filters">
              <div className="filter-group">
                <label className="filter-label">모임 유형</label>
                <div className="filter-options">
                  <button
                    className={`filter-option ${onlineType === 'all' ? 'active' : ''}`}
                    onClick={() => setOnlineType('all')}
                  >
                    전체
                  </button>
                  <button
                    className={`filter-option ${onlineType === 'online' ? 'active' : ''}`}
                    onClick={() => setOnlineType('online')}
                  >
                    온라인
                  </button>
                  <button
                    className={`filter-option ${onlineType === 'offline' ? 'active' : ''}`}
                    onClick={() => setOnlineType('offline')}
                  >
                    오프라인
                  </button>
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">지역</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">전체 지역</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">정렬</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="latest">최신순</option>
                  <option value="popular">인기순</option>
                  <option value="name">이름순</option>
                </select>
              </div>
            </div>
          )}

          {/* 결과 카운트 */}
          <div className="result-count">
            총 {filteredMoims.length}개의 모임을 찾았습니다
          </div>

          {/* 모임 그리드 */}
          <div className="moim-grid">
            {filteredMoims.slice(0, visibleCount).map((moim) => (
              <Card key={moim.id} moim={moim} />
            ))}
          </div>

          {/* 로딩 인디케이터 */}
          {loading && (
            <div className="loading-indicator">
              <div className="loading-spinner"></div>
              <span>모임을 불러오는 중...</span>
            </div>
          )}

          {/* 무한 스크롤 로더 */}
          {visibleCount < filteredMoims.length && (
            <div ref={loader} className="scroll-loader" />
          )}

          {/* 결과가 없을 때 */}
          {filteredMoims.length === 0 && (
            <div className="empty-results">
              <div className="empty-icon">🔍</div>
              <h3 className="empty-title">검색 결과가 없습니다</h3>
              <p className="empty-text">
                다른 검색어나 필터를 시도해보세요
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 상단으로 이동 버튼 */}
      <button
        className="scroll-to-top-button"
        onClick={handleScrollToTop}
        aria-label="상단으로 이동"
      >
        ↑
      </button>
    </div>
  );
};

export default MoimListPage;
