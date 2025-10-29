import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface PressCardProps {
  id: number;
  name: string;
  articleCount: number;
  description: string;
}

export default function PressCard({ id, name, articleCount, description }: PressCardProps) {
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
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <NewspaperIcon sx={{ fontSize: 28, color: 'text.secondary' }} />
          </Box>
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
