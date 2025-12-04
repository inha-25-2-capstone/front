/**
 * Topic API 서비스
 */

import { env } from '@/lib/env';
import { MOCK_ARTICLES } from '@/mocks/data/articles';
import { getMockTopicArticles, getMockTopicById, MOCK_TOPICS } from '@/mocks/data/topics';
import type {
  ArticleSummary,
  DailyKeywordsResponse,
  PaginatedResponse,
  Stance,
  TopicDetail,
  TopicSummary,
} from '@/types';

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
 * API 응답의 TopicSummary 변환 (mainArticle -> mainArticleImage, mainArticleStance 등)
 */
interface ApiTopicSummary
  extends Omit<TopicSummary, 'mainArticleImage' | 'mainArticleTitle' | 'mainArticleStance'> {
  mainArticle?: {
    title?: string;
    imageUrl?: string;
    stance?: Stance | null;
  };
  mainArticleTitle?: string;
  mainArticleImage?: string;
  mainArticleStance?: Stance | null;
}

const transformTopicSummary = (topic: ApiTopicSummary): TopicSummary => {
  const { mainArticle, ...rest } = topic;
  return {
    ...rest,
    mainArticleTitle: topic.mainArticleTitle || mainArticle?.title,
    mainArticleImage: topic.mainArticleImage || mainArticle?.imageUrl,
    mainArticleStance: topic.mainArticleStance || mainArticle?.stance || null,
  };
};

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

  const response = await apiClient.get<PaginatedResponse<ApiTopicSummary>>(
    `/topics?${queryParams.toString()}`,
  );

  // mainArticle 필드를 플랫하게 변환
  return {
    ...response.data,
    data: response.data.data.map(transformTopicSummary),
  };
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

  const response = await apiClient.get<ArticleSummary[]>(`/topics/${topicId}/recommendations`);
  return response.data;
};

/**
 * 일별 키워드 조회 파라미터
 */
interface GetDailyKeywordsParams {
  date?: string; // YYYY-MM-DD, 기본값: 오늘
  limit?: number; // 10-100, 기본값: 50
}

/**
 * 일별 키워드 조회 (워드클라우드용)
 */
export const getDailyKeywords = async (
  params?: GetDailyKeywordsParams,
): Promise<DailyKeywordsResponse> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return {
      date: params?.date || new Date().toISOString().split('T')[0],
      total_topics: 7,
      keywords: [
        { text: '윤석열', weight: 85 },
        { text: '대통령', weight: 78 },
        { text: '국회', weight: 65 },
        { text: '탄핵', weight: 60 },
        { text: '민주당', weight: 55 },
        { text: '국민의힘', weight: 50 },
        { text: '정치', weight: 45 },
        { text: '검찰', weight: 40 },
        { text: '총선', weight: 35 },
        { text: '여야', weight: 30 },
      ],
    };
  }

  const queryParams = new URLSearchParams();

  if (params?.date) {
    queryParams.append('date', params.date);
  }
  if (params?.limit) {
    queryParams.append('limit', params.limit.toString());
  }

  const queryString = queryParams.toString();
  const response = await apiClient.get<DailyKeywordsResponse>(
    `/topics/daily-keywords${queryString ? `?${queryString}` : ''}`,
  );
  return response.data;
};

/**
 * Topic Service 객체
 */
export const topicService = {
  getDailyKeywords,
  getTopicArticles,
  getTopicById,
  getTopicRecommendations,
  getTopics,
};
