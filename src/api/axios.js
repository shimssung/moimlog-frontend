import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api", // Spring Boot 주소
  //   withCredentials: true, // 쿠키 주고받을 경우 필요
});

export default instance;
