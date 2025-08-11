import { useState, useEffect } from "react";
import { moimAPI } from "../api/moim";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await moimAPI.getMoimCategories();

      // API 응답 데이터 콘솔에 출력
      console.log("=== 카테고리 API 응답 ===");
      console.log("전체 응답:", response);
      console.log("response.data:", response.data);
      console.log("response.categories:", response.categories);

      // response.data가 카테고리 배열인 경우 처리
      const categoriesData =
        response.data || response.categories || response || [];

      console.log("최종 카테고리 데이터:", categoriesData);
      console.log("=== 카테고리 API 응답 끝 ===");

      setCategories(categoriesData);
      console.log("카테고리 상태 업데이트 완료:", categoriesData);
    } catch (error) {
      console.error("카테고리 불러오기 실패:", error);
      setError(error.message || "카테고리를 불러올 수 없습니다.");

      // API 실패 시 기본 카테고리 사용 (fallback)
      setCategories([
        {
          id: 1,
          name: "운동/스포츠",
          label: "운동/스포츠",
          color: "#10b981",
          description: "다양한 운동과 스포츠 활동",
        },
        {
          id: 2,
          name: "게임",
          label: "게임",
          color: "#f59e0b",
          description: "온라인/오프라인 게임",
        },
        {
          id: 3,
          name: "독서/스터디",
          label: "독서/스터디",
          color: "#3b82f6",
          description: "책 읽기와 공부",
        },
        {
          id: 4,
          name: "음악",
          label: "음악",
          color: "#8b5cf6",
          description: "음악 감상과 연주",
        },
        {
          id: 5,
          name: "여행",
          label: "여행",
          color: "#06b6d4",
          description: "국내외 여행",
        },
        {
          id: 6,
          name: "요리/베이킹",
          label: "요리/베이킹",
          color: "#ef4444",
          description: "요리와 베이킹",
        },
        {
          id: 7,
          name: "영화/드라마",
          label: "영화/드라마",
          color: "#ec4899",
          description: "영화와 드라마 감상",
        },
        {
          id: 8,
          name: "예술/문화",
          label: "예술/문화",
          color: "#a855f7",
          description: "예술과 문화 활동",
        },
        {
          id: 9,
          name: "IT/기술",
          label: "IT/기술",
          color: "#6366f1",
          description: "IT와 기술",
        },
        {
          id: 10,
          name: "기타",
          label: "기타",
          color: "#6b7280",
          description: "기타 다양한 관심사",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const refreshCategories = () => {
    fetchCategories();
  };

  return {
    categories,
    isLoading,
    error,
    refreshCategories,
  };
};
