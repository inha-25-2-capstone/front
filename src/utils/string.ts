/**
 * 문자열 관련 유틸리티 함수
 */

/**
 * 문자열 자르기 (말줄임표 추가)
 * @param text - 자를 문자열
 * @param maxLength - 최대 길이
 * @returns 잘린 문자열 (말줄임표 포함)
 *
 * @example
 * truncate('긴 텍스트입니다', 5) // '긴 텍스트...'
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

/**
 * HTML 태그 제거
 * @param html - HTML 문자열
 * @returns 순수 텍스트
 *
 * @example
 * stripHtml('<p>안녕하세요</p>') // '안녕하세요'
 */
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

/**
 * 첫 글자 대문자 변환
 * @param text - 변환할 문자열
 * @returns 첫 글자가 대문자인 문자열
 *
 * @example
 * capitalize('hello') // 'Hello'
 */
export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * 공백 제거 (앞뒤 및 중간 연속 공백)
 * @param text - 정리할 문자열
 * @returns 정리된 문자열
 *
 * @example
 * normalizeWhitespace('  hello   world  ') // 'hello world'
 */
export const normalizeWhitespace = (text: string): string => {
  return text.trim().replace(/\s+/g, ' ');
};

/**
 * 검색어 하이라이팅을 위한 문자열 분리
 * @param text - 전체 텍스트
 * @param query - 검색어
 * @returns 하이라이팅할 부분과 일반 부분이 구분된 배열
 *
 * @example
 * highlightText('안녕하세요 반갑습니다', '반갑')
 * // [{ text: '안녕하세요 ', highlight: false }, { text: '반갑', highlight: true }, { text: '습니다', highlight: false }]
 */
export const highlightText = (
  text: string,
  query: string,
): Array<{ text: string; highlight: boolean }> => {
  if (!query) {
    return [{ text, highlight: false }];
  }

  const parts: Array<{ text: string; highlight: boolean }> = [];
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  let lastIndex = 0;
  let index = lowerText.indexOf(lowerQuery);

  while (index !== -1) {
    // 이전 부분 추가
    if (index > lastIndex) {
      parts.push({
        text: text.substring(lastIndex, index),
        highlight: false,
      });
    }

    // 하이라이트 부분 추가
    parts.push({
      text: text.substring(index, index + query.length),
      highlight: true,
    });

    lastIndex = index + query.length;
    index = lowerText.indexOf(lowerQuery, lastIndex);
  }

  // 남은 부분 추가
  if (lastIndex < text.length) {
    parts.push({
      text: text.substring(lastIndex),
      highlight: false,
    });
  }

  return parts;
};

/**
 * URL에서 도메인 추출
 * @param url - URL 문자열
 * @returns 도메인 문자열
 *
 * @example
 * extractDomain('https://www.example.com/path') // 'example.com'
 */
export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};
