/**
 * Press API 서비스
 */

import type { ArticleSummary, PaginatedResponse, Press, PressDetail } from '@/types';

import { apiClient } from './api-client';

/**
 * 언론사 목록 조회 파라미터
 */
interface GetPressListParams {
  page?: number;
  limit?: number;
  sort?: string;
  include?: string;
}

/**
 * 언론사 기사 조회 파라미터
 */
interface GetPressArticlesParams {
  pressId: number;
  page?: number;
  limit?: number;
  sortField?: 'publishedAt' | 'viewCount';
  sortOrder?: 'asc' | 'desc';
}

/**
 * 언론사 목록 조회
 */
export const getPressList = async (
  params?: GetPressListParams,
): Promise<PaginatedResponse<Press>> => {
  const { page = 1, limit = 20, sort = 'name:asc', include } = params || {};

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort,
  });

  if (include) {
    queryParams.append('include', include);
  }

  const response = await apiClient.get<{ data: PaginatedResponse<Press> }>(
    `/press?${queryParams.toString()}`,
  );
  return response.data.data;
};

/**
 * 언론사 상세 조회
 */
export const getPressById = async (pressId: number): Promise<PressDetail> => {
  const response = await apiClient.get<{ data: PressDetail }>(`/press/${pressId}`);
  return response.data.data;
};

/**
 * 언론사별 기사 목록 조회
 */
export const getPressArticles = async (
  params: GetPressArticlesParams,
): Promise<PaginatedResponse<ArticleSummary>> => {
  const { pressId, page = 1, limit = 20, sortField = 'publishedAt', sortOrder = 'desc' } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort: `${sortField}:${sortOrder}`,
  });

  const response = await apiClient.get<{ data: PaginatedResponse<ArticleSummary> }>(
    `/press/${pressId}/articles?${queryParams.toString()}`,
  );
  return response.data.data;
};

/**
 * Press Service 객체
 */
export const pressService = {
  getPressList,
  getPressById,
  getPressArticles,
};
