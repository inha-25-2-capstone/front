/**
 * API 응답 타입 정의
 */

import type { ArticleDetail, ArticleSummary } from './article';
import type { PaginationParams } from './common';
import type { DashboardData, DashboardSummary, KeywordData, TopicStanceData } from './dashboard';
import type { Press, PressActivity, PressSpectrum, PressStanceData } from './press';
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
 * 참고: API는 snake_case로 응답하지만, 프론트엔드에서 camelCase로 변환됨
 */
export interface PaginatedResponse<T> {
  data: T[]; // API의 data 필드 그대로 사용
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number; // API의 total_pages를 camelCase로 변환
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
 * 참고: /api/press는 배열을 직접 반환 (래핑 없음)
 */
export interface PressApiResponses {
  '/api/press': Press[]; // 직접 배열 반환
  '/api/press/:id': Press; // 단일 객체 반환
  '/api/press/:id/articles': PaginatedResponse<ArticleSummary>;
  '/api/press/activity': PressActivity[];
  '/api/press/stance-heatmap': {
    data: PressStanceData[];
    topics: string[];
  };
}

/**
 * API 요청 파라미터 타입
 * 참고: API에 전송 시 snake_case로 변환됨
 */
export interface ApiRequestParams {
  // 기사 목록 조회
  getArticles: PaginationParams & {
    pressId?: string;
    topicId?: number;
    stance?: string;
    startDate?: string;
    endDate?: string;
    sort?: string;
  };

  // 토픽 목록 조회
  getTopics: PaginationParams & {
    include?: string;
    date?: string;
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
