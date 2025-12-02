/**
 * Dashboard Mock 데이터
 */

import type {
  BertopicVisualizationData,
  DashboardData,
  DashboardSummary,
  KeywordData,
  PressActivity,
  PressSpectrum,
  PressStanceData,
  TopicStanceData,
} from '@/types';

import { MOCK_TOPICS } from './topics';

/**
 * 대시보드 요약 정보 Mock
 */
export const MOCK_DASHBOARD_SUMMARY: DashboardSummary = {
  totalArticleCount: 45,
  totalTopicCount: 7,
  totalPressCount: 5,
  mainTopic: {
    name: '대통령 정책',
    stanceDistribution: { support: 8, neutral: 10, oppose: 7 },
  },
};

/**
 * 핵심 키워드 트렌드 Mock
 */
export const MOCK_KEYWORDS: KeywordData[] = [
  { text: '대통령', stance: 'neutral', count: 120, weight: 100 },
  { text: '국회', stance: 'neutral', count: 95, weight: 80 },
  { text: '경제정책', stance: 'support', count: 85, weight: 70 },
  { text: '야당', stance: 'oppose', count: 75, weight: 65 },
  { text: '여당', stance: 'support', count: 70, weight: 60 },
  { text: '법안', stance: 'neutral', count: 65, weight: 55 },
  { text: '선거', stance: 'neutral', count: 60, weight: 50 },
  { text: '개혁', stance: 'support', count: 55, weight: 45 },
  { text: '예산안', stance: 'neutral', count: 50, weight: 42 },
  { text: '외교', stance: 'neutral', count: 45, weight: 38 },
];

/**
 * 토픽별 스탠스 비율 Mock
 */
export const MOCK_TOPIC_STANCE_RATIO: TopicStanceData[] = [
  {
    topic: '대통령 경제정책 발표에 대한 여야 공방',
    support: 5,
    neutral: 5,
    oppose: 5,
  },
  {
    topic: '국회 예산안 처리 놓고 여야 대립 격화',
    support: 4,
    neutral: 6,
    oppose: 2,
  },
  {
    topic: '반도체 산업 지원법 통과 여부 논란',
    support: 8,
    neutral: 5,
    oppose: 5,
  },
  {
    topic: '한미일 정상회담 성과와 향후 과제',
    support: 6,
    neutral: 4,
    oppose: 4,
  },
  {
    topic: '저출산 대책 예산 증액안 국회 제출',
    support: 7,
    neutral: 6,
    oppose: 3,
  },
  {
    topic: '대학입시 제도 개편안 발표 후 파장',
    support: 5,
    neutral: 4,
    oppose: 4,
  },
  {
    topic: '노동시간 단축 법안 처리 일정 합의',
    support: 3,
    neutral: 5,
    oppose: 3,
  },
];

/**
 * 언론사 정치 스펙트럼 Mock
 */
export const MOCK_PRESS_SPECTRUM: PressSpectrum[] = [
  { pressId: '001', name: 'JTBC뉴스', political: -30, activity: 85 },
  { pressId: '002', name: 'KBS뉴스', political: 10, activity: 92 },
  { pressId: '003', name: 'MBC뉴스', political: -10, activity: 78 },
  { pressId: '004', name: 'SBS뉴스', political: -20, activity: 88 },
  { pressId: '005', name: '경향신문', political: -40, activity: 75 },
];

/**
 * 언론사 활동 지표 Mock
 */
export const MOCK_PRESS_ACTIVITY: PressActivity[] = [
  {
    pressId: '001',
    name: 'JTBC뉴스',
    articleCount: 25,
    activityScore: 85,
    stanceDistribution: { support: 5, neutral: 12, oppose: 8 },
  },
  {
    pressId: '002',
    name: 'KBS뉴스',
    articleCount: 30,
    activityScore: 92,
    stanceDistribution: { support: 15, neutral: 10, oppose: 5 },
  },
  {
    pressId: '003',
    name: 'MBC뉴스',
    articleCount: 22,
    activityScore: 78,
    stanceDistribution: { support: 8, neutral: 9, oppose: 5 },
  },
  {
    pressId: '004',
    name: 'SBS뉴스',
    articleCount: 28,
    activityScore: 88,
    stanceDistribution: { support: 10, neutral: 12, oppose: 6 },
  },
  {
    pressId: '005',
    name: '경향신문',
    articleCount: 20,
    activityScore: 75,
    stanceDistribution: { support: 4, neutral: 8, oppose: 8 },
  },
];

