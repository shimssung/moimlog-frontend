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
            --tag-background: #e5e7eb;
            --tag-text: #374151;
            --success: #10b981;
            --error: #ef4444;
            --warning: #f59e0b;
          }

          [data-theme="dark"] {
            /* Dark theme variables */
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
            --tag-background: #4b5563;
            --tag-text: #d1d5db;
            --success: #10b981;
            --error: #ef4444;
            --warning: #f59e0b;
          }

          * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
          }

          body {
            background-color: var(--background);
            color: var(--text-primary);
            font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
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
                  // 진짜 아무것도 없을 때만 시스템 설정 사용
                  if (isDarkMode === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    isDarkMode = true;
                  }
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