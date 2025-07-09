import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Button from "../../../components/Button";

const MoimSettingsPage = () => {
  const router = useRouter();
  const { id: moimId } = router.query;
  const [moimInfo, setMoimInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("general");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 더미 데이터
  useEffect(() => {
    if (moimId) {
      setMoimInfo({
        id: moimId,
        title: "북클럽: 시크릿 가든",
        description:
          "함께 읽고 토론하는 독서 모임입니다. 매월 한 권의 책을 선정하여 깊이 있는 독서와 의미 있는 대화를 나눕니다.",
        image: "/img4.jpg",
        category: "독서",
        maxMembers: 20,
        isPublic: true,
        allowInvite: true,
        notifications: {
          newMessage: true,
          newPost: true,
          newEvent: true,
          memberJoin: false,
        },
        role: "운영자",
      });
    }
  }, [moimId]);

  const handleSaveSettings = () => {
    // 설정 저장 로직
    toast.success("설정이 저장되었습니다!");
  };

  const handleDeleteMoim = () => {
    // 모임 삭제 로직
    toast.success("모임이 삭제되었습니다!");
    router.push("/my-moims");
  };

  return (
    <div className="moim-settings-page-container">
      <Header />
      <div className="moim-settings-content-container">
        <Sidebar
          moimId={moimId}
          moimRole={moimInfo?.role}
          activeMenu="settings"
        />

        <div className="moim-settings-main-content">
        <div className="moim-settings-page-header">
          <div className="moim-settings-header-info">
            <h1 className="moim-settings-page-title">모임 설정</h1>
            <p className="moim-settings-page-subtitle">
              {moimInfo?.title}의 설정을 관리하세요
            </p>
          </div>
        </div>

        <div className="moim-settings-container">
          <div className="moim-settings-tabs">
            <button
              className={`moim-settings-tab ${activeTab === "general" ? "active" : ""}`}
              onClick={() => setActiveTab("general")}
            >
              일반 설정
            </button>
            <button
              className={`moim-settings-tab ${activeTab === "notifications" ? "active" : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              알림 설정
            </button>
            <button
              className={`moim-settings-tab ${activeTab === "privacy" ? "active" : ""}`}
              onClick={() => setActiveTab("privacy")}
            >
              개인정보
            </button>
            <button
              className={`moim-settings-tab ${activeTab === "danger" ? "active" : ""}`}
              onClick={() => setActiveTab("danger")}
            >
              위험 영역
            </button>
          </div>

          <div className="moim-settings-content">
            {activeTab === "general" && (
              <div className="moim-settings-general-settings">
                <h2 className="moim-settings-section-title">모임 정보</h2>
                <div className="moim-settings-form-group">
                  <label className="moim-settings-label">모임명</label>
                  <input
                    type="text"
                    className="moim-settings-input"
                    defaultValue={moimInfo?.title}
                    placeholder="모임명을 입력하세요"
                  />
                </div>
                <div className="moim-settings-form-group">
                  <label className="moim-settings-label">모임 설명</label>
                  <textarea
                    className="moim-settings-textarea"
                    defaultValue={moimInfo?.description}
                    placeholder="모임에 대한 설명을 입력하세요"
                    rows="4"
                  />
                </div>
                <div className="moim-settings-form-group">
                  <label className="moim-settings-label">카테고리</label>
                  <select className="moim-settings-select" defaultValue={moimInfo?.category}>
                    <option value="독서">독서</option>
                    <option value="개발">개발</option>
                    <option value="요리">요리</option>
                    <option value="스포츠">스포츠</option>
                    <option value="예술">예술</option>
                    <option value="음악">음악</option>
                    <option value="운동">운동</option>
                  </select>
                </div>
                <div className="moim-settings-form-group">
                  <label className="moim-settings-label">최대 멤버 수</label>
                  <input
                    type="number"
                    className="moim-settings-input"
                    min="2"
                    max="100"
                    defaultValue={moimInfo?.maxMembers}
                  />
                </div>
                <button className="moim-settings-save-button" onClick={handleSaveSettings}>
                  설정 저장
                </button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="moim-settings-notification-settings">
                <h2 className="moim-settings-section-title">알림 설정</h2>
                <div className="moim-settings-notification-item">
                  <div className="moim-settings-notification-info">
                    <div className="moim-settings-notification-label">
                      새 메시지 알림
                    </div>
                    <div className="moim-settings-notification-desc">
                      채팅에 새 메시지가 올 때 알림을 받습니다
                    </div>
                  </div>
                  <label className="moim-settings-toggle-switch">
                    <input
                      type="checkbox"
                      defaultChecked={moimInfo?.notifications?.newMessage}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="moim-settings-notification-item">
                  <div className="moim-settings-notification-info">
                    <div className="moim-settings-notification-label">
                      새 게시글 알림
                    </div>
                    <div className="moim-settings-notification-desc">
                      게시판에 새 글이 올 때 알림을 받습니다
                    </div>
                  </div>
                  <label className="moim-settings-toggle-switch">
                    <input
                      type="checkbox"
                      defaultChecked={moimInfo?.notifications?.newPost}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="moim-settings-notification-item">
                  <div className="moim-settings-notification-info">
                    <div className="moim-settings-notification-label">
                      새 일정 알림
                    </div>
                    <div className="moim-settings-notification-desc">
                      새로운 일정이 생성될 때 알림을 받습니다
                    </div>
                  </div>
                  <label className="moim-settings-toggle-switch">
                    <input
                      type="checkbox"
                      defaultChecked={moimInfo?.notifications?.newEvent}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="moim-settings-notification-item">
                  <div className="moim-settings-notification-info">
                    <div className="moim-settings-notification-label">
                      멤버 가입 알림
                    </div>
                    <div className="moim-settings-notification-desc">
                      새로운 멤버가 가입할 때 알림을 받습니다
                    </div>
                  </div>
                  <label className="moim-settings-toggle-switch">
                    <input
                      type="checkbox"
                      defaultChecked={moimInfo?.notifications?.memberJoin}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <button className="moim-settings-save-button" onClick={handleSaveSettings}>
                  알림 설정 저장
                </button>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="moim-settings-privacy-settings">
                <h2 className="moim-settings-section-title">개인정보 설정</h2>
                <div className="moim-settings-privacy-item">
                  <div className="moim-settings-privacy-info">
                    <div className="moim-settings-privacy-label">공개 모임</div>
                    <div className="moim-settings-privacy-desc">
                      모임이 검색 결과에 표시됩니다
                    </div>
                  </div>
                  <label className="moim-settings-toggle-switch">
                    <input type="checkbox" defaultChecked={moimInfo?.isPublic} />
                    <span className="slider"></span>
                  </label>
                </div>
                <button className="moim-settings-save-button" onClick={handleSaveSettings}>
                  개인정보 설정 저장
                </button>
              </div>
            )}

            {activeTab === "danger" && (
              <div className="moim-settings-danger-settings">
                <h2 className="moim-settings-section-title">위험 영역</h2>
                <div className="moim-settings-danger-item">
                  <div className="moim-settings-danger-info">
                    <div className="moim-settings-danger-label">모임 삭제</div>
                    <div className="moim-settings-danger-desc">
                      모임을 영구적으로 삭제합니다. 이 작업은 되돌릴 수
                      없습니다.
                    </div>
                  </div>
                  <button
                    className="moim-settings-delete-button"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    모임 삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {showDeleteModal && (
          <div className="moim-settings-modal-overlay" onClick={() => setShowDeleteModal(false)}>
            <div className="moim-settings-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="moim-settings-modal-header">
                <h2 className="moim-settings-modal-title">모임 삭제 확인</h2>
                <button
                  className="moim-settings-close-button"
                  onClick={() => setShowDeleteModal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="moim-settings-modal-body">
                <p className="moim-settings-modal-text">
                  정말로 "{moimInfo?.title}" 모임을 삭제하시겠습니까?
                  <br />이 작업은 되돌릴 수 없으며, 모든 데이터가 영구적으로
                  삭제됩니다.
                </p>
              </div>
              <div className="moim-settings-modal-footer">
                <Button
                  variant="light"
                  onClick={() => setShowDeleteModal(false)}
                >
                  취소
                </Button>
                <Button variant="danger" onClick={handleDeleteMoim}>
                  모임 삭제
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default MoimSettingsPage;
