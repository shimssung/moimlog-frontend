/**
 * HTML 특수문자를 이스케이프 처리하는 함수
 * @param {string} str - 이스케이프 처리할 문자열
 * @returns {string} 이스케이프 처리된 문자열
 */
export const escapeHtml = (str) => {
  if (!str) return "";

  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * URL을 안전하게 검증하는 함수
 * @param {string} url - 검증할 URL
 * @returns {boolean} URL이 안전한지 여부
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * 사용자 입력을 정제하는 함수
 * @param {string} input - 정제할 입력값
 * @param {Object} options - 정제 옵션
 * @returns {string} 정제된 문자열
 */
export const sanitizeInput = (input, options = {}) => {
  if (!input) return "";

  const {
    allowHtml = false,
    maxLength = 1000,
    allowedTags = [],
    allowedAttributes = [],
  } = options;

  // 최대 길이 제한
  let sanitized = input.slice(0, maxLength);

  if (!allowHtml) {
    // HTML 태그 제거
    sanitized = sanitized.replace(/<[^>]*>/g, "");
  } else {
    // 허용된 태그만 유지
    const allowedTagsRegex = new RegExp(
      `<(?!/?(${allowedTags.join("|")})[^>]*>)`,
      "g"
    );
    sanitized = sanitized.replace(allowedTagsRegex, "&lt;");
  }

  // 특수문자 이스케이프
  sanitized = escapeHtml(sanitized);

  return sanitized;
};

/**
 * 폼 데이터를 정제하는 함수
 * @param {Object} formData - 정제할 폼 데이터
 * @returns {Object} 정제된 폼 데이터
 */
export const sanitizeFormData = (formData) => {
  const sanitized = {};

  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "string" ? sanitizeInput(item) : item
      );
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeFormData(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
};
