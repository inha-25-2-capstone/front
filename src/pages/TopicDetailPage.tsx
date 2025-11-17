/**
 * 토픽 상세 페이지
 */

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Pagination,
  Paper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ArticleCard from '@/components/article/ArticleCard';
import MainArticleCard from '@/components/article/MainArticleCard';
import StanceFilter from '@/components/common/StanceFilter';
import { useTopicArticles, useTopicDetail } from '@/hooks';
import type { Stance } from '@/types';

export default function TopicDetailPage() {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [stanceFilter, setStanceFilter] = useState<Stance | '전체'>('전체');

  // 토픽 상세 정보 (대표 기사 포함)
  const {
    data: topicDetail,
    isLoading: isTopicLoading,
    error: topicError,
  } = useTopicDetail({
    topicId: Number(topicId),
    include: 'main_article,stance_distribution',
    enabled: !!topicId,
  });

  // 관련 기사 목록
  const {
    data: articlesData,
    isLoading: isArticlesLoading,
    error: articlesError,
  } = useTopicArticles({
    topicId: Number(topicId),
    page: currentPage,
    limit: 10,
    stance: stanceFilter,
    enabled: !!topicId,
  });

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStanceChange = (newStance: Stance | '전체') => {
    setStanceFilter(newStance);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로
  };

  if (isTopicLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (topicError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">토픽 정보를 불러오는데 실패했습니다.</Alert>
      </Box>
    );
  }

  if (!topicDetail) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">토픽을 찾을 수 없습니다.</Alert>
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

      {/* 토픽 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {topicDetail.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {topicDetail.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          총 {topicDetail.articleCount}개의 기사
        </Typography>
      </Box>

      {/* 대표 기사 */}
      {topicDetail.mainArticle && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            대표 기사
          </Typography>
          <MainArticleCard article={topicDetail.mainArticle} />
        </Box>
      )}

      {/* 관련 기사 리스트 */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            관련 기사
          </Typography>
          <StanceFilter value={stanceFilter} onChange={handleStanceChange} />
        </Box>

        {isArticlesLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : articlesError ? (
          <Alert severity="error">기사 목록을 불러오는데 실패했습니다.</Alert>
        ) : articlesData && articlesData.data.length > 0 ? (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
              {articlesData.data.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </Box>

            {/* 페이지네이션 */}
            {articlesData.pagination.totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={articlesData.pagination.totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        ) : (
          <Alert severity="info">해당 조건의 기사가 없습니다.</Alert>
        )}
      </Paper>
    </Box>
  );
}