/**
 * 언론사 스탠스 히트맵 Mock
 */
export const MOCK_PRESS_STANCE_HEATMAP: {
  data: PressStanceData[];
  topics: string[];
} = {
  data: [
    {
      press: 'JTBC뉴스',
      topics: {
        '대통령 경제정책': 'oppose',
        '국회 예산안': 'oppose',
        '반도체 지원법': 'support',
        '한미일 회담': 'neutral',
        '저출산 대책': 'support',
        '입시 제도': 'neutral',
        '노동시간 단축': 'support',
        '외교 정책': 'neutral',
      },
    },
    {
      press: 'KBS뉴스',
      topics: {
        '대통령 경제정책': 'support',
        '국회 예산안': 'support',
        '반도체 지원법': 'support',
        '한미일 회담': 'support',
        '저출산 대책': 'support',
        '입시 제도': 'neutral',
        '노동시간 단축': 'neutral',
        '외교 정책': 'support',
      },
    },
    {
      press: 'MBC뉴스',
      topics: {
        '대통령 경제정책': 'neutral',
        '국회 예산안': 'neutral',
        '반도체 지원법': 'support',
        '한미일 회담': 'neutral',
        '저출산 대책': 'support',
        '입시 제도': 'oppose',
        '노동시간 단축': 'neutral',
        '외교 정책': 'neutral',
      },
    },
    {
      press: 'SBS뉴스',
      topics: {
        '대통령 경제정책': 'oppose',
        '국회 예산안': 'neutral',
        '반도체 지원법': 'support',
        '한미일 회담': 'support',
        '저출산 대책': 'neutral',
        '입시 제도': 'oppose',
        '노동시간 단축': 'neutral',
        '외교 정책': 'support',
      },
    },
    {
      press: '경향신문',
      topics: {
        '대통령 경제정책': 'oppose',
        '국회 예산안': 'oppose',
        '반도체 지원법': 'neutral',
        '한미일 회담': 'oppose',
        '저출산 대책': 'support',
        '입시 제도': 'oppose',
        '노동시간 단축': 'support',
        '외교 정책': 'oppose',
      },
    },
  ],
  topics: [
    '대통령 경제정책',
    '국회 예산안',
    '반도체 지원법',
    '한미일 회담',
    '저출산 대책',
    '입시 제도',
    '노동시간 단축',
    '외교 정책',
  ],
};

/**
 * BERTopic 토픽 클러스터 시각화 Mock
 * Mock 모드에서는 플레이스홀더 이미지 사용
 */
export const MOCK_BERTOPIC_VISUALIZATION: BertopicVisualizationData = {
  imageUrl: 'https://via.placeholder.com/800x500/e3f2fd/1976d2?text=BERTopic+Visualization+Mock',
};

/**
 * 전체 대시보드 데이터 Mock
 */
export const MOCK_DASHBOARD_DATA: DashboardData = {
  summary: MOCK_DASHBOARD_SUMMARY,
  topTopics: MOCK_TOPICS,
  keywords: MOCK_KEYWORDS,
  topicStanceRatio: MOCK_TOPIC_STANCE_RATIO,
  pressSpectrum: MOCK_PRESS_SPECTRUM,
  pressActivity: MOCK_PRESS_ACTIVITY,
  pressStanceHeatmap: MOCK_PRESS_STANCE_HEATMAP,
  bertopicVisualization: MOCK_BERTOPIC_VISUALIZATION,
};
