/**
 * Article Mock 데이터
 */

import type { ArticleDetail, ArticleSummary, PaginatedResponse } from '@/types';

export const MOCK_ARTICLES: ArticleSummary[] = [
  {
    id: 1,
    title: '대통령 탄핵정책 논란, 국회 긴급 회의 소집',
    press: 'JTBC뉴스',
    pressId: 1,
    date: '2025.10.28',
    imageUrl: '',
    stance: 'oppose',
    viewCount: 15420,
  },
  {
    id: 2,
    title: '경제정책 발표, 내년도 예산안 통과 전망',
    press: 'KBS뉴스',
    pressId: 2,
    date: '2025.10.28',
    imageUrl: '',
    stance: 'support',
    viewCount: 12350,
  },
  {
    id: 3,
    title: '국정감사 본격 시작, 주요 쟁점은?',
    press: 'MBC뉴스',
    pressId: 3,
    date: '2025.10.28',
    imageUrl: '',
    stance: 'neutral',
    viewCount: 9840,
  },
  {
    id: 4,
    title: '부동산 정책 개편안 발표, 시장 반응은',
    press: 'SBS뉴스',
    pressId: 4,
    date: '2025.10.27',
    imageUrl: '',
    stance: 'oppose',
    viewCount: 11200,
  },
  {
    id: 5,
    title: '투표율 상승세, 젊은 층 정치 참여 증가',
    press: '경향신문',
    pressId: 5,
    date: '2025.10.27',
    imageUrl: '',
    stance: 'support',
    viewCount: 8750,
  },
];

export const getMockArticles = (
  page: number = 1,
  limit: number = 20,
): PaginatedResponse<ArticleSummary> => {
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = MOCK_ARTICLES.slice(start, end);

  return {
    items,
    pagination: {
      page,
      limit,
      totalItems: MOCK_ARTICLES.length,
      totalPages: Math.ceil(MOCK_ARTICLES.length / limit),
      hasNext: page < Math.ceil(MOCK_ARTICLES.length / limit),
      hasPrev: page > 1,
    },
  };
};

export const getMockArticleById = (id: number): ArticleDetail => {
  const article = MOCK_ARTICLES.find((a) => a.id === id);

  if (!article) {
    throw new Error(`Article with id ${id} not found`);
  }

  return {
    id: article.id,
    title: article.title,
    content: `이것은 ${article.title}의 본문 내용입니다.

실제 기사의 상세한 내용이 여기에 표시됩니다. 백엔드 API가 연결되면 실제 기사 본문으로 대체됩니다.

현재는 더미 데이터를 사용하여 UI를 확인할 수 있습니다.`,
    summary: `${article.title}에 대한 요약입니다.`,
    imageUrl: article.imageUrl,
    originalUrl: 'https://example.com/news/article',
    publishedAt: '2025-10-28T10:00:00Z',
    viewCount: article.viewCount || 0,
    stance: article.stance,
    pressId: article.pressId,
    topicId: 1,
    press: {
      id: article.pressId,
      name: article.press,
      description: `${article.press}의 설명`,
      isActive: true,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    topic: {
      id: 1,
      name: '대통령 정책',
      description: '대통령 정책 관련 뉴스',
      articleCount: 10,
      viewCount: 45000,
      isActive: true,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    relatedArticles: MOCK_ARTICLES.filter((a) => a.id !== id).slice(0, 3),
    createdAt: '2025-10-28T10:00:00Z',
    updatedAt: '2025-10-28T10:00:00Z',
  };
};
