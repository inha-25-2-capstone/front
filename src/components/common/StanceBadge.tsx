/**
 * 스탠스(논조) 배지 컴포넌트
 */

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { Chip } from '@mui/material';

import type { Stance } from '@/types';
import { getStanceColor, getStanceLabel } from '@/utils';

interface StanceBadgeProps {
  stance: Stance | null;
  size?: 'small' | 'medium';
}

export default function StanceBadge({ stance, size = 'small' }: StanceBadgeProps) {
  const color = getStanceColor(stance);
  const label = getStanceLabel(stance);
  const isAnalyzing = stance === null;

  return (
    <Chip
      icon={
        isAnalyzing ? (
          <HourglassEmptyIcon sx={{ fontSize: size === 'small' ? 14 : 18, color: 'white' }} />
        ) : undefined
      }
      label={label}
      size={size}
      sx={{
        backgroundColor: color,
        color: 'white',
        fontWeight: 'bold',
        fontSize: size === 'small' ? '0.75rem' : '0.875rem',
        '& .MuiChip-icon': {
          color: 'white',
          marginLeft: '4px',
        },
      }}
    />
  );
}
