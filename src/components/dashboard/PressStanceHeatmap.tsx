import { Box, Chip, Paper, Tooltip, Typography } from '@mui/material';

export interface HeatmapData {
  press: string;
  topics: {
    [topicName: string]: 'support' | 'neutral' | 'oppose' | null;
  };
}

interface PressStanceHeatmapProps {
  data: HeatmapData[];
  topicNames: string[];
}

// 스탠스에 따른 배경색 반환 (부드러운 색상)
const getStanceColor = (stance: 'support' | 'neutral' | 'oppose' | null): string => {
  if (!stance) return 'rgba(245, 245, 245, 0.6)';

  switch (stance) {
    case 'support':
      return 'rgba(76, 175, 80, 0.85)'; // 초록 (옹호)
    case 'neutral':
      return 'rgba(158, 158, 158, 0.75)'; // 회색 (중립)
    case 'oppose':
      return 'rgba(244, 67, 54, 0.85)'; // 빨강 (비판)
    default:
      return 'rgba(245, 245, 245, 0.6)';
  }
};

// 스탠스 한글 라벨
const getStanceLabel = (stance: 'support' | 'neutral' | 'oppose' | null): string => {
  if (!stance) return '없음';

  switch (stance) {
    case 'support':
      return '옹호';
    case 'neutral':
      return '중립';
    case 'oppose':
      return '비판';
    default:
      return '없음';
  }
};

export default function PressStanceHeatmap({ data, topicNames }: PressStanceHeatmapProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography>🗂️</Typography>
        <Typography variant="h6" fontWeight="bold">
          언론사별 스탠스 분포
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        각 언론사가 주요 토픽에 대해 취하는 논조를 색상으로 표현
      </Typography>

      {/* 범례 */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'flex-end' }}>
        <Chip
          label="옹호"
          size="small"
          sx={{ bgcolor: 'rgba(76, 175, 80, 0.85)', color: 'white', fontWeight: 500 }}
        />
        <Chip
          label="중립"
          size="small"
          sx={{ bgcolor: 'rgba(158, 158, 158, 0.75)', color: 'white', fontWeight: 500 }}
        />
        <Chip
          label="비판"
          size="small"
          sx={{ bgcolor: 'rgba(244, 67, 54, 0.85)', color: 'white', fontWeight: 500 }}
        />
      </Box>

      {/* 토픽 헤더 */}
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `200px repeat(${topicNames.length}, 1fr)`,
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Typography variant="caption" fontWeight="600" color="text.secondary" sx={{ pl: 2 }}>
            언론사 / 토픽
          </Typography>
          {topicNames.map((topic) => (
            <Typography
              key={topic}
              variant="caption"
              fontWeight="600"
              color="text.secondary"
              align="center"
              sx={{
                fontSize: '0.7rem',
                lineHeight: 1.2,
              }}
            >
              {topic}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* 히트맵 그리드 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          maxHeight: 500,
          overflow: 'auto',
          pr: 1,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: '#888',
            borderRadius: '4px',
            '&:hover': {
              bgcolor: '#555',
            },
          },
        }}
      >
        {data.map((row) => (
          <Box
            key={row.press}
            sx={{
              display: 'grid',
              gridTemplateColumns: `200px repeat(${topicNames.length}, 1fr)`,
              gap: 1,
              alignItems: 'center',
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.2s',
              '&:hover': {
                boxShadow: 2,
                borderColor: 'primary.light',
              },
            }}
          >
            <Typography variant="body2" fontWeight="600" sx={{ pl: 1 }}>
              {row.press}
            </Typography>
            {topicNames.map((topic) => {
              const stance = row.topics[topic];
              return (
                <Tooltip key={topic} title={getStanceLabel(stance)} arrow placement="top">
                  <Box
                    sx={{
                      height: 40,
                      borderRadius: 1.5,
                      bgcolor: getStanceColor(stance),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: stance ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                      '&:hover': {
                        transform: stance ? 'translateY(-2px)' : 'none',
                        boxShadow: stance ? '0 4px 8px rgba(0,0,0,0.15)' : 'none',
                      },
                    }}
                  >
                    {stance && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                        }}
                      >
                        {getStanceLabel(stance)}
                      </Typography>
                    )}
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
