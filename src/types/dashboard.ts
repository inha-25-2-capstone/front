/**
 * 대시보드 관련 타입 정의
 */

import type { Stance, StanceDistribution } from './common';
import type { PressActivity, PressSpectrum, PressStanceData } from './press';
import type { TopicSummary } from './topic';

/**
 * 대시보드 통계 카드 데이터
 */
export interface StatisticsCardData {
  icon: string;
  iconBgColor: string;
  label: string;
  value: string | number;
  subtitle: string;
  subtitleColor?: string;
}

/**
 * 대시보드 요약 정보
 */
export interface DashboardSummary {
  totalArticleCount: number;
  totalTopicCount: number;
  totalPressCount: number;
  mainTopic: {
    name: string;
    stanceDistribution: StanceDistribution;
  };
}

/**
 * 키워드 트렌드 데이터
 */
export interface KeywordData {
  text: string;
  stance: Stance;
  count?: number;
  weight?: number; // 가중치 (워드클라우드 크기용)
}

/**
 * 토픽별 스탠스 비율 차트 데이터
 */
export interface TopicStanceData {
  topic: string;
  support: number;
  neutral: number;
  oppose: number;
}

/**
 * 대시보드 전체 데이터
 */
export interface DashboardData {
  summary: DashboardSummary;
  topTopics: TopicSummary[]; // Top 7 토픽
  keywords: KeywordData[]; // 핵심 키워드
  topicStanceRatio: TopicStanceData[]; // 토픽별 스탠스 비율
  pressSpectrum: PressSpectrum[]; // 언론사 스펙트럼
  pressActivity: PressActivity[]; // 언론사 활동
  pressStanceHeatmap: {
    data: PressStanceData[];
    topics: string[];
  };
}
