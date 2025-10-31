/**
 * Article 관련 React Query Hooks
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { articleService } from '@/services';
import type {
  ArticleDetail,
  ArticleFilter,
  ArticleSortField,
  ArticleSummary,
  PaginatedResponse,
} from '@/types';

/**
 * 기사 목록 조회 파라미터
 */
interface UseArticlesParams {
  page?: number;
  limit?: number;
  filter?: ArticleFilter;
  sortField?: ArticleSortField;
  sortOrder?: 'asc' | 'desc';
  enabled?: boolean; // 쿼리 활성화 여부
}

/**
 * 기사 목록 조회
 */
export const useArticles = (
  params?: UseArticlesParams,
): UseQueryResult<PaginatedResponse<ArticleSummary>, Error> => {
  const { enabled = true, ...queryParams } = params || {};

  return useQuery({
    queryKey: ['articles', queryParams],
    queryFn: () => articleService.getArticles(queryParams),
    staleTime: 2 * 60 * 1000, // 2분
    enabled,
  });
};

/**
 * 기사 상세 조회 파라미터
 */
interface UseArticleDetailParams {
  articleId: number;
  include?: string;
  enabled?: boolean;
}

/**
 * 기사 상세 조회
 */
export const useArticleDetail = (
  params: UseArticleDetailParams,
): UseQueryResult<ArticleDetail, Error> => {
  const { articleId, include, enabled = true } = params;

  return useQuery({
    queryKey: ['articles', articleId, include],
    queryFn: () => articleService.getArticleById(articleId, include),
    staleTime: 5 * 60 * 1000, // 5분
    enabled: enabled && !!articleId,
  });
};
