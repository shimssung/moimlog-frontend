import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Card from "../components/Card";
import Input from "../components/Input";

const categories = ["All", "Technology", "Arts", "Sports", "Food"];

const meetups = Array.from({ length: 40 }, (_, i) => ({
  title: `Meetup ${i + 1}`,
  category: ["Technology", "Arts", "Sports", "Food"][i % 4],
  participants: 10 + i,
  isOnline: i % 2 === 0,
  img: [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  ][i % 4],
}));

const MoimListPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const loader = useRef();
  const observerRef = useRef();

  // 필터링 로직 (카테고리, 검색)
  const filteredMeetups = meetups.filter((meetup) => {
    const matchCategory =
      selectedCategory === "All" ||
      meetup.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchSearch =
      !search ||
      meetup.title.toLowerCase().includes(search.toLowerCase()) ||
      meetup.category.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Intersection Observer로 무한 스크롤 구현
  useEffect(() => {
    const currentLoader = loader.current;
    
    if (currentLoader && typeof window !== "undefined") {
      observerRef.current = new window.IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            !loading &&
            visibleCount < filteredMeetups.length
          ) {
            setLoading(true);
            setTimeout(() => {
              setVisibleCount((prev) =>
                Math.min(prev + 8, filteredMeetups.length)
              );
              setLoading(false);
            }, 800);
          }
        },
        { threshold: 0.2 }
      );
      
      observerRef.current.observe(currentLoader);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredMeetups.length, loading, visibleCount]);

  return (
    <Container>
      <Header />
      <LayoutContainer>
        <ContentContainer>
          <TopTitle>Find your next meetup</TopTitle>
          <CategoryList>
            {categories.map((cat) => (
              <CategoryItem
                key={cat}
                $active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
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
                  placeholder="Search meetups"
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
          <SectionTitle>Upcoming Meetups</SectionTitle>
          <CardList>
            {filteredMeetups.slice(0, visibleCount).map((meetup, idx) => (
              <Card
                key={idx}
                image={meetup.img}
                title={meetup.title}
                category={meetup.category}
                participants={meetup.participants}
                isOnline={meetup.isOnline}
                style={{ width: "100%", marginBottom: 16 }}
              />
            ))}
          </CardList>
          <div
            ref={loader}
            style={{
              height: 250,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading && <Spinner />}
          </div>
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
  max-width: 960px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TopTitle = styled.h2`
  color: #0d141c;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  padding: 32px 16px 12px 16px;
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
  padding: 32px 16px 12px 16px;
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 0 16px 32px 16px;
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