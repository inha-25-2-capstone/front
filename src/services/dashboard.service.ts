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

  const response = await apiClient.get<TopicStanceData[]>('/dashboard/topics/stance-ratio');
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
 * API 응답 타입 (언론사 스탠스 분포)
 */
interface ApiPressStanceDistribution {
  date: string;
  totalTopics: number;
  pressList: Array<{
    pressId: string;
    pressName: string;
    topicStances: Array<{
      topicId: number;
      topicName: string;
      dominantStance: 'support' | 'neutral' | 'oppose';
      distribution: {
        support: number;
        neutral: number;
        oppose: number;
      };
    }>;
  }>;
}

/**
 * 언론사 스탠스 히트맵 데이터 조회
 */
export const getPressStanceHeatmap = async (): Promise<{
  data: PressStanceData[];
  topics: string[];
}> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return MOCK_PRESS_STANCE_HEATMAP;
  }

  const response = await apiClient.get<ApiPressStanceDistribution>(
    '/press/stance-distribution?limit=10',
  );

  const apiData = response.data;

  // 모든 언론사의 토픽을 수집하여 고유한 토픽 목록 생성
  const topicMap = new Map<number, string>();
  apiData.pressList.forEach((press) => {
    press.topicStances.forEach((topic) => {
      if (!topicMap.has(topic.topicId)) {
        topicMap.set(topic.topicId, topic.topicName.slice(0, 15) + '...');
      }
    });
  });

  // topicId 순서로 정렬된 토픽 목록
  const sortedTopicIds = Array.from(topicMap.keys()).sort((a, b) => a - b);
  const topics = sortedTopicIds.map((id) => topicMap.get(id)!);

  // PressStanceData 형식으로 변환
  const data: PressStanceData[] = apiData.pressList
    .map((press) => {
      // 해당 언론사의 토픽별 스탠스를 Map으로 변환
      const stanceMap = new Map(press.topicStances.map((t) => [t.topicId, t.dominantStance]));

      // 모든 토픽에 대해 스탠스 매핑 (없으면 null 처리를 위해 빈 값)
      const topicsRecord: Record<string, 'support' | 'neutral' | 'oppose'> = {};
      sortedTopicIds.forEach((topicId) => {
        const topicKey = topicMap.get(topicId)!;
        const stance = stanceMap.get(topicId);
        if (stance) {
          topicsRecord[topicKey] = stance;
        }
      });

      return {
        press: press.pressName,
        topics: topicsRecord,
      };
    })
    .sort((a, b) => a.press.localeCompare(b.press, 'ko')); // 언론사명 가나다순 정렬

  return { data, topics };
};

/**
 * BERTopic 토픽 클러스터 시각화 데이터 조회
 * 백엔드가 PNG 이미지를 반환하므로 Blob으로 받아서 URL로 변환
 */
export const getBertopicVisualization = async (): Promise<BertopicVisualizationData> => {
  // Mock 모드 체크
  if (env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    return MOCK_BERTOPIC_VISUALIZATION;
  }

  // 이미지를 blob으로 받아오기
  const response = await apiClient.get<Blob>('/topics/visualization', {
    responseType: 'blob',
  });

  // Blob을 URL로 변환
  const imageUrl = URL.createObjectURL(response.data);

  return { imageUrl };
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
