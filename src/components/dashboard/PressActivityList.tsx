import { Box, LinearProgress, Typography } from '@mui/material';

export interface ActivityData {
  name: string; // 언론사 이름
  articleCount: number; // 기사 수
  activityScore: number; // 활동도 점수 (0-100)
  stanceDistribution: {
    support: number; // 옹호 비율 (0-100)
    neutral: number; // 중립 비율 (0-100)
    oppose: number; // 비판 비율 (0-100)
  };
}

interface PressActivityListProps {
  data: ActivityData[];
}

// 활동도에 따른 색상
const getActivityColor = (score: number): string => {
  if (score >= 80) return '#4caf50'; // 높음 - 초록
  if (score >= 50) return '#ff9800'; // 중간 - 주황
  return '#9e9e9e'; // 낮음 - 회색
};

export default function PressActivityList({ data }: PressActivityListProps) {
  // 활동도 점수로 정렬 (내림차순)
  const sortedData = [...data].sort((a, b) => b.activityScore - a.activityScore);

  return (
    <Box>
      <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 2 }}>
        언론사별 활동 지표
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxHeight: 500,
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
        {sortedData.map((press, index) => (
          <Box
            key={press.name}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: index === 0 ? 'rgba(76, 175, 80, 0.05)' : 'background.paper',
              border: '1px solid',
              borderColor: index === 0 ? 'rgba(76, 175, 80, 0.2)' : 'divider',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: 1,
              },
            }}
          >
            {/* 상단: 언론사명과 순위 */}
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {index === 0 && <Typography sx={{ fontSize: 16 }}>🏆</Typography>}
                <Typography variant="body1" fontWeight="600">
                  {press.name}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                기사 {press.articleCount}개
              </Typography>
            </Box>

            {/* 활동도 바 */}
            <Box sx={{ mb: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 0.5,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  활동도
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight="600"
                  color={getActivityColor(press.activityScore)}
                >
                  {press.activityScore}점
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={press.activityScore}
                sx={{
                  height: 8,
                  borderRadius: 1,
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: getActivityColor(press.activityScore),
                    borderRadius: 1,
                  },
                }}
              />
            </Box>

            {/* 스탠스 분포 */}
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 0.5, display: 'block' }}
              >
                논조 분포
              </Typography>
              <Box
                sx={{ display: 'flex', gap: 0.5, height: 6, borderRadius: 1, overflow: 'hidden' }}
              >
                {press.stanceDistribution.support > 0 && (
                  <Box
                    sx={{
                      width: `${press.stanceDistribution.support}%`,
                      bgcolor: '#4caf50',
                    }}
                    title={`옹호 ${press.stanceDistribution.support}%`}
                  />
                )}
                {press.stanceDistribution.neutral > 0 && (
                  <Box
                    sx={{
                      width: `${press.stanceDistribution.neutral}%`,
                      bgcolor: '#9e9e9e',
                    }}
                    title={`중립 ${press.stanceDistribution.neutral}%`}
                  />
                )}
                {press.stanceDistribution.oppose > 0 && (
                  <Box
                    sx={{
                      width: `${press.stanceDistribution.oppose}%`,
                      bgcolor: '#f44336',
                    }}
                    title={`비판 ${press.stanceDistribution.oppose}%`}
                  />
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5, mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  옹호 {press.stanceDistribution.support}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  중립 {press.stanceDistribution.neutral}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  비판 {press.stanceDistribution.oppose}%
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
