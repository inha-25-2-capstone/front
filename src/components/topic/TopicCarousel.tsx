import { Box, Typography } from '@mui/material';

import type { TopicSummary } from '@/types';

import TopicCard from './TopicCard';

interface TopicCarouselProps {
  topics: TopicSummary[];
}

export default function TopicCarousel({ topics }: TopicCarouselProps) {
  return (
    <Box>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          오늘의 토픽 TOP 8
        </Typography>
      </Box>

      {/* 그리드 레이아웃: 4열 2행 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 2,
          pt: 2,
        }}
      >
        {topics.slice(0, 8).map((topic, index) => (
          <Box key={topic.id}>
            <TopicCard topic={topic} rank={index + 1} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
