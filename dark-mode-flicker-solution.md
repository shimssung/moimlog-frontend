# Next.js + styled-components + Zustand에서 다크모드 깜빡임 현상 해결기

## 들어가며

안녕하세요! 현재 **Next.js**, **styled-components**, **Zustand**를 사용해서 프로젝트를 개발하고 있는데, 다크모드 구현 시 새로고침할 때마다 깜빡임 현상이 발생해서 고민이 많았습니다.

이번 글에서는 실제로 겪었던 문제와 해결 과정을 정리해보려고 합니다. styled-components에서 CSS 변수 기반 시스템으로 전환하면서 깜빡임 현상을 완전히 해결할 수 있었는데, 그 과정을 공유해드리겠습니다.

## 현재 프로젝트 기술 스택

- **Framework**: Next.js
- **Styling**: styled-components
- **State Management**: Zustand
- **Language**: JavaScript/JSX

## 문제 상황: 다크모드 깜빡임 현상

### 문제 상황

다크모드로 설정해놓고 페이지를 새로고침하면, 잠깐 동안 라이트모드가 보였다가 다크모드로 바뀌는 깜빡임 현상이 발생했습니다. 사용자 경험에 좋지 않아서 해결책을 찾아보기로 했습니다.

### 기존 구현 방식

처음에는 styled-components와 Zustand를 사용해서 다크모드를 구현했습니다:

```javascript
// 기존 방식 (문제가 있던 코드)
const StyledButton = styled.button`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.textPrimary};
`;

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// pages/_app.jsx에서 ThemeProvider 사용
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

## 문제 분석

깜빡임 현상이 왜 발생하는지 분석해보니, Next.js의 렌더링 과정과 관련이 있었습니다.

### Next.js 렌더링 과정

Next.js는 다음과 같은 순서로 페이지를 렌더링합니다:

1. **서버에서 HTML 생성** (SSR)
2. **HTML을 브라우저로 전송**
3. **브라우저에서 HTML 파싱**
4. **React 하이드레이션** (JavaScript 실행)

### 브라우저 렌더링 파이프라인 이해하기

깜빡임 현상의 근본 원인을 이해하기 위해 브라우저의 렌더링 과정을 살펴보겠습니다.

#### Critical Rendering Path (중요 렌더링 경로)

브라우저는 다음과 같은 순서로 페이지를 렌더링합니다:

```
1. HTML 파싱 → 2. CSS 파싱 → 3. DOM 트리 생성 → 4. CSSOM 트리 생성 → 5. 렌더 트리 생성 → 6. 레이아웃 → 7. 페인팅
```

**1단계: HTML 파싱**
- 브라우저가 HTML을 파싱하여 **DOM 트리**를 구축
- `<script>` 태그를 만나면 HTML 파싱을 일시 중단하고 JavaScript 실행

**2단계: CSS 파싱**
- CSS 파일을 파싱하여 **CSSOM 트리**를 구축
- CSS 규칙들이 어떻게 적용될지 계산

**3단계: 렌더 트리 생성**
- DOM 트리와 CSSOM 트리를 결합하여 **렌더 트리** 생성
- 화면에 표시될 요소들만 포함 (`display: none` 요소는 제외)

**4단계: 레이아웃 (Reflow)**
- 각 요소의 정확한 위치와 크기 계산
- 뷰포트 크기에 따른 레이아웃 조정

**5단계: 페인팅**
- 실제 픽셀을 화면에 그리는 과정
- 배경색, 텍스트, 이미지 등을 렌더링

### 문제의 원인

styled-components를 사용할 때는 다음과 같은 순서로 동작했습니다:

```javascript
// 문제가 되는 렌더링 순서
1. Next.js 서버에서 SSR → 라이트모드로 HTML 생성
2. HTML 전송 및 브라우저 파싱 → 라이트모드로 렌더링
3. Next.js 클라이언트 하이드레이션 시작
4. _app.jsx에서 ThemeProvider 마운트
5. localStorage에서 테마 설정 읽기
6. styled-components가 동적으로 스타일 생성
7. DOM에 스타일 주입 및 리렌더링
8. 깜빡임 발생!
```

**핵심 문제**: styled-components는 JavaScript가 실행된 후에 스타일을 생성하고 주입하기 때문에, 초기 렌더링과 최종 렌더링 사이에 시간차가 발생합니다.

#### styled-components의 동작 방식

```javascript
// styled-components는 런타임에 스타일을 생성
const StyledButton = styled.button`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.textPrimary};
`;

