import { Box, Paper, Skeleton } from '@mui/material';

export default function ArticleDetailSkeleton() {
  return (
    <Box>
      {/* 뒤로 가기 */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={80} height={20} />
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* 좌측: 기사 본문 */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 66%' } }}>
          <Paper sx={{ p: 4 }}>
            {/* 기사 헤더 */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Skeleton variant="rounded" width={60} height={28} />
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={120} height={20} />
              </Box>
              <Skeleton variant="text" width="90%" height={40} />
              <Skeleton variant="text" width="70%" height={40} />
              <Skeleton variant="text" width={200} height={20} sx={{ mt: 1 }} />
            </Box>

            <Skeleton variant="rectangular" height={1} sx={{ mb: 3 }} />

            {/* 기사 이미지 */}
            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1, mb: 3 }} />

            {/* 요약 */}
            <Skeleton
              variant="rectangular"
              height={100}
              sx={{ borderRadius: 1, mb: 3, bgcolor: 'grey.100' }}
            />

            {/* 본문 */}
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} variant="text" width={`${90 + Math.random() * 10}%`} height={24} />
            ))}
            <Box sx={{ my: 2 }} />
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="text" width={`${85 + Math.random() * 15}%`} height={24} />
            ))}

            <Skeleton variant="rectangular" height={1} sx={{ my: 3 }} />

            {/* 원문 보기 버튼 */}
            <Skeleton variant="rounded" width="100%" height={42} />
          </Paper>
        </Box>

        {/* 우측: 사이드바 */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33%' } }}>
          <Paper sx={{ p: 3 }}>
            <Skeleton variant="text" width={100} height={28} sx={{ mb: 2 }} />

            {/* 필터 */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={55}
                  height={32}
                  sx={{ borderRadius: 4 }}
                />
              ))}
            </Box>

            {/* 추천 기사 */}
            {[1, 2, 3].map((i) => (
              <Box key={i} sx={{ mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Skeleton variant="rounded" width={50} height={22} />
                  <Skeleton variant="text" width={80} height={20} />
                </Box>
                <Skeleton variant="text" width="100%" height={22} />
                <Skeleton variant="text" width="80%" height={22} />
              </Box>
            ))}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
