// 모임 카테고리 정의 (데이터베이스와 일치)
export const CATEGORIES = {
  SPORTS: "운동/스포츠",
  GAME: "게임",
  STUDY: "독서/스터디",
  MUSIC: "음악",
  TRAVEL: "여행",
  COOKING: "요리/베이킹",
  MOVIE: "영화/드라마",
  ART: "예술/문화",
  IT: "IT/기술",
  OTHER: "기타",
};

// 카테고리 라벨
export const CATEGORY_LABELS = {
  [CATEGORIES.SPORTS]: "운동/스포츠",
  [CATEGORIES.GAME]: "게임",
  [CATEGORIES.STUDY]: "독서/스터디",
  [CATEGORIES.MUSIC]: "음악",
  [CATEGORIES.TRAVEL]: "여행",
  [CATEGORIES.COOKING]: "요리/베이킹",
  [CATEGORIES.MOVIE]: "영화/드라마",
  [CATEGORIES.ART]: "예술/문화",
  [CATEGORIES.IT]: "IT/기술",
  [CATEGORIES.OTHER]: "기타",
};

// 카테고리 색상
export const CATEGORY_COLORS = {
  [CATEGORIES.SPORTS]: "#10b981",
  [CATEGORIES.GAME]: "#f59e0b",
  [CATEGORIES.STUDY]: "#3b82f6",
  [CATEGORIES.MUSIC]: "#8b5cf6",
  [CATEGORIES.TRAVEL]: "#06b6d4",
  [CATEGORIES.COOKING]: "#ef4444",
  [CATEGORIES.MOVIE]: "#ec4899",
  [CATEGORIES.ART]: "#a855f7",
  [CATEGORIES.IT]: "#6366f1",
  [CATEGORIES.OTHER]: "#6b7280",
};

// 카테고리 설명
export const CATEGORY_DESCRIPTIONS = {
  [CATEGORIES.SPORTS]: "다양한 운동과 스포츠 활동",
  [CATEGORIES.GAME]: "온라인/오프라인 게임 모임",
  [CATEGORIES.STUDY]: "책 읽기와 공부 모임",
  [CATEGORIES.MUSIC]: "음악 감상과 연주 활동",
  [CATEGORIES.TRAVEL]: "국내외 여행 모임",
  [CATEGORIES.COOKING]: "요리와 베이킹 활동",
  [CATEGORIES.MOVIE]: "영화와 드라마 감상",
  [CATEGORIES.ART]: "예술과 문화 활동",
  [CATEGORIES.IT]: "IT와 기술 관련 모임",
  [CATEGORIES.OTHER]: "기타 다양한 모임",
};

// 카테고리 옵션 (Select 컴포넌트용)
export const CATEGORY_OPTIONS = [
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
    value: CATEGORIES.STUDY,
    label: CATEGORY_LABELS[CATEGORIES.STUDY],
    color: CATEGORY_COLORS[CATEGORIES.STUDY],
    description: CATEGORY_DESCRIPTIONS[CATEGORIES.STUDY],
  },
  {
    value: CATEGORIES.MUSIC,
    label: CATEGORY_LABELS[CATEGORIES.MUSIC],
    color: CATEGORY_COLORS[CATEGORIES.MUSIC],
    description: CATEGORY_DESCRIPTIONS[CATEGORIES.MUSIC],
  },
  {
    value: CATEGORIES.TRAVEL,
    label: CATEGORY_LABELS[CATEGORIES.TRAVEL],
    color: CATEGORY_COLORS[CATEGORIES.TRAVEL],
    description: CATEGORY_DESCRIPTIONS[CATEGORIES.TRAVEL],
  },
  {
    value: CATEGORIES.COOKING,
    label: CATEGORY_LABELS[CATEGORIES.COOKING],
    color: CATEGORY_COLORS[CATEGORIES.COOKING],
    description: CATEGORY_DESCRIPTIONS[CATEGORIES.COOKING],
  },
  {
    value: CATEGORIES.MOVIE,
    label: CATEGORY_LABELS[CATEGORIES.MOVIE],
    color: CATEGORY_COLORS[CATEGORIES.MOVIE],
    description: CATEGORY_DESCRIPTIONS[CATEGORIES.MOVIE],
  },
  {
    value: CATEGORIES.ART,
    label: CATEGORY_LABELS[CATEGORIES.ART],
    color: CATEGORY_COLORS[CATEGORIES.ART],
    description: CATEGORY_DESCRIPTIONS[CATEGORIES.ART],
  },
  {
    value: CATEGORIES.IT,
    label: CATEGORY_LABELS[CATEGORIES.IT],
    color: CATEGORY_COLORS[CATEGORIES.IT],
    description: CATEGORY_DESCRIPTIONS[CATEGORIES.IT],
  },
  {
    value: CATEGORIES.OTHER,
    label: CATEGORY_LABELS[CATEGORIES.OTHER],
    color: CATEGORY_COLORS[CATEGORIES.OTHER],
    description: CATEGORY_DESCRIPTIONS[CATEGORIES.OTHER],
  },
];

// 모임 기본 구조 정의 (백엔드 API와 일치)
export const MOIM_STRUCTURE = {
  title: "string", // 모임명
  description: "string", // 모임 소개
  categoryId: "number", // 카테고리 ID (백엔드와 일치)
  maxMembers: "number", // 최대 인원
  tags: ["string"], // 태그 배열
  thumbnail: "string", // 대표 이미지 URL
  isPrivate: "boolean", // 비공개 여부
  onlineType: "string", // online, offline, hybrid
  location: "string", // 활동 지역
  locationDetail: "string", // 상세 주소
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
  "/rules",
];

// 소셜 로그인 제공자
export const OAUTH_PROVIDERS = {
  GOOGLE: "google",
  NAVER: "naver",
  KAKAO: "kakao",
};

// 소셜 로그인 제공자 라벨
export const OAUTH_PROVIDER_LABELS = {
  [OAUTH_PROVIDERS.GOOGLE]: "구글",
  [OAUTH_PROVIDERS.NAVER]: "네이버",
  [OAUTH_PROVIDERS.KAKAO]: "카카오",
};

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
  "/oauth2", // 소셜 로그인 관련 모든 API
  "/oauth2-callback", // 소셜 로그인 콜백
];

// 인증이 필요한 API 엔드포인트들 (프로필 관련)
export const PROTECTED_APIS = [
  "/auth/profile", // 프로필 수정
  "/auth/change-password", // 비밀번호 변경
  "/auth/notification-settings", // 알림 설정
  "/auth/privacy-settings", // 개인정보 설정
  "/auth/upload-profile-image", // 프로필 이미지 업로드
  "/auth/profile-image", // 프로필 이미지 조회
  "/auth/me", // 내 프로필 조회
  "/auth/onboarding", // 온보딩 완료
  "/auth/onboarding/status", // 온보딩 상태 확인
  "/auth/refresh", // 토큰 갱신
  "/auth/logout", // 로그아웃
];

// 경로가 public인지 확인하는 유틸리티 함수
export const isPublicPath = (pathname) => {
  return PUBLIC_PATHS.includes(pathname);
};

// API가 public인지 확인하는 유틸리티 함수
export const isPublicApi = (url) => {
  return PUBLIC_APIS.some((api) => url?.includes(api));
};
