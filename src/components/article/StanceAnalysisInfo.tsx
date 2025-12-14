/**
 * 스탠스 분석 정보 표시 컴포넌트 (시연용)
 * softmax 확률값과 계산된 score를 시각적으로 표시
 */

import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { Box, LinearProgress, Typography } from '@mui/material';

import type { StanceInfo } from '@/types';

interface StanceAnalysisInfoProps {
  stanceInfo: StanceInfo;
}

const STANCE_COLORS = {
  support: '#66bb6a', // 초록
  neutral: '#ffa726', // 주황
  oppose: '#ef5350', // 빨강
};

const STANCE_LABELS = {
  support: '옹호',
  neutral: '중립',
  oppose: '비판',
};

export default function StanceAnalysisInfo({ stanceInfo }: StanceAnalysisInfoProps) {
  const { score, probabilities } = stanceInfo;

  // 확률을 퍼센트로 변환
  const supportPercent = (probabilities.support * 100).toFixed(1);
  const neutralPercent = (probabilities.neutral * 100).toFixed(1);
  const opposePercent = (probabilities.oppose * 100).toFixed(1);

  return (
    <Box>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AutoGraphIcon sx={{ color: 'primary.main', fontSize: 20 }} />
        <Typography variant="h6" fontWeight="bold">
          AI 스탠스 분석
        </Typography>
      </Box>

      {/* Score 표시 */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          bgcolor: 'grey.50',
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 600 }}>
          Stance Score
        </Typography>
        <Typography variant="h4" sx={{ fontFamily: 'monospace', fontWeight: 900 }}>
          {score.toFixed(4)}
        </Typography>
      </Box>

      {/* Softmax 확률 표시 */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ display: 'block', mb: 1.5, fontWeight: 600 }}
      >
        Softmax Probabilities
      </Typography>

      {/* 옹호 */}
      <Box sx={{ mb: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" sx={{ color: STANCE_COLORS.support, fontWeight: 500 }}>
            {STANCE_LABELS.support}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: 'monospace', fontWeight: 700 }}
          >
            {supportPercent}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={probabilities.support * 100}
          sx={{
            height: 8,
            borderRadius: 1,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              bgcolor: STANCE_COLORS.support,
            },
          }}
        />
      </Box>

      {/* 중립 */}
      <Box sx={{ mb: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" sx={{ color: STANCE_COLORS.neutral, fontWeight: 500 }}>
            {STANCE_LABELS.neutral}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: 'monospace', fontWeight: 700 }}
          >
            {neutralPercent}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={probabilities.neutral * 100}
          sx={{
            height: 8,
            borderRadius: 1,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              bgcolor: STANCE_COLORS.neutral,
            },
          }}
        />
      </Box>

      {/* 비판 */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" sx={{ color: STANCE_COLORS.oppose, fontWeight: 500 }}>
            {STANCE_LABELS.oppose}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: 'monospace', fontWeight: 700 }}
          >
            {opposePercent}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={probabilities.oppose * 100}
          sx={{
            height: 8,
            borderRadius: 1,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              bgcolor: STANCE_COLORS.oppose,
            },
          }}
        />
      </Box>
    </Box>
  );
}
