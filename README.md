# 📝 모임로그 (MoimLog)

함께 성장하는 모임 플랫폼입니다. 관심 있는 모임을 찾고, 참여하고, 활동을 기록할 수 있는 웹 애플리케이션입니다.

## 🚀 주요 기능

### 👥 모임 관리

- **모임 생성/수정/삭제**: 다양한 카테고리의 모임을 만들고 관리
- **모임 검색/필터링**: 카테고리, 태그, 위치별 모임 검색
- **모임 상세 정보**: 모임 소개, 멤버, 일정, 게시판 확인

### 💬 실시간 커뮤니케이션

- **실시간 채팅**: 모임별 채팅방에서 멤버들과 소통
- **게시판**: 모임 관련 공지사항과 게시글 작성
- **알림 시스템**: 새로운 메시지와 모임 활동 알림

### 📅 일정 관리

- **일정 등록/수정**: 모임 일정을 캘린더에 등록
- **일정 공유**: 멤버들과 일정 공유 및 확인

### 👤 사용자 관리

- **회원가입/로그인**: 이메일/비밀번호 및 소셜 로그인 지원 (Google, Kakao, Naver)
- **프로필 관리**: 개인 정보 및 프로필 이미지 수정
- **내 모임 관리**: 참여 중인 모임 목록 및 관리
- **온보딩**: 첫 로그인 시 관심사 설정

### 🎨 사용자 경험

- **다크모드/라이트모드**: 사용자 선호에 따른 테마 변경
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **직관적인 UI/UX**: 사용하기 쉬운 인터페이스

## 🛠 기술 스택

### Frontend

- **Next.js 15.3.3** - React 기반 프레임워크
- **React 19.1.0** - 사용자 인터페이스 라이브러리
- **Styled Components 6.1.18** - CSS-in-JS 스타일링
- **Zustand 5.0.5** - 상태 관리
- **Axios 1.9.0** - HTTP 클라이언트
- **React Hot Toast 2.5.2** - 알림 시스템
- **React Icons 5.5.0** - 아이콘 라이브러리

### Development Tools

- **ESLint 9.25.0** - 코드 품질 관리
- **TypeScript** - 타입 안전성 (선택적)

## 📁 프로젝트 구조

```
moimlog-frontend/
├── docs/                   # 문서
│   ├── social-login-implementation.md  # 소셜 로그인 구현 문서
│   └── technical-details.md            # 기술적 세부사항
├── public/                 # 정적 파일
│   ├── img1.jpg ~ img10.jpg
│   ├── google_icon.png
│   ├── kakao_icon.png
│   └── naver_icon.png
├── src/
│   ├── api/
│   │   └── axios.js        # API 설정
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── AuthLayout.jsx
│   │   ├── Button.jsx
│   │   ├── Calendar.jsx
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── MoimDetailModal.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SocialLogin.jsx
│   │   └── Textarea.jsx
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── _app.jsx       # 앱 루트
│   │   ├── index.jsx      # 홈페이지
│   │   ├── login.jsx      # 로그인
│   │   ├── signup.jsx     # 회원가입
│   │   ├── oauth2-callback.jsx # 소셜 로그인 콜백
│   │   ├── moim-list.jsx  # 모임 목록
│   │   ├── moim-create.jsx # 모임 생성
│   │   ├── moim-edit.jsx  # 모임 수정
│   │   ├── my-moims.jsx   # 내 모임
│   │   ├── MyPage.jsx     # 마이페이지
│   │   ├── profile-edit.jsx # 프로필 수정
│   │   ├── notification.jsx # 알림
│   │   ├── settings.jsx   # 설정
│   │   ├── forgot-password.jsx # 비밀번호 찾기
│   │   └── moim/
│   │       └── [id]/      # 모임 상세 페이지
│   │           ├── board.jsx    # 게시판
│   │           ├── chat.jsx     # 채팅
│   │           ├── members.jsx  # 멤버 관리
│   │           ├── schedule.jsx # 일정 관리
│   │           └── settings.jsx # 모임 설정
│   ├── stores/
│   │   └── useStore.js    # Zustand 상태 관리
│   └── utils/
│       ├── constants.js   # 상수 정의
│       ├── mockData.js    # 목 데이터
│       ├── sanitize.js    # 데이터 정제
│       └── ThemeContext.js # 테마 컨텍스트
├── package.json
├── next.config.js
└── eslint.config.js
```

## 📱 주요 페이지

### 홈페이지 (`/`)

- 추천 모임 목록
- 모임 둘러보기 및 생성 버튼
- 히어로 섹션

### 모임 목록 (`/moim-list`)

- 전체 모임 목록
- 카테고리별 필터링
- 검색 기능

### 모임 생성 (`/moim-create`)

- 모임 정보 입력 폼
- 이미지 업로드
- 태그 설정

### 모임 상세 (`/moim/[id]`)

- **게시판**: 공지사항 및 게시글
- **채팅**: 실시간 멤버 간 소통
- **멤버**: 참여자 관리
- **일정**: 모임 일정 관리
- **설정**: 모임 정보 수정

### 사용자 페이지

- **마이페이지**: 개인 정보 및 활동 내역
- **내 모임**: 참여 중인 모임 관리
- **알림**: 새로운 활동 알림
- **설정**: 계정 및 앱 설정

## 🎨 디자인 시스템

### 테마

- **라이트 모드**: 밝고 깔끔한 디자인
- **다크 모드**: 눈의 피로를 줄이는 어두운 테마

### 색상 팔레트

- **Primary**: #3b82f6 (파란색)
- **Success**: #10b981 (초록색)
- **Error**: #ef4444 (빨간색)
- **Warning**: #f59e0b (주황색)

### 카테고리

- 📚 독서
- 🎬 영화
- 🎵 음악
- ⚽ 스포츠
- 🎮 게임
- 🎨 기타

## 🔧 개발 가이드

### 컴포넌트 작성 규칙

- 재사용 가능한 컴포넌트는 `src/components/`에 배치
- 페이지별 컴포넌트는 `src/pages/`에 배치
- Styled Components를 사용한 스타일링

### 상태 관리

- Zustand를 사용한 전역 상태 관리
- 로컬 상태는 React useState 사용
- 테마, 사용자 정보, 인증 상태는 전역 관리

### API 통신

- Axios를 사용한 HTTP 통신
- `src/api/axios.js`에서 기본 설정
- 에러 처리 및 인터셉터 설정

---

**MoimLog** - 함께 성장하는 모임 플랫폼 🚀
