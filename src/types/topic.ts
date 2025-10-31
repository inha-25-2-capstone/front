/**
 * 토픽 관련 타입 정의
 */

import type { ArticleDetail, ArticleSummary } from './article';
import type { BaseEntity, StanceDistribution } from './common';

/**
 * 토픽 기본 정보
 */
export interface Topic extends BaseEntity {
  name: string;
  description: string;
  articleCount: number;
  viewCount: number;
  isActive: boolean;
}

/**
 * 토픽 상세 정보
 */
export interface TopicDetail extends Topic {
  mainArticle: ArticleDetail; // 대표 기사
  stanceDistribution: StanceDistribution; // 스탠스 분포
  relatedArticles: ArticleSummary[]; // 관련 기사 목록
  keywords: string[]; // 핵심 키워드
}

/**
 * 토픽 요약 정보 (Top 7 리스트용)
 */
export interface TopicSummary {
  id: number;
  name: string;
  articleCount: number;
  viewCount: number;
  mainArticleTitle?: string;
  mainArticleImage?: string;
  stanceDistribution: StanceDistribution;
}

/**
 * 토픽 카드 정보 (메인 페이지용)
 */
export interface TopicCard {
  id: number;
  name: string;
  description: string;
  articleCount: number;
  dominantStance: 'support' | 'neutral' | 'oppose'; // 주요 스탠스
  thumbnail?: string;
}
