/**
 * Press Mock 데이터
 */

import type { PaginatedResponse, Press, PressDetail } from '@/types';

export const MOCK_PRESS_LIST: Press[] = [
  {
    id: 1,
    name: 'JTBC뉴스',
    description: 'JTBC뉴스의 최신 뉴스',
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'KBS뉴스',
    description: 'KBS뉴스의 최신 뉴스',
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 3,
    name: 'MBC뉴스',
    description: 'MBC뉴스의 최신 뉴스',
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 4,
    name: 'SBS뉴스',
    description: 'SBS뉴스의 최신 뉴스',
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 5,
    name: '경향신문',
    description: '경향신문의 최신 뉴스',
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
];

export const getMockPressList = (): PaginatedResponse<Press> => {
  return {
    items: MOCK_PRESS_LIST,
    pagination: {
      page: 1,
      limit: 20,
      totalItems: MOCK_PRESS_LIST.length,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    },
  };
};

export const getMockPressById = (id: number): PressDetail => {
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
