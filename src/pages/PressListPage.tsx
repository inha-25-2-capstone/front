import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import PressCard from '@/components/press/PressCard';

// 더미 데이터
const pressList = [
  { id: 1, name: 'JTBC뉴스', articleCount: 5, description: 'JTBC뉴스의 최신 뉴스를 확인해보세요' },
  { id: 2, name: 'KBS뉴스', articleCount: 7, description: 'KBS뉴스의 최신 뉴스를 확인해보세요' },
  { id: 3, name: 'MBC뉴스', articleCount: 4, description: 'MBC뉴스의 최신 뉴스를 확인해보세요' },
  { id: 4, name: 'SBS뉴스', articleCount: 5, description: 'SBS뉴스의 최신 뉴스를 확인해보세요' },
  { id: 5, name: '경향신문', articleCount: 6, description: '경향신문의 최신 뉴스를 확인해보세요' },
  { id: 6, name: '동아일보', articleCount: 3, description: '동아일보의 최신 뉴스를 확인해보세요' },
  { id: 7, name: '매일경제', articleCount: 3, description: '매일경제의 최신 뉴스를 확인해보세요' },
  { id: 8, name: '연합뉴스', articleCount: 4, description: '연합뉴스의 최신 뉴스를 확인해보세요' },
  { id: 9, name: '조선일보', articleCount: 6, description: '조선일보의 최신 뉴스를 확인해보세요' },
  { id: 10, name: '중앙일보', articleCount: 4, description: '중앙일보의 최신 뉴스를 확인해보세요' },
  { id: 11, name: '한겨레', articleCount: 7, description: '한겨레의 최신 뉴스를 확인해보세요' },
  { id: 12, name: '한국경제', articleCount: 5, description: '한국경제의 최신 뉴스를 확인해보세요' },
];

export default function PressListPage() {
  const navigate = useNavigate();

  return (
    <Box>
      {/* 뒤로 가기 버튼 */}
      <Box sx={{ mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body2" component="span" color="text.secondary">
          뒤로 가기
        </Typography>
      </Box>

      {/* 페이지 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          언론사별 분류
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {pressList.length}개의 언론사가 있습니다
        </Typography>
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
        {pressList.map((press) => (
          <PressCard key={press.id} {...press} />
        ))}
      </Box>
    </Box>
  );
}
