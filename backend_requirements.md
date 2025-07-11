# 🚀 MoimLog 백엔드 개발 요구사항

## 📋 프로젝트 개요

**프로젝트명**: MoimLog (모임로그)  
**프로젝트 타입**: 모임 관리 플랫폼  
**프론트엔드**: Next.js (React)  
**백엔드**: Java + Spring Boot  
**데이터베이스**: MySQL

---

## 🏗️ 시스템 아키텍처

### 전체 구조

```
Frontend (Next.js) ←→ Backend (Spring Boot) ←→ Database (MySQL)
```

### 주요 기능

1. **사용자 관리** - 회원가입, 로그인, 소셜 로그인
2. **모임 관리** - 모임 생성, 수정, 삭제, 검색
3. **게시판** - 공지사항, 자유게시판, 사진게시판
4. **일정 관리** - 모임 일정, 작업, 마감일
5. **채팅** - 실시간 채팅
6. **멤버 관리** - 멤버 초대, 역할 관리
7. **알림** - 실시간 알림 시스템

---

## 👥 사용자 관리 (User Management)

### 사용자 정보 구조

```json
{
  "id": 1,
  "email": "user@example.com",
  "password": "hashed_password",
  "name": "홍길동",
  "nickname": "길동이",
  "profileImage": "https://...",
  "bio": "자기소개",
  "gender": "male|female|other",
  "isActive": true,
  "isVerified": false,
  "lastLoginAt": "2025-07-01T10:30:00",
  "createdAt": "2025-06-01T00:00:00",
  "updatedAt": "2025-07-01T10:30:00"
}
```

### 회원가입 요청 구조

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "홍길동"
}
```

### 온보딩 요청 구조

```json
{
  "nickname": "길동이",
  "bio": "자기소개",
  "interests": [1, 3, 5],
  "profileImage": "https://..."
}
```

### 소셜 로그인 지원

- **Google OAuth2**
- **Kakao OAuth2**
- **Naver OAuth2**

### 사용자 역할 (Roles)

- **USER**: 일반 사용자
- **ADMIN**: 관리자
- **MODERATOR**: 모임 운영자

---

---

## 🔐 인증 및 보안

### JWT 토큰 구조

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_id",
    "email": "user@example.com",
    "roles": ["USER"],
    "iat": 1647600000,
    "exp": 1647686400
  }
}
```

### 보안 요구사항

- **비밀번호 암호화**: BCrypt 사용
- **JWT 토큰**: Access Token + Refresh Token
- **CORS 설정**: 프론트엔드 도메인 허용
- **API 인증**: 모든 API에 JWT 토큰 검증

---

## 📊 API 엔드포인트 설계

### 인증 관련

```
POST   /moimlog/auth/signup          # 회원가입
POST   /moimlog/auth/login           # 로그인
POST   /moimlog/auth/refresh         # 토큰 갱신
POST   /moimlog/auth/logout          # 로그아웃
GET    /moimlog/auth/me              # 내 정보 조회
PUT    /moimlog/auth/profile         # 프로필 수정
POST   /moimlog/auth/onboarding      # 온보딩 정보 저장
```

### 소셜 로그인

```
GET    /moimlog/auth/oauth2/google   # Google 로그인
GET    /moimlog/auth/oauth2/kakao    # Kakao 로그인
GET    /moimlog/auth/oauth2/naver    # Naver 로그인
```

### 카테고리 관련

```
GET    /moimlog/categories           # 카테고리 목록 조회
GET    /moimlog/categories/{id}      # 카테고리 상세 조회
POST   /moimlog/categories           # 카테고리 생성 (관리자)
PUT    /moimlog/categories/{id}      # 카테고리 수정 (관리자)
DELETE /moimlog/categories/{id}      # 카테고리 삭제 (관리자)
```

**카테고리 응답 구조:**
```json
{
  "success": true,
  "categories": [
    { "id": 1, "name": "book", "label": "독서", "color": "#3b82f6" },
    { "id": 2, "name": "movie", "label": "영화", "color": "#ef4444" },
    { "id": 3, "name": "music", "label": "음악", "color": "#8b5cf6" },
    { "id": 4, "name": "sports", "label": "스포츠", "color": "#10b981" },
    { "id": 5, "name": "game", "label": "게임", "color": "#f59e0b" },
    { "id": 6, "name": "other", "label": "기타", "color": "#6b7280" }
  ]
}
```

### 모임 관련

```
GET    /moimlog/moims                # 모임 목록 조회
POST   /moimlog/moims                # 모임 생성
GET    /moimlog/moims/{id}           # 모임 상세 조회
PUT    /moimlog/moims/{id}           # 모임 수정
DELETE /moimlog/moims/{id}           # 모임 삭제
POST   /moimlog/moims/{id}/join      # 모임 가입
DELETE /moimlog/moims/{id}/leave     # 모임 탈퇴
```

### 게시판 관련

```
GET    /moimlog/moims/{id}/posts     # 게시글 목록
POST   /moimlog/moims/{id}/posts     # 게시글 작성
GET    /moimlog/posts/{id}           # 게시글 상세
PUT    /moimlog/posts/{id}           # 게시글 수정
DELETE /moimlog/posts/{id}           # 게시글 삭제
POST   /moimlog/posts/{id}/likes     # 좋아요
DELETE /moimlog/posts/{id}/likes     # 좋아요 취소
```

