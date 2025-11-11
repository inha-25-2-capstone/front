/**
 * 언론사별 기사 목록 페이지
 */

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  type SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ArticleCard from '@/components/article/ArticleCard';
import { usePressArticles, usePressDetail } from '@/hooks';

type SortOption = 'publishedAt:desc' | 'publishedAt:asc';

export default function PressArticlesPage() {
  const navigate = useNavigate();
  const { pressId } = useParams<{ pressId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>('publishedAt:desc');

  // 정렬 옵션 파싱
  const [sortField, sortOrder] = sortOption.split(':') as ['publishedAt', 'asc' | 'desc'];

  // 언론사 상세 정보
  const {
    data: pressDetail,
    isLoading: isPressLoading,
    error: pressError,
  } = usePressDetail({
    pressId: Number(pressId),
    enabled: !!pressId,
  });

  // 언론사별 기사 목록
  const {
    data: articlesData,
    isLoading: isArticlesLoading,
    error: articlesError,
  } = usePressArticles({
    pressId: Number(pressId),
    page: currentPage,
    limit: 10,
    sortField,
    sortOrder,
    enabled: !!pressId,
  });

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value as SortOption);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로
  };

  if (isPressLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (pressError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">언론사 정보를 불러오는데 실패했습니다.</Alert>
      </Box>
    );
  }

  if (!pressDetail) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">언론사를 찾을 수 없습니다.</Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* 뒤로 가기 버튼 */}
      <Box sx={{ mb: 3 }}>
        <IconButton onClick={() => navigate('/press')} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body2" component="span" color="text.secondary">
          언론사 목록으로
        </Typography>
      </Box>

      {/* 언론사 정보 */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {pressDetail.name}
        </Typography>
        {pressDetail.description && (
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {pressDetail.description}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          총 {pressDetail.statistics.articleCount}개의 기사 | 평균 스탠스 점수:{' '}
          {pressDetail.statistics.avgStanceScore.toFixed(2)}
        </Typography>

        {/* 논조 분포 */}
        <Box>
          <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>
            논조 분포
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, height: 10, borderRadius: 1, overflow: 'hidden' }}>
            {pressDetail.statistics.stanceDistribution.support > 0 && (
              <Box
                sx={{
                  width: `${(pressDetail.statistics.stanceDistribution.support / (pressDetail.statistics.stanceDistribution.support + pressDetail.statistics.stanceDistribution.neutral + pressDetail.statistics.stanceDistribution.oppose)) * 100}%`,
                  bgcolor: '#4caf50',
                }}
                title={`옹호 ${pressDetail.statistics.stanceDistribution.support}개`}
              />
            )}
            {pressDetail.statistics.stanceDistribution.neutral > 0 && (
              <Box
                sx={{
                  width: `${(pressDetail.statistics.stanceDistribution.neutral / (pressDetail.statistics.stanceDistribution.support + pressDetail.statistics.stanceDistribution.neutral + pressDetail.statistics.stanceDistribution.oppose)) * 100}%`,
                  bgcolor: '#9e9e9e',
                }}
                title={`중립 ${pressDetail.statistics.stanceDistribution.neutral}개`}
              />
            )}
            {pressDetail.statistics.stanceDistribution.oppose > 0 && (
              <Box
                sx={{
                  width: `${(pressDetail.statistics.stanceDistribution.oppose / (pressDetail.statistics.stanceDistribution.support + pressDetail.statistics.stanceDistribution.neutral + pressDetail.statistics.stanceDistribution.oppose)) * 100}%`,
                  bgcolor: '#f44336',
                }}
                title={`비판 ${pressDetail.statistics.stanceDistribution.oppose}개`}
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              옹호{' '}
              {Math.round(
                (pressDetail.statistics.stanceDistribution.support /
                  (pressDetail.statistics.stanceDistribution.support +
                    pressDetail.statistics.stanceDistribution.neutral +
                    pressDetail.statistics.stanceDistribution.oppose)) *
                  100,
              )}
              % ({pressDetail.statistics.stanceDistribution.support}개)
            </Typography>
            <Typography variant="caption" color="text.secondary">
              중립{' '}
              {Math.round(
                (pressDetail.statistics.stanceDistribution.neutral /
                  (pressDetail.statistics.stanceDistribution.support +
                    pressDetail.statistics.stanceDistribution.neutral +
                    pressDetail.statistics.stanceDistribution.oppose)) *
                  100,
              )}
              % ({pressDetail.statistics.stanceDistribution.neutral}개)
            </Typography>
            <Typography variant="caption" color="text.secondary">
              비판{' '}
              {Math.round(
                (pressDetail.statistics.stanceDistribution.oppose /
                  (pressDetail.statistics.stanceDistribution.support +
                    pressDetail.statistics.stanceDistribution.neutral +
                    pressDetail.statistics.stanceDistribution.oppose)) *
                  100,
              )}
              % ({pressDetail.statistics.stanceDistribution.oppose}개)
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* 기사 목록 */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            기사 목록
          </Typography>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>정렬</InputLabel>
            <Select value={sortOption} label="정렬" onChange={handleSortChange}>
              <MenuItem value="publishedAt:desc">최신순</MenuItem>
              <MenuItem value="publishedAt:asc">과거순</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {isArticlesLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : articlesError ? (
          <Alert severity="error">기사 목록을 불러오는데 실패했습니다.</Alert>
        ) : articlesData && articlesData.items.length > 0 ? (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
              {articlesData.items.map((article) => (
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
          <Alert severity="info">해당 언론사의 기사가 없습니다.</Alert>
        )}
      </Paper>
    </Box>
  );
}
