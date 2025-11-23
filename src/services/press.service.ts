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

  const response = await apiClient.get<{ data: PaginatedResponse<Press> }>(
    `/press?${queryParams.toString()}`,
  );
  return response.data.data;
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

  // 서버가 개별 언론사 조회를 지원하지 않으므로 전체 목록을 가져와서 필터링
  const response = await apiClient.get<Press[]>(`/press?include=statistics`);

  if (!response.data || response.data.length === 0) {
    throw new Error('언론사 목록을 불러올 수 없습니다.');
  }

  // 배열에서 정확히 일치하는 ID를 찾음
  const press = response.data.find((p) => p.id === pressId);

  if (!press) {
    throw new Error(`언론사 ID ${pressId}를 찾을 수 없습니다.`);
  }

  return press as PressDetail;
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

  // sortField를 snake_case로 변환 (publishedAt -> published_at)
  const sortFieldSnake = sortField === 'publishedAt' ? 'published_at' : sortField;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort: `${sortFieldSnake}:${sortOrder}`,
  });

  // /press/{press_id}/articles 엔드포인트 사용
  // 인터셉터가 자동으로 { data, pagination } → { items, pagination }로 변환
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
