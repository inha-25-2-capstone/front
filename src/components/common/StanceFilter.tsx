/**
 * 스탠스 필터 컴포넌트
 */

import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import type { Stance } from '@/types';
import { getStanceColor, getStanceLabel } from '@/utils';

interface StanceFilterProps {
  value: Stance | '전체';
  onChange: (value: Stance | '전체') => void;
}

const FILTER_OPTIONS: Array<Stance | '전체'> = ['전체', 'support', 'neutral', 'oppose'];

export default function StanceFilter({ value, onChange }: StanceFilterProps) {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: Stance | '전체' | null,
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      size="small"
      aria-label="스탠스 필터"
    >
      {FILTER_OPTIONS.map((option) => (
        <ToggleButton
          key={option}
          value={option}
          aria-label={option === '전체' ? '전체' : getStanceLabel(option)}
          sx={{
            px: 2,
            py: 0.5,
            '&.Mui-selected': {
              backgroundColor: option === '전체' ? 'primary.main' : getStanceColor(option),
              color: 'white',
              '&:hover': {
                backgroundColor: option === '전체' ? 'primary.dark' : getStanceColor(option),
                opacity: 0.9,
              },
            },
          }}
        >
          {option === '전체' ? '전체' : getStanceLabel(option)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
