/**
 * 토픽 스탠스 분포 시각화 컴포넌트
 */

import { Box, Paper, Typography } from '@mui/material';

import type { StanceDistribution } from '@/types';

interface TopicStanceDistributionProps {
  distribution: StanceDistribution;
  topicName?: string;
}

export default function TopicStanceDistribution({
  distribution,
  topicName,
}: TopicStanceDistributionProps) {
  const { support, neutral, oppose } = distribution;
  const total = support + neutral + oppose;

  if (total === 0) {
    return null;
  }

  const supportPercent = Math.round((support / total) * 100);
  const neutralPercent = Math.round((neutral / total) * 100);
  const opposePercent = Math.round((oppose / total) * 100);

  const stanceData = [
    {
      label: '옹호',
      count: support,
      percent: supportPercent,
      color: '#4caf50',
      bgColor: '#e8f5e9',
    },
    {
      label: '중립',
      count: neutral,
      percent: neutralPercent,
      color: '#9e9e9e',
      bgColor: '#f5f5f5',
    },
    {
      label: '비판',
      count: oppose,
      percent: opposePercent,
      color: '#f44336',
      bgColor: '#ffebee',
    },
  ];

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {topicName ? `"${topicName}"에 대한 언론 보도 성향` : '이 토픽에 대한 언론 보도 성향'}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        총 {total}개의 기사를 분석한 결과입니다.
      </Typography>

      {/* 전체 비율 바 */}
      <Box
        sx={{
          width: '100%',
          height: 8,
          borderRadius: 1,
          overflow: 'hidden',
          display: 'flex',
          mb: 2,
        }}
      >
        {supportPercent > 0 && (
          <Box sx={{ width: `${supportPercent}%`, bgcolor: '#4caf50' }} />
        )}
        {neutralPercent > 0 && (
          <Box sx={{ width: `${neutralPercent}%`, bgcolor: '#9e9e9e' }} />
        )}
        {opposePercent > 0 && (
          <Box sx={{ width: `${opposePercent}%`, bgcolor: '#f44336' }} />
        )}
      </Box>

      {/* 상세 정보 */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {stanceData.map((stance) => (
          <Box key={stance.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: stance.color,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {stance.label}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {stance.percent}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ({stance.count}개)
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
