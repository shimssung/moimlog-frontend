import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useState } from "react";
import MoimDetailModal from "../components/MoimDetailModal";
import Card from "../components/Card";
import { mockMoims } from "../utils/mockData";

const MoimMainPage = () => {
  const [selectedMoim, setSelectedMoim] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 추천 모임 (처음 8개만 표시)
  const recommendedMoims = mockMoims.slice(0, 8);

  const handleCardClick = (moim) => {
    setSelectedMoim(moim);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMoim(null);
  };

  return (
    <div className="moim-main-page">
      <Header />
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">함께 성장하는 모임 플랫폼</h1>
              <h1 className="hero-title">MoimLog</h1>
              <p className="hero-subtitle">
                지금 바로 관심 있는 모임을 찾아보세요!
              </p>
              <div className="button-group">
                <Button href="/moim-list" variant="secondary">
                  모임 둘러보기
                </Button>
                <Button href="/moim-create" variant="primary">
                  모임 만들기
                </Button>
              </div>
            </div>
            <div className="hero-image">
              <img src="/img9.jpg" alt="모임 이미지" />
            </div>
          </div>
        </section>
        <section className="content-section">
          <div className="section-content">
            <div className="section-header">
              <h2 className="section-title">추천 모임</h2>
            </div>
            <div className="moim-grid">
              {recommendedMoims.map((moim) => (
                <div
                  key={moim.id}
                  className="card-wrapper"
                  onClick={() => handleCardClick(moim)}
                >
                  <Card moim={moim} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MoimDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        moim={selectedMoim}
      />
    </div>
  );
};

export default MoimMainPage;
