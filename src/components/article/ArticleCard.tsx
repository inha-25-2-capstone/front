/**
 * 기사 카드 컴포넌트 (리스트용)
 */

import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ImagePlaceholder from '@/components/common/ImagePlaceholder';
import StanceBadge from '@/components/common/StanceBadge';
import type { ArticleSummary } from '@/types';
import { formatToDotDate, truncate } from '@/utils';

interface ArticleCardProps {
  article: ArticleSummary;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/articles/${article.id}`);
  };

  return (
    <Card sx={{ display: 'flex', height: 140 }}>
      <CardActionArea
        onClick={handleClick}
        sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}
      >
        {article.imageUrl ? (
          <CardMedia
            component="img"
            sx={{ width: 140, height: 140, objectFit: 'cover' }}
            image={article.imageUrl}
            alt={article.title}
          />
        ) : (
          <ImagePlaceholder width={140} height={140} />
        )}
        <CardContent sx={{ flex: 1, py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <StanceBadge stance={article.stance} />
            <Typography variant="caption" color="text.secondary">
              {typeof article.press === 'string'
                ? article.press
                : article.press?.name || '알 수 없음'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              •
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatToDotDate(article.date || article.publishedAt)}
            </Typography>
          </Box>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
            {truncate(article.title, 60)}
          </Typography>
          {article.viewCount && (
            <Typography variant="caption" color="text.secondary">
              조회 {article.viewCount.toLocaleString()}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
