/**
 * 페이지네이션 컴포넌트
 */

import { Box, Pagination as MuiPagination, Typography } from '@mui/material';

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
}

export default function Pagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  showInfo = true,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, total);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        mt: 3,
        mb: 2,
      }}
    >
      {showInfo && (
        <Typography variant="body2" color="text.secondary">
          전체 {total}개 중 {startIndex}-{endIndex}
        </Typography>
      )}

      <MuiPagination
        count={totalPages}
        page={page}
        onChange={(_, newPage) => onPageChange(newPage)}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{ ml: 'auto' }}
      />
    </Box>
  );
}
