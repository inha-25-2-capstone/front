import { Box, Paper, Skeleton } from '@mui/material';

export default function PressArticlesSkeleton() {
  return (
    <Box>
      {/* 뒤로 가기 */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={100} height={20} />
      </Box>

      {/* 언론사 정보 카드 */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        {/* 헤더 */}
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
          <Skeleton variant="circular" width={36} height={36} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width={150} height={32} />
            <Skeleton variant="text" width={250} height={20} />
          </Box>
        </Box>

        {/* 통계 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
          }}
        >
          {/* 평균 스탠스 */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Skeleton variant="text" width={100} height={20} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Skeleton variant="rounded" width={70} height={24} />
                <Skeleton variant="text" width={40} height={24} />
              </Box>
            </Box>
            <Skeleton variant="rounded" width="100%" height={8} />
          </Box>

          {/* 논조 분포 */}
          <Box>
            <Skeleton variant="text" width={80} height={20} sx={{ mb: 1 }} />
            <Skeleton variant="rounded" width="100%" height={8} sx={{ mb: 1.5 }} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[1, 2, 3].map((i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Skeleton variant="circular" width={8} height={8} />
                  <Skeleton variant="text" width={50} height={18} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* 기사 목록 */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Skeleton variant="text" width={100} height={32} />
            <Skeleton variant="text" width={60} height={20} />
          </Box>
          <Skeleton variant="rounded" width={120} height={40} />
        </Box>

        {/* 기사 카드 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[1, 2, 3, 4].map((i) => (
            <Paper key={i} elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Skeleton variant="rectangular" width={120} height={80} sx={{ borderRadius: 1 }} />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Skeleton variant="rounded" width={50} height={24} />
                    <Skeleton variant="text" width={80} height={20} />
                  </Box>
                  <Skeleton variant="text" width="90%" height={24} />
                  <Skeleton variant="text" width="60%" height={20} />
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
