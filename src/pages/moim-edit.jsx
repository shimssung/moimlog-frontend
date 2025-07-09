import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { CATEGORY_OPTIONS } from "../utils/constants";

const MoimEdit = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "독서 모임",
    category: "독서",
    maxMembers: "10",
    description: "매주 새로운 책을 읽고 토론하는 모임입니다.",
    tags: ["독서", "토론", "학습"],
    thumbnail: null,
    onlineType: "offline",
    location: "서울시 강남구",
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

    toast.success("모임 정보가 성공적으로 수정되었습니다!");
    router.push("/my-moims");
  };

  const handleCancel = () => {
    router.push("/my-moims");
  };

  return (
    <div className="moim-edit-page">
      <Header />
      <div className="moim-edit-container">
        <div className="moim-edit-left-section">
          <div className="moim-edit-form-container">
            <h1 className="moim-edit-form-title">모임 정보 수정</h1>
            <p className="moim-edit-form-description">
              모임의 기본 정보를 수정할 수 있습니다. 구체적인 일정은 모임
              설정에서 변경할 수 있습니다.
            </p>
            <form className="moim-edit-form" onSubmit={handleSubmit}>
              <div className="moim-edit-form-group">
                <label htmlFor="thumbnail" className="moim-edit-label">
                  모임 이미지
                </label>
                <div className="moim-edit-image-upload-row">
                  <div className="moim-edit-thumb-preview">
                    {formData.thumbnail ? (
                      <img
                        className="moim-edit-thumb-img"
                        src={formData.thumbnail}
                        alt="미리보기"
                      />
                    ) : (
                      <div className="moim-edit-thumb-placeholder">📷</div>
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
                      className="moim-edit-upload-button"
                      onClick={() =>
                        document.getElementById("thumbnail").click()
                      }
                    >
                      이미지 선택
                    </button>
                    <div className="moim-edit-file-name">
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
                    className="moim-edit-file-input"
                  />
                </div>
              </div>

              <div className="moim-edit-form-group">
                <label htmlFor="title" className="moim-edit-label">
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

              <div className="moim-edit-form-group">
                <label htmlFor="category" className="moim-edit-label">
                  카테고리 *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="moim-edit-select"
                >
                  <option value="">카테고리 선택</option>
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="moim-edit-form-group">
                <label htmlFor="maxMembers" className="moim-edit-label">
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

              <div className="moim-edit-form-group">
                <label htmlFor="onlineType" className="moim-edit-label">
                  모임 형태 *
                </label>
                <select
                  id="onlineType"
                  name="onlineType"
                  value={formData.onlineType}
                  onChange={handleChange}
                  required
                  className="moim-edit-select"
                >
                  <option value="online">온라인</option>
                  <option value="offline">오프라인</option>
                </select>
              </div>

              {formData.onlineType === "offline" && (
                <div className="moim-edit-form-group">
                  <label htmlFor="location" className="moim-edit-label">
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
                  <p className="moim-edit-help-text">
                    오프라인 모임의 경우 활동 지역을 입력해주세요.
                  </p>
                </div>
              )}

              <div className="moim-edit-form-group">
                <label htmlFor="description" className="moim-edit-label">
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

              <div className="moim-edit-form-group">
                <label className="moim-edit-label">태그</label>
                <div className="moim-edit-tag-container">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="moim-edit-tag">
                      {tag}
                      <button
                        type="button"
                        className="moim-edit-remove-button"
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
                    className="moim-edit-tag-input"
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

              <div className="moim-edit-button-group">
                <Button type="button" variant="light" onClick={handleCancel}>
                  취소
                </Button>
                <Button type="submit" variant="primary">
                  수정 완료
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="moim-edit-right-section">
          <div className="moim-edit-preview-container">
            <h2 className="moim-edit-preview-title">미리보기</h2>
            <div className="moim-edit-preview-content">
              <div className="moim-edit-preview-image-section">
                {formData.thumbnail ? (
                  <div className="moim-edit-preview-image-container">
                    <img
                      className="moim-edit-preview-image"
                      src={formData.thumbnail}
                      alt="모임 썸네일"
                    />
                  </div>
                ) : (
                  <div className="moim-edit-preview-image-container">
                    <div className="moim-edit-preview-image-placeholder">
                      이미지를 선택해주세요
                    </div>
                  </div>
                )}
              </div>
              <div className="moim-edit-preview-header">
                <h3 className="moim-edit-preview-name">
                  {formData.title || "모임명을 입력해주세요"}
                </h3>
                <span className="moim-edit-preview-max-members">
                  {formData.maxMembers
                    ? `${formData.maxMembers}명`
                    : "인원 미정"}
                </span>
              </div>

              <div className="moim-edit-preview-info">
                <div className="moim-edit-info-item">
                  <span className="moim-edit-info-label">카테고리</span>
                  <span className="moim-edit-info-value">
                    {formData.category
                      ? CATEGORY_OPTIONS.find(
                          (opt) => opt.value === formData.category
                        )?.label
                      : "미선택"}
                  </span>
                </div>
                <div className="moim-edit-info-item">
                  <span className="moim-edit-info-label">모임 형태</span>
                  <span className="moim-edit-info-value">
                    {formData.onlineType === "online" ? "온라인" : "오프라인"}
                  </span>
                </div>
                {formData.onlineType === "offline" && (
                  <div className="moim-edit-info-item">
                    <span className="moim-edit-info-label">활동 지역</span>
                    <span className="moim-edit-info-value">
                      {formData.location || "미입력"}
                    </span>
                  </div>
                )}
              </div>

              <p className="moim-edit-preview-description">
                {formData.description || "모임 소개를 입력해주세요."}
              </p>

              {formData.tags.length > 0 && (
                <div className="moim-edit-preview-tags">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="moim-edit-preview-tag">
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

export default MoimEdit;
