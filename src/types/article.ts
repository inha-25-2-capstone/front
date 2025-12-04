/**
 * 기사 관련 타입 정의
 */

import type { BaseEntity, Stance } from './common';
import type { Press } from './press';
import type { Topic } from './topic';

/**
 * 기사 기본 정보
 */
export interface Article extends BaseEntity {
  title: string;
  content: string;
  summary: string;
  imageUrl?: string;
  originalUrl: string;
  publishedAt: string; // ISO 8601 형식
  viewCount: number;
  stance: Stance | null; // null인 경우 분석 중
  pressId: string; // Press ID는 문자열
  topicId: number;
}

/**
 * 기사 상세 정보 (관계 데이터 포함)
 */
export interface ArticleDetail extends Article {
  press: Press;
  topic: Topic;
  relatedArticles?: ArticleSummary[];
}

/**
 * 기사 요약 정보 (리스트 표시용)
 */
export interface ArticleSummary {
  id: number;
  title: string;
  press: string | { id: string; name: string } | null; // 언론사 정보 (문자열 또는 객체)
  pressId: string;
  date?: string; // 표시용 날짜 (예: "2025.10.28")
  publishedAt?: string; // ISO 8601 형식 날짜
  imageUrl?: string;
  stance: Stance | null; // null인 경우 분석 중
  viewCount?: number;
}

/**
 * 기사 필터 옵션
 */
export interface ArticleFilter {
  pressId?: string;
  topicId?: number;
  stance?: Stance | '전체';
  startDate?: string;
  endDate?: string;
}

/**
 * 기사 정렬 옵션
 */
export type ArticleSortField = 'publishedAt' | 'viewCount' | 'createdAt';

/**
 * 추천 기사 (사이드바용)
 */
export interface RecommendedArticle {
  id: number;
  title: string;
  press: string | { id: string; name: string } | null; // 언론사 정보 (문자열 또는 객체)
  stance: Stance | null; // null인 경우 분석 중
  similarity?: number; // 유사도 점수 (0-1)
}
