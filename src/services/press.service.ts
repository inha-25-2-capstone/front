/**
 * Press API 서비스
 */

import { env } from '@/lib/env';
import { MOCK_ARTICLES } from '@/mocks/data/articles';
import { getMockPressById, getMockPressList } from '@/mocks/data/press';
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
  pressId: string;
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
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return getMockPressList();
  }

  const { page = 1, limit = 20, sort = 'name:asc', include } = params || {};

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort,
  });

  if (include) {
    queryParams.append('include', include);
  }

  // Press API는 배열을 직접 반환하므로 래핑이 없음
  const response = await apiClient.get<Press[]>(`/press?${queryParams.toString()}`);
  // 배열을 PaginatedResponse 형식으로 래핑
  return {
    data: response.data,
    pagination: {
      page,
      limit,
      total: response.data.length,
      totalPages: Math.ceil(response.data.length / limit),
    },
  };
};

/**
 * 언론사 상세 조회
 */
export const getPressById = async (pressId: string): Promise<PressDetail> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return getMockPressById(pressId);
  }

  // Press API는 단일 객체를 직접 반환
  const response = await apiClient.get<Press>(`/press/${pressId}`);
  return response.data as PressDetail;
};

/**
 * 언론사별 기사 목록 조회
 */
export const getPressArticles = async (
  params: GetPressArticlesParams,
): Promise<PaginatedResponse<ArticleSummary>> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    const { pressId, page = 1, limit = 20 } = params;
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션

    // 해당 언론사의 기사만 필터링
    const filteredArticles = MOCK_ARTICLES.filter((article) => article.pressId === pressId);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filteredArticles.slice(start, end);

    return {
      data,
      pagination: {
        page,
        limit,
        total: filteredArticles.length,
        totalPages: Math.ceil(filteredArticles.length / limit),
      },
    };
  }

  const { pressId, page = 1, limit = 20, sortField = 'publishedAt', sortOrder = 'desc' } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort: `${sortField}:${sortOrder}`,
  });

  // API 응답이 이미 PaginatedResponse 형태이며, 인터셉터가 camelCase로 변환함
  const response = await apiClient.get<PaginatedResponse<ArticleSummary>>(
    `/press/${pressId}/articles?${queryParams.toString()}`,
  );
  return response.data;
};

/**
 * Press Service 객체
 */
export const pressService = {
  getPressList,
  getPressById,
  getPressArticles,
};
