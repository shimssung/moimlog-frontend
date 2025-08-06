// 모임 카테고리 정의
export const CATEGORIES = {
  BOOK: "book",
  MOVIE: "movie",
  MUSIC: "music",
  SPORTS: "sports",
  GAME: "game",
  OTHER: "other",
};

// 카테고리 라벨
export const CATEGORY_LABELS = {
  [CATEGORIES.BOOK]: "독서",
  [CATEGORIES.MOVIE]: "영화",
  [CATEGORIES.MUSIC]: "음악",
  [CATEGORIES.SPORTS]: "운동/스포츠",
  [CATEGORIES.GAME]: "게임",
  [CATEGORIES.OTHER]: "기타",
};

// 카테고리 색상
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

// 모임 기본 구조 정의
export const MOIM_STRUCTURE = {
  title: "string", // 모임명
  category: "string", // 카테고리 (CATEGORIES 중 하나)
  description: "string", // 모임 소개
  maxMembers: "number", // 최대 인원
  tags: ["string"], // 태그 배열
  thumbnail: "string", // 대표 이미지 URL
};

// 인증이 필요 없는 경로들 (중앙 집중식 관리)
export const PUBLIC_PATHS = [
  "/", // 홈페이지
  "/login",
  "/signup", 
  "/forgot-password",
  "/oauth2-callback",
  "/oauth2", // 소셜 로그인 관련 페이지
  "/404",
  "/500",
  "/about",
  "/guide",
  "/updates",
  "/faq",
  "/contact",
  "/feedback",
  "/terms",
  "/privacy",
  "/rules"
];

// 인증이 필요 없는 API 엔드포인트들
export const PUBLIC_APIS = [
  "/auth/signup",
  "/auth/login",
  "/auth/check-email",
  "/auth/check-nickname",
  "/auth/send-verification",
  "/auth/verify-email",
  "/auth/forgot-password",
  "/auth/verify-reset-code",
  "/auth/reset-password",
  "/auth/logout", // 로그아웃은 토큰이 만료되어도 호출 가능해야 함
  "/oauth2", // 소셜 로그인 관련 모든 API
  "/oauth2-callback", // 소셜 로그인 콜백
];

// 경로가 public인지 확인하는 유틸리티 함수
export const isPublicPath = (pathname) => {
  return PUBLIC_PATHS.includes(pathname);
};

// API가 public인지 확인하는 유틸리티 함수
export const isPublicApi = (url) => {
  return PUBLIC_APIS.some((api) => url?.includes(api));
};
