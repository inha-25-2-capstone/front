import { Box, Typography } from '@mui/material';
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

export interface SpectrumData {
  name: string; // 언론사 이름
  political: number; // 정치 성향 (-100: 진보, 0: 중립, 100: 보수)
  activity: number; // 활동도/영향력 (0-100)
}

interface PressSpectrumChartProps {
  data: SpectrumData[];
}

// 정치 성향에 따른 색상
const getPoliticalColor = (political: number): string => {
  if (political < -30) return '#2196f3'; // 진보 - 파랑
  if (political > 30) return '#f44336'; // 보수 - 빨강
  return '#9e9e9e'; // 중립 - 회색
};

// 커스텀 툴팁
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 1.5,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          boxShadow: 2,
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          정치 성향: {data.political > 0 ? '+' : ''}
          {data.political}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          활동도: {data.activity}
        </Typography>
      </Box>
    );
  }
  return null;
};

// 커스텀 도트 (언론사 점)
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  const color = getPoliticalColor(payload.political);

  return (
    <g>
      <circle cx={cx} cy={cy} r={8} fill={color} opacity={0.8} />
      <text
        x={cx}
        y={cy + 20}
        textAnchor="middle"
        fill="#666"
        fontSize={11}
        fontWeight="500"
      >
        {payload.name}
      </text>
    </g>
  );
};

export default function PressSpectrumChart({ data }: PressSpectrumChartProps) {
  return (
    <Box>
      <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 2 }}>
        언론사 정치 스펙트럼
      </Typography>

      {/* 범례 */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: '#2196f3',
              borderRadius: '50%',
            }}
          />
          <Typography variant="caption">진보</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: '#9e9e9e',
              borderRadius: '50%',
            }}
          />
          <Typography variant="caption">중립</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: '#f44336',
              borderRadius: '50%',
            }}
          />
          <Typography variant="caption">보수</Typography>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 40,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="political"
            name="정치 성향"
            domain={[-100, 100]}
            ticks={[-100, -50, 0, 50, 100]}
            label={{
              value: '← 진보                                   보수 →',
              position: 'bottom',
              offset: 20,
            }}
          />
          <YAxis
            type="number"
            dataKey="activity"
            name="활동도"
            domain={[0, 100]}
            label={{
              value: '활동도',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <ZAxis range={[100, 100]} />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Scatter
            data={data}
            fill="#8884d8"
            shape={<CustomDot />}
            isAnimationActive={true}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
}
