import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';

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

// 스탠스에 따른 배경색 반환
const getStanceColor = (stance: 'support' | 'neutral' | 'oppose' | null): string => {
  if (!stance) return '#f5f5f5';

  switch (stance) {
    case 'support':
      return '#4caf50'; // 초록 (옹호)
    case 'neutral':
      return '#9e9e9e'; // 회색 (중립)
    case 'oppose':
      return '#f44336'; // 빨강 (비판)
    default:
      return '#f5f5f5';
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
          언론사별 스탠스 분포 히트맵
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        각 언론사가 주요 토픽에 대해 취하는 논조를 색상으로 표현
      </Typography>

      {/* 범례 */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'flex-end' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 20,
              height: 20,
              bgcolor: '#4caf50',
              borderRadius: 1,
            }}
          />
          <Typography variant="body2">옹호</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 20,
              height: 20,
              bgcolor: '#9e9e9e',
              borderRadius: 1,
            }}
          />
          <Typography variant="body2">중립</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 20,
              height: 20,
              bgcolor: '#f44336',
              borderRadius: 1,
            }}
          />
          <Typography variant="body2">비판</Typography>
        </Box>
      </Box>

      {/* 히트맵 테이블 */}
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  bgcolor: 'background.paper',
                  minWidth: 120,
                }}
              >
                언론사
              </TableCell>
              {topicNames.map((topic) => (
                <TableCell
                  key={topic}
                  align="center"
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: 'background.paper',
                    minWidth: 100,
                  }}
                >
                  {topic}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.press} hover>
                <TableCell sx={{ fontWeight: 600 }}>{row.press}</TableCell>
                {topicNames.map((topic) => {
                  const stance = row.topics[topic];
                  return (
                    <Tooltip key={topic} title={getStanceLabel(stance)} arrow>
                      <TableCell
                        align="center"
                        sx={{
                          bgcolor: getStanceColor(stance),
                          cursor: 'pointer',
                          transition: 'opacity 0.2s',
                          '&:hover': {
                            opacity: 0.8,
                          },
                        }}
                      >
                        {stance && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'white',
                              fontWeight: 'bold',
                              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                            }}
                          >
                            {getStanceLabel(stance)}
                          </Typography>
                        )}
                      </TableCell>
                    </Tooltip>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
