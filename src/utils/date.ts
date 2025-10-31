/**
 * 날짜 관련 유틸리티 함수
 */

/**
 * ISO 8601 날짜를 한국어 형식으로 변환
 * @param isoDate - ISO 8601 형식의 날짜 문자열
 * @returns "2025년 10월 31일" 형식의 문자열
 *
 * @example
 * formatToKoreanDate('2025-10-31T12:00:00Z') // '2025년 10월 31일'
 */
export const formatToKoreanDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

/**
 * ISO 8601 날짜를 점(.) 구분 형식으로 변환
 * @param isoDate - ISO 8601 형식의 날짜 문자열
 * @returns "2025.10.31" 형식의 문자열
 *
 * @example
 * formatToDotDate('2025-10-31T12:00:00Z') // '2025.10.31'
 */
export const formatToDotDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

/**
 * ISO 8601 날짜를 한국어 형식 with 시간
 * @param isoDate - ISO 8601 형식의 날짜 문자열
 * @returns "2025년 10월 31일 오후 3:45" 형식의 문자열
 *
 * @example
 * formatToKoreanDateTime('2025-10-31T15:45:00Z') // '2025년 10월 31일 오후 3:45'
 */
export const formatToKoreanDateTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const period = hours < 12 ? '오전' : '오후';
  const displayHours = hours % 12 || 12;

  return `${year}년 ${month}월 ${day}일 ${period} ${displayHours}:${minutes}`;
};

/**
 * 상대 시간 표시 (예: "1시간 전", "3일 전")
 * @param isoDate - ISO 8601 형식의 날짜 문자열
 * @returns 상대 시간 문자열
 *
 * @example
 * formatRelativeTime('2025-10-31T12:00:00Z') // '2시간 전'
 */
export const formatRelativeTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '방금 전';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}주 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}년 전`;
};

/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 * @param date - Date 객체
 * @returns "2025-10-31" 형식의 문자열
 *
 * @example
 * formatToISODate(new Date()) // '2025-10-31'
 */
export const formatToISODate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
