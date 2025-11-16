/**
 * 메인 페이지 (스탠스 대시보드)
 */

import { Alert, Box, CircularProgress, Paper, Typography } from '@mui/material';

import BertopicVisualization from '@/components/dashboard/BertopicVisualization';
import KeywordTrend from '@/components/dashboard/KeywordTrend';
import PressStanceHeatmap from '@/components/dashboard/PressStanceHeatmap';
import TopicCarousel from '@/components/topic/TopicCarousel';
import { useBertopicVisualization, useKeywords, usePressStanceHeatmap, useTopics } from '@/hooks';

export default function MainPage() {
  // Dashboard API 호출
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
    data: heatmapResponse,
    isLoading: isHeatmapLoading,
    error: heatmapError,
  } = usePressStanceHeatmap();
  const {
    data: bertopicData,
    isLoading: isBertopicLoading,
    error: bertopicError,
  } = useBertopicVisualization();

  // 로딩 상태
  const isLoading = isTopicsLoading || isKeywordsLoading || isHeatmapLoading || isBertopicLoading;

  // 에러 상태
  const hasError = topicsError || keywordsError || heatmapError || bertopicError;

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

      {/* 오늘의 토픽 TOP 7 캐러셀 */}
      {topicsData && topicsData.items.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <TopicCarousel topics={topicsData.items} />
        </Box>
      )}

      {/* 핵심 키워드 트렌드 */}
      {keywords && keywords.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <KeywordTrend keywords={keywords} />
        </Box>
      )}

      {/* BERTopic 토픽 클러스터 시각화 */}
      {bertopicData && bertopicData.topics.length > 0 && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <BertopicVisualization data={bertopicData.topics} />
        </Paper>
      )}

      {/* 언론사별 스탠스 분포 히트맵 */}
      {heatmapResponse && heatmapResponse.data.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <PressStanceHeatmap data={heatmapResponse.data} topicNames={heatmapResponse.topics} />
        </Box>
      )}
    </Box>
  );
}
