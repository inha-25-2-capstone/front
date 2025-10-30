import { Box, Paper, Typography } from '@mui/material';

import KeywordTrend from '@/components/dashboard/KeywordTrend';
import PressSpectrumChart, { type SpectrumData } from '@/components/dashboard/PressSpectrumChart';
import StanceRatioChart from '@/components/dashboard/StanceRatioChart';
import StatisticsCard from '@/components/dashboard/StatisticsCard';

// 더미 데이터
const statisticsData = [
  {
    icon: '🔥',
    iconBgColor: '#ff6b6b',
    label: '기사 스탠스 지수',
    value: 128,
    subtitle: '총 논조 수',
    subtitleColor: '#ff6b6b',
  },
  {
    icon: '📊',
    iconBgColor: '#e91e63',
    label: '대표정치 입장평균 논조',
    value: '대통령 탄핵정책 논란',
    subtitle: '옹호 39% / 중립 33%',
  },
  {
    icon: '💬',
    iconBgColor: '#2196f3',
    label: '논의점 수',
    value: 12,
    subtitle: '오늘 핫 화제 가지',
  },
  {
    icon: '📰',
    iconBgColor: '#4caf50',
    label: '핵심 언론사',
    value: 8,
    subtitle: '다양한 시각 제공',
  },
];

const keywordData = [
  { text: '검찰개혁', stance: 'oppose' as const },
  { text: '경제정책', stance: 'support' as const },
  { text: '국정감사', stance: 'neutral' as const },
  { text: '부동산', stance: 'oppose' as const },
  { text: '투표율', stance: 'support' as const },
  { text: '노동법', stance: 'neutral' as const },
  { text: '교육부', stance: 'oppose' as const },
  { text: '헌법', stance: 'neutral' as const },
];

const stanceChartData = [
  { topic: '대통령정책', support: 3, neutral: 2, oppose: 2 },
  { topic: '국회/정당', support: 1, neutral: 4, oppose: 2 },
  { topic: '북한', support: 3, neutral: 2, oppose: 3 },
  { topic: '불법', support: 2, neutral: 1, oppose: 4 },
  { topic: '국정/외교', support: 4, neutral: 2, oppose: 1 },
  { topic: '헌법관련', support: 2, neutral: 3, oppose: 2 },
  { topic: '정치단체', support: 1, neutral: 5, oppose: 1 },
];

// 언론사 정치 스펙트럼 더미 데이터
const spectrumData: SpectrumData[] = [
  { name: '조선', political: 65, activity: 85 },
  { name: '한겨레', political: -70, activity: 75 },
  { name: '중앙', political: 15, activity: 90 },
  { name: '경향', political: -55, activity: 70 },
  { name: '동아', political: 55, activity: 80 },
  { name: 'MBC', political: -20, activity: 65 },
  { name: 'KBS', political: 0, activity: 60 },
  { name: 'JTBC', political: -40, activity: 88 },
];

export default function MainPage() {
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

      {/* 핵심 키워드 트렌드 */}
      <Box sx={{ mb: 4 }}>
        <KeywordTrend keywords={keywordData} />
      </Box>

      {/* 주요 토픽별 스탠스 비율 */}
      <Box sx={{ mb: 4 }}>
        <StanceRatioChart data={stanceChartData} />
      </Box>

      {/* 언론사별 스탠스 분포 히트맵 */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography>🗂️</Typography>
          <Typography variant="h6" fontWeight="bold">
            언론사별 스탠스 분포 히트맵
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          각 언론사가 주목 눈에될 삿징는 논조를 색상으로 표한
        </Typography>
        <Box
          sx={{
            height: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f5',
            borderRadius: 2,
          }}
        >
          <Typography color="text.secondary">히트맵 테이블 영역 (구현 예정)</Typography>
        </Box>
      </Paper>

      {/* 언론사별 비교 분석 */}
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
          <Box>
            <PressSpectrumChart data={spectrumData} />
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 2 }}>
              언론사별 활동 지표
            </Typography>
            <Box
              sx={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
                borderRadius: 2,
              }}
            >
              <Typography color="text.secondary">리스트 (구현 예정)</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
