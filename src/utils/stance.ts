/**
 * 스탠스(논조) 관련 유틸리티 함수
 */

import type { Stance } from '@/types';

/**
 * 스탠스 색상 맵
 */
export const STANCE_COLORS = {
  support: '#4caf50', // 초록 (옹호)
  neutral: '#9e9e9e', // 회색 (중립)
  oppose: '#f44336', // 빨강 (비판)
} as const;

/**
 * 스탠스 라벨 맵
 */
export const STANCE_LABELS = {
  support: '옹호',
  neutral: '중립',
  oppose: '비판',
} as const;

/**
 * 스탠스에 해당하는 색상 가져오기
 * @param stance - 스탠스 타입
 * @returns 색상 코드 (hex)
 *
 * @example
 * getStanceColor('support') // '#4caf50'
 */
export const getStanceColor = (stance: Stance): string => {
  return STANCE_COLORS[stance];
};

/**
 * 스탠스에 해당하는 한글 라벨 가져오기
 * @param stance - 스탠스 타입
 * @returns 한글 라벨
 *
 * @example
 * getStanceLabel('support') // '옹호'
 */
export const getStanceLabel = (stance: Stance): string => {
  return STANCE_LABELS[stance];
};

/**
 * 스탠스 색상 (밝은 배경용)
 */
export const STANCE_LIGHT_COLORS = {
  support: '#e8f5e9', // 연한 초록
  neutral: '#f5f5f5', // 연한 회색
  oppose: '#ffebee', // 연한 빨강
} as const;

/**
 * 스탠스에 해당하는 밝은 배경 색상 가져오기
 * @param stance - 스탠스 타입
 * @returns 밝은 배경 색상 코드 (hex)
 *
 * @example
 * getStanceLightColor('support') // '#e8f5e9'
 */
export const getStanceLightColor = (stance: Stance): string => {
  return STANCE_LIGHT_COLORS[stance];
};

/**
 * 스탠스 통계 계산
 * @param stanceDistribution - 스탠스 분포 (support, neutral, oppose)
 * @returns 전체 개수와 비율
 *
 * @example
 * getStanceStatistics({ support: 10, neutral: 5, oppose: 5 })
 * // { total: 20, percentages: { support: 50, neutral: 25, oppose: 25 } }
 */
export const getStanceStatistics = (stanceDistribution: {
  support: number;
  neutral: number;
  oppose: number;
}): {
  total: number;
  percentages: {
    support: number;
    neutral: number;
    oppose: number;
  };
} => {
  const total = stanceDistribution.support + stanceDistribution.neutral + stanceDistribution.oppose;

  if (total === 0) {
    return {
      total: 0,
      percentages: {
        support: 0,
        neutral: 0,
        oppose: 0,
      },
    };
  }

  return {
    total,
    percentages: {
      support: Math.round((stanceDistribution.support / total) * 100),
      neutral: Math.round((stanceDistribution.neutral / total) * 100),
      oppose: Math.round((stanceDistribution.oppose / total) * 100),
    },
  };
};

/**
 * 주요 스탠스 가져오기 (가장 많은 비율을 차지하는 스탠스)
 * @param stanceDistribution - 스탠스 분포
 * @returns 주요 스탠스
 *
 * @example
 * getDominantStance({ support: 10, neutral: 5, oppose: 3 }) // 'support'
 */
export const getDominantStance = (stanceDistribution: {
  support: number;
  neutral: number;
  oppose: number;
}): Stance => {
  const { support, neutral, oppose } = stanceDistribution;

  if (support >= neutral && support >= oppose) {
    return 'support';
  }

  if (neutral >= support && neutral >= oppose) {
    return 'neutral';
  }

  return 'oppose';
};
