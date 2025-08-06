import axios from "axios";
import { isPublicApi } from "../utils/constants";
/* axios를 선택한 이유
토큰 자동 관리: 인터셉터로 모든 요청에 자동으로 토큰 추가
에러 처리: HTTP 에러 상태를 자동으로 처리
일관성: 모든 API 호출에서 동일한 방식 사용
확장성: 나중에 타임아웃, 재시도 등의 기능 추가 용이
*/

const instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/moimlog", // Spring Boot 주소
  withCredentials: true, // HttpOnly 쿠키 주고받을 경우 필요
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
    });

    const originalRequest = error.config;

    // 401 또는 403 에러이고 아직 재시도하지 않은 경우에만 처리
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // 리프레시 토큰으로 새로운 액세스 토큰 요청
      try {
        const response = await axios.post(
          "http://localhost:8080/moimlog/auth/refresh",
          {} // 리프레시 토큰은 HttpOnly 쿠키에서 자동으로 전송됨
        );

        if (response.data.accessToken) {
          // 새로운 액세스 토큰을 Zustand 스토어에 저장
          if (typeof window !== "undefined" && storeRef) {
            try {
              storeRef.setToken(response.data.accessToken);
            } catch {
              // 스토어 접근 실패 시 조용히 처리
            }
          }
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return instance(originalRequest);
        }
      } catch {
        // 리프레시 토큰도 만료된 경우 조용한 로그아웃 처리 (API 호출 없이)
        if (typeof window !== "undefined" && storeRef) {
          try {
            // API 호출 없이 상태만 초기화
            storeRef.logoutSilently();
          } catch {
            // 스토어 접근 실패 시 조용히 처리
          }
        }
        // 로그인 페이지로 리다이렉트
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
