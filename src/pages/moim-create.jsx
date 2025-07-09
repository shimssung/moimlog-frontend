import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { CATEGORY_OPTIONS } from "../utils/constants";

const MoimCreatePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    maxMembers: "",
    description: "",
    tags: [],
    thumbnail: null,
    onlineType: "offline",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          thumbnail: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 오프라인 모임인데 지역이 입력되지 않은 경우
    if (formData.onlineType === "offline" && !formData.location.trim()) {
      toast.error("오프라인 모임의 경우 활동 지역을 입력해주세요.");
      return;
    }

    toast.success("모임이 성공적으로 생성되었습니다!");
    // TODO: API 연동
    router.push("/my-moims");
  };

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="moim-create-page">
      <Header />
      <div className="moim-create-container">
        <div className="moim-create-left-section">
          <div className="moim-create-form-container">
            <h1 className="moim-create-form-title">새로운 모임 만들기</h1>
            <p className="moim-create-form-description">
              모임의 기본 정보를 입력해주세요. 구체적인 일정은 모임 생성 후
              설정할 수 있습니다.
            </p>
            <form className="moim-create-form" onSubmit={handleSubmit}>
              <div className="moim-create-form-group">
                <label htmlFor="thumbnail" className="moim-create-label">
                  모임 이미지
                </label>
                <div className="moim-create-image-upload-row">
                  <div className="moim-create-thumb-preview">
                    {formData.thumbnail ? (
                      <img
                        className="moim-create-thumb-img"
                        src={formData.thumbnail}
                        alt="미리보기"
                      />
                    ) : (
                      <div className="moim-create-thumb-placeholder">📷</div>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <button
                      type="button"
                      className="moim-create-upload-button"
                      onClick={() =>
                        document.getElementById("thumbnail").click()
                      }
                    >
                      이미지 선택
                    </button>
                    <div className="moim-create-file-name">
                      {formData.thumbnail
                        ? "이미지 선택됨"
                        : "이미지를 선택해주세요"}
                    </div>
                  </div>
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="moim-create-file-input"
                  />
                </div>
              </div>
              <div className="moim-create-form-group">
                <label htmlFor="title" className="moim-create-label">
                  모임명 *
                </label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="모임 이름을 입력해주세요"
                  required
                />
              </div>

              <div className="moim-create-form-group">
                <label htmlFor="category" className="moim-create-label">
                  카테고리 *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="moim-create-select"
                >
                  <option value="">카테고리 선택</option>
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="moim-create-form-group">
                <label htmlFor="maxMembers" className="moim-create-label">
                  최대 인원 *
                </label>
                <Input
                  type="number"
                  id="maxMembers"
                  name="maxMembers"
                  value={formData.maxMembers}
                  onChange={handleChange}
                  min="2"
                  max="100"
                  placeholder="2-100명"
                  required
                />
              </div>

              <div className="moim-create-form-group">
                <label htmlFor="onlineType" className="moim-create-label">
                  모임 형태 *
                </label>
                <select
                  id="onlineType"
                  name="onlineType"
                  value={formData.onlineType}
                  onChange={handleChange}
                  required
                  className="moim-create-select"
                >
                  <option value="online">온라인</option>
                  <option value="offline">오프라인</option>
                </select>
              </div>

              {formData.onlineType === "offline" && (
                <div className="moim-create-form-group">
                  <label htmlFor="location" className="moim-create-label">
                    활동 지역 *
                  </label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="예: 서울시 강남구, 부산시 해운대구"
                  />
                  <p className="moim-create-help-text">
                    오프라인 모임의 경우 활동 지역을 입력해주세요.
                  </p>
                </div>
              )}

              <div className="moim-create-form-group">
                <label htmlFor="description" className="moim-create-label">
                  모임 소개 *
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="모임에 대해 설명해주세요. 어떤 활동을 하는지, 누구를 위한 모임인지 알려주세요."
                  required
                />
              </div>

              <div className="moim-create-form-group">
                <label className="moim-create-label">태그</label>
                <div className="moim-create-tag-container">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="moim-create-tag">
                      {tag}
                      <button
                        type="button"
                        className="moim-create-remove-button"
                        onClick={() => {
                          const newTags = [...formData.tags];
                          newTags.splice(index, 1);
                          setFormData((prev) => ({ ...prev, tags: newTags }));
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="moim-create-tag-input"
                    placeholder="태그 입력 후 Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const newTag = e.target.value.trim();
                        if (newTag && !formData.tags.includes(newTag)) {
                          setFormData((prev) => ({
                            ...prev,
                            tags: [...prev.tags, newTag],
                          }));
                          e.target.value = "";
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="moim-create-button-group">
                <Button type="button" variant="light" onClick={handleClick}>
                  취소
                </Button>
                <Button type="submit" variant="primary">
                  모임 만들기
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="moim-create-right-section">
          <div className="moim-create-preview-container">
            <h2 className="moim-create-preview-title">미리보기</h2>
            <div className="moim-create-preview-content">
              <div className="moim-create-preview-image-section">
                {formData.thumbnail ? (
                  <div className="moim-create-preview-image-container">
                    <img
                      className="moim-create-preview-image"
                      src={formData.thumbnail}
                      alt="모임 썸네일"
                    />
                  </div>
                ) : (
                  <div className="moim-create-preview-image-container">
                    <div className="moim-create-preview-image-placeholder">
                      이미지를 선택해주세요
                    </div>
                  </div>
                )}
              </div>
              <div className="moim-create-preview-header">
                <h3 className="moim-create-preview-name">
                  {formData.title || "모임명을 입력해주세요"}
                </h3>
                <span className="moim-create-preview-max-members">
                  {formData.maxMembers
                    ? `${formData.maxMembers}명`
                    : "인원 미정"}
                </span>
              </div>

              <div className="moim-create-preview-info">
                <div className="moim-create-info-item">
                  <span className="moim-create-info-label">카테고리</span>
                  <span className="moim-create-info-value">
                    {formData.category
                      ? CATEGORY_OPTIONS.find(
                          (opt) => opt.value === formData.category
                        )?.label
                      : "미선택"}
                  </span>
                </div>
                <div className="moim-create-info-item">
                  <span className="moim-create-info-label">모임 형태</span>
                  <span className="moim-create-info-value">
                    {formData.onlineType === "online" ? "온라인" : "오프라인"}
                  </span>
                </div>
                {formData.onlineType === "offline" && (
                  <div className="moim-create-info-item">
                    <span className="moim-create-info-label">활동 지역</span>
                    <span className="moim-create-info-value">
                      {formData.location || "미입력"}
                    </span>
                  </div>
                )}
              </div>

              <p className="moim-create-preview-description">
                {formData.description || "모임 소개를 입력해주세요."}
              </p>

              {formData.tags.length > 0 && (
                <div className="moim-create-preview-tags">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="moim-create-preview-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoimCreatePage;
