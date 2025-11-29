import { Box, Paper, Skeleton } from '@mui/material';

export default function PressListSkeleton() {
  return (
    <Box>
      {/* 뒤로 가기 */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={80} height={20} />
      </Box>

      {/* 페이지 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={180} height={45} />
        <Skeleton variant="text" width={150} height={24} />
      </Box>

      {/* 언론사 카드 그리드 */}
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
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Paper key={i} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Skeleton variant="circular" width={48} height={48} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="70%" height={28} />
                <Skeleton variant="text" width="50%" height={20} />
              </Box>
            </Box>
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
