// 모임 카테고리 정의
export const CATEGORIES = {
  BOOK: "book",
  MOVIE: "movie",
  MUSIC: "music",
  SPORTS: "sports",
  GAME: "game",
  OTHER: "other",
};

// 카테고리 라벨 (한국어)
export const CATEGORY_LABELS = {
  [CATEGORIES.BOOK]: "독서",
  [CATEGORIES.MOVIE]: "영화",
  [CATEGORIES.MUSIC]: "음악",
  [CATEGORIES.SPORTS]: "스포츠",
  [CATEGORIES.GAME]: "게임",
  [CATEGORIES.OTHER]: "기타",
};

// 카테고리 색상 (데이터베이스와 일치)
export const CATEGORY_COLORS = {
  [CATEGORIES.BOOK]: "#3b82f6",
  [CATEGORIES.MOVIE]: "#ef4444",
  [CATEGORIES.MUSIC]: "#8b5cf6",
  [CATEGORIES.SPORTS]: "#10b981",
  [CATEGORIES.GAME]: "#f59e0b",
  [CATEGORIES.OTHER]: "#6b7280",
};

// 카테고리 설명
export const CATEGORY_DESCRIPTIONS = {
  [CATEGORIES.BOOK]: "책과 관련된 모임",
  [CATEGORIES.MOVIE]: "영화 감상 및 토론 모임",
  [CATEGORIES.MUSIC]: "음악 감상 및 연주 모임",
  [CATEGORIES.SPORTS]: "운동 및 스포츠 모임",
  [CATEGORIES.GAME]: "게임 관련 모임",
  [CATEGORIES.OTHER]: "기타 다양한 모임",
};

// 모임 기본 구조 정의
export const MOIM_STRUCTURE = {
  title: "string", // 모임명
  category: "string", // 카테고리 (CATEGORIES 중 하나)
  description: "string", // 모임 소개
  maxMembers: "number", // 최대 인원
  tags: ["string"], // 태그 배열
  thumbnail: "string", // 대표 이미지 URL
};

// 카테고리 옵션 (Select 컴포넌트용)
export const CATEGORY_OPTIONS = [
  {
    value: CATEGORIES.BOOK,
    label: CATEGORY_LABELS[CATEGORIES.BOOK],
    color: CATEGORY_COLORS[CATEGORIES.BOOK],
    description: CATEGORY_DESCRIPTIONS[CATEGORIES.BOOK],
  },
  {
    value: CATEGORIES.MOVIE,
    label: CATEGORY_LABELS[CATEGORIES.MOVIE],
    color: CATEGORY_COLORS[CATEGORIES.MOVIE],
    description: CATEGORY_DESCRIPTIONS[CATEGORIES.MOVIE],
  },
  {
    value: CATEGORIES.MUSIC,
    label: CATEGORY_LABELS[CATEGORIES.MUSIC],
    color: CATEGORY_COLORS[CATEGORIES.MUSIC],
    description: CATEGORY_DESCRIPTIONS[CATEGORIES.MUSIC],
  },
  {
    value: CATEGORIES.SPORTS,
    label: CATEGORY_LABELS[CATEGORIES.SPORTS],
    color: CATEGORY_COLORS[CATEGORIES.SPORTS],
    description: CATEGORY_DESCRIPTIONS[CATEGORIES.SPORTS],
  },
  {
    value: CATEGORIES.GAME,
    label: CATEGORY_LABELS[CATEGORIES.GAME],
    color: CATEGORY_COLORS[CATEGORIES.GAME],
    description: CATEGORY_DESCRIPTIONS[CATEGORIES.GAME],
  },
  {
    value: CATEGORIES.OTHER,
    label: CATEGORY_LABELS[CATEGORIES.OTHER],
    color: CATEGORY_COLORS[CATEGORIES.OTHER],
    description: CATEGORY_DESCRIPTIONS[CATEGORIES.OTHER],
  },
];

// 보호된 라우트 (로그인이 필요한 페이지)
export const PROTECTED_ROUTES = [
  "/moim-list", // 모임 목록
  "/moim-create", // 모임 생성
  "/moim-edit", // 모임 수정
  "/moim", // 모임 관련 모든 페이지
  "/MyPage", // 마이페이지
  "/profile-edit", // 프로필 수정
  "/settings", // 설정
  "/notification", // 알림
  "/admin", // 관리자 페이지
];

// 공개 라우트 (로그인 없이 접근 가능한 페이지)
export const PUBLIC_ROUTES = [
  "/", // 홈페이지 (공개)
  "/login", // 로그인
  "/signup", // 회원가입
  "/forgot-password", // 비밀번호 찾기
  "/oauth2-callback", // 소셜 로그인 콜백
  "/onboarding", // 온보딩 (로그인 후)
];

// 라우트가 보호된 라우트인지 확인하는 함수
export const isProtectedRoute = (pathname) => {
  return PROTECTED_ROUTES.some((route) => {
    // 정확히 일치하거나 하위 경로인 경우
    return pathname === route || pathname.startsWith(route + "/");
  });
};

// 라우트가 공개 라우트인지 확인하는 함수
export const isPublicRoute = (pathname) => {
  return PUBLIC_ROUTES.some((route) => {
    return pathname === route || pathname.startsWith(route + "/");
  });
};
