/**
 * Press 관련 React Query Hooks
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { pressService } from '@/services';
import type { ArticleSummary, PaginatedResponse, Press, PressDetail } from '@/types';

/**
 * 언론사 목록 조회 파라미터
 */
interface UsePressListParams {
  page?: number;
  limit?: number;
  sort?: string;
  include?: string;
  enabled?: boolean;
}

/**
 * 언론사 목록 조회
 */
export const usePressList = (
  params?: UsePressListParams,
): UseQueryResult<PaginatedResponse<Press>, Error> => {
  const { enabled = true, ...queryParams } = params || {};

  return useQuery({
    queryKey: ['press', 'list', queryParams],
    queryFn: () => pressService.getPressList(queryParams),
    staleTime: 10 * 60 * 1000, // 10분 (언론사 정보는 자주 변경되지 않음)
    enabled,
  });
};

/**
 * 언론사 상세 조회 파라미터
 */
interface UsePressDetailParams {
  pressId: number;
  enabled?: boolean;
}

/**
 * 언론사 상세 조회
 */
export const usePressDetail = (
  params: UsePressDetailParams,
): UseQueryResult<PressDetail, Error> => {
  const { pressId, enabled = true } = params;

  return useQuery({
    queryKey: ['press', pressId],
    queryFn: () => pressService.getPressById(pressId),
    staleTime: 10 * 60 * 1000, // 10분
    enabled: enabled && !!pressId,
  });
};

/**
 * 언론사별 기사 조회 파라미터
 */
interface UsePressArticlesParams {
  pressId: number;
  page?: number;
  limit?: number;
  sortField?: 'publishedAt' | 'viewCount';
  sortOrder?: 'asc' | 'desc';
  enabled?: boolean;
}

/**
 * 언론사별 기사 목록 조회
 */
export const usePressArticles = (
  params: UsePressArticlesParams,
): UseQueryResult<PaginatedResponse<ArticleSummary>, Error> => {
  const { enabled = true, ...queryParams } = params;

  return useQuery({
    queryKey: ['press', queryParams.pressId, 'articles', queryParams],
    queryFn: () => pressService.getPressArticles(queryParams),
    staleTime: 2 * 60 * 1000, // 2분
    enabled: enabled && !!queryParams.pressId,
  });
};
