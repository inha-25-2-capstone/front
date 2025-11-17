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

  // API 응답이 이미 PaginatedResponse 형태이며, 인터셉터가 camelCase로 변환함
  const response = await apiClient.get<PaginatedResponse<TopicSummary>>(
    `/topics?${queryParams.toString()}`,
  );
  return response.data;
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
  // API 응답이 직접 TopicDetail 객체이며, 인터셉터가 camelCase로 변환함
  const response = await apiClient.get<TopicDetail>(`/topics/${topicId}${queryParams}`);
  return response.data;
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

  // API 응답이 이미 PaginatedResponse 형태이며, 인터셉터가 camelCase로 변환함
  const response = await apiClient.get<PaginatedResponse<ArticleSummary>>(
    `/topics/${topicId}/articles?${queryParams.toString()}`,
  );
  return response.data;
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

  // API 응답이 배열이며, 인터셉터가 camelCase로 변환함
  const response = await apiClient.get<ArticleSummary[]>(`/topics/${topicId}/recommendations`);
  return response.data;
};

/**
 * 토픽 시각화 이미지 조회
 * BERTopic 클러스터 시각화 PNG 이미지를 반환
 */
export const getTopicVisualization = async (): Promise<string> => {
  // Mock 모드에서는 빈 문자열 반환
  if (env.VITE_USE_MOCK_DATA === 'true') {
    return '';
  }

  try {
    const response = await apiClient.get<Blob>('/topics/visualization', {
      responseType: 'blob',
    });

    // Blob을 Data URL로 변환
    return URL.createObjectURL(response.data);
  } catch (error) {
    // 데이터가 없을 경우 빈 문자열 반환
    console.warn('Topic visualization not available:', error);
    return '';
  }
};

/**
 * Topic Service 객체
 */
export const topicService = {
  getTopics,
  getTopicById,
  getTopicArticles,
  getTopicRecommendations,
  getTopicVisualization,
};
