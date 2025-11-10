import { Box, Paper, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { stanceColors } from '@/theme/theme';

interface TopicStanceData {
  topic: string;
  support: number;
  neutral: number;
  oppose: number;
}

interface StanceRatioChartProps {
  data: TopicStanceData[];
}

export default function StanceRatioChart({ data }: StanceRatioChartProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography>📊</Typography>
        <Typography variant="h6" fontWeight="bold">
          주요 토픽별 스탠스 비율
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Top 7 토픽의 중심성과 정치스펙트럼 비율
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 70,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="topic"
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            tick={{ fontSize: 11 }}
          />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: 8,
            }}
            formatter={(value: number) => `${value}개`}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value: string) => {
              switch (value) {
                case 'support':
                  return '옹호';
                case 'neutral':
                  return '중립';
                case 'oppose':
                  return '비판';
                default:
                  return value;
              }
            }}
          />
          <Bar dataKey="support" stackId="a" fill={stanceColors.support} name="support" />
          <Bar dataKey="neutral" stackId="a" fill={stanceColors.neutral} name="neutral" />
          <Bar dataKey="oppose" stackId="a" fill={stanceColors.oppose} name="oppose" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
