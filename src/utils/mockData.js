import { CATEGORIES } from "./constants";

// 통일된 모임 더미 데이터
export const mockMoims = [
  {
    id: 1,
    title: "스크럼 플러스 모임",
    category: CATEGORIES.BOOK,
    description:
      "스크럼과 함께 성장하는 개발자들의 모임입니다. 매주 스크럼 방법론을 학습하고 실제 프로젝트에 적용해보며 함께 성장하는 시간을 가집니다.",
    maxMembers: 20,
    tags: ["개발", "스크럼", "프로젝트"],
    thumbnail: "/img1.jpg",
    onlineType: "online",
    location: "",
  },
  {
    id: 2,
    title: "웹앱 개발 모임",
    category: CATEGORIES.GAME,
    description:
      "웹과 앱을 아우르는 사이드프로젝트 모임입니다. 아이디어부터 출시까지 함께 만들어가는 과정을 경험해보세요.",
    maxMembers: 15,
    tags: ["웹개발", "앱개발", "프로젝트"],
    thumbnail: "/img2.jpg",
    onlineType: "offline",
    location: "서울시 강남구",
  },
  {
    id: 3,
    title: "어반 플레이팅 모임",
    category: CATEGORIES.OTHER,
    description:
      "감각적인 플레이팅을 위한 모든 것을 배우는 모임입니다. 음식의 예술적 표현과 창의적인 접시 디자인을 함께 탐구해보세요.",
    maxMembers: 12,
    tags: ["요리", "플레이팅", "예술"],
    thumbnail: "/img3.jpg",
    onlineType: "offline",
    location: "서울시 마포구",
  },
  {
    id: 4,
    title: "북클럽 모임",
    category: CATEGORIES.BOOK,
    description:
      "함께 읽고 토론하는 독서 모임입니다. 매월 한 권의 책을 선정하여 깊이 있는 독서와 의미 있는 대화를 나눕니다.",
    maxMembers: 18,
    tags: ["독서", "토론", "문학"],
    thumbnail: "/img4.jpg",
    onlineType: "online",
    location: "",
  },
  {
    id: 5,
    title: "축구 동호회",
    category: CATEGORIES.SPORTS,
    description:
      "주말 축구로 건강한 삶을 만들어가는 동호회입니다. 실력에 관계없이 축구를 사랑하는 분들이 모여 즐겁게 뛰는 시간을 가집니다.",
    maxMembers: 25,
    tags: ["축구", "운동", "건강"],
    thumbnail: "/img5.jpg",
    onlineType: "offline",
    location: "서울시 송파구",
  },
  {
    id: 6,
    title: "바이크 라이딩",
    category: CATEGORIES.SPORTS,
    description:
      "자전거와 함께하는 새로운 도전을 시작해보세요. 도시 탐방부터 장거리 라이딩까지 다양한 코스를 함께 즐깁니다.",
    maxMembers: 20,
    tags: ["자전거", "라이딩", "여행"],
    thumbnail: "/img6.jpg",
    onlineType: "offline",
    location: "서울시 성동구",
  },
  {
    id: 7,
    title: "아트 스터디",
    category: CATEGORIES.OTHER,
    description:
      "예술을 사랑하는 사람들의 모임입니다. 다양한 예술 작품을 감상하고 창작 활동을 통해 예술적 감성을 키워갑니다.",
    maxMembers: 15,
    tags: ["예술", "감상", "창작"],
    thumbnail: "/img7.jpg",
    onlineType: "offline",
    location: "서울시 종로구",
  },
  {
    id: 8,
    title: "올리브오일 테이스팅",
    category: CATEGORIES.OTHER,
    description:
      "올리브오일의 세계로 초대합니다. 다양한 지역의 올리브오일을 맛보고 그 특성과 활용법을 함께 배워봅니다.",
    maxMembers: 10,
    tags: ["올리브오일", "테이스팅", "요리"],
    thumbnail: "/img8.jpg",
    onlineType: "offline",
    location: "서울시 용산구",
  },
  {
    id: 9,
    title: "러닝 크루",
    category: CATEGORIES.SPORTS,
    description:
      "함께 뛰며 건강을 쌓아가는 러닝 모임입니다. 초보자부터 마라톤 준비까지 단계별로 함께 성장합니다.",
    maxMembers: 30,
    tags: ["러닝", "마라톤", "건강"],
    thumbnail: "/img9.jpg",
    onlineType: "offline",
    location: "서울시 강서구",
  },
  {
    id: 10,
    title: "클래식 음악 감상회",
    category: CATEGORIES.OTHER,
    description:
      "클래식 음악의 아름다움을 함께 나누는 모임입니다. 다양한 작곡가와 곡을 감상하며 음악적 지식을 쌓습니다.",
    maxMembers: 15,
    tags: ["클래식", "음악", "감상"],
    thumbnail: "/img10.jpg",
    onlineType: "online",
    location: "",
  },
  {
    id: 11,
    title: "스타트업 네트워킹",
    category: CATEGORIES.BOOK,
    description:
      "스타트업 창업자와 관심자들이 모여 아이디어를 공유하고 네트워킹하는 모임입니다.",
    maxMembers: 25,
    tags: ["스타트업", "창업", "네트워킹"],
    thumbnail: "/img1.jpg",
    onlineType: "offline",
    location: "서울시 영등포구",
  },
  {
    id: 12,
    title: "요가 클래스",
    category: CATEGORIES.SPORTS,
    description:
      "마음과 몸의 균형을 찾는 요가 모임입니다. 초급부터 고급까지 단계별로 배우며 건강한 라이프스타일을 만듭니다.",
    maxMembers: 20,
    tags: ["요가", "명상", "건강"],
    thumbnail: "/img2.jpg",
    onlineType: "offline",
    location: "서울시 서초구",
  },
  {
    id: 13,
    title: "사진 촬영 모임",
    category: CATEGORIES.OTHER,
    description:
      "사진 촬영 기술을 배우고 함께 촬영하며 창작 활동을 하는 모임입니다.",
    maxMembers: 18,
    tags: ["사진", "촬영", "창작"],
    thumbnail: "/img3.jpg",
    onlineType: "offline",
    location: "서울시 중구",
  },
  {
    id: 14,
    title: "와인 테이스팅",
    category: CATEGORIES.OTHER,
    description:
      "세계 각국의 와인을 맛보고 와인에 대한 지식을 쌓는 모임입니다.",
    maxMembers: 12,
    tags: ["와인", "테이스팅", "문화"],
    thumbnail: "/img4.jpg",
    onlineType: "offline",
    location: "서울시 강남구",
  },
  {
    id: 15,
    title: "보드게임 클럽",
    category: CATEGORIES.GAME,
    description:
      "다양한 보드게임을 즐기며 새로운 친구들과 즐거운 시간을 보내는 모임입니다.",
    maxMembers: 16,
    tags: ["보드게임", "게임", "친목"],
    thumbnail: "/img5.jpg",
    onlineType: "offline",
    location: "서울시 마포구",
  },
  {
    id: 16,
    title: "프로그래밍 스터디",
    category: CATEGORIES.BOOK,
    description:
      "프로그래밍 언어를 함께 학습하고 프로젝트를 진행하는 개발자 모임입니다.",
    maxMembers: 22,
    tags: ["프로그래밍", "개발", "스터디"],
    thumbnail: "/img6.jpg",
    onlineType: "online",
    location: "",
  },
  {
    id: 17,
    title: "등산 동호회",
    category: CATEGORIES.SPORTS,
    description: "자연 속에서 힐링하며 건강을 쌓아가는 등산 모임입니다.",
    maxMembers: 28,
    tags: ["등산", "자연", "건강"],
    thumbnail: "/img7.jpg",
    onlineType: "offline",
    location: "서울시 노원구",
  },
  {
    id: 18,
    title: "요리 클래스",
    category: CATEGORIES.OTHER,
    description:
      "다양한 요리 기법을 배우고 함께 요리하며 즐거운 시간을 보내는 모임입니다.",
    maxMembers: 14,
    tags: ["요리", "쿠킹", "클래스"],
    thumbnail: "/img8.jpg",
    onlineType: "offline",
    location: "서울시 광진구",
  },
  {
    id: 19,
    title: "독서 토론회",
    category: CATEGORIES.BOOK,
    description: "책을 읽고 깊이 있는 토론을 통해 지식을 공유하는 모임입니다.",
    maxMembers: 20,
    tags: ["독서", "토론", "지식"],
    thumbnail: "/img9.jpg",
    onlineType: "online",
    location: "",
  },
  {
    id: 20,
    title: "테니스 클럽",
    category: CATEGORIES.SPORTS,
    description:
      "테니스를 배우고 함께 즐기며 건강한 라이프스타일을 만드는 모임입니다.",
    maxMembers: 24,
    tags: ["테니스", "스포츠", "건강"],
    thumbnail: "/img10.jpg",
    onlineType: "offline",
    location: "서울시 송파구",
  },
];

// 카테고리별 필터링 함수
export const filterMoimsByCategory = (moims, category) => {
  if (!category || category === "All") return moims;
  return moims.filter((moim) => moim.category === category);
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
