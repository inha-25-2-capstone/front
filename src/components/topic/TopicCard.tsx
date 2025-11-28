/**
 * 토픽 카드 컴포넌트 (메인 페이지 Top 7 토픽 리스트용)
 */

import { Box, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import type { TopicSummary } from '@/types';

interface TopicCardProps {
  topic: TopicSummary;
  rank?: number; // 순위 (1~7)
}

export default function TopicCard({ topic, rank }: TopicCardProps) {
  const { id, name, articleCount, stanceDistribution, mainArticleImage } = topic;

  // stanceDistribution이 null일 경우 기본값 사용
  const distribution = stanceDistribution || { support: 0, neutral: 0, oppose: 0 };
  const total = distribution.support + distribution.neutral + distribution.oppose;

  // 대표 기사 이미지 사용, 없으면 플레이스홀더
  const imageUrl =
    mainArticleImage || `https://via.placeholder.com/400x240/e3f2fd/1976d2?text=No+Image`;

  return (
    <Card
      component={Link}
      to={`/topics/${id}`}
      sx={{
        textDecoration: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
      }}
    >
      {/* 순위 배지 */}
      {rank && (
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            left: 12,
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: '#000',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: 16,
            zIndex: 1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {rank}
        </Box>
      )}

      {/* 이미지 */}
      <CardMedia
        component="img"
        height="180"
        image={imageUrl}
        alt={name}
        sx={{
          objectFit: 'cover',
        }}
      />

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5, pt: 2 }}>
        {/* 제목 */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.4,
            minHeight: '2.8em',
          }}
        >
          {name}
        </Typography>

        {/* 기사 수 */}
        <Typography variant="body2" color="text.secondary">
          {articleCount}개 기사
        </Typography>

        {/* 스탠스 분포 칩 */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={`옹호 ${distribution.support}`}
            size="small"
            sx={{
              bgcolor: '#e8f5e9',
              color: '#2e7d32',
              fontWeight: 500,
              fontSize: '0.7rem',
              height: 24,
            }}
          />
          <Chip
            label={`중립 ${distribution.neutral}`}
            size="small"
            sx={{
              bgcolor: '#f5f5f5',
              color: '#616161',
              fontWeight: 500,
              fontSize: '0.7rem',
              height: 24,
            }}
          />
          <Chip
            label={`비판 ${distribution.oppose}`}
            size="small"
            sx={{
              bgcolor: '#ffebee',
              color: '#c62828',
              fontWeight: 500,
              fontSize: '0.7rem',
              height: 24,
            }}
          />
        </Box>

        {/* 스탠스 비율 바 */}
        {total > 0 && (
          <Box
            sx={{
              width: '100%',
              height: 4,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <Box
              sx={{
                width: `${(distribution.support / total) * 100}%`,
                bgcolor: '#4caf50',
              }}
            />
            <Box
              sx={{
                width: `${(distribution.neutral / total) * 100}%`,
                bgcolor: '#9e9e9e',
              }}
            />
            <Box
              sx={{
                width: `${(distribution.oppose / total) * 100}%`,
                bgcolor: '#f44336',
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
