// 모임 카테고리 정의
export const CATEGORIES = {
  BOOK: "book",
  MOVIE: "movie", 
  MUSIC: "music",
  SPORTS: "sports",
  GAME: "game",
  OTHER: "other"
};

// 카테고리 라벨 (한국어)
export const CATEGORY_LABELS = {
  [CATEGORIES.BOOK]: "독서",
  [CATEGORIES.MOVIE]: "영화",
  [CATEGORIES.MUSIC]: "음악",
  [CATEGORIES.SPORTS]: "스포츠", 
  [CATEGORIES.GAME]: "게임",
  [CATEGORIES.OTHER]: "기타"
};

// 모임 기본 구조 정의
export const MOIM_STRUCTURE = {
  title: "string",           // 모임명
  category: "string",        // 카테고리 (CATEGORIES 중 하나)
  description: "string",     // 모임 소개
  maxMembers: "number",      // 최대 인원
  tags: ["string"],          // 태그 배열
  thumbnail: "string"        // 대표 이미지 URL
};

// 카테고리 옵션 (Select 컴포넌트용)
export const CATEGORY_OPTIONS = [
  { value: CATEGORIES.BOOK, label: CATEGORY_LABELS[CATEGORIES.BOOK] },
  { value: CATEGORIES.MOVIE, label: CATEGORY_LABELS[CATEGORIES.MOVIE] },
  { value: CATEGORIES.MUSIC, label: CATEGORY_LABELS[CATEGORIES.MUSIC] },
  { value: CATEGORIES.SPORTS, label: CATEGORY_LABELS[CATEGORIES.SPORTS] },
  { value: CATEGORIES.GAME, label: CATEGORY_LABELS[CATEGORIES.GAME] },
  { value: CATEGORIES.OTHER, label: CATEGORY_LABELS[CATEGORIES.OTHER] }
]; 