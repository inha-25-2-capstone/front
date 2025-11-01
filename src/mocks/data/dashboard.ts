/**
 * Dashboard Mock 데이터
 */

import type {
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
];

/**
 * 토픽별 스탠스 비율 Mock
 */
export const MOCK_TOPIC_STANCE_RATIO: TopicStanceData[] = [
  {
    topic: '대통령 정책',
    support: 8,
    neutral: 10,
    oppose: 7,
  },
  {
    topic: '국회/정당',
    support: 4,
    neutral: 6,
    oppose: 2,
  },
  {
    topic: '경제정책',
    support: 8,
    neutral: 5,
    oppose: 5,
  },
];

/**
 * 언론사 정치 스펙트럼 Mock
 */
export const MOCK_PRESS_SPECTRUM: PressSpectrum[] = [
  { pressId: 1, name: 'JTBC뉴스', political: -30, activity: 85 },
  { pressId: 2, name: 'KBS뉴스', political: 10, activity: 92 },
  { pressId: 3, name: 'MBC뉴스', political: -10, activity: 78 },
  { pressId: 4, name: 'SBS뉴스', political: -20, activity: 88 },
  { pressId: 5, name: '경향신문', political: -40, activity: 75 },
];

/**
 * 언론사 활동 지표 Mock
 */
export const MOCK_PRESS_ACTIVITY: PressActivity[] = [
  {
    pressId: 1,
    name: 'JTBC뉴스',
    articleCount: 25,
    activityScore: 85,
    stanceDistribution: { support: 5, neutral: 12, oppose: 8 },
  },
  {
    pressId: 2,
    name: 'KBS뉴스',
    articleCount: 30,
    activityScore: 92,
    stanceDistribution: { support: 15, neutral: 10, oppose: 5 },
  },
  {
    pressId: 3,
    name: 'MBC뉴스',
    articleCount: 22,
    activityScore: 78,
    stanceDistribution: { support: 8, neutral: 9, oppose: 5 },
  },
  {
    pressId: 4,
    name: 'SBS뉴스',
    articleCount: 28,
    activityScore: 88,
    stanceDistribution: { support: 10, neutral: 12, oppose: 6 },
  },
  {
    pressId: 5,
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
      topics: { '대통령 정책': 'oppose', '국회/정당': 'oppose', 경제정책: 'neutral' },
    },
    {
      press: 'KBS뉴스',
      topics: { '대통령 정책': 'support', '국회/정당': 'support', 경제정책: 'support' },
    },
    {
      press: 'MBC뉴스',
      topics: { '대통령 정책': 'neutral', '국회/정당': 'neutral', 경제정책: 'neutral' },
    },
    {
      press: 'SBS뉴스',
      topics: { '대통령 정책': 'oppose', '국회/정당': 'neutral', 경제정책: 'neutral' },
    },
    {
      press: '경향신문',
      topics: { '대통령 정책': 'oppose', '국회/정당': 'oppose', 경제정책: 'oppose' },
    },
  ],
  topics: ['대통령 정책', '국회/정당', '경제정책'],
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
};
