import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { stanceColors } from '@/theme/theme';

interface ArticleListItemProps {
  id: number;
  title: string;
  press: string;
  date: string;
  imageUrl?: string;
  stance: 'support' | 'neutral' | 'oppose';
}

export default function ArticleListItem({
  id,
  title,
  press,
  date,
  imageUrl,
  stance,
}: ArticleListItemProps) {
  const getStanceLabel = (stance: ArticleListItemProps['stance']) => {
    switch (stance) {
      case 'support':
        return '옹호';
      case 'neutral':
        return '중립';
      case 'oppose':
        return '비판';
    }
  };

  const getStanceColor = (stance: ArticleListItemProps['stance']) => {
    switch (stance) {
      case 'support':
        return stanceColors.support;
      case 'neutral':
        return stanceColors.neutral;
      case 'oppose':
        return stanceColors.oppose;
    }
  };

  return (
    <Card
      component={Link}
      to={`/articles/${id}`}
      sx={{
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* 썸네일 이미지 */}
          <Box
            sx={{
              width: 120,
              height: 80,
              borderRadius: 2,
              bgcolor: '#f5f5f5',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'text.disabled',
                }}
              >
                No Image
              </Box>
            )}
          </Box>

          {/* 기사 정보 */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography
              variant="subtitle1"
              fontWeight="600"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
              <Typography variant="caption" color="text.secondary">
                {press}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                •
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {date}
              </Typography>
              <Chip
                label={getStanceLabel(stance)}
                size="small"
                sx={{
                  ml: 'auto',
                  bgcolor: getStanceColor(stance),
                  color: '#fff',
                  fontWeight: 500,
                  height: 24,
                }}
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
