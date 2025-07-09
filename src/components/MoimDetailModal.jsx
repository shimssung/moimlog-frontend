import React from "react";
import Button from "./Button";

const MoimDetailModal = ({ isOpen, onClose, moim }) => {

  if (!isOpen || !moim) return null;

  return (
    <div className="moim-detail-modal__overlay" onClick={onClose}>
      <div className="moim-detail-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="moim-detail-modal__header">
          <div className="moim-detail-modal__title-group">
            <h1 className="moim-detail-modal__title">{moim.title}</h1>
            <span className={`moim-detail-modal__online-status ${moim.onlineType === 'online' ? 'moim-detail-modal__online-status--online' : 'moim-detail-modal__online-status--offline'}`}>
              {moim.onlineType === "online" ? "온라인" : "오프라인"}
            </span>
          </div>
          <span className="moim-detail-modal__member-count">최대 {moim.maxMembers}명</span>
          <button className="moim-detail-modal__close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="moim-detail-modal__body">
          <div className="moim-detail-modal__creator-section">
            <div className="moim-detail-modal__creator-info">
              <img 
                className="moim-detail-modal__creator-image" 
                src={moim.creatorImage} 
                alt={moim.creatorName} 
              />
              <div className="moim-detail-modal__creator-details">
                <span className="moim-detail-modal__creator-name">{moim.creatorName}</span>
                <span className="moim-detail-modal__creator-date">{moim.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="moim-detail-modal__info-section">
            <div className="moim-detail-modal__info-row">
              <span className="moim-detail-modal__info-label">카테고리</span>
              <span className="moim-detail-modal__info-value">{moim.category}</span>
            </div>
            <div className="moim-detail-modal__info-row">
              <span className="moim-detail-modal__info-label">위치</span>
              <span className="moim-detail-modal__info-value">
                {moim.onlineType === "online" ? "온라인" : moim.location}
              </span>
            </div>
            <div className="moim-detail-modal__info-row">
              <span className="moim-detail-modal__info-label">참여자</span>
              <div className="moim-detail-modal__attendee-badges">
                {moim.attendees && moim.attendees.slice(0, 3).map((attendee, index) => (
                  <img
                    key={attendee.id}
                    className="moim-detail-modal__attendee-img"
                    src={attendee.image}
                    alt={attendee.name}
                    style={{ left: `${index * 20}px` }}
                  />
                ))}
                {moim.attendees && moim.attendees.length > 3 && (
                  <span className="moim-detail-modal__attendee-count">
                    +{moim.attendees.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="moim-detail-modal__description-section">
            <h3 className="moim-detail-modal__description-title">모임 소개</h3>
            <p className="moim-detail-modal__description-text">{moim.description}</p>
          </div>

          <div className="moim-detail-modal__tags-section">
            <h3 className="moim-detail-modal__tags-title">태그</h3>
            <div className="moim-detail-modal__tags-container">
              {moim.tags && moim.tags.map((tag, index) => (
                <span key={index} className="moim-detail-modal__tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="moim-detail-modal__footer">
          <Button variant="light" onClick={onClose}>
            닫기
          </Button>
          <Button variant="primary">참여하기</Button>
        </div>
      </div>
    </div>
  );
};

export default MoimDetailModal;
