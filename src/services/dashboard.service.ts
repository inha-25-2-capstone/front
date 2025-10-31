/**
 * Dashboard API 서비스
 */

import type {
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
  const response = await apiClient.get<{ data: DashboardSummary }>('/dashboard/summary');
  return response.data.data;
};

/**
 * 핵심 키워드 트렌드 조회
 */
export const getKeywords = async (): Promise<KeywordData[]> => {
  const response = await apiClient.get<{ data: KeywordData[] }>('/dashboard/keywords');
  return response.data.data;
};

/**
 * 토픽별 스탠스 비율 조회
 */
export const getTopicStanceRatio = async (): Promise<TopicStanceData[]> => {
  const response = await apiClient.get<{ data: TopicStanceData[] }>(
    '/dashboard/topics/stance-ratio',
  );
  return response.data.data;
};

/**
 * 언론사 정치 스펙트럼 조회
 */
export const getPressSpectrum = async (): Promise<PressSpectrum[]> => {
  const response = await apiClient.get<{ data: PressSpectrum[] }>('/dashboard/press-spectrum');
  return response.data.data;
};

/**
 * 언론사 활동 지표 조회
 */
export const getPressActivity = async (): Promise<PressActivity[]> => {
  const response = await apiClient.get<{ data: PressActivity[] }>('/press/activity');
  return response.data.data;
};

/**
 * 언론사 스탠스 히트맵 데이터 조회
 */
export const getPressStanceHeatmap = async (): Promise<{
  data: PressStanceData[];
  topics: string[];
}> => {
  const response = await apiClient.get<{
    data: { data: PressStanceData[]; topics: string[] };
  }>('/press/stance-heatmap');
  return response.data.data;
};

/**
 * 전체 대시보드 데이터 조회
 */
export const getDashboardData = async (): Promise<DashboardData> => {
  const response = await apiClient.get<{ data: DashboardData }>('/dashboard');
  return response.data.data;
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
  getDashboardData,
};
