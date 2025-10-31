/**
 * 스탠스(논조) 배지 컴포넌트
 */

import { Chip } from '@mui/material';

import type { Stance } from '@/types';
import { getStanceColor, getStanceLabel } from '@/utils';

interface StanceBadgeProps {
  stance: Stance;
  size?: 'small' | 'medium';
}

export default function StanceBadge({ stance, size = 'small' }: StanceBadgeProps) {
  const color = getStanceColor(stance);
  const label = getStanceLabel(stance);

  return (
    <Chip
      label={label}
      size={size}
      sx={{
        backgroundColor: color,
        color: 'white',
        fontWeight: 'bold',
        fontSize: size === 'small' ? '0.75rem' : '0.875rem',
      }}
    />
  );
}
