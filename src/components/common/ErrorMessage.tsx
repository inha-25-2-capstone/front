/**
 * 에러 메시지 컴포넌트
 */

import { Alert, Box, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  fullWidth?: boolean;
}

export default function ErrorMessage({
  message = '데이터를 불러오는 중 오류가 발생했습니다.',
  onRetry,
  fullWidth = false,
}: ErrorMessageProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        width: fullWidth ? '100%' : 'auto',
      }}
    >
      <Alert
        severity="error"
        sx={{ maxWidth: 600, width: fullWidth ? '100%' : 'auto' }}
        action={
          onRetry ? (
            <Button
              color="inherit"
              size="small"
              onClick={onRetry}
              startIcon={<RefreshIcon />}
            >
              재시도
            </Button>
          ) : undefined
        }
      >
        {message}
      </Alert>
    </Box>
  );
}
