import axios from "./axios";

// 모임 관련 API 함수들
export const moimAPI = {
  // 모임 생성
  createMoim: async (moimData) => {
    try {
      const response = await axios.post("/moims", moimData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 모임 수정
  updateMoim: async (moimId, moimData) => {
    try {
      const response = await axios.put(`/moims/${moimId}`, moimData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 모임 삭제
  deleteMoim: async (moimId) => {
    try {
      const response = await axios.delete(`/moims/${moimId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 모임 상세 조회
  getMoimDetail: async (moimId) => {
    try {
      const response = await axios.get(`/moims/${moimId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 내가 생성한 모임 목록
  getMyCreatedMoims: async () => {
    try {
      const response = await axios.get("/moims/my-created");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 내가 참여한 모임 목록
  getMyJoinedMoims: async () => {
    try {
      const response = await axios.get("/moims/my-joined");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 모임 검색 (카테고리, 키워드 등)
  searchMoims: async (searchParams) => {
    try {
      const response = await axios.get("/moims/search", {
        params: searchParams,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 모임 참여
  joinMoim: async (moimId) => {
    try {
      const response = await axios.post(`/moims/${moimId}/join`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 모임 탈퇴
  leaveMoim: async (moimId) => {
    try {
      const response = await axios.delete(`/moims/${moimId}/join`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 모임 카테고리 목록
  getMoimCategories: async () => {
    try {
      const response = await axios.get("/moims/categories");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 모임 목록 조회 (페이지네이션, 필터링 지원)
  getMoimList: async (params = {}) => {
    try {
      const response = await axios.get("/moims", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 인기 모임 목록
  getPopularMoims: async (limit = 6) => {
    try {
      const response = await axios.get("/moims/popular", { params: { limit } });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 최신 모임 목록
  getLatestMoims: async (limit = 6) => {
    try {
      const response = await axios.get("/moims/latest", { params: { limit } });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 모임 상세 정보 조회 (1단계)
  getMoimDetail: async (moimId) => {
    try {
      const response = await axios.get(`/moims/${moimId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 모임 참여 (1단계)
  joinMoim: async (moimId, message = "") => {
    try {
      const response = await axios.post(`/moims/${moimId}/join`, { message });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 모임 탈퇴 (1단계)
  leaveMoim: async (moimId) => {
    try {
      const response = await axios.delete(`/moims/${moimId}/join`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 참여신청 목록 조회 (승인/거절 기능)
  getJoinRequests: async (moimId, status = 'ALL', page = 1, limit = 20) => {
    try {
      const response = await axios.get(`/moims/${moimId}/join-requests`, {
        params: { status, page, limit }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 참여신청 상세 조회
  getJoinRequestDetail: async (moimId, requestId) => {
    try {
      const response = await axios.get(`/moims/${moimId}/join-requests/${requestId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 참여신청 승인
  approveJoinRequest: async (moimId, requestId, message = '') => {
    try {
      const response = await axios.post(`/moims/${moimId}/join-requests/${requestId}/approve`, {
        message
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 참여신청 거절
  rejectJoinRequest: async (moimId, requestId, reason) => {
    try {
      const response = await axios.post(`/moims/${moimId}/join-requests/${requestId}/reject`, {
        reason
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 참여신청 통계
  getJoinRequestStats: async (moimId) => {
    try {
      const response = await axios.get(`/moims/${moimId}/join-requests/stats`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
