import { Box, Container, Paper, Typography } from '@mui/material';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerPage = () => {
  // Swagger JSON URL - 백엔드에서 제공하는 Swagger 문서 URL
  // 일반적으로 /swagger.json, /api-docs, /openapi.json 등의 엔드포인트로 제공됩니다
  const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');

  // FastAPI는 자동으로 OpenAPI 스펙을 /openapi.json에서 제공합니다
  // 백엔드 실행 없이 로컬 파일을 사용하려면 /openapi.json을 사용
  const swaggerUrl =
    import.meta.env.VITE_USE_MOCK_DATA === 'true'
      ? '/openapi.json' // 로컬 파일 사용 (public/openapi.json)
      : `${baseUrl}/openapi.json`; // 실제 백엔드에서 실시간으로 가져오기

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            API Documentation
          </Typography>
          <Typography variant="body2" color="text.secondary">
            백엔드 API의 모든 엔드포인트와 스키마를 확인할 수 있습니다.
          </Typography>
        </Box>

        <Box
          sx={{
            '& .swagger-ui': {
              fontFamily: 'inherit',
            },
            '& .swagger-ui .topbar': {
              display: 'none', // Swagger UI의 기본 헤더 숨기기
            },
          }}
        >
          <SwaggerUI url={swaggerUrl} />
        </Box>
      </Paper>
    </Container>
  );
};

export default SwaggerPage;
