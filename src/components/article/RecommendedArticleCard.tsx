/**
 * 추천 기사 카드 컴포넌트 (사이드바용)
 */

import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import StanceBadge from '@/components/common/StanceBadge';
import type { RecommendedArticle } from '@/types';
import { truncate } from '@/utils';

interface RecommendedArticleCardProps {
  article: RecommendedArticle;
}

export default function RecommendedArticleCard({ article }: RecommendedArticleCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/articles/${article.id}`);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardActionArea onClick={handleClick}>
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <StanceBadge stance={article.stance} />
            <Typography variant="caption" color="text.secondary">
              {typeof article.press === 'string'
                ? article.press
                : article.press?.name || '알 수 없음'}
            </Typography>
          </Box>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ lineHeight: 1.4 }}>
            {truncate(article.title, 60)}
          </Typography>
          {article.similarity !== undefined && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              유사도: {(article.similarity * 100).toFixed(0)}%
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
