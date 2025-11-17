/**
 * API 응답 변환 유틸리티
 * 백엔드 API는 snake_case로 응답하지만, 프론트엔드는 camelCase를 사용
 */

import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

/**
 * API 응답을 snake_case에서 camelCase로 변환
 * @param data - API 응답 데이터
 * @returns camelCase로 변환된 데이터
 */
export function toCamelCase<T>(data: unknown): T {
  return camelcaseKeys(data as Record<string, unknown>, { deep: true }) as T;
}

/**
 * 요청 파라미터를 camelCase에서 snake_case로 변환
 * @param params - 요청 파라미터
 * @returns snake_case로 변환된 파라미터
 */
export function toSnakeCase<T>(params: Record<string, unknown>): T {
  return snakecaseKeys(params, { deep: true }) as T;
}

/**
 * URL 쿼리 파라미터를 snake_case로 변환하여 생성
 * @param params - 쿼리 파라미터 객체
 * @returns URLSearchParams 객체
 */
export function buildQueryParams(params: Record<string, unknown>): URLSearchParams {
  const snakeParams = toSnakeCase<Record<string, unknown>>(params);
  const searchParams = new URLSearchParams();

  Object.entries(snakeParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams;
}
