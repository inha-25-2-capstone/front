import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface PressCardProps {
  id: string;
  name: string;
  articleCount: number;
  description: string;
  logoUrl?: string;
}

// 언론사 이름에 따른 색상 생성 (일관된 색상 유지)
const getColorFromName = (name: string): string => {
  const colors = [
    '#1976d2', // 파랑
    '#388e3c', // 초록
    '#d32f2f', // 빨강
    '#7b1fa2', // 보라
    '#f57c00', // 주황
    '#0288d1', // 하늘
    '#c2185b', // 핑크
    '#455a64', // 그레이
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};

export default function PressCard({
  id,
  name,
  articleCount,
  description,
  logoUrl,
}: PressCardProps) {
  const bgColor = getColorFromName(name);
  const firstChar = name.charAt(0);

  return (
    <Card
      component={Link}
      to={`/press/${id}/articles`}
      sx={{
        textDecoration: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {logoUrl ? (
            <Avatar src={logoUrl} alt={name} variant="rounded" sx={{ width: 48, height: 48 }} />
          ) : (
            <Avatar
              variant="rounded"
              sx={{
                width: 48,
                height: 48,
                bgcolor: bgColor,
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {firstChar}
            </Avatar>
          )}
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {articleCount}개 기사
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
