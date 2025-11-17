/**
 * Topic API 서비스
 */

import { env } from '@/lib/env';
import { MOCK_ARTICLES } from '@/mocks/data/articles';
import { getMockTopicArticles, getMockTopicById, MOCK_TOPICS } from '@/mocks/data/topics';
import type { ArticleSummary, PaginatedResponse, Stance, TopicDetail, TopicSummary } from '@/types';

import { apiClient } from './api-client';

/**
 * 토픽 목록 조회 파라미터
 */
interface GetTopicsParams {
  page?: number;
  limit?: number;
  include?: string;
}

/**
 * 토픽 기사 조회 파라미터
 */
interface GetTopicArticlesParams {
  topicId: number;
  page?: number;
  limit?: number;
  stance?: Stance | '전체';
}

/**
 * 토픽 목록 조회
 */
export const getTopics = async (
  params?: GetTopicsParams,
): Promise<PaginatedResponse<TopicSummary>> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    const { page = 1, limit = 20 } = params || {};
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션

    const start = (page - 1) * limit;
    const end = start + limit;
    const data = MOCK_TOPICS.slice(start, end);

    return {
      data,
      pagination: {
        page,
        limit,
        total: MOCK_TOPICS.length,
        totalPages: Math.ceil(MOCK_TOPICS.length / limit),
      },
    };
  }

  const { page = 1, limit = 20, include } = params || {};

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (include) {
    queryParams.append('include', include);
  }

  const response = await apiClient.get<{ data: PaginatedResponse<TopicSummary> }>(
    `/topics?${queryParams.toString()}`,
  );
  return response.data.data;
};

/**
 * 토픽 상세 조회
 */
export const getTopicById = async (topicId: number, include?: string): Promise<TopicDetail> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return getMockTopicById(topicId);
  }

  const queryParams = include ? `?include=${include}` : '';
  const response = await apiClient.get<{ data: TopicDetail }>(`/topics/${topicId}${queryParams}`);
  return response.data.data;
};

/**
 * 토픽 관련 기사 목록 조회
 */
export const getTopicArticles = async (
  params: GetTopicArticlesParams,
): Promise<PaginatedResponse<ArticleSummary>> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    const { page = 1, limit = 20 } = params;
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return getMockTopicArticles(page, limit);
  }

  const { topicId, page = 1, limit = 20, stance } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (stance && stance !== '전체') {
    queryParams.append('stance', stance);
  }

  const response = await apiClient.get<{ data: PaginatedResponse<ArticleSummary> }>(
    `/topics/${topicId}/articles?${queryParams.toString()}`,
  );
  return response.data.data;
};

/**
 * 토픽 추천 기사 조회
 */
export const getTopicRecommendations = async (topicId: number): Promise<ArticleSummary[]> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return MOCK_ARTICLES.slice(0, 3); // 처음 3개 기사 반환
  }

  const response = await apiClient.get<{ data: ArticleSummary[] }>(
    `/topics/${topicId}/recommendations`,
  );
  return response.data.data;
};

/**
 * Topic Service 객체
 */
export const topicService = {
  getTopics,
  getTopicById,
  getTopicArticles,
  getTopicRecommendations,
};
