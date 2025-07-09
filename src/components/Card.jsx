import React from "react";
import { CATEGORY_LABELS } from "../utils/constants";

const Card = ({ moim, className = "" }) => {
  const categoryLabel = CATEGORY_LABELS[moim.category];
  const truncatedDescription =
    moim.description.length > 60
      ? moim.description.substring(0, 60) + "..."
      : moim.description;
  const displayTags = moim.tags.slice(0, 3);

  const cardClasses = ["card", className].filter(Boolean).join(" ");

  return (
    <div className={cardClasses}>
      <img 
        className="card__image" 
        src={moim.thumbnail} 
        alt={moim.title} 
      />
      <div className="card__content">
        <h3 className="card__title">{moim.title}</h3>
        <div className="card__meta">
          <span className="card__category-badge">{categoryLabel}</span>
          <span className="card__member-count">최대 {moim.maxMembers}명</span>
        </div>
        <div className="card__location">
          <span className={`card__location-badge ${moim.onlineType === 'online' ? 'card__location-badge--online' : 'card__location-badge--offline'}`}>
            {moim.onlineType === "online" ? "온라인" : "오프라인"}
          </span>
          {moim.onlineType === "offline" && moim.location && (
            <span className="card__location-text">{moim.location}</span>
          )}
        </div>
        <p className="card__description">{truncatedDescription}</p>
        <div className="card__tags">
          {displayTags.map((tag, index) => (
            <span key={index} className="card__tag">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
