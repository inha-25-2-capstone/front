/**
 * 메인 페이지 (스탠스 대시보드)
 */

import { Alert, Box, Paper, Typography } from '@mui/material';

import MainPageSkeleton from '@/components/common/MainPageSkeleton';
import BertopicVisualization from '@/components/dashboard/BertopicVisualization';
import KeywordTrend from '@/components/dashboard/KeywordTrend';
import PressStanceHeatmap from '@/components/dashboard/PressStanceHeatmap';
import TopicCarousel from '@/components/topic/TopicCarousel';
import {
  useBertopicVisualization,
  useDailyKeywords,
  usePressStanceHeatmap,
  useTopics,
} from '@/hooks';

export default function MainPage() {
  // Dashboard API 호출
  const {
    data: topicsData,
    isLoading: isTopicsLoading,
    error: topicsError,
  } = useTopics({
    page: 1,
    limit: 8,
    include: 'main_article,stance_distribution',
  });
  const { data: dailyKeywordsData } = useDailyKeywords();
  const {
    data: heatmapResponse,
    isLoading: isHeatmapLoading,
    error: heatmapError,
  } = usePressStanceHeatmap();
  const {
    data: bertopicData,
    isLoading: isBertopicLoading,
    error: bertopicError,
  } = useBertopicVisualization();

  // 디버깅: 에러 확인
  if (bertopicError) {
    console.error('🔴 BERTopic Error:', bertopicError);
  }

  // 로딩 상태 (키워드는 선택적이므로 제외)
  const isLoading = isTopicsLoading || isHeatmapLoading || isBertopicLoading;

  // 에러 상태 (키워드는 선택적이므로 제외)
  const hasError = topicsError || heatmapError || bertopicError;

  if (isLoading) {
    return <MainPageSkeleton />;
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
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #4a5568 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}
        >
          오늘의 정치 뉴스
        </Typography>
      </Box>

      {/* 오늘의 토픽 TOP 7 캐러셀 */}
      {topicsData && topicsData.data.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <TopicCarousel topics={topicsData.data} />
        </Box>
      )}

      {/* 키워드 트렌드 + 토픽 클러스터 시각화 (3:7 비율) */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          mb: 4,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* 핵심 키워드 트렌드 (35%) */}
        <Box
          sx={{
            flex: { xs: 'none', md: 3.5 },
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <KeywordTrend keywords={dailyKeywordsData?.keywords || []} />
        </Box>

        {/* BERTopic 토픽 클러스터 시각화 (65%) */}
        <Box sx={{ flex: { xs: 'none', md: 6.5 }, minWidth: 0 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <BertopicVisualization imageUrl={bertopicData?.imageUrl} topics={topicsData?.data} />
          </Paper>
        </Box>
      </Box>

      {/* 언론사별 스탠스 분포 히트맵 */}
      {heatmapResponse && heatmapResponse.data.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <PressStanceHeatmap data={heatmapResponse.data} topicNames={heatmapResponse.topics} />
        </Box>
      )}
    </Box>
  );
}
