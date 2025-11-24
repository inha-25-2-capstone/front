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
 * BERTopic 토픽 클러스터 포인트
 */
export interface BertopicPoint {
  topic_id: number; // 토픽 ID
  topic_name: string; // 토픽 이름
  x: number; // UMAP/t-SNE X 좌표
  y: number; // UMAP/t-SNE Y 좌표
  article_count: number; // 토픽 내 기사 수
  avg_stance: number; // 평균 스탠스 (-1 ~ +1)
  keywords: string[]; // 대표 키워드
}

/**
 * BERTopic 시각화 데이터
 * 백엔드가 이미지(PNG)를 반환하므로 이미지 URL을 저장
 */
export interface BertopicVisualizationData {
  imageUrl: string; // Blob URL 또는 API 엔드포인트 URL
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
  bertopicVisualization: BertopicVisualizationData; // BERTopic 토픽 클러스터
}

/**
 * BERTopic 시각화 포인트 데이터
 */
export interface BertopicPoint {
  topic_name: string; // 토픽 이름
  article_count: number; // 기사 수
  avg_stance: number; // 평균 스탠스 (-1 ~ 1)
  keywords: string[]; // 키워드 목록
  x: number; // UMAP X 좌표
  y: number; // UMAP Y 좌표
}
