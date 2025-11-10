/**
 * 메인 페이지 (스탠스 대시보드)
 */

import { Alert, Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useMemo } from 'react';

import KeywordTrend from '@/components/dashboard/KeywordTrend';
import PressActivityList from '@/components/dashboard/PressActivityList';
import PressSpectrumChart from '@/components/dashboard/PressSpectrumChart';
import PressStanceHeatmap from '@/components/dashboard/PressStanceHeatmap';
import StanceRatioChart from '@/components/dashboard/StanceRatioChart';
import StatisticsCard from '@/components/dashboard/StatisticsCard';
import TopicCard from '@/components/topic/TopicCard';
import {
  useDashboardSummary,
  useKeywords,
  usePressActivity,
  usePressSpectrum,
  usePressStanceHeatmap,
  useTopicStanceRatio,
  useTopics,
} from '@/hooks';
import type { StatisticsCardData } from '@/types';

export default function MainPage() {
  // Dashboard API 호출
  const { data: summary, isLoading: isSummaryLoading, error: summaryError } = useDashboardSummary();
  const {
    data: topicsData,
    isLoading: isTopicsLoading,
    error: topicsError,
  } = useTopics({
    page: 1,
    limit: 7,
  });
  const { data: keywords, isLoading: isKeywordsLoading, error: keywordsError } = useKeywords();
  const {
    data: stanceRatioData,
    isLoading: isStanceRatioLoading,
    error: stanceRatioError,
  } = useTopicStanceRatio();
  const {
    data: spectrumData,
    isLoading: isSpectrumLoading,
    error: spectrumError,
  } = usePressSpectrum();
  const {
    data: activityData,
    isLoading: isActivityLoading,
    error: activityError,
  } = usePressActivity();
  const {
    data: heatmapResponse,
    isLoading: isHeatmapLoading,
    error: heatmapError,
  } = usePressStanceHeatmap();

  // DashboardSummary를 StatisticsCardData로 변환
  const statisticsData: StatisticsCardData[] = useMemo(() => {
    if (!summary) return [];

    const { support, neutral, oppose } = summary.mainTopic.stanceDistribution;
    const total = support + neutral + oppose;
    const supportPercent = total > 0 ? Math.round((support / total) * 100) : 0;
    const neutralPercent = total > 0 ? Math.round((neutral / total) * 100) : 0;

    return [
      {
        icon: '🔥',
        iconBgColor: '#ff6b6b',
        label: '기사 스탠스 지수',
        value: summary.totalArticleCount,
        subtitle: '총 논조 수',
        subtitleColor: '#ff6b6b',
      },
      {
        icon: '📊',
        iconBgColor: '#e91e63',
        label: '대표정치 입장평균 논조',
        value: summary.mainTopic.name,
        subtitle: `옹호 ${supportPercent}% / 중립 ${neutralPercent}%`,
      },
      {
        icon: '💬',
        iconBgColor: '#2196f3',
        label: '논의점 수',
        value: summary.totalTopicCount,
        subtitle: '오늘 핫 화제 가지',
      },
      {
        icon: '📰',
        iconBgColor: '#4caf50',
        label: '핵심 언론사',
        value: summary.totalPressCount,
        subtitle: '다양한 시각 제공',
      },
    ];
  }, [summary]);

  // 로딩 상태
  const isLoading =
    isSummaryLoading ||
    isTopicsLoading ||
    isKeywordsLoading ||
    isStanceRatioLoading ||
    isSpectrumLoading ||
    isActivityLoading ||
    isHeatmapLoading;

  // 에러 상태
  const hasError =
    summaryError ||
    topicsError ||
    keywordsError ||
    stanceRatioError ||
    spectrumError ||
    activityError ||
    heatmapError;

  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (hasError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">대시보드 데이터를 불러오는데 실패했습니다.</Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* 페이지 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          오늘의 정치 지향
        </Typography>
        <Typography variant="body1" color="text.secondary">
          한국 가장 논쟁적 역할을 하는 언론사 탐험되는 논조로 변동 받지 않겠습니다
        </Typography>
      </Box>

      {/* 통계 카드 4개 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        {statisticsData.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </Box>

      {/* 오늘의 토픽 TOP 7 & 핵심 키워드 트렌드 (좌우 배치) */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        {/* 왼쪽: 오늘의 토픽 (Top 7) */}
        {topicsData && topicsData.items.length > 0 && (
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Typography>🔥</Typography>
              <Typography variant="h6" fontWeight="bold">
                오늘의 토픽 TOP 7
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 2,
                maxHeight: 550,
                overflow: 'auto',
                pr: 1,
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  bgcolor: '#f1f1f1',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: '#888',
                  borderRadius: '4px',
                  '&:hover': {
                    bgcolor: '#555',
                  },
                },
              }}
            >
              {topicsData.items.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </Box>
          </Paper>
        )}

        {/* 오른쪽: 핵심 키워드 트렌드 */}
        {keywords && keywords.length > 0 && <KeywordTrend keywords={keywords} />}
      </Box>

      {/* 주요 토픽별 스탠스 비율 */}
      {stanceRatioData && stanceRatioData.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <StanceRatioChart data={stanceRatioData} />
        </Box>
      )}

      {/* 언론사별 스탠스 분포 히트맵 */}
      {heatmapResponse && heatmapResponse.data.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <PressStanceHeatmap data={heatmapResponse.data} topicNames={heatmapResponse.topics} />
        </Box>
      )}

      {/* 언론사별 비교 분석 */}
      {((spectrumData && spectrumData.length > 0) || (activityData && activityData.length > 0)) && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography>📰</Typography>
            <Typography variant="h6" fontWeight="bold">
              언론사별 비교 분석
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 3,
            }}
          >
            {spectrumData && spectrumData.length > 0 && (
              <Box>
                <PressSpectrumChart data={spectrumData} />
              </Box>
            )}
            {activityData && activityData.length > 0 && (
              <Box>
                <PressActivityList data={activityData} />
              </Box>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
}
