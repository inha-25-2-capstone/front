/**
 * Dashboard 관련 React Query Hooks
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { dashboardService } from '@/services';
import type {
  BertopicVisualizationData,
  DashboardData,
  DashboardSummary,
  KeywordData,
  PressActivity,
  PressSpectrum,
  PressStanceData,
  TopicStanceData,
} from '@/types';

/**
 * 대시보드 요약 정보 조회
 */
export const useDashboardSummary = (): UseQueryResult<DashboardSummary, Error> => {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: dashboardService.getSummary,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 핵심 키워드 트렌드 조회
 */
export const useKeywords = (): UseQueryResult<KeywordData[], Error> => {
  return useQuery({
    queryKey: ['dashboard', 'keywords'],
    queryFn: dashboardService.getKeywords,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 토픽별 스탠스 비율 조회
 */
export const useTopicStanceRatio = (): UseQueryResult<TopicStanceData[], Error> => {
  return useQuery({
    queryKey: ['dashboard', 'topicStanceRatio'],
    queryFn: dashboardService.getTopicStanceRatio,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 언론사 정치 스펙트럼 조회
 */
export const usePressSpectrum = (): UseQueryResult<PressSpectrum[], Error> => {
  return useQuery({
    queryKey: ['dashboard', 'pressSpectrum'],
    queryFn: dashboardService.getPressSpectrum,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 언론사 활동 지표 조회
 */
export const usePressActivity = (): UseQueryResult<PressActivity[], Error> => {
  return useQuery({
    queryKey: ['dashboard', 'pressActivity'],
    queryFn: dashboardService.getPressActivity,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 언론사 스탠스 히트맵 데이터 조회
 */
export const usePressStanceHeatmap = (): UseQueryResult<
  {
    data: PressStanceData[];
    topics: string[];
  },
  Error
> => {
  return useQuery({
    queryKey: ['dashboard', 'pressStanceHeatmap'],
    queryFn: dashboardService.getPressStanceHeatmap,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * BERTopic 토픽 클러스터 시각화 데이터 조회
 */
export const useBertopicVisualization = (): UseQueryResult<
  BertopicVisualizationData,
  Error
> => {
  return useQuery({
    queryKey: ['dashboard', 'bertopicVisualization'],
    queryFn: dashboardService.getBertopicVisualization,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 전체 대시보드 데이터 조회
 * (모든 대시보드 데이터를 한 번에 가져옴)
 */
export const useDashboardData = (): UseQueryResult<DashboardData, Error> => {
  return useQuery({
    queryKey: ['dashboard', 'all'],
    queryFn: dashboardService.getDashboardData,
    staleTime: 5 * 60 * 1000, // 5분
  });
};
