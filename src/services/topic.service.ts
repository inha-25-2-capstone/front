/**
 * Topic API 서비스
 */

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
