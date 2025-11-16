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

import type { BertopicPoint } from '@/types';

interface BertopicVisualizationProps {
  data: BertopicPoint[];
}

// 스탠스에 따른 색상 (CLAUDE.md 기준)
const getStanceColor = (avgStance: number): string => {
  if (avgStance > 0.2) return '#66bb6a'; // 옹호 - 초록
  if (avgStance < -0.2) return '#ef5350'; // 비판 - 빨강
  return '#ffa726'; // 중립 - 주황
};

// 스탠스 텍스트 변환
const getStanceText = (avgStance: number): string => {
  if (avgStance > 0.2) return '옹호';
  if (avgStance < -0.2) return '비판';
  return '중립';
};

// 커스텀 툴팁 타입
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: BertopicPoint;
  }>;
}

// 커스텀 툴팁
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
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
          maxWidth: 300,
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          {data.topic_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          기사 수: {data.article_count}개
        </Typography>
        <Typography variant="body2" color="text.secondary">
          평균 스탠스: {data.avg_stance.toFixed(2)} ({getStanceText(data.avg_stance)})
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          키워드: {data.keywords.join(', ')}
        </Typography>
      </Box>
    );
  }
  return null;
};

// 커스텀 도트 타입
interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: BertopicPoint;
}

// 커스텀 도트 (토픽 클러스터 점)
const CustomDot = (props: CustomDotProps) => {
  const { cx, cy, payload } = props;
  if (!cx || !cy || !payload) return null;

  const color = getStanceColor(payload.avg_stance);
  // 기사 수에 비례한 크기 (최소 6, 최대 16)
  const radius = Math.min(Math.max(payload.article_count / 2, 6), 16);

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={color}
        opacity={0.7}
        stroke={color}
        strokeWidth={2}
      />
      <circle
        cx={cx}
        cy={cy}
        r={radius + 3}
        fill="none"
        stroke={color}
        strokeWidth={1}
        opacity={0.3}
      />
    </g>
  );
};

export default function BertopicVisualization({ data }: BertopicVisualizationProps) {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          토픽 클러스터 분포
        </Typography>
        <Typography variant="body2" color="text.secondary">
          BERTopic으로 분석한 토픽들의 2차원 분포도입니다. 점의 크기는 기사 수를 나타냅니다.
        </Typography>
      </Box>

      {/* 범례 */}
      <Box sx={{ display: 'flex', gap: 3, mb: 2, justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              width: 14,
              height: 14,
              bgcolor: '#66bb6a',
              borderRadius: '50%',
            }}
          />
          <Typography variant="caption">옹호</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              width: 14,
              height: 14,
              bgcolor: '#ffa726',
              borderRadius: '50%',
            }}
          />
          <Typography variant="caption">중립</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              width: 14,
              height: 14,
              bgcolor: '#ef5350',
              borderRadius: '50%',
            }}
          />
          <Typography variant="caption">비판</Typography>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            name="X 좌표"
            domain={[-80, 80]}
            label={{
              value: 'UMAP Dimension 1',
              position: 'insideBottom',
              offset: -10,
            }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Y 좌표"
            domain={[-80, 80]}
            label={{
              value: 'UMAP Dimension 2',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <ZAxis type="number" dataKey="article_count" range={[100, 400]} name="기사 수" />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={data} fill="#8884d8" shape={<CustomDot />} isAnimationActive={true} />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
}
