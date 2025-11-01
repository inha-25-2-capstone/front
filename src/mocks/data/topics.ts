/**
 * Topic Mock 데이터
 */

import type { TopicDetail, TopicSummary } from '@/types';

import { MOCK_ARTICLES } from './articles';

export const MOCK_TOPICS: TopicSummary[] = [
  {
    id: 1,
    name: '대통령 정책',
    articleCount: 15,
    viewCount: 45000,
    stanceDistribution: { support: 5, neutral: 5, oppose: 5 },
  },
  {
    id: 2,
    name: '국회/정당',
    articleCount: 12,
    viewCount: 38000,
    stanceDistribution: { support: 4, neutral: 6, oppose: 2 },
  },
  {
    id: 3,
    name: '경제정책',
    articleCount: 18,
    viewCount: 52000,
    stanceDistribution: { support: 8, neutral: 5, oppose: 5 },
  },
];

export const getMockTopicById = (id: number): TopicDetail => {
  const topic = MOCK_TOPICS.find((t) => t.id === id);

  if (!topic) {
    throw new Error(`Topic with id ${id} not found`);
  }

  return {
    id: topic.id,
    name: topic.name,
    description: `${topic.name}에 대한 상세 설명입니다.`,
    articleCount: topic.articleCount,
    viewCount: topic.viewCount,
    isActive: true,
    stanceDistribution: topic.stanceDistribution,
    relatedArticles: MOCK_ARTICLES.slice(0, 5),
    keywords: ['정책', '국회', '대통령'],
    mainArticle: {
      id: 1,
      title: '대통령 탄핵정책 논란, 국회 긴급 회의 소집',
      content: '대표 기사의 본문 내용입니다.',
      summary: '대표 기사의 요약입니다.',
      imageUrl: '',
      originalUrl: 'https://example.com/news/article',
      publishedAt: '2025-10-28T10:00:00Z',
      viewCount: 15420,
      stance: 'oppose',
      pressId: 1,
      topicId: topic.id,
      press: {
        id: 1,
        name: 'JTBC뉴스',
        description: 'JTBC뉴스 설명',
        isActive: true,
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      topic: {
        id: topic.id,
        name: topic.name,
        description: `${topic.name} 설명`,
        articleCount: topic.articleCount,
        viewCount: topic.viewCount,
        isActive: true,
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      createdAt: '2025-10-28T10:00:00Z',
      updatedAt: '2025-10-28T10:00:00Z',
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  };
};

export const getMockTopicArticles = (page: number = 1, limit: number = 10) => {
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
