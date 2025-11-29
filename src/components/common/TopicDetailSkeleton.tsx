import { Box, Paper, Skeleton } from '@mui/material';

export default function TopicDetailSkeleton() {
  return (
    <Box>
      {/* 뒤로 가기 */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={80} height={20} />
      </Box>

      {/* 토픽 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={300} height={45} />
        <Skeleton variant="text" width={400} height={24} />
        <Skeleton variant="text" width={120} height={20} sx={{ mt: 1 }} />
      </Box>

      {/* 대표 기사 */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={120} height={32} sx={{ mb: 2 }} />
        <Paper sx={{ p: 3 }}>
          <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2, mb: 2 }} />
          <Skeleton variant="text" width="80%" height={32} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="90%" height={20} />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Skeleton variant="rounded" width={60} height={28} />
            <Skeleton variant="text" width={100} height={20} />
          </Box>
        </Paper>
      </Box>

      {/* 관련 기사 */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Skeleton variant="text" width={120} height={32} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rounded" width={60} height={32} sx={{ borderRadius: 4 }} />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[1, 2, 3].map((i) => (
            <Paper key={i} elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Skeleton variant="rectangular" width={120} height={80} sx={{ borderRadius: 1 }} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="rounded" width={50} height={24} sx={{ mb: 1 }} />
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
