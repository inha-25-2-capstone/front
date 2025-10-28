import { Box, Chip, Paper, Typography } from '@mui/material';
import { stanceColors } from '@/theme/theme';

interface Keyword {
  text: string;
  stance: 'support' | 'neutral' | 'oppose';
}

interface KeywordTrendProps {
  keywords: Keyword[];
}

export default function KeywordTrend({ keywords }: KeywordTrendProps) {
  const getStanceColor = (stance: Keyword['stance']) => {
    switch (stance) {
      case 'support':
        return stanceColors.support;
      case 'neutral':
        return stanceColors.neutral;
      case 'oppose':
        return stanceColors.oppose;
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography>📈</Typography>
        <Typography variant="h6" fontWeight="bold">
          핵심 키워드 트렌드
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        오늘 가장 많이 언급된 논쟁적 정치 키워드는
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {keywords.map((keyword, index) => (
          <Chip
            key={index}
            label={keyword.text}
            sx={{
              bgcolor: getStanceColor(keyword.stance),
              color: '#fff',
              fontWeight: 500,
              '&:hover': {
                bgcolor: getStanceColor(keyword.stance),
                opacity: 0.9,
              },
            }}
          />
        ))}
      </Box>
    </Paper>
  );
}
