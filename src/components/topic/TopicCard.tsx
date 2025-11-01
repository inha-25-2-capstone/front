/**
 * 토픽 카드 컴포넌트 (메인 페이지 Top 7 토픽 리스트용)
 */

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import type { TopicSummary } from '@/types';
import { formatNumber } from '@/utils';

interface TopicCardProps {
  topic: TopicSummary;
}

export default function TopicCard({ topic }: TopicCardProps) {
  const { id, name, articleCount, viewCount, stanceDistribution } = topic;
  const total = stanceDistribution.support + stanceDistribution.neutral + stanceDistribution.oppose;

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
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* 토픽 아이콘 및 제목 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: '#e3f2fd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 28, color: '#1976d2' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
              {name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {articleCount}개 기사
              </Typography>
              <Typography variant="caption" color="text.secondary">
                •
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <VisibilityIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatNumber(viewCount)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 스탠스 분포 */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={`옹호 ${stanceDistribution.support}`}
            size="small"
            sx={{
              bgcolor: '#e8f5e9',
              color: '#2e7d32',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
          <Chip
            label={`중립 ${stanceDistribution.neutral}`}
            size="small"
            sx={{
              bgcolor: '#f5f5f5',
              color: '#616161',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
          <Chip
            label={`비판 ${stanceDistribution.oppose}`}
            size="small"
            sx={{
              bgcolor: '#ffebee',
              color: '#c62828',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
        </Box>

        {/* 스탠스 비율 바 */}
        {total > 0 && (
          <Box
            sx={{
              width: '100%',
              height: 6,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <Box
              sx={{
                width: `${(stanceDistribution.support / total) * 100}%`,
                bgcolor: '#4caf50',
              }}
            />
            <Box
              sx={{
                width: `${(stanceDistribution.neutral / total) * 100}%`,
                bgcolor: '#9e9e9e',
              }}
            />
            <Box
              sx={{
                width: `${(stanceDistribution.oppose / total) * 100}%`,
                bgcolor: '#f44336',
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
