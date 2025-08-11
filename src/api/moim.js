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
};
