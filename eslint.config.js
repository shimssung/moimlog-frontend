// @eslint/js 모듈에서 ESLint 기본 recommended 설정을 가져옴
import js from "@eslint/js";

// globals 패키지를 통해 node, browser 등 전역 객체 정의들을 가져옴
import globals from "globals";

// 리액트 훅 사용에 관한 규칙을 제공하는 eslint-plugin-react-hooks 플러그인
import reactHooks from "eslint-plugin-react-hooks";

// 핫 리로딩 관련 오류를 잡아주는 eslint-plugin-react-refresh 플러그인
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // 첫 번째 설정 블록: dist 디렉토리는 ESLint 검사 대상에서 제외
  { ignores: ["dist"] },

  {
    // 검사할 파일 확장자: .js, .jsx 파일만 적용
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      // ECMAScript 버전 2020 문법 사용
      ecmaVersion: 2020,

      // 사용할 전역 객체 설정
      globals: {
        ...globals.node,         // Node.js의 전역 객체들 (예: require, process 등)
        FileReader: "readonly",  // 브라우저에서 파일 읽을 때 사용되는 FileReader를 읽기 전용으로 설정
        document: "readonly",    // 브라우저의 document 객체도 읽기 전용으로 설정
      },

      parserOptions: {
        ecmaVersion: "latest",     // 가능한 최신 ECMAScript 문법 지원
        ecmaFeatures: {
          jsx: true,               // JSX 문법 사용 가능 (React용)
        },
        sourceType: "module",      // import/export 사용 가능하게 설정
      },
    },

    plugins: {
      // 리액트 훅 관련 규칙을 위한 플러그인 설정
      "react-hooks": reactHooks,

      // Vite + React 환경에서 핫 리프레시 오류 감지용 플러그인
      "react-refresh": reactRefresh,
    },

    rules: {
      // ESLint 기본 recommended 설정의 룰들 적용
      ...js.configs.recommended.rules,

      // 리액트 훅 관련 recommended 룰도 함께 적용
      ...reactHooks.configs.recommended.rules,

      // 사용되지 않는 변수 경고 규칙 설정:
      // 단, 변수명이 대문자로 시작하거나 _로 시작하면 무시 (예: _UNUSED)
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],

      // 리액트 컴포넌트에서 export한 것만 허용 (핫 리프레시 관련)
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }, // 상수로 export 하는 컴포넌트는 허용
      ],
    },
  },
];
