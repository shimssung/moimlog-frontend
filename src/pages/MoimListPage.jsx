import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Card from "../components/Card";
import Input from "../components/Input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafc;
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
  ${({ active }) =>
    active &&
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

const MeetupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 16px 32px 16px;
`;

const MeetupRow = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;
  background: #fff;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const MeetupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 2 2 0px;
  padding: 20px 0 20px 0;
  justify-content: center;
`;

const MeetupTitle = styled.p`
  color: #0d141c;
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;

const MeetupDesc = styled.p`
  color: #49739c;
  font-size: 14px;
  margin: 0;
`;

const MeetupImage = styled.div`
  flex: 1 1 0px;
  min-width: 160px;
  max-width: 240px;
  aspect-ratio: 16/9;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
`;

const categories = ["All", "Technology", "Arts", "Sports", "Food"];

const meetups = [
  {
    title: "Tech Talk: AI in Business",
    desc: "Technology · Oct 26, 6:00 PM · 25 participants",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeaIG8qpOvtU_nWVVgN-uKivsREomBrmF67_KWuoClleBVK7Kaoyrg1_nzXfA02vfmGt3_ps21ZQVrUTAVmv1sTld5SHhzFm2ANXtlvpw-oDWXpu0tOmMVCpHvtqxpSRkzYirx04IuIlVeZsO-XRh4wHdZ0L0QA8DCil96q5RNPhl2EFY8STVGF8V5ay0bfjK3C-cC9Np-QJcC73jylS8o6mCo-H3zt6Aqi88MPKX02dBljP3RW6gg2DzB-2tm2LQUvhmVgTbT3Bc",
  },
  {
    title: "Art Workshop: Watercolor Basics",
    desc: "Arts · Nov 5, 2:00 PM · 15 participants",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPWNMJlmpE3jMuT2BRromNH2VpXeO374MKJ27ytkvDFgVxc_7k5dttSXiO9mMLpVTTVSA6zxFAsH9dxxhPxNhcyoVYuLQBv3iOjhV6pPL099FrT7CSkpu_lCFXggk1916Si2LVTWlSRei_lQn4bk3uhQWP00it2GY2FbMMWUSQk7DuA63CzezcOP-ZQepMX2JBg19VEN-8ZT9ZYv9GBfyob7w-k4rMzFROug5sl_ZAu9fN16JrPsNrfBZBEDe-f7EZRUSAiB3pNjw",
  },
  {
    title: "Sports Meetup: Weekend Hiking",
    desc: "Sports · Nov 12, 9:00 AM · 30 participants",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2nH2WjODrKh1YRt_zwthlB4B3F_vCNbpwO7BLOj2aKjcP6i83LxqDszAPAPE-Gdd42ZS9cDiW-fyKX4tjfxz-w7IbO-EwGmYEmiqQN1vh5v_ihHFY3JzWUr44j6OdvMlsUFZ23m6cbnyqwJVfetF4Eiyw1o2Fnb4G0dmyvhdGNaE2IiexyfvXly-MRG58xFIOlPgWqw82ntInUlnuSN833vkxBsXSP4vIutFornPe3fLXfLTOny7h-DzxQortySERe_7Pe24nfyE",
  },
  {
    title: "Food Lovers: Cooking Class",
    desc: "Food · Nov 19, 5:00 PM · 20 participants",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuqvmeQHQ9M_wZ_-xXYkAHTtDs6Ru-ZpDfn6L8e7NZBf_9Yt9DVr7OmJ-_-bMvhTHACK3P4xnFodleJoU2zSwmQ9mYJdpBorYioqwHtljvarT80JOD-f7x_-huncbQq3PB_0-jvamcsSPhdMx2ZwEt8OUsdScygPDenTmy06k0DbjY2RMiow1jmjNlVmipmayehgCQ7LZ3Dov4pHtaEF0Kx-tVduSkjamg2cj2qRolEmR_LOdQckF3PXiI51zaoKarh0D7TxdB_N4",
  },
];

const MoimListPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 필터링 로직 (카테고리, 검색)
  const filteredMeetups = meetups.filter((meetup) => {
    const matchCategory =
      selectedCategory === "All" ||
      meetup.desc.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchSearch =
      !search ||
      meetup.title.toLowerCase().includes(search.toLowerCase()) ||
      meetup.desc.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

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
                active={selectedCategory === cat}
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
          <MeetupList>
            {filteredMeetups.map((meetup, idx) => (
              <MeetupRow key={idx}>
                <MeetupInfo>
                  <MeetupTitle>{meetup.title}</MeetupTitle>
                  <MeetupDesc>{meetup.desc}</MeetupDesc>
                </MeetupInfo>
                <MeetupImage
                  style={{ backgroundImage: `url('${meetup.img}')` }}
                />
              </MeetupRow>
            ))}
          </MeetupList>
        </ContentContainer>
      </LayoutContainer>
    </Container>
  );
};

export default MoimListPage;
