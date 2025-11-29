import { Box, Paper, Skeleton } from '@mui/material';

export default function MainPageSkeleton() {
  return (
    <Box>
      {/* 페이지 헤더 스켈레톤 */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={200} height={45} />
      </Box>

      {/* 토픽 캐러셀 스켈레톤 */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={150} height={32} />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
          {[1, 2, 3, 4].map((i) => (
            <Paper
              key={i}
              sx={{
                minWidth: 350,
                p: 2,
                borderRadius: 3,
              }}
            >
              <Skeleton variant="rectangular" height={160} sx={{ borderRadius: 2, mb: 2 }} />
              <Skeleton variant="text" width="80%" height={28} />
              <Skeleton variant="text" width="60%" height={20} />
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Skeleton variant="rounded" width={60} height={24} />
                <Skeleton variant="rounded" width={60} height={24} />
                <Skeleton variant="rounded" width={60} height={24} />
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* 키워드 트렌드 스켈레톤 */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={150} height={32} sx={{ mb: 2 }} />
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton
                key={i}
                variant="rounded"
                width={80 + Math.random() * 40}
                height={36}
                sx={{ borderRadius: 4 }}
              />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* BERTopic 시각화 스켈레톤 */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
      </Paper>

      {/* 히트맵 스켈레톤 */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={180} height={32} sx={{ mb: 2 }} />
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
        </Paper>
      </Box>
    </Box>
  );
}
