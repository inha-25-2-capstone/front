/**
 * Press Mock 데이터
 */

import type { PaginatedResponse, Press, PressDetail } from '@/types';

export const MOCK_PRESS_LIST: Press[] = [
  {
    id: '001',
    name: 'JTBC뉴스',
    description: 'JTBC뉴스의 최신 뉴스',
    articleCount: 45,
    stanceDistribution: { support: 15, neutral: 20, oppose: 10 },
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: '002',
    name: 'KBS뉴스',
    description: 'KBS뉴스의 최신 뉴스',
    articleCount: 38,
    stanceDistribution: { support: 12, neutral: 18, oppose: 8 },
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: '003',
    name: 'MBC뉴스',
    description: 'MBC뉴스의 최신 뉴스',
    articleCount: 42,
    stanceDistribution: { support: 14, neutral: 19, oppose: 9 },
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: '004',
    name: 'SBS뉴스',
    description: 'SBS뉴스의 최신 뉴스',
    articleCount: 40,
    stanceDistribution: { support: 13, neutral: 17, oppose: 10 },
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: '005',
    name: '경향신문',
    description: '경향신문의 최신 뉴스',
    articleCount: 35,
    stanceDistribution: { support: 10, neutral: 15, oppose: 10 },
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
];

export const getMockPressList = (): PaginatedResponse<Press> => {
  return {
    data: MOCK_PRESS_LIST,
    pagination: {
      page: 1,
      limit: 20,
      total: MOCK_PRESS_LIST.length,
      totalPages: 1,
    },
  };
};

export const getMockPressById = (id: string): PressDetail => {
  const press = MOCK_PRESS_LIST.find((p) => p.id === id);

  if (!press) {
    throw new Error(`Press with id ${id} not found`);
  }

  return {
    ...press,
    statistics: {
      pressId: id,
      articleCount: 25,
      totalViewCount: 125000,
      avgStanceScore: 0.5,
      stanceDistribution: { support: 8, neutral: 10, oppose: 7 },
      activityScore: 85,
    },
  };
};
