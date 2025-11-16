/**
 * 전체 기사 목록 페이지
 */

import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  type SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import ArticleCard from '@/components/article/ArticleCard';
import StanceFilter from '@/components/common/StanceFilter';
import { useArticles } from '@/hooks';
import type { ArticleSortField, Stance } from '@/types';

type SortOption = 'publishedAt:desc' | 'publishedAt:asc';

export default function ArticleListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [stanceFilter, setStanceFilter] = useState<Stance | '전체'>('전체');
  const [sortOption, setSortOption] = useState<SortOption>('publishedAt:desc');

  // 정렬 옵션 파싱
  const [sortField, sortOrder] = sortOption.split(':') as [ArticleSortField, 'asc' | 'desc'];

  // 기사 목록 조회
  const {
    data: articlesData,
    isLoading,
    error,
  } = useArticles({
    page: currentPage,
    limit: 20,
    filter: {
      stance: stanceFilter,
    },
    sortField,
    sortOrder,
  });

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStanceChange = (newStance: Stance | '전체') => {
    setStanceFilter(newStance);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value as SortOption);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로
  };

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
        <Alert severity="error">기사 목록을 불러오는데 실패했습니다.</Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* 페이지 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          전체 기사 목록
        </Typography>
        <Typography variant="body1" color="text.secondary">
          최신 정치 기사를 확인해보세요
        </Typography>
      </Box>

      {/* 필터 및 정렬 */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <StanceFilter value={stanceFilter} onChange={handleStanceChange} />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>정렬</InputLabel>
            <Select value={sortOption} label="정렬" onChange={handleSortChange}>
              <MenuItem value="publishedAt:desc">최신순</MenuItem>
              <MenuItem value="publishedAt:asc">오래된순</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* 기사 리스트 */}
        {articlesData && articlesData.items.length > 0 ? (
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
          <Alert severity="info">해당 조건의 기사가 없습니다.</Alert>
        )}
      </Paper>
    </Box>
  );
}