// 이 과정에서:
// 1. JavaScript 실행
// 2. styled-components가 동적으로 CSS 생성
// 3. <style> 태그를 DOM에 주입
// 4. 브라우저가 새로운 CSS를 파싱
// 5. 레이아웃 재계산 (Reflow)
// 6. 다시 페인팅
```

이 과정에서 **Reflow**와 **Repaint**가 발생하여 성능 저하와 깜빡임 현상이 나타납니다.

## 해결 방법 찾기

문제를 해결하기 위해 여러 방법을 시도해보았습니다.

### 시도해본 방법들

1. **CSS-in-JS 라이브러리 변경**: emotion, styled-jsx 등
2. **서버사이드 렌더링 설정**: styled-components의 SSR 설정
3. **클라이언트 전용 렌더링**: useEffect로 조건부 렌더링

하지만 모두 근본적인 해결책이 되지 못했습니다.

### 최종 해결책: CSS 변수 시스템

CSS 변수를 사용하면 JavaScript 실행을 기다리지 않고도 즉시 테마를 적용할 수 있다는 것을 알게 되었습니다. 

#### CSS 변수의 장점

```css
/* CSS 변수는 컴파일 타임에 정의되고 즉시 적용됨 */
:root[data-theme='dark'] {
  --background: #111827;
  --text-primary: #f9fafb;
}

.button {
  background-color: var(--background); /* 즉시 적용 */
  color: var(--text-primary); /* 즉시 적용 */
}
```

**CSS 변수의 동작 방식:**
1. **컴파일 타임**: CSS 변수가 미리 정의됨
2. **즉시 적용**: `data-theme` 속성 변경과 동시에 모든 스타일 적용
3. **Reflow 최소화**: 레이아웃 재계산 없이 색상만 변경
4. **성능 향상**: 브라우저 네이티브 CSS 엔진 활용

이 방법으로 전환해보기로 했습니다.

## 실제 구현 과정

### 1단계: _document.jsx 수정

가장 중요한 부분은 `pages/_document.jsx` 파일을 수정하는 것이었습니다. 여기에 즉시 실행되는 스크립트를 추가했습니다:

```javascript
// pages/_document.jsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko" data-theme="light">
      <Head>
        <style>{`
          :root {
            /* Light theme variables */
            --background: #f9fafb;
            --surface: #ffffff;
            --text-primary: #111827;
            --text-secondary: #374151;
            --border: #d1d5db;
            --button-primary: #3b82f6;
            --button-hover: #2563eb;
          }

          [data-theme="dark"] {
            /* Dark theme variables */
            --background: #111827;
            --surface: #1f2937;
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --border: #4b5563;
            --button-primary: #3b82f6;
            --button-hover: #2563eb;
          }

          * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
          }

          body {
            background-color: var(--background);
            color: var(--text-primary);
          }
        `}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // localStorage에서 테마 설정 즉시 확인
                  var moimlogStorage = localStorage.getItem('moimlog-storage');
                  var isDarkMode = null;
                  
                  if (moimlogStorage) {
                    try {
                      var parsed = JSON.parse(moimlogStorage);
                      if (typeof parsed.state?.isDarkMode === 'boolean') {
                        isDarkMode = parsed.state.isDarkMode;
                      }
                    } catch (e) {}
                  }
                  
                  // fallback으로 theme 키도 확인
                  if (isDarkMode === null) {
                    var theme = localStorage.getItem('theme');
                    if (theme === 'dark') isDarkMode = true;
                    else if (theme === 'light') isDarkMode = false;
                  }
                  
                  // 시스템 설정 확인
                  if (isDarkMode === null && window.matchMedia && 
                      window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    isDarkMode = true;
                  }
                  
                  // 즉시 data-theme 속성 설정
                  document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

이 스크립트는 HTML이 파싱되는 즉시 실행되어 localStorage에서 테마 설정을 확인하고 `data-theme` 속성을 설정합니다.

### 2단계: CSS 파일 수정

기존의 styled-components 스타일을 CSS 변수로 변경했습니다:

```css
/* src/index.css */
:root[data-theme='light'] {
  --background: #f9fafb;
  --surface: #ffffff;
  --surface-secondary: #f3f4f6;
  --text-primary: #111827;
  --text-secondary: #374151;
  --text-tertiary: #6b7280;
  --border: #d1d5db;
  --border-light: #e5e7eb;
  --button-primary: #3b82f6;
  --button-secondary: #f3f4f6;
  --button-hover: #2563eb;
  --card-background: #ffffff;
  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --input-background: #ffffff;
  --input-border: #d1d5db;
  --input-focus: #3b82f6;
}

:root[data-theme='dark'] {
  --background: #111827;
  --surface: #1f2937;
  --surface-secondary: #374151;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --text-tertiary: #9ca3af;
  --border: #4b5563;
  --border-light: #6b7280;
  --button-primary: #3b82f6;
  --button-secondary: #374151;
  --button-hover: #2563eb;
  --card-background: #1f2937;
  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  --input-background: #374151;
  --input-border: #4b5563;
  --input-focus: #3b82f6;
}

/* 기본값 (data-theme이 없을 때) */
:root {
  --background: #f9fafb;
  --surface: #ffffff;
  --surface-secondary: #f3f4f6;
  --text-primary: #111827;
  --text-secondary: #374151;
  --text-tertiary: #6b7280;
  --border: #d1d5db;
  --border-light: #e5e7eb;
  --button-primary: #3b82f6;
  --button-secondary: #f3f4f6;
  --button-hover: #2563eb;
  --card-background: #ffffff;
  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --input-background: #ffffff;
  --input-border: #d1d5db;
  --input-focus: #3b82f6;
}

/* 컴포넌트에서 CSS 변수 사용 */
.button {
  background-color: var(--button-primary);
  color: #fff;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: var(--button-hover);
}

.container {
  background-color: var(--background);
  color: var(--text-primary);
}
```

