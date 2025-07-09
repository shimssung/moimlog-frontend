import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import toast from "react-hot-toast";

const SETTINGS_SECTIONS = [
  { key: "profile", label: "프로필 설정", icon: "👤" },
  { key: "account", label: "계정 설정", icon: "🔐" },
  { key: "notifications", label: "알림 설정", icon: "🔔" },
  { key: "privacy", label: "개인정보", icon: "🔒" },
  { key: "danger", label: "위험 영역", icon: "⚠️" },
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [formData, setFormData] = useState({
    name: "테스트 사용자",
    email: "user@example.com",
    bio: "안녕하세요! 모임을 통해 새로운 경험을 만들어가고 있습니다.",
    profileImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYhudJVFm4j1jvaC3VWtkGNFmVFgvExkuGOiCq6wb6n7E4J9xxEqElvphiAZC0gj5eBA_7iZgjBRvQo-9Gxw8JoY_kWlISZJ50bITlmXdYj57pGxsbk6KKMfELeMhLrns-rtFui-xzTQShRZX3NVMfl7dfHr6tUYvsvy_alUFaMe6a3euW23fOmmrjFpi3shfKFXu-nkXQNxR7dsB2s_X6eCXyewLkF_HPECgXPDn2yaaxF-BZRZzDxExVJeWp_v0pylmwt9R_2g",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notificationEmail: true,
    notificationPush: true,
    notificationSchedule: true,
    notificationComment: true,
    profileVisibility: "public",
    emailVisibility: "private",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      // 파일 타입 체크
      if (!file.type.startsWith("image/")) {
        toast.error("이미지 파일만 업로드 가능합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          profileImage: event.target.result,
        }));
        toast.success("프로필 이미지가 업로드되었습니다.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("설정이 저장되었습니다!");
  };

  const renderProfileSection = () => (
    <div className="section-content">
      <h2 className="section-title">프로필 설정</h2>
      <p className="section-description">
        프로필 정보를 수정하여 다른 사용자들에게 보여질 정보를 관리하세요.
      </p>

      <div className="profile-image-section">
        <div className="profile-image-container">
          <img
            className="profile-image"
            src={formData.profileImage}
            alt="프로필 이미지"
          />
          <div className="image-overlay">
            <label htmlFor="profileImageUpload" className="image-upload-label">
              <CameraIcon />
              <span>이미지 변경</span>
            </label>
          </div>
        </div>
        <input
          type="file"
          id="profileImageUpload"
          accept="image/*"
          onChange={handleImageUpload}
          className="image-upload-input"
        />
        <p className="image-help-text">
          JPG, PNG, GIF 파일만 업로드 가능합니다. (최대 5MB)
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="name" className="form-label">
          이름
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          이메일
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="bio" className="form-label">
          자기소개
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          className="form-textarea"
        />
      </div>

      <Button variant="primary" onClick={handleSubmit}>
        프로필 저장
      </Button>
    </div>
  );

  const renderAccountSection = () => (
    <div className="section-content">
      <h2 className="section-title">계정 설정</h2>
      <p className="section-description">
        계정 보안을 위해 비밀번호를 변경하세요.
      </p>

      <div className="form-group">
        <label htmlFor="currentPassword" className="form-label">
          현재 비밀번호
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="newPassword" className="form-label">
          새 비밀번호
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">
          새 비밀번호 확인
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <Button variant="primary" onClick={handleSubmit}>
        비밀번호 변경
      </Button>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="section-content">
      <h2 className="section-title">알림 설정</h2>
      <p className="section-description">
        받고 싶은 알림 유형을 선택하세요.
      </p>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="notificationEmail"
            checked={formData.notificationEmail}
            onChange={handleChange}
            className="checkbox-input"
          />
          <span className="checkbox-text">이메일 알림</span>
        </label>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="notificationPush"
            checked={formData.notificationPush}
            onChange={handleChange}
            className="checkbox-input"
          />
          <span className="checkbox-text">푸시 알림</span>
        </label>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="notificationSchedule"
            checked={formData.notificationSchedule}
            onChange={handleChange}
            className="checkbox-input"
          />
          <span className="checkbox-text">일정 알림</span>
        </label>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="notificationComment"
            checked={formData.notificationComment}
            onChange={handleChange}
            className="checkbox-input"
          />
          <span className="checkbox-text">댓글 알림</span>
        </label>
      </div>

      <Button variant="primary" onClick={handleSubmit}>
        알림 설정 저장
      </Button>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="section-content">
      <h2 className="section-title">개인정보</h2>
      <p className="section-description">
        개인정보 보호를 위한 설정을 관리하세요.
      </p>

      <div className="form-group">
        <label htmlFor="profileVisibility" className="form-label">
          프로필 공개 설정
        </label>
        <select
          id="profileVisibility"
          name="profileVisibility"
          value={formData.profileVisibility}
          onChange={handleChange}
          className="form-select"
        >
          <option value="public">공개</option>
          <option value="private">비공개</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="emailVisibility" className="form-label">
          이메일 공개 설정
        </label>
        <select
          id="emailVisibility"
          name="emailVisibility"
          value={formData.emailVisibility}
          onChange={handleChange}
          className="form-select"
        >
          <option value="public">공개</option>
          <option value="private">비공개</option>
        </select>
      </div>

      <Button variant="primary" onClick={handleSubmit}>
        개인정보 설정 저장
      </Button>
    </div>
  );

  const renderDangerSection = () => (
    <div className="section-content">
      <h2 className="section-title">위험 영역</h2>
      <p className="section-description">
        계정 삭제는 되돌릴 수 없습니다. 신중하게 결정하세요.
      </p>

      <Button variant="danger" onClick={() => toast.error("계정 삭제 기능은 준비 중입니다.")}>
        계정 삭제
      </Button>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "account":
        return renderAccountSection();
      case "notifications":
        return renderNotificationsSection();
      case "privacy":
        return renderPrivacySection();
      case "danger":
        return renderDangerSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <>
      <Header />
      <div className="settings-container">
        <div className="settings-sidebar">
          <h1 className="settings-title">설정</h1>
          <nav className="settings-nav">
            {SETTINGS_SECTIONS.map((section) => (
              <button
                key={section.key}
                className={`settings-nav-item ${activeSection === section.key ? 'active' : ''}`}
                onClick={() => setActiveSection(section.key)}
              >
                <span className="settings-nav-icon">{section.icon}</span>
                <span className="settings-nav-label">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="settings-content">
          {renderSection()}
        </div>
      </div>
    </>
  );
};

const CameraIcon = () => (
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
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

export default Settings;
