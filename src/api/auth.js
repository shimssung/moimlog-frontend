import axios from './axios';

// 인증 관련 API 함수들
export const authAPI = {
  // 회원가입
  signup: async (signupData) => {
    try {
      const response = await axios.post('/auth/signup', {
        email: signupData.email,
        password: signupData.password,
        name: signupData.name
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
  },

  // 이메일 인증 코드 발송
  sendVerificationCode: async (email) => {
    try {
      const response = await axios.post(`/auth/send-verification?email=${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 이메일 인증 코드 검증
  verifyEmailCode: async (email, verificationCode) => {
    try {
      const response = await axios.post('/auth/verify-email', {
        email: email,
        verificationCode: verificationCode
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}; 