### 3단계: Zustand 스토어 수정

기존 Zustand 스토어에 SSR 안전장치를 추가했습니다:

```javascript
// stores/useStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      isDarkMode: false,
      mounted: false, // Next.js SSR 안전장치
      theme: lightTheme,

      // 마운트 상태 설정 (클라이언트에서만)
      setMounted: (mounted) => set({ mounted }),

      // 테마 초기화 (마운트 후에만 실행)
      initializeTheme: () => {
        const currentState = get();
        const newTheme = currentState.isDarkMode ? darkTheme : lightTheme;
        set({ theme: newTheme });
        
        // data-theme 속성 동기화 (클라이언트에서만)
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute(
            'data-theme', 
            currentState.isDarkMode ? 'dark' : 'light'
          );
        }
      },

      // 다크모드 토글
      toggleTheme: () => {
        const currentState = get();
        const newIsDarkMode = !currentState.isDarkMode;
        const newTheme = newIsDarkMode ? darkTheme : lightTheme;

        set({
          isDarkMode: newIsDarkMode,
          theme: newTheme,
        });
      },
    }),
    {
      name: 'moimlog-storage', // Next.js에서 권장하는 네이밍
    }
  )
);
```

### 4단계: ThemeProvider 수정

기존 ThemeProvider를 CSS 변수 시스템에 맞게 수정했습니다:

```javascript
// utils/ThemeContext.js
import React, { createContext, useContext, useEffect } from "react";
import { useStore } from "../stores/useStore";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const {
    isDarkMode,
    mounted,
    setMounted,
    theme,
    toggleTheme,
    initializeTheme,
  } = useStore();

  // Next.js 클라이언트에서 마운트 시 mounted 상태 설정
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  // 마운트 후 테마 초기화 (Next.js 하이드레이션 완료 후)
  useEffect(() => {
    if (mounted) {
      initializeTheme();
    }
  }, [mounted, initializeTheme]);

  // 다크모드 상태 변경 시 data-theme 속성 적용
  useEffect(() => {
    if (mounted) {
      if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  }, [isDarkMode, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme, mounted }}>
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
```

### 5단계: 컴포넌트 수정

기존 styled-components를 사용하던 컴포넌트들을 CSS 클래스로 변경했습니다:

```javascript
// 기존 styled-components 방식
const StyledButton = styled.button`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.textPrimary};
`;

// 변경 후 CSS 클래스 방식
const Button = ({ children, ...props }) => {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
};
```

## 결과 확인

### 개선된 렌더링 과정

CSS 변수 시스템으로 변경한 후의 렌더링 순서는 다음과 같습니다:

```
1. Next.js 서버에서 SSR (기본 테마로 HTML 생성)
2. HTML 전송 및 브라우저 파싱
3. _document.jsx의 초기 스크립트 즉시 실행 → localStorage 확인 → data-theme 속성 설정
4. CSS 파싱 → CSS 변수가 즉시 적용
5. DOM 트리 생성 (올바른 테마로)
6. 렌더 트리 생성 (올바른 테마로)
7. 레이아웃 및 페인팅 (올바른 테마로)
8. Next.js 클라이언트 하이드레이션 (이미 올바른 테마가 적용된 상태)
9. ThemeProvider 초기화 (동기화만 수행)
```

### 렌더링 파이프라인 비교

#### Before (styled-components)
```
HTML 파싱 → CSS 파싱 → DOM/CSSOM 생성 → 렌더 트리 생성 → 레이아웃 → 페인팅 (라이트모드)
↓
JavaScript 실행 → styled-components 스타일 생성 → DOM 주입 → CSS 재파싱 → 레이아웃 재계산 → 재페인팅 (다크모드)
```

#### After (CSS 변수)
```
HTML 파싱 → CSS 파싱 → DOM/CSSOM 생성 → 렌더 트리 생성 → 레이아웃 → 페인팅 (올바른 테마)
```

**핵심 차이점**: CSS 변수는 추가적인 Reflow/Repaint 없이 즉시 적용되어 렌더링 파이프라인이 한 번만 실행됩니다.