### 댓글 관련

```
GET    /moimlog/posts/{id}/comments  # 댓글 목록
POST   /moimlog/posts/{id}/comments  # 댓글 작성
PUT    /moimlog/comments/{id}        # 댓글 수정
DELETE /moimlog/comments/{id}        # 댓글 삭제
```

### 일정 관련

```
GET    /moimlog/moims/{id}/schedules # 일정 목록
POST   /moimlog/moims/{id}/schedules # 일정 생성
GET    /moimlog/schedules/{id}       # 일정 상세
PUT    /moimlog/schedules/{id}       # 일정 수정
DELETE /moimlog/schedules/{id}       # 일정 삭제
POST   /moimlog/schedules/{id}/attend # 일정 참석
DELETE /moimlog/schedules/{id}/attend # 일정 참석 취소
```

### 멤버 관련

```
GET    /moimlog/moims/{id}/members   # 멤버 목록
PUT    /moimlog/moims/{id}/members/{userId}/role # 역할 변경
DELETE /moimlog/moims/{id}/members/{userId} # 멤버 제거
```

### 알림 관련

```
GET    /moimlog/notifications        # 알림 목록
PUT    /moimlog/notifications/{id}/read # 읽음 처리
PUT    /moimlog/notifications/read-all # 모두 읽음 처리
DELETE /moimlog/notifications/{id}   # 알림 삭제
```

---

## 🔧 기술 스택

### Backend

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security**
- **Spring Data JPA**
- **Spring OAuth2 Client**
- **MySQL 8.0**
- **JWT (jjwt 0.11.5)**
- **Lombok**

### 개발 도구

- **Maven**
- **IntelliJ IDEA / Eclipse**
- **Postman / Insomnia**
- **MySQL Workbench**

### 배포

- **Render** - 백엔드 배포
- **Vercel** - 프론트엔드 배포
- **로컬 MySQL** - 데이터베이스

---

## 📋 개발 우선순위

### Phase 1: 기본 인프라

1. **프로젝트 설정** - Spring Boot 프로젝트 생성
2. **데이터베이스 설계** - 테이블 생성 및 인덱스 설정
3. **사용자 인증** - JWT 기반 인증 시스템
4. **소셜 로그인** - Google, Kakao, Naver OAuth2

### Phase 2: 핵심 기능

1. **온보딩 시스템** - 사용자 추가 정보 수집
2. **카테고리 관리** - 카테고리 CRUD 기능
3. **모임 관리** - CRUD 기능
4. **멤버 관리** - 가입, 탈퇴, 역할 관리
5. **게시판** - 공지사항, 자유게시판, 사진게시판
6. **댓글 시스템** - 댓글 CRUD, 좋아요

### Phase 3: 고급 기능

1. **일정 관리** - 일정 CRUD, 참석 관리
2. **채팅 시스템** - WebSocket 기반 실시간 채팅
3. **알림 시스템** - 실시간 알림
4. **파일 업로드** - 이미지, 파일 업로드

### Phase 4: 관리 기능

1. **관리자 기능** - 사용자 관리, 신고 처리
2. **검색 기능** - 모임, 게시글 검색
3. **통계 기능** - 사용자, 모임 통계
4. **성능 최적화** - 캐싱, 인덱스 최적화

---

# 폴더 구조

src/main/java/com/moimlog/moimlog_backend/
├── config/          # 설정 클래스들
├── controller/      # REST API 컨트롤러
├── service/         # 비즈니스 로직
├── repository/      # 데이터 접근 계층
├── entity/          # JPA 엔티티
├── dto/             # 데이터 전송 객체
│   ├── request/     # 요청 DTO
│   └── response/    # 응답 DTO
├── exception/       # 예외 처리
└── util/            # 유틸리티 클래스



---

## 📝 참고사항

### 프론트엔드 연동

- **CORS 설정** 필수
- **JWT 토큰** 헤더에 포함
- **파일 업로드** multipart/form-data 지원

### 보안 고려사항

- **SQL Injection** 방지
- **XSS** 방지
- **CSRF** 방지
- **Rate Limiting** 적용

### 성능 고려사항

- **페이징** 처리
- **캐싱** 전략
- **인덱스** 최적화
- **N+1 문제** 해결

---

## 📊 데이터베이스 스키마

### 사용자 테이블
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  nickname VARCHAR(100) NULL,
  profile_image VARCHAR(500) NULL,
  bio TEXT NULL,
  gender ENUM('male', 'female', 'other') NULL,
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 카테고리 테이블 (기존 moim_categories 활용)
```sql
-- 기존 moim_categories 테이블을 온보딩용 카테고리로 활용
-- 별도 테이블 생성 불필요
```

### 사용자-관심사 관계 테이블
```sql
CREATE TABLE user_interests (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  category_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES moim_categories(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_category (user_id, category_id)
);
```

---

**이 문서를 기반으로 MoimLog 백엔드 개발을 시작하세요! 🚀**
