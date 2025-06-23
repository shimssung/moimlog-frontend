import React, { createContext, useContext, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { useStore } from "../stores/useStore";

const ThemeContext = createContext();

// 테마 색상 정의
export const lightTheme = {
  // 배경색
  background: "#f9fafb",
  surface: "#ffffff",
  surfaceSecondary: "#f3f4f6",

  // 텍스트 색상
  textPrimary: "#111827",
  textSecondary: "#374151",
  textTertiary: "#6b7280",

  // 테두리 색상
  border: "#d1d5db",
  borderLight: "#e5e7eb",

  // 버튼 색상
  buttonPrimary: "#3b82f6",
  buttonSecondary: "#f3f4f6",
  buttonHover: "#2563eb",

  // 카드 및 컴포넌트
  cardBackground: "#ffffff",
  cardShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",

  // 입력 필드
  inputBackground: "#ffffff",
  inputBorder: "#d1d5db",
  inputFocus: "#3b82f6",

  // 태그
  tagBackground: "#e5e7eb",
  tagText: "#374151",

  // 상태 색상
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
};

export const darkTheme = {
  // 배경색
  background: "#111827",
  surface: "#1f2937",
  surfaceSecondary: "#374151",

  // 텍스트 색상
  textPrimary: "#f9fafb",
  textSecondary: "#d1d5db",
  textTertiary: "#9ca3af",

  // 테두리 색상
  border: "#4b5563",
  borderLight: "#6b7280",

  // 버튼 색상
  buttonPrimary: "#3b82f6",
  buttonSecondary: "#374151",
  buttonHover: "#2563eb",

  // 카드 및 컴포넌트
  cardBackground: "#1f2937",
  cardShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",

  // 입력 필드
  inputBackground: "#374151",
  inputBorder: "#4b5563",
  inputFocus: "#3b82f6",

  // 태그
  tagBackground: "#4b5563",
  tagText: "#d1d5db",

  // 상태 색상
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
};

// 전역 스타일 컴포넌트
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background} !important;
    color: ${(props) => props.theme.textPrimary} !important;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  * {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }
`;

export const ThemeProvider = ({ children }) => {
  const {
    isDarkMode,
    mounted,
    setMounted,
    theme,
    toggleTheme,
    initializeTheme,
  } = useStore();

  // 컴포넌트 마운트 시 mounted 상태 설정
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  // 마운트 후 테마 초기화
  useEffect(() => {
    if (mounted) {
      initializeTheme();
    }
  }, [mounted, initializeTheme]);

  // 다크모드 상태 변경 시 body 클래스 적용
  useEffect(() => {
    if (mounted) {
      console.log("ThemeContext: isDarkMode changed to", isDarkMode);
      // body 클래스에 다크모드 적용
      if (isDarkMode) {
        document.body.classList.add("dark-mode");
        console.log("ThemeContext: Added dark-mode class to body");
      } else {
        document.body.classList.remove("dark-mode");
        console.log("ThemeContext: Removed dark-mode class from body");
      }
    }
  }, [isDarkMode, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme, mounted }}>
      <GlobalStyle theme={theme} />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
