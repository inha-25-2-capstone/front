/**
 * 언론사별 분류 페이지
 */

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import PressListSkeleton from '@/components/common/PressListSkeleton';
import PressCard from '@/components/press/PressCard';
import { usePressList } from '@/hooks';

export default function PressListPage() {
  const navigate = useNavigate();

  // 언론사 목록 조회 (통계 정보 포함)
  const {
    data: pressData,
    isLoading,
    error,
  } = usePressList({
    sort: 'name:asc', // 가나다 순 정렬
    include: 'statistics',
  });

  if (isLoading) {
    return <PressListSkeleton />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">언론사 목록을 불러오는데 실패했습니다.</Alert>
      </Box>
    );
  }

  const pressList = pressData?.data || [];

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

      {/* 페이지 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          언론사별 분류
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {pressList.length}개의 언론사가 있습니다
        </Typography>
      </Box>

      {/* 언론사 카드 그리드 */}
      {pressList.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {pressList.map((press) => (
            <PressCard
              key={press.id}
              id={press.id}
              name={press.name}
              articleCount={press.articleCount}
              description={press.description || `${press.name}의 최신 뉴스를 확인해보세요`}
              logoUrl={press.logoUrl}
            />
          ))}
        </Box>
      ) : (
        <Alert severity="info">등록된 언론사가 없습니다.</Alert>
      )}
    </Box>
  );
}
