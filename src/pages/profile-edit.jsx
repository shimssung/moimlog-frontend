import { useState, useEffect } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import Textarea from "../components/Textarea";
import Modal from "../components/Modal";
import { sanitizeFormData, sanitizeInput } from "../utils/sanitize";

const ProfileEdit = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    interests: [],
    profileImage: null,
    notificationSettings: {
      email: true,
      push: true,
      sms: false,
    },
  });
  const [previewImage, setPreviewImage] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile");
        const data = await response.json();
        setUserData(data);
      } catch {
        setError("프로필 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // 1. useEffect: 컴포넌트가 마운트되거나 의존성이 변경될 때 실행되는 React 훅
    if (selectedFile && typeof window !== "undefined") {
      // 2. selectedFile: 파일이 선택되었는지 확인 (null이 아닌지 체크)
      // 3. typeof window !== "undefined": Next.js SSR에서 브라우저 환경인지 확인

      const reader = new FileReader();
      // 4. FileReader 객체 생성: 파일을 읽고 Base64로 변환하는 브라우저 API

      reader.onloadend = () => {
        // 5. onloadend: 파일 읽기가 완료되면 실행될 콜백 함수를 설정(알람 설정을 미리 해두고 파일 읽기 - readAsDataURL 실행)
        setPreviewImage(reader.result);
        // 6. setPreviewImage: React 상태 업데이트 함수로 미리보기 이미지 설정
        // 7. reader.result: FileReader가 읽은 파일의 Base64 문자열 (data:image/jpeg;base64,...)
      };

      reader.readAsDataURL(selectedFile);
      // 8. readAsDataURL: 파일을 Base64 문자열로 변환하는 메서드 호출
      // 9. selectedFile: 변환할 파일 객체를 전달
    }
  }, [selectedFile]);
  // 10. [selectedFile]: 의존성 배열 - selectedFile이 변경될 때만 useEffect 실행

  // Base64로 변환하는 이유:
  // 브라우저는 파일 객체 자체를 <img>에 바로 넣을 수 없기 때문에,
  // FileReader를 사용해 파일을 Base64 문자열로 변환하여 <img src="..." />로 보여줍니다.

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        setError("JPG 또는 PNG 파일만 업로드 가능합니다.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 입력값 sanitize
    const sanitizedValue = sanitizeInput(value);
    setUserData((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleNotificationChange = (type) => {
    setUserData((prev) => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [type]: !prev.notificationSettings[type],
      },
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // 폼 데이터 sanitize
      const sanitizedData = sanitizeFormData(userData);
      const formData = new FormData();

      Object.keys(sanitizedData).forEach((key) => {
        if (key === "profileImage" && sanitizedData[key]) {
          formData.append("profileImage", sanitizedData[key]);
        } else if (key !== "profileImage") {
          formData.append(key, JSON.stringify(sanitizedData[key]));
        }
      });

      // 실제 API 호출로 대체
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        setSuccess("프로필이 성공적으로 업데이트되었습니다.");
      } else {
        throw new Error("프로필 업데이트에 실패했습니다.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 실제 API 호출로 대체
      const response = await fetch("/api/user/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
      });

      if (response.ok) {
        setSuccess("비밀번호가 성공적으로 변경되었습니다.");
        setShowPasswordModal(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        throw new Error("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="profile-edit-page">
      <Header />
      <main className="profile-edit-main">
        <div className="profile-edit-layout">
          <div className="profile-edit-main-section">
            <h1 className="profile-edit-title">프로필 수정</h1>

            {error && <div className="profile-edit-error-message">{error}</div>}
            {success && <div className="profile-edit-success-message">{success}</div>}

            <div className="profile-edit-form-section">
              <Input
                label="이메일"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
                required
              />
              <Input
                label="닉네임"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                required
              />
              <Textarea
                label="자기소개"
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                rows={4}
              />
            </div>

            <div className="profile-edit-section">
              <h2 className="profile-edit-section-title">관심사</h2>
              <div className="profile-edit-interest-tags">
                {[
                  "등산",
                  "요리",
                  "독서",
                  "여행",
                  "맛집",
                  "사진",
                  "음악",
                  "미술",
                  "영화",
                  "게임",
                ].map((interest) => (
                  <div key={interest} className="profile-edit-interest-tag">
                    {interest}
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-edit-section">
              <h2 className="profile-edit-section-title">알림 설정</h2>
              <div className="profile-edit-notification-item">
                <p className="profile-edit-notification-label">이메일 알림</p>
                <label className="profile-edit-toggle-switch">
                  <input
                    type="checkbox"
                    checked={userData.notificationSettings.email}
                    onChange={() => handleNotificationChange("email")}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>

            <div className="profile-edit-button-container">
              <Button onClick={handleSubmit} variant="primary">
                저장하기
              </Button>
            </div>
          </div>

          <div className="profile-edit-side-section">
            <div className="profile-edit-preview-container">
              <img
                className="profile-edit-image-preview"
                src={previewImage || "/default-profile.png"}
                alt="프로필 이미지"
              />
              <p className="profile-edit-preview-text">미리보기</p>
            </div>
            <button
              className="profile-edit-upload-button"
              onClick={() => {
                const fileInput = document.getElementById("profileImage");
                if (fileInput) fileInput.click();
              }}
            >
              이미지 업로드/변경
            </button>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </main>

      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="비밀번호 변경"
      >
        <form className="profile-edit-password-form" onSubmit={handlePasswordSubmit}>
          <Input
            label="현재 비밀번호"
            name="currentPassword"
            type="password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            required
          />
          <Input
            label="새 비밀번호"
            name="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            required
          />
          <Input
            label="새 비밀번호 확인"
            name="confirmPassword"
            type="password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            required
          />
          <div className="profile-edit-modal-button-group">
            <Button
              type="button"
              variant="light"
              onClick={() => setShowPasswordModal(false)}
            >
              취소
            </Button>
            <Button type="submit" variant="primary">
              변경하기
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfileEdit;
