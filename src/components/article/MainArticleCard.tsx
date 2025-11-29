/**
 * 대표 기사 카드 컴포넌트 (토픽 상세 페이지용)
 */

import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ImagePlaceholder from '@/components/common/ImagePlaceholder';
import StanceBadge from '@/components/common/StanceBadge';
import type { ArticleDetail } from '@/types';
import { formatToKoreanDate } from '@/utils';

interface MainArticleCardProps {
  article: ArticleDetail;
}

export default function MainArticleCard({ article }: MainArticleCardProps) {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/articles/${article.id}`);
  };

  return (
    <Card sx={{ mb: 4 }}>
      {article.imageUrl ? (
        <CardMedia
          component="img"
          height="400"
          image={article.imageUrl}
          alt={article.title}
          sx={{ objectFit: 'cover' }}
        />
      ) : (
        <ImagePlaceholder height={400} />
      )}
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <StanceBadge stance={article.stance} size="medium" />
          <Typography variant="body2" color="text.secondary">
            {article.press.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            •
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatToKoreanDate(article.publishedAt)}
          </Typography>
        </Box>

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {article.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
          {article.summary}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={handleReadMore}>
            전문 읽기
          </Button>
          <Button
            variant="outlined"
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            원문 보기
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
