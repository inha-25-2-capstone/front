/**
 * Dashboard API 서비스
 */

import { env } from '@/lib/env';
import {
  MOCK_BERTOPIC_VISUALIZATION,
  MOCK_DASHBOARD_DATA,
  MOCK_DASHBOARD_SUMMARY,
  MOCK_KEYWORDS,
  MOCK_PRESS_ACTIVITY,
  MOCK_PRESS_SPECTRUM,
  MOCK_PRESS_STANCE_HEATMAP,
  MOCK_TOPIC_STANCE_RATIO,
} from '@/mocks/data/dashboard';
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

import { apiClient } from './api-client';

/**
 * 대시보드 요약 정보 조회
 */
export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return MOCK_DASHBOARD_SUMMARY;
  }

  const response = await apiClient.get<DashboardSummary>('/dashboard/summary');
  return response.data;
};

/**
 * 핵심 키워드 트렌드 조회
 * Note: 백엔드 API 미구현으로 Mock 데이터 사용
 */
export const getKeywords = async (): Promise<KeywordData[]> => {
  // 백엔드 API 미구현 - 항상 Mock 데이터 반환
  await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
  return MOCK_KEYWORDS;
};

/**
 * 토픽별 스탠스 비율 조회
 */
export const getTopicStanceRatio = async (): Promise<TopicStanceData[]> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return MOCK_TOPIC_STANCE_RATIO;
  }

  const response = await apiClient.get<TopicStanceData[]>(
    '/dashboard/topics/stance-ratio',
  );
  return response.data;
};

/**
 * 언론사 정치 스펙트럼 조회
 */
export const getPressSpectrum = async (): Promise<PressSpectrum[]> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return MOCK_PRESS_SPECTRUM;
  }

  const response = await apiClient.get<PressSpectrum[]>('/dashboard/press-spectrum');
  return response.data;
};

/**
 * 언론사 활동 지표 조회
 */
export const getPressActivity = async (): Promise<PressActivity[]> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return MOCK_PRESS_ACTIVITY;
  }

  const response = await apiClient.get<PressActivity[]>('/press/activity');
  return response.data;
};

/**
 * 언론사 스탠스 히트맵 데이터 조회
 * Note: 백엔드 API 미구현으로 Mock 데이터 사용
 */
export const getPressStanceHeatmap = async (): Promise<{
  data: PressStanceData[];
  topics: string[];
}> => {
  // 백엔드 API 미구현 - 항상 Mock 데이터 반환
  await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
  return MOCK_PRESS_STANCE_HEATMAP;
};

/**
 * BERTopic 토픽 클러스터 시각화 데이터 조회
 */
export const getBertopicVisualization = async (): Promise<BertopicVisualizationData> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return MOCK_BERTOPIC_VISUALIZATION;
  }

  const response = await apiClient.get<BertopicVisualizationData>(
    '/topics/visualization',
  );
  return response.data;
};

/**
 * 전체 대시보드 데이터 조회
 */
export const getDashboardData = async (): Promise<DashboardData> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return MOCK_DASHBOARD_DATA;
  }

  const response = await apiClient.get<DashboardData>('/dashboard');
  return response.data;
};

/**
 * Dashboard Service 객체
 */
export const dashboardService = {
  getSummary: getDashboardSummary,
  getKeywords,
  getTopicStanceRatio,
  getPressSpectrum,
  getPressActivity,
  getPressStanceHeatmap,
  getBertopicVisualization,
  getDashboardData,
};
