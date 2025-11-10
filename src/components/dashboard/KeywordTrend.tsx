import { Box, Paper, Typography } from '@mui/material';
import { useMemo } from 'react';

interface Keyword {
  text: string;
  weight?: number; // 가중치 (1-100)
  count?: number; // 등장 횟수
}

interface KeywordTrendProps {
  keywords: Keyword[];
}

export default function KeywordTrend({ keywords }: KeywordTrendProps) {
  // 가중치 기반으로 폰트 크기 및 선명도 계산
  const keywordsWithStyle = useMemo(() => {
    if (keywords.length === 0) return [];

    const maxWeight = Math.max(...keywords.map((k) => k.weight || k.count || 1));
    const minWeight = Math.min(...keywords.map((k) => k.weight || k.count || 1));

    return keywords.map((keyword, index) => {
      const weight = keyword.weight || keyword.count || 1;
      // 가중치에 따라 14px ~ 40px 사이 크기 결정
      const fontSize = 14 + ((weight - minWeight) / (maxWeight - minWeight || 1)) * 26;
      // 선명도: 0.4 ~ 1.0 사이
      const opacity = 0.4 + ((weight - minWeight) / (maxWeight - minWeight || 1)) * 0.6;

      // 랜덤한 위치 오프셋 (흩어진 느낌)
      const randomX = (Math.random() - 0.5) * 20; // -10px ~ 10px
      const randomY = (Math.random() - 0.5) * 20; // -10px ~ 10px
      const randomRotate = (Math.random() - 0.5) * 10; // -5deg ~ 5deg

      return {
        ...keyword,
        fontSize: Math.round(fontSize),
        opacity: opacity,
        randomX,
        randomY,
        randomRotate,
      };
    });
  }, [keywords]);

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography>📈</Typography>
        <Typography variant="h6" fontWeight="bold">
          핵심 키워드 트렌드
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        오늘 가장 많이 언급된 정치 키워드 Top 10
      </Typography>

      {/* 워드클라우드 */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
          minHeight: 250,
          p: 3,
          bgcolor: '#fafafa',
          borderRadius: 2,
          position: 'relative',
        }}
      >
        {keywordsWithStyle.map((keyword, index) => (
          <Typography
            key={index}
            sx={{
              fontSize: `${keyword.fontSize}px`,
              fontWeight: 600,
              color: '#1976d2', // 파란색 통일
              opacity: keyword.opacity,
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.3s ease',
              position: 'relative',
              transform: `translate(${keyword.randomX}px, ${keyword.randomY}px) rotate(${keyword.randomRotate}deg)`,
              '&:hover': {
                opacity: 1,
                transform: `translate(${keyword.randomX}px, ${keyword.randomY}px) rotate(0deg) scale(1.15)`,
                textShadow: '2px 2px 8px rgba(25, 118, 210, 0.3)',
                zIndex: 10,
              },
            }}
          >
            {keyword.text}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
}
