/**
 * API 응답 타입 정의
 */

import type { ArticleDetail, ArticleSummary } from './article';
import type { PaginationParams } from './common';
import type { DashboardData, DashboardSummary, KeywordData, TopicStanceData } from './dashboard';
import type { Press, PressActivity, PressDetail, PressSpectrum, PressStanceData } from './press';
import type { TopicDetail, TopicSummary } from './topic';

/**
 * API 기본 응답 타입
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * API 에러 응답 타입
 */
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * 페이지네이션된 응답 타입
 */
export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Dashboard API 응답 타입
 */
export interface DashboardApiResponses {
  '/api/dashboard/summary': ApiResponse<DashboardSummary>;
  '/api/dashboard/keywords': ApiResponse<KeywordData[]>;
  '/api/dashboard/topics/stance-ratio': ApiResponse<TopicStanceData[]>;
  '/api/dashboard/press-spectrum': ApiResponse<PressSpectrum[]>;
  '/api/dashboard': ApiResponse<DashboardData>;
}

/**
 * Topic API 응답 타입
 */
export interface TopicApiResponses {
  '/api/topics': ApiResponse<PaginatedResponse<TopicSummary>>;
  '/api/topics/:id': ApiResponse<TopicDetail>;
  '/api/topics/:id/articles': ApiResponse<PaginatedResponse<ArticleSummary>>;
  '/api/topics/:id/recommendations': ApiResponse<ArticleSummary[]>;
}

/**
 * Article API 응답 타입
 */
export interface ArticleApiResponses {
  '/api/articles': ApiResponse<PaginatedResponse<ArticleSummary>>;
  '/api/articles/:id': ApiResponse<ArticleDetail>;
}

/**
 * Press API 응답 타입
 */
export interface PressApiResponses {
  '/api/press': ApiResponse<PaginatedResponse<Press>>;
  '/api/press/:id': ApiResponse<PressDetail>;
  '/api/press/:id/articles': ApiResponse<PaginatedResponse<ArticleSummary>>;
  '/api/press/activity': ApiResponse<PressActivity[]>;
  '/api/press/stance-heatmap': ApiResponse<{
    data: PressStanceData[];
    topics: string[];
  }>;
}

/**
 * API 요청 파라미터 타입
 */
export interface ApiRequestParams {
  // 기사 목록 조회
  getArticles: PaginationParams & {
    pressId?: number;
    topicId?: number;
    stance?: string;
    startDate?: string;
    endDate?: string;
    sort?: string;
  };

  // 토픽 목록 조회
  getTopics: PaginationParams & {
    include?: string;
  };

  // 언론사 목록 조회
  getPress: PaginationParams & {
    sort?: string;
    include?: string;
  };

  // 토픽 상세 조회
  getTopicDetail: {
    topicId: number;
    include?: string;
  };

  // 기사 상세 조회
  getArticleDetail: {
    articleId: number;
    include?: string;
  };
}
