/**
 * 기사 상세 페이지
 */

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LaunchIcon from '@mui/icons-material/Launch';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import RecommendedArticleCard from '@/components/article/RecommendedArticleCard';
import StanceBadge from '@/components/common/StanceBadge';
import StanceFilter from '@/components/common/StanceFilter';
import { useArticleDetail } from '@/hooks';
import type { RecommendedArticle, Stance } from '@/types';
import { formatToKoreanDate } from '@/utils';

export default function ArticleDetailPage() {
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();
  const [stanceFilter, setStanceFilter] = useState<Stance | '전체'>('전체');

  // 기사 상세 정보 조회
  const {
    data: article,
    isLoading,
    error,
  } = useArticleDetail({
    articleId: Number(articleId),
    include: 'press,topic,related_articles',
    enabled: !!articleId,
  });

  const handleStanceChange = (newStance: Stance | '전체') => {
    setStanceFilter(newStance);
  };

  // 스탠스 필터 적용
  const filteredRecommendations: RecommendedArticle[] =
    article?.relatedArticles
      ?.filter((relatedArticle) => {
        if (stanceFilter === '전체') return true;
        return relatedArticle.stance === stanceFilter;
      })
      .slice(0, 3)
      .map((relatedArticle) => ({
        id: relatedArticle.id,
        title: relatedArticle.title,
        press: relatedArticle.press,
        stance: relatedArticle.stance,
      })) || [];

  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">기사를 불러오는데 실패했습니다.</Alert>
      </Box>
    );
  }

  if (!article) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">기사를 찾을 수 없습니다.</Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* 뒤로 가기 버튼 */}
      <Box sx={{ mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body2" component="span" color="text.secondary">
          뒤로 가기
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* 좌측: 기사 본문 */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 66%' } }}>
          <Paper sx={{ p: 4 }}>
            {/* 기사 헤더 */}
            <Box sx={{ mb: 3 }}>
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

              <Typography variant="body2" color="text.secondary">
                조회수 {article.viewCount.toLocaleString()} • 토픽: {article.topic.name}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* 기사 이미지 */}
            {article.imageUrl && (
              <Box
                component="img"
                src={article.imageUrl}
                alt={article.title}
                sx={{
                  width: '100%',
                  maxHeight: 500,
                  objectFit: 'cover',
                  borderRadius: 1,
                  mb: 3,
                }}
              />
            )}

            {/* 기사 요약 */}
            {article.summary && (
              <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  요약
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {article.summary}
                </Typography>
              </Box>
            )}

            {/* 기사 본문 */}
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
                wordBreak: 'keep-all',
              }}
            >
              {article.content}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* 원문 링크 */}
            <Button
              variant="outlined"
              endIcon={<LaunchIcon />}
              href={article.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              fullWidth
            >
              원문 보기
            </Button>
          </Paper>
        </Box>

        {/* 우측: 추천 기사 사이드바 */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33%' } }}>
          <Paper sx={{ p: 3, position: 'sticky', top: 24 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              관련 기사
            </Typography>

            <Box sx={{ mb: 3 }}>
              <StanceFilter value={stanceFilter} onChange={handleStanceChange} />
            </Box>

            {filteredRecommendations.length > 0 ? (
              <Box>
                {filteredRecommendations.map((recommendation) => (
                  <RecommendedArticleCard key={recommendation.id} article={recommendation} />
                ))}
              </Box>
            ) : (
              <Alert severity="info">해당 스탠스의 관련 기사가 없습니다.</Alert>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
