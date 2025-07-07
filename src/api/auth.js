import axios from './axios';

// 인증 관련 API 함수들
export const authAPI = {
  // 회원가입
  signup: async (signupData) => {
    try {
      const response = await axios.post('/auth/signup', {
        email: signupData.email,
        password: signupData.password,
        name: signupData.name || signupData.email.split('@')[0], // 이름이 없으면 이메일에서 추출
        nickname: signupData.nickname || signupData.email.split('@')[0] // 닉네임이 없으면 이메일에서 추출
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 로그인
  login: async (loginData) => {
    try {
      const response = await axios.post('/auth/login', {
        email: loginData.email,
        password: loginData.password
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 이메일 중복 확인
  // encodeURIComponent 란 URL에 사용할 수 없는 문자를 인코딩하는 함수(@기호가 URL에서 문제를 일으킬 수 있음)
  checkEmailDuplicate: async (email) => {
    try {
      const response = await axios.get(`/auth/check-email?email=${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}; 