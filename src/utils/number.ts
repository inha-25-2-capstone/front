/**
 * 숫자 포맷 관련 유틸리티 함수
 */

/**
 * 숫자를 천 단위 콤마로 구분
 * @param num - 포맷할 숫자
 * @returns 콤마가 포함된 문자열
 *
 * @example
 * formatNumber(1234567) // '1,234,567'
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('ko-KR');
};

/**
 * 숫자를 축약 형식으로 변환 (1K, 1M 등)
 * @param num - 축약할 숫자
 * @returns 축약된 문자열
 *
 * @example
 * formatCompactNumber(1234) // '1.2K'
 * formatCompactNumber(1234567) // '1.2M'
 */
export const formatCompactNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 1000000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }

  if (num < 1000000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }

  return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
};

/**
 * 한국어 숫자 표기 (1만, 10만, 1억 등)
 * @param num - 변환할 숫자
 * @returns 한국어 숫자 표기 문자열
 *
 * @example
 * formatKoreanNumber(12345) // '1만 2,345'
 * formatKoreanNumber(123456789) // '1억 2,345만 6,789'
 */
export const formatKoreanNumber = (num: number): string => {
  if (num < 10000) {
    return formatNumber(num);
  }

  const eok = Math.floor(num / 100000000);
  const man = Math.floor((num % 100000000) / 10000);
  const rest = num % 10000;

  const parts: string[] = [];

  if (eok > 0) {
    parts.push(`${formatNumber(eok)}억`);
  }

  if (man > 0) {
    parts.push(`${formatNumber(man)}만`);
  }

  if (rest > 0 || parts.length === 0) {
    parts.push(formatNumber(rest));
  }

  return parts.join(' ');
};

/**
 * 퍼센트 포맷
 * @param value - 변환할 값 (0-100)
 * @param decimals - 소수점 자리수 (기본값: 0)
 * @returns 퍼센트 문자열
 *
 * @example
 * formatPercent(45.6789, 2) // '45.68%'
 */
export const formatPercent = (value: number, decimals: number = 0): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * 비율을 퍼센트로 변환 (0-1 -> 0-100%)
 * @param ratio - 비율 (0-1)
 * @param decimals - 소수점 자리수 (기본값: 0)
 * @returns 퍼센트 문자열
 *
 * @example
 * ratioToPercent(0.456, 1) // '45.6%'
 */
export const ratioToPercent = (ratio: number, decimals: number = 0): string => {
  return formatPercent(ratio * 100, decimals);
};

/**
 * 조회수 포맷 (한글 단위)
 * @param views - 조회수
 * @returns 포맷된 조회수 문자열
 *
 * @example
 * formatViewCount(1234) // '1,234회'
 * formatViewCount(12345) // '1만 2,345회'
 */
export const formatViewCount = (views: number): string => {
  return `${formatKoreanNumber(views)}회`;
};

/**
 * 범위 제한
 * @param value - 값
 * @param min - 최소값
 * @param max - 최대값
 * @returns 범위 내로 제한된 값
 *
 * @example
 * clamp(150, 0, 100) // 100
 * clamp(-10, 0, 100) // 0
 * clamp(50, 0, 100) // 50
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
