/**
 * 공통 타입 정의
 */

/**
 * 스탠스(논조) 타입
 * - support: 옹호
 * - neutral: 중립
 * - oppose: 비판
 */
export type Stance = 'support' | 'neutral' | 'oppose';

/**
 * 스탠스 분포 (각 스탠스별 비율 또는 개수)
 */
export interface StanceDistribution {
  support: number;
  neutral: number;
  oppose: number;
}

/**
 * 페이지네이션 파라미터
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * 정렬 파라미터
 */
export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

/**
 * 날짜 범위 필터
 */
export interface DateRangeFilter {
  startDate?: string; // ISO 8601 형식
  endDate?: string; // ISO 8601 형식
}

/**
 * 기본 엔티티 인터페이스
 * @template ID - ID 타입 (기본값: number, Press는 string 사용)
 */
export interface BaseEntity<ID = number> {
  id: ID;
  createdAt?: string; // ISO 8601 형식
  updatedAt?: string; // ISO 8601 형식
}
