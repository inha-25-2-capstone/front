/**
 * 언론사별 기사 목록 페이지
 */

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArticleIcon from '@mui/icons-material/Article';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
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
import PressArticlesSkeleton from '@/components/common/PressArticlesSkeleton';
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
    pressId: pressId as string,
    enabled: !!pressId,
  });

  // 언론사별 기사 목록
  const {
    data: articlesData,
    isLoading: isArticlesLoading,
    error: articlesError,
  } = usePressArticles({
    pressId: pressId as string,
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
    return <PressArticlesSkeleton />;
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

  // stanceDistribution이 null일 경우 기본값 사용
  const stanceDistribution = pressDetail.statistics.stanceDistribution || {
    support: 0,
    neutral: 0,
    oppose: 0,
  };
  const totalStance =
    stanceDistribution.support + stanceDistribution.neutral + stanceDistribution.oppose;

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
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        {/* 헤더 섹션 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 3,
            pb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <NewspaperIcon sx={{ fontSize: 36, color: 'primary.main' }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight="bold">
              {pressDetail.name}
            </Typography>
            {pressDetail.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {pressDetail.description}
              </Typography>
            )}
          </Box>
        </Box>

        {/* 통계 요약 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            alignItems: 'start',
          }}
        >
          {/* 평균 스탠스 점수 */}
          <Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingFlatIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary" fontWeight="500">
                  평균 논조 성향
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={
                    pressDetail.statistics.avgStanceScore >= 0.3
                      ? '옹호 성향'
                      : pressDetail.statistics.avgStanceScore <= -0.3
                        ? '비판 성향'
                        : '중립 성향'
                  }
                  size="small"
                  sx={{
                    bgcolor:
                      pressDetail.statistics.avgStanceScore >= 0.3
                        ? '#66bb6a'
                        : pressDetail.statistics.avgStanceScore <= -0.3
                          ? '#ef5350'
                          : '#9e9e9e',
                    color: 'white',
                    fontWeight: 600,
                    height: 24,
                  }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {pressDetail.statistics.avgStanceScore.toFixed(2)}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ position: 'relative', height: 8 }}>
              <LinearProgress
                variant="determinate"
                value={100}
                sx={{
                  height: 8,
                  borderRadius: 1,
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(to right, #ef5350 0%, #9e9e9e 50%, #66bb6a 100%)',
                  },
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  left: `${((pressDetail.statistics.avgStanceScore + 1) / 2) * 100}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  bgcolor: 'white',
                  border: '2px solid',
                  borderColor:
                    pressDetail.statistics.avgStanceScore >= 0.3
                      ? '#66bb6a'
                      : pressDetail.statistics.avgStanceScore <= -0.3
                        ? '#ef5350'
                        : '#9e9e9e',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              />
            </Box>
          </Box>

          {/* 논조 분포 */}
          <Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography variant="caption" color="text.secondary" fontWeight="500">
                논조 분포
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 0.5,
                height: 8,
                borderRadius: 1,
                overflow: 'hidden',
                mb: 1.5,
              }}
            >
              {stanceDistribution.support > 0 && (
                <Box
                  sx={{
                    width: `${totalStance > 0 ? (stanceDistribution.support / totalStance) * 100 : 0}%`,
                    bgcolor: '#66bb6a',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  title={`옹호 ${stanceDistribution.support}개`}
                />
              )}
              {stanceDistribution.neutral > 0 && (
                <Box
                  sx={{
                    width: `${totalStance > 0 ? (stanceDistribution.neutral / totalStance) * 100 : 0}%`,
                    bgcolor: '#9e9e9e',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  title={`중립 ${stanceDistribution.neutral}개`}
                />
              )}
              {stanceDistribution.oppose > 0 && (
                <Box
                  sx={{
                    width: `${totalStance > 0 ? (stanceDistribution.oppose / totalStance) * 100 : 0}%`,
                    bgcolor: '#ef5350',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  title={`비판 ${stanceDistribution.oppose}개`}
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#66bb6a' }} />
                <Typography variant="caption" color="text.secondary">
                  <strong>
                    {totalStance > 0
                      ? Math.round((stanceDistribution.support / totalStance) * 100)
                      : 0}
                    %
                  </strong>{' '}
                  ({stanceDistribution.support})
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#9e9e9e' }} />
                <Typography variant="caption" color="text.secondary">
                  <strong>
                    {totalStance > 0
                      ? Math.round((stanceDistribution.neutral / totalStance) * 100)
                      : 0}
                    %
                  </strong>{' '}
                  ({stanceDistribution.neutral})
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef5350' }} />
                <Typography variant="caption" color="text.secondary">
                  <strong>
                    {totalStance > 0
                      ? Math.round((stanceDistribution.oppose / totalStance) * 100)
                      : 0}
                    %
                  </strong>{' '}
                  ({stanceDistribution.oppose})
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* 기사 목록 */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              기사 목록
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArticleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {pressDetail.statistics.articleCount.toLocaleString()}개
              </Typography>
            </Box>
          </Box>
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
          <Alert severity="info">해당 언론사의 기사가 없습니다.</Alert>
        )}
      </Paper>
    </Box>
  );
}
