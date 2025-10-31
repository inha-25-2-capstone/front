/**
 * 언론사 관련 타입 정의
 */

import type { BaseEntity, StanceDistribution } from './common';

/**
 * 언론사 기본 정보
 */
export interface Press extends BaseEntity {
  name: string;
  description?: string;
  logoUrl?: string;
  websiteUrl?: string;
  politicalSpectrum?: number; // 정치 성향 (-100 ~ 100, 음수: 진보, 양수: 보수)
  isActive: boolean;
}

/**
 * 언론사 통계 정보
 */
export interface PressStatistics {
  pressId: number;
  articleCount: number;
  totalViewCount: number;
  avgStanceScore: number; // 평균 스탠스 점수
  stanceDistribution: StanceDistribution;
  activityScore: number; // 활동 지수 (0-100)
}

/**
 * 언론사 상세 정보
 */
export interface PressDetail extends Press {
  statistics: PressStatistics;
}

/**
 * 언론사 카드 정보 (리스트용)
 */
export interface PressCard {
  id: number;
  name: string;
  articleCount: number;
  description?: string;
  logoUrl?: string;
}

/**
 * 언론사 스펙트럼 데이터 (산점도용)
 */
export interface PressSpectrum {
  pressId: number;
  name: string;
  political: number; // 정치 성향 (-100 ~ 100)
  activity: number; // 활동 지수 (0-100)
}

/**
 * 언론사 활동 데이터
 */
export interface PressActivity {
  pressId: number;
  name: string;
  articleCount: number;
  activityScore: number;
  stanceDistribution: StanceDistribution;
}

/**
 * 언론사 스탠스 히트맵 데이터
 */
export interface PressStanceData {
  press: string; // 언론사명
  topics: Record<string, 'support' | 'neutral' | 'oppose'>; // 토픽별 주요 스탠스
}
