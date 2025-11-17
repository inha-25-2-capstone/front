/**
 * Topic 관련 React Query Hooks
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { topicService } from '@/services';
import type { ArticleSummary, PaginatedResponse, Stance, TopicDetail, TopicSummary } from '@/types';

/**
 * 토픽 목록 조회 파라미터
 */
interface UseTopicsParams {
  page?: number;
  limit?: number;
  include?: string;
  enabled?: boolean;
}

/**
 * 토픽 목록 조회
 */
export const useTopics = (
  params?: UseTopicsParams,
): UseQueryResult<PaginatedResponse<TopicSummary>, Error> => {
  const { enabled = true, ...queryParams } = params || {};

  return useQuery({
    queryKey: ['topics', queryParams],
    queryFn: () => topicService.getTopics(queryParams),
    staleTime: 5 * 60 * 1000, // 5분
    enabled,
  });
};

/**
 * 토픽 상세 조회 파라미터
 */
interface UseTopicDetailParams {
  topicId: number;
  include?: string;
  enabled?: boolean;
}

/**
 * 토픽 상세 조회
 */
export const useTopicDetail = (
  params: UseTopicDetailParams,
): UseQueryResult<TopicDetail, Error> => {
  const { topicId, include, enabled = true } = params;

  return useQuery({
    queryKey: ['topics', topicId, include],
    queryFn: () => topicService.getTopicById(topicId, include),
    staleTime: 5 * 60 * 1000, // 5분
    enabled: enabled && !!topicId,
  });
};

/**
 * 토픽 관련 기사 조회 파라미터
 */
interface UseTopicArticlesParams {
  topicId: number;
  page?: number;
  limit?: number;
  stance?: Stance | '전체';
  enabled?: boolean;
}

/**
 * 토픽 관련 기사 목록 조회
 */
export const useTopicArticles = (
  params: UseTopicArticlesParams,
): UseQueryResult<PaginatedResponse<ArticleSummary>, Error> => {
  const { enabled = true, ...queryParams } = params;

  return useQuery({
    queryKey: ['topics', queryParams.topicId, 'articles', queryParams],
    queryFn: () => topicService.getTopicArticles(queryParams),
    staleTime: 2 * 60 * 1000, // 2분
    enabled: enabled && !!queryParams.topicId,
  });
};

/**
 * 토픽 추천 기사 조회 파라미터
 */
interface UseTopicRecommendationsParams {
  topicId: number;
  enabled?: boolean;
}

/**
 * 토픽 추천 기사 조회
 */
export const useTopicRecommendations = (
  params: UseTopicRecommendationsParams,
): UseQueryResult<ArticleSummary[], Error> => {
  const { topicId, enabled = true } = params;

  return useQuery({
    queryKey: ['topics', topicId, 'recommendations'],
    queryFn: () => topicService.getTopicRecommendations(topicId),
    staleTime: 5 * 60 * 1000, // 5분
    enabled: enabled && !!topicId,
  });
};

/**
 * 토픽 시각화 이미지 조회 파라미터
 */
interface UseTopicVisualizationParams {
  enabled?: boolean;
}

/**
 * 토픽 시각화 이미지 조회
 * BERTopic 클러스터 시각화 PNG 이미지를 반환
 */
export const useTopicVisualization = (
  params?: UseTopicVisualizationParams,
): UseQueryResult<string, Error> => {
  const { enabled = true } = params || {};

  return useQuery({
    queryKey: ['topics', 'visualization'],
    queryFn: () => topicService.getTopicVisualization(),
    staleTime: 10 * 60 * 1000, // 10분 (시각화는 자주 변경되지 않음)
    enabled,
    retry: false, // 데이터가 없을 경우 재시도하지 않음
  });
};
