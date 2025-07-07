import axios from "axios";
/* axios를 선택한 이유
토큰 자동 관리: 인터셉터로 모든 요청에 자동으로 토큰 추가
에러 처리: HTTP 에러 상태를 자동으로 처리
일관성: 모든 API 호출에서 동일한 방식 사용
확장성: 나중에 타임아웃, 재시도 등의 기능 추가 용이
*/

const instance = axios.create({
  baseURL: "http://localhost:8080/moimlog", // Spring Boot 주소 (백엔드 API 경로에 /api가 없으므로 제거)
  //   withCredentials: true, // 쿠키 주고받을 경우 필요
});

// 요청 인터셉터 - 토큰 자동 추가
// interceptors란: 요청이나 응답을 가로채서 가공하는 기능
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // 리프레시 토큰으로 새로운 액세스 토큰 요청
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post("http://localhost:8080/auth/refresh", {
            refreshToken: refreshToken
          });
          
          if (response.data.accessToken) {
            localStorage.setItem("accessToken", response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return instance(originalRequest);
          }
        } catch {
          // 리프레시 토큰도 만료된 경우 로그아웃
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default instance;
