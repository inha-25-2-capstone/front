/**
 * Article API 서비스
 */

import { env } from '@/lib/env';
import { getMockArticleById, getMockArticles } from '@/mocks/data/articles';
import type {
  ArticleDetail,
  ArticleFilter,
  ArticleSortField,
  ArticleSummary,
  PaginatedResponse,
  Stance,
} from '@/types';

import { apiClient } from './api-client';

/**
 * API 응답의 stance 객체 타입
 */
interface ApiStance {
  label: Stance;
  score: number;
  probabilities: {
    support: number;
    neutral: number;
    oppose: number;
  };
}

/**
 * 분석 중인지 확인 (probabilities가 모두 동일하거나 score가 0인 경우)
 */
const isAnalyzing = (stance: ApiStance): boolean => {
  const { probabilities, score } = stance;
  // score가 0이면 분석 중
  if (score === 0) return true;
  // probabilities가 모두 동일하면 분석 중
  const values = [probabilities.support, probabilities.neutral, probabilities.oppose];
  return values.every((v) => v === values[0]);
};

/**
 * stance 필드 변환 (객체 -> 문자열 또는 null)
 * 분석 중인 경우 null 반환
 */
const transformStance = (stance: Stance | ApiStance | null): Stance | null => {
  if (!stance) return null;
  if (typeof stance === 'string') return stance;
  // 분석 중인 경우 null 반환
  if (isAnalyzing(stance)) return null;
  return stance.label;
};

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
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    const { page = 1, limit = 20 } = params || {};
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return getMockArticles(page, limit);
  }

  const {
    page = 1,
    limit = 20,
    filter,
    sortField = 'publishedAt',
    sortOrder = 'desc',
  } = params || {};

  // camelCase를 snake_case로 변환
  const sortFieldMap: Record<string, string> = {
    publishedAt: 'published_at',
    viewCount: 'view_count',
    createdAt: 'created_at',
  };
  const snakeSortField = sortFieldMap[sortField] || sortField;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort: `${snakeSortField}:${sortOrder}`,
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

  const response = await apiClient.get<PaginatedResponse<ArticleSummary>>(
    `/articles?${queryParams.toString()}`,
  );
  return response.data;
};

/**
 * 기사 상세 조회
 */
export const getArticleById = async (
  articleId: number,
  include?: string,
): Promise<ArticleDetail> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return getMockArticleById(articleId);
  }

  const queryParams = include ? `?include=${include}` : '';
  const response = await apiClient.get<ArticleDetail>(`/articles/${articleId}${queryParams}`);

  // stance 필드 변환 (객체 -> 문자열, 분석 중이면 null)
  return {
    ...response.data,
    stance: transformStance(response.data.stance as Stance | ApiStance | null),
  };
};

/**
 * Article Service 객체
 */
export const articleService = {
  getArticles,
  getArticleById,
};
