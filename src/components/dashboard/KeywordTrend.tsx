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
  // TODO: 임시 mock 데이터 (API 연동 후 제거)
  const mockKeywords: Keyword[] = [
    { text: '윤석열', weight: 85 },
    { text: '대통령', weight: 78 },
    { text: '국회', weight: 65 },
    { text: '탄핵', weight: 60 },
    { text: '민주당', weight: 55 },
    { text: '국민의힘', weight: 50 },
    { text: '정치', weight: 45 },
    { text: '검찰', weight: 40 },
    { text: '총선', weight: 35 },
    { text: '여야', weight: 30 },
  ];
  const allKeywords = keywords.length > 0 ? keywords : mockKeywords;
  // 상위 10개만 표시
  const displayKeywords = allKeywords.slice(0, 10);

  // 가중치 기반으로 폰트 크기, 선명도, 위치 계산
  const keywordsWithStyle = useMemo(() => {
    if (displayKeywords.length === 0) return [];

    const maxWeight = Math.max(...displayKeywords.map((k) => k.weight || k.count || 1));
    const minWeight = Math.min(...displayKeywords.map((k) => k.weight || k.count || 1));

    // 가중치 순으로 정렬 (큰 것부터)
    const sorted = [...displayKeywords].sort(
      (a, b) => (b.weight || b.count || 1) - (a.weight || a.count || 1),
    );

    // 10개 키워드를 고르게 배치하기 위한 미리 정의된 위치
    const predefinedPositions = [
      { x: 50, y: 50 }, // 1위: 정중앙
      { x: 25, y: 25 }, // 2위: 좌상단
      { x: 75, y: 75 }, // 3위: 우하단
      { x: 75, y: 25 }, // 4위: 우상단
      { x: 25, y: 75 }, // 5위: 좌하단
      { x: 50, y: 20 }, // 6위: 상단 중앙
      { x: 50, y: 80 }, // 7위: 하단 중앙
      { x: 15, y: 50 }, // 8위: 좌측 중앙
      { x: 85, y: 50 }, // 9위: 우측 중앙
      { x: 38, y: 38 }, // 10위: 중앙 좌상
    ];

    const positions = sorted.map((_, index) => {
      return predefinedPositions[index] || { x: 50, y: 50 };
    });

    return sorted.map((keyword, index) => {
      const weight = keyword.weight || keyword.count || 1;
      const normalizedWeight = (weight - minWeight) / (maxWeight - minWeight || 1);

      // 가중치에 따라 18px ~ 38px 사이 크기 결정
      const fontSize = 18 + normalizedWeight * 20;
      // 선명도: 0.5 ~ 1.0 사이
      const opacity = 0.5 + normalizedWeight * 0.5;
      // 약간의 회전
      const rotate = (Math.random() - 0.5) * 6;

      return {
        ...keyword,
        fontSize: Math.round(fontSize),
        opacity,
        rotate,
        x: positions[index].x,
        y: positions[index].y,
      };
    });
  }, [displayKeywords]);

  return (
    <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography>📈</Typography>
        <Typography variant="h6" fontWeight="bold">
          핵심 키워드 트렌드
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        오늘 가장 많이 언급된 정치 키워드 Top 10
      </Typography>

      {/* 워드클라우드 */}
      <Box
        sx={{
          flex: 1,
          minHeight: 300,
          bgcolor: '#fafafa',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {keywordsWithStyle.map((keyword, index) => (
          <Typography
            key={index}
            sx={{
              position: 'absolute',
              left: `${keyword.x}%`,
              top: `${keyword.y}%`,
              transform: `translate(-50%, -50%) rotate(${keyword.rotate}deg)`,
              fontSize: `${keyword.fontSize}px`,
              fontWeight: 600,
              color: '#1976d2',
              opacity: keyword.opacity,
              cursor: 'pointer',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
              '&:hover': {
                opacity: 1,
                transform: `translate(-50%, -50%) scale(1.2)`,
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
