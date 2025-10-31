/**
 * Article API 서비스
 */

import type {
  ArticleDetail,
  ArticleFilter,
  ArticleSortField,
  ArticleSummary,
  PaginatedResponse,
} from '@/types';

import { apiClient } from './api-client';

/**
 * 기사 목록 조회 파라미터
 */
interface GetArticlesParams {
  page?: number;
  limit?: number;
  filter?: ArticleFilter;
  sortField?: ArticleSortField;
  sortOrder?: 'asc' | 'desc';
}

/**
 * 기사 목록 조회
 */
export const getArticles = async (
  params?: GetArticlesParams,
): Promise<PaginatedResponse<ArticleSummary>> => {
  const {
    page = 1,
    limit = 20,
    filter,
    sortField = 'publishedAt',
    sortOrder = 'desc',
  } = params || {};

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort: `${sortField}:${sortOrder}`,
  });

  // 필터 추가
  if (filter?.pressId) {
    queryParams.append('pressId', filter.pressId.toString());
  }
  if (filter?.topicId) {
    queryParams.append('topicId', filter.topicId.toString());
  }
  if (filter?.stance && filter.stance !== '전체') {
    queryParams.append('stance', filter.stance);
  }
  if (filter?.startDate) {
    queryParams.append('startDate', filter.startDate);
  }
  if (filter?.endDate) {
    queryParams.append('endDate', filter.endDate);
  }

  const response = await apiClient.get<{ data: PaginatedResponse<ArticleSummary> }>(
    `/articles?${queryParams.toString()}`,
  );
  return response.data.data;
};

/**
 * 기사 상세 조회
 */
export const getArticleById = async (
  articleId: number,
  include?: string,
): Promise<ArticleDetail> => {
  const queryParams = include ? `?include=${include}` : '';
  const response = await apiClient.get<{ data: ArticleDetail }>(
    `/articles/${articleId}${queryParams}`,
  );
  return response.data.data;
};

/**
 * Article Service 객체
 */
export const articleService = {
  getArticles,
  getArticleById,
};