### 성능 비교

| 구분 | styled-components | CSS 변수 |
|------|------------------|----------|
| 초기 렌더링 | Next.js 하이드레이션 후 | 즉시 |
| 스타일 주입 | 런타임 | 컴파일 타임 |
| 렌더링 파이프라인 | 2번 실행 (Reflow/Repaint) | 1번 실행 |
| 메모리 사용량 | 높음 | 낮음 |
| Next.js SSR 호환성 | 제한적 | 완벽 |
| 하이드레이션 일치성 | 불일치 가능 | 완벽 일치 |
| 깜빡임 | 발생 | 없음 |

## 추가 개선사항

### 부드러운 전환 효과

CSS 변수와 함께 transition을 추가해서 테마 전환이 더 부드럽게 보이도록 했습니다:

```css
* {
  transition: background-color 0.3s ease, 
              color 0.3s ease, 
              border-color 0.3s ease;
}
```

### 시스템 테마 감지

사용자가 시스템 설정을 변경했을 때도 자동으로 반영되도록 했습니다:

```javascript
// 시스템 다크모드 감지
if (isDarkMode === null && window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
  isDarkMode = true;
}
```

### 다중 fallback 전략

localStorage에 저장된 테마 설정이 없을 때를 대비해서 여러 단계의 fallback을 구현했습니다:

```javascript
// 1차: moimlog-storage 확인
// 2차: theme 키 확인  
// 3차: 시스템 설정 확인
// 4차: 기본값 사용
```

## 최종 결과

### Before (styled-components)
```javascript
// Next.js에서 깜빡임 발생 과정
1. Next.js 서버 SSR → 라이트모드로 HTML 생성
2. HTML 전송 및 브라우저 파싱 → 라이트모드로 렌더링
3. Next.js 클라이언트 하이드레이션 시작
4. _app.jsx에서 ThemeProvider 마운트
5. localStorage 확인 → 다크모드로 변경
6. styled-components 스타일 재생성 및 주입
7. DOM 업데이트 → 깜빡임!
```

### After (CSS 변수)
```javascript
// Next.js에서 깜빡임 없는 과정
1. Next.js 서버 SSR → 라이트모드로 HTML 생성
2. HTML 전송 및 브라우저 파싱
3. _document.jsx의 초기 스크립트 즉시 실행
4. localStorage 확인 → data-theme="dark" 설정
5. CSS 변수 즉시 적용 → 다크모드로 렌더링
6. Next.js 클라이언트 하이드레이션 → 이미 올바른 테마 적용됨
7. 깜빡임 없음!
```

## 마무리

styled-components에서 CSS 변수 시스템으로 전환하면서 다크모드 깜빡임 현상을 완전히 해결할 수 있었습니다. 

### 얻은 이점

- **깜빡임 현상 완전 해결**: 새로고침 시에도 부드러운 테마 전환
- **성능 향상**: JavaScript 실행을 기다리지 않는 즉시 적용
- **렌더링 최적화**: Reflow/Repaint 없이 한 번의 파이프라인으로 완료
- **메모리 사용량 감소**: 런타임 스타일 생성 불필요
- **Next.js 호환성**: SSR/SSG 모든 렌더링 모드에서 완벽 동작

### 배운 점

Next.js의 렌더링 과정을 이해하고, CSS 변수의 즉시성과 Next.js의 `_document.jsx`를 활용한 초기 스크립트 실행이 얼마나 중요한지 알 수 있었습니다.

특히 브라우저의 **Critical Rendering Path**를 이해하면서, 렌더링 파이프라인을 최소화하는 것이 성능과 사용자 경험에 얼마나 중요한지 깨달았습니다. CSS 변수는 단순한 스타일링 도구가 아니라, 브라우저의 네이티브 렌더링 엔진을 최대한 활용하는 최적화 기법이라는 것을 알게 되었습니다. 

이제 다크모드가 완벽하게 작동하고, 사용자 경험도 크게 개선되었습니다! 🎉

---

**참고 자료**
- [Next.js Rendering - Official Docs](https://nextjs.org/docs/basic-features/pages#server-side-rendering)
- [Next.js Custom Document - Official Docs](https://nextjs.org/docs/advanced-features/custom-document)
- [CSS Custom Properties - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Next.js Hydration - Official Docs](https://nextjs.org/docs/basic-features/pages#automatic-static-optimization)

---

**참고 자료**
- [Next.js Rendering - Official Docs](https://nextjs.org/docs/basic-features/pages#server-side-rendering)
- [Next.js Custom Document - Official Docs](https://nextjs.org/docs/advanced-features/custom-document)
- [CSS Custom Properties - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Next.js Hydration - Official Docs](https://nextjs.org/docs/basic-features/pages#automatic-static-optimization) 