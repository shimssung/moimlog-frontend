import { CATEGORIES } from "./constants";

// 통일된 모임 더미 데이터 (새로운 카테고리 구조에 맞춤)
export const mockMoims = [
  {
    id: 1,
    title: "스크럼 플러스 모임",
    categoryId: CATEGORIES.STUDY, // BOOK → STUDY
    description:
      "스크럼과 함께 성장하는 개발자들의 모임입니다. 매주 스크럼 방법론을 학습하고 실제 프로젝트에 적용해보며 함께 성장하는 시간을 가집니다.",
    maxMembers: 20,
    tags: ["개발", "스크럼", "프로젝트"],
    thumbnail: "/img1.jpg",
    onlineType: "online",
    location: "",
    locationDetail: "",
    isPrivate: false,
  },
  {
    id: 2,
    title: "웹앱 개발 모임",
    categoryId: CATEGORIES.IT, // GAME → IT
    description:
      "웹과 앱을 아우르는 사이드프로젝트 모임입니다. 아이디어부터 출시까지 함께 만들어가는 과정을 경험해보세요.",
    maxMembers: 15,
    tags: ["웹개발", "앱개발", "프로젝트"],
    thumbnail: "/img2.jpg",
    onlineType: "offline",
    location: "서울시 강남구",
    locationDetail: "강남역 3번 출구",
    isPrivate: false,
  },
  {
    id: 3,
    title: "어반 플레이팅 모임",
    categoryId: CATEGORIES.COOKING, // OTHER → COOKING
    description:
      "감각적인 플레이팅을 위한 모든 것을 배우는 모임입니다. 음식의 예술적 표현과 창의적인 접시 디자인을 함께 탐구해보세요.",
    maxMembers: 12,
    tags: ["요리", "플레이팅", "예술"],
    thumbnail: "/img3.jpg",
    onlineType: "offline",
    location: "서울시 마포구",
    locationDetail: "홍대입구역 1번 출구",
    isPrivate: false,
  },
  {
    id: 4,
    title: "북클럽 모임",
    categoryId: CATEGORIES.STUDY, // BOOK → STUDY
    description:
      "함께 읽고 토론하는 독서 모임입니다. 매월 한 권의 책을 선정하여 깊이 있는 독서와 의미 있는 대화를 나눕니다.",
    maxMembers: 18,
    tags: ["독서", "토론", "문학"],
    thumbnail: "/img4.jpg",
    onlineType: "online",
    location: "",
    locationDetail: "",
    isPrivate: false,
  },
  {
    id: 5,
    title: "런닝 크루",
    categoryId: CATEGORIES.SPORTS,
    description:
      "함께 뛰며 건강을 챙기는 러닝 모임입니다. 초보자부터 고급자까지 모두 환영합니다.",
    maxMembers: 25,
    tags: ["러닝", "건강", "운동"],
    thumbnail: "/img5.jpg",
    onlineType: "offline",
    location: "서울시 한강공원",
    locationDetail: "여의도 한강공원",
    isPrivate: false,
  },
  {
    id: 6,
    title: "게임 개발자 모임",
    categoryId: CATEGORIES.GAME,
    description:
      "게임 개발에 관심 있는 개발자들의 모임입니다. 게임 엔진, 그래픽, 사운드 등 다양한 분야를 다룹니다.",
    maxMembers: 30,
    tags: ["게임개발", "프로그래밍", "창작"],
    thumbnail: "/img6.jpg",
    onlineType: "hybrid",
    location: "서울시 강남구",
    locationDetail: "강남역 인근 카페",
    isPrivate: false,
  },
  {
    id: 7,
    title: "재즈 음악 감상회",
    categoryId: CATEGORIES.MUSIC,
    description:
      "재즈 음악을 함께 감상하고 이야기하는 모임입니다. 다양한 재즈 스타일과 역사를 알아봅니다.",
    maxMembers: 15,
    tags: ["재즈", "음악감상", "문화"],
    thumbnail: "/img7.jpg",
    onlineType: "offline",
    location: "서울시 홍대",
    locationDetail: "홍대 재즈바",
    isPrivate: false,
  },
  {
    id: 8,
    title: "일본 여행 계획 모임",
    categoryId: CATEGORIES.TRAVEL,
    description:
      "일본 여행을 계획하고 정보를 공유하는 모임입니다. 숙박, 교통, 맛집 등 실용적인 정보를 나눕니다.",
    maxMembers: 20,
    tags: ["일본여행", "여행계획", "문화"],
    thumbnail: "/img8.jpg",
    onlineType: "online",
    location: "",
    locationDetail: "",
    isPrivate: false,
  },
  {
    id: 9,
    title: "영화 감상 토론 모임",
    categoryId: CATEGORIES.MOVIE,
    description:
      "영화를 함께 보고 깊이 있는 토론을 나누는 모임입니다. 다양한 장르와 감독의 작품을 다룹니다.",
    maxMembers: 16,
    tags: ["영화감상", "토론", "문화"],
    thumbnail: "/img9.jpg",
    onlineType: "hybrid",
    location: "서울시 강남구",
    locationDetail: "강남역 인근 영화관",
    isPrivate: false,
  },
  {
    id: 10,
    title: "전시회 관람 모임",
    categoryId: CATEGORIES.ART,
    description:
      "다양한 전시회를 함께 관람하고 예술에 대해 이야기하는 모임입니다. 미술관, 갤러리 투어를 주로 합니다.",
    maxMembers: 12,
    tags: ["전시회", "예술", "문화"],
    thumbnail: "/img10.jpg",
    onlineType: "offline",
    location: "서울시 종로구",
    locationDetail: "종로 인근 미술관",
    isPrivate: false,
  },
];

// 카테고리별 필터링 함수
export const filterMoimsByCategory = (moims, category) => {
  if (!category || category === "All") return moims;
  return moims.filter((moim) => moim.categoryId === category);
};

// 검색 필터링 함수
export const searchMoims = (moims, searchTerm) => {
  if (!searchTerm) return moims;
  const term = searchTerm.toLowerCase();
  return moims.filter(
    (moim) =>
      moim.title.toLowerCase().includes(term) ||
      moim.description.toLowerCase().includes(term) ||
      moim.tags.some((tag) => tag.toLowerCase().includes(term))
  );
};
