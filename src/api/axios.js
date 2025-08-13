import axios from "axios";
import { isPublicApi } from "../utils/constants";
/* axios를 선택한 이유
토큰 자동 관리: 인터셉터로 모든 요청에 자동으로 토큰 추가
에러 처리: HTTP 에러 상태를 자동으로 처리
일관성: 모든 API 호출에서 동일한 방식 사용
확장성: 나중에 타임아웃, 재시도 등의 기능 추가 용이
*/

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/moimlog",
  timeout: 10000,
  withCredentials: true, // 쿠키 자동 전송
});

// Zustand 스토어 참조를 위한 변수
let storeRef = null;

// 스토어 참조 설정 함수
export const setStoreRef = (store) => {
  storeRef = store;
};

// 요청 인터셉터 - 토큰 자동 추가
instance.interceptors.request.use(
  (config) => {
    // 중앙 집중식 설정 사용
    if (!isPublicApi(config.url) && typeof window !== "undefined") {
      // Zustand 스토어에서 토큰 가져오기
      if (storeRef && typeof storeRef.getToken === "function") {
        const token = storeRef.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        // 토큰이 없어도 에러를 발생시키지 않음 - 각 API에서 필요에 따라 처리
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 토큰 만료 시 처리
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("Axios 응답 에러:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    const originalRequest = error.config;

    // 백엔드 서버 연결 실패인 경우
    if (
      error.message?.includes("ERR_CONNECTION_ABORTED") ||
      error.message?.includes("ERR_NETWORK") ||
      error.code === "ERR_NETWORK"
    ) {
      console.error("백엔드 서버 연결 실패:", error.message);
      return Promise.reject(
        new Error(
          "백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요."
        )
      );
    }

    // 401 또는 403 에러이고 아직 재시도하지 않은 경우에만 처리
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // refresh 토큰 요청 자체가 실패한 경우는 무한 반복 방지
      if (originalRequest.url?.includes("/auth/refresh")) {
        console.log("refresh 토큰 요청 실패 - 무한 반복 방지");
        if (typeof window !== "undefined" && storeRef) {
          try {
            storeRef.logoutSilently();
          } catch {
            // 스토어 접근 실패 시 조용히 처리
          }
        }
        return Promise.reject(error);
      }

      // 리프레시 토큰으로 새로운 액세스 토큰 요청
      try {
        const response = await instance.post("/auth/refresh", {});

        if (response.data.accessToken) {
          // 새로운 액세스 토큰을 Zustand 스토어에 저장
          if (typeof window !== "undefined" && storeRef) {
            try {
              storeRef.setToken(response.data.accessToken);
            } catch {
              // 스토어 접근 실패 시 조용히 처리
            }
          }

          // 응답에서 받은 토큰으로 헤더 설정
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        // 리프레시 토큰도 만료된 경우 간단하게 로그아웃 처리
        if (typeof window !== "undefined" && storeRef) {
          try {
            storeRef.logoutSilently();
          } catch {
            // 스토어 접근 실패 시 조용히 처리
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
