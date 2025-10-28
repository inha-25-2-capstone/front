import { Box, Typography, Card, CardContent, Paper } from '@mui/material';

export default function MainPage() {
  return (
    <Box>
      {/* 페이지 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          오늘의 정치 지향
        </Typography>
        <Typography variant="body1" color="text.secondary">
          한국 가장 논쟁적 역할 어휘분류 언론사 탐험되는 논조로 변동 받지 않겠습니다
        </Typography>
      </Box>

      {/* 통계 카드 4개 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: '#ff6b6b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ fontSize: 20 }}>🔥</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                기사 스탠스 지수
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight="bold">
              128
            </Typography>
            <Typography variant="caption" sx={{ color: '#ff6b6b' }}>
              총 논조 수
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: '#e91e63',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ fontSize: 20 }}>📊</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                대표정치 입장평균 논조
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
              대통령 탄핵정책 논란
            </Typography>
            <Typography variant="caption" color="text.secondary">
              옹호 39% / 중립 33%
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: '#2196f3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ fontSize: 20 }}>💬</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                논의점 수
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight="bold">
              12
            </Typography>
            <Typography variant="caption" color="text.secondary">
              오늘 핫 화제 가지
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: '#4caf50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ fontSize: 20 }}>📰</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                핵심 언론사
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight="bold">
              8
            </Typography>
            <Typography variant="caption" color="text.secondary">
              다양한 시각 제공
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* 핵심 키워드 트렌드 */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography>📈</Typography>
          <Typography variant="h6" fontWeight="bold">
            핵심 키워드 트렌드
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          오늘 가장 많이 달린 논쟁적 정치 키워드는
        </Typography>
        <Box sx={{ lineHeight: 2 }}>
          <Typography variant="body1" component="span">
            교육부 헌의 봉직금 감축개요 경제정책 국정감사 부종법밤 투표성격책
          </Typography>
        </Box>
      </Paper>

      {/* 우보 핵심팩 스탠스 비율 */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography>📊</Typography>
          <Typography variant="h6" fontWeight="bold">
            우보 핵심팩 스탠스 비율
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Top 7 토픽이 중심성감 정치스펙트럼 비율
        </Typography>
        <Box
          sx={{
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f5',
            borderRadius: 2,
          }}
        >
          <Typography color="text.secondary">차트 영역 (구현 예정)</Typography>
        </Box>
      </Paper>

      {/* 언론사별 스탠스 분포 히트맵 */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography>🗂️</Typography>
          <Typography variant="h6" fontWeight="bold">
            언론사별 스탠스 분포 히트맵
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          각 언론사가 주목 눈에될 삿징는 논조를 색상으로 표한
        </Typography>
        <Box
          sx={{
            height: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f5',
            borderRadius: 2,
          }}
        >
          <Typography color="text.secondary">히트맵 테이블 영역 (구현 예정)</Typography>
        </Box>
      </Paper>

      {/* 언론사별 비교 분석 */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography>📰</Typography>
          <Typography variant="h6" fontWeight="bold">
            언론사별 비교 분석
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 2 }}>
              언론사 정치 스펙트럼
            </Typography>
            <Box
              sx={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
                borderRadius: 2,
              }}
            >
              <Typography color="text.secondary">스캐터 플롯 (구현 예정)</Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 2 }}>
              언론사별 활동 지표
            </Typography>
            <Box
              sx={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
                borderRadius: 2,
              }}
            >
              <Typography color="text.secondary">리스트 (구현 예정)</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
