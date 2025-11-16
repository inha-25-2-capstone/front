import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Typography } from '@mui/material';
import { useRef, useState } from 'react';

import type { TopicSummary } from '@/types';

import TopicCard from './TopicCard';

interface TopicCarouselProps {
  topics: TopicSummary[];
}

export default function TopicCarousel({ topics }: TopicCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });

      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography>🔥</Typography>
          <Typography variant="h6" fontWeight="bold">
            오늘의 토픽 TOP 7
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            sx={{
              bgcolor: canScrollLeft ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' },
              '&.Mui-disabled': { bgcolor: 'transparent' },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            sx={{
              bgcolor: canScrollRight ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' },
              '&.Mui-disabled': { bgcolor: 'transparent' },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      {/* 캐러셀 */}
      <Box
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          pb: 1,
          pt: 2,
        }}
      >
        {topics.map((topic, index) => (
          <Box
            key={topic.id}
            sx={{
              minWidth: 350,
              maxWidth: 350,
            }}
          >
            <TopicCard topic={topic} rank={index + 1} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
