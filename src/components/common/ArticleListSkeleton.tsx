import { Box, Paper, Skeleton } from '@mui/material';

export default function ArticleListSkeleton() {
  return (
    <Box>
      {/* 페이지 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={200} height={45} />
        <Skeleton variant="text" width={250} height={24} />
      </Box>

      {/* 필터 및 기사 목록 */}
      <Paper sx={{ p: 3 }}>
        {/* 필터 바 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rounded" width={70} height={32} sx={{ borderRadius: 4 }} />
            ))}
          </Box>
          <Skeleton variant="rounded" width={120} height={40} />
        </Box>

        {/* 기사 카드 목록 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Paper key={i} elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Skeleton variant="rectangular" width={120} height={80} sx={{ borderRadius: 1 }} />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Skeleton variant="rounded" width={50} height={24} />
                    <Skeleton variant="text" width={80} height={20} />
                  </Box>
                  <Skeleton variant="text" width="90%" height={28} />
                  <Skeleton variant="text" width="70%" height={20} />
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* 페이지네이션 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} variant="circular" width={32} height={32} />
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
