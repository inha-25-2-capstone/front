import { Box, Card, CardContent, Typography } from '@mui/material';

interface StatisticsCardProps {
  icon: string;
  iconBgColor: string;
  label: string;
  value: string | number;
  subtitle: string;
  subtitleColor?: string;
}

export default function StatisticsCard({
  icon,
  iconBgColor,
  label,
  value,
  subtitle,
  subtitleColor = 'text.secondary',
}: StatisticsCardProps) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: iconBgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: 20 }}>{icon}</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
        </Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            mb: 0.5,
            fontSize: typeof value === 'string' && value.length > 10 ? '1.1rem' : '1.5rem',
          }}
        >
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: subtitleColor }}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}
