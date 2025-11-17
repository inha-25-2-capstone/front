import { Box, Chip, Tooltip, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Legend, ResponsiveContainer, Scatter, ScatterChart, XAxis, YAxis, ZAxis } from 'recharts';

import type { BertopicPoint } from '@/types';

interface BertopicVisualizationProps {
  data: BertopicPoint[];
}

// 스탠스에 따른 색상 반환
const getStanceColor = (avgStance: number): string => {
  if (avgStance > 0.2) return '#66bb6a'; // 초록 (옹호)
  if (avgStance < -0.2) return '#ef5350'; // 빨강 (비판)
  return '#ffa726'; // 주황 (중립)
};

// 스탠스 라벨
const getStanceLabel = (avgStance: number): string => {
  if (avgStance > 0.2) return '옹호';
  if (avgStance < -0.2) return '비판';
  return '중립';
};

// 커스텀 도트 컴포넌트
interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: BertopicPoint;
}

const CustomDot = (props: CustomDotProps) => {
  const { cx, cy, payload } = props;

  if (!cx || !cy || !payload) return null;
  const color = getStanceColor(payload.avg_stance);

  return (
    <Tooltip
      title={
        <Box>
          <Typography variant="caption" fontWeight="bold" display="block">
            {payload.topic_name}
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
            기사 수: {payload.article_count}개
          </Typography>
          <Typography variant="caption" display="block">
            평균 스탠스: {payload.avg_stance.toFixed(2)} ({getStanceLabel(payload.avg_stance)})
          </Typography>
          {payload.keywords && payload.keywords.length > 0 && (
            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
              키워드: {payload.keywords.slice(0, 3).join(', ')}
            </Typography>
          )}
        </Box>
      }
      arrow
    >
      <circle
        cx={cx}
        cy={cy}
        r={Math.min(Math.max(payload.article_count / 2, 5), 20)}
        fill={color}
        fillOpacity={0.7}
        stroke={color}
        strokeWidth={2}
        style={{ cursor: 'pointer' }}
      />
    </Tooltip>
  );
};

export default function BertopicVisualization({ data }: BertopicVisualizationProps) {
  // 스탠스별로 데이터 분류
  const { supportData, neutralData, opposeData } = useMemo(() => {
    const support = data.filter((d) => d.avg_stance > 0.2);
    const oppose = data.filter((d) => d.avg_stance < -0.2);
    const neutral = data.filter((d) => d.avg_stance >= -0.2 && d.avg_stance <= 0.2);

    return {
      supportData: support,
      neutralData: neutral,
      opposeData: oppose,
    };
  }, [data]);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography>🗺️</Typography>
        <Typography variant="h6" fontWeight="bold">
          토픽 클러스터 지도
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        BERTopic 분석을 통한 토픽 간 유사도 및 논조 분포 (크기: 기사 수, 색상: 평균 스탠스)
      </Typography>

      {/* 범례 */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'flex-end' }}>
        <Chip
          label="옹호"
          size="small"
          sx={{ bgcolor: '#66bb6a', color: 'white', fontWeight: 500 }}
        />
        <Chip
          label="중립"
          size="small"
          sx={{ bgcolor: '#ffa726', color: 'white', fontWeight: 500 }}
        />
        <Chip
          label="비판"
          size="small"
          sx={{ bgcolor: '#ef5350', color: 'white', fontWeight: 500 }}
        />
      </Box>

      {/* 산점도 차트 */}
      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <XAxis
            type="number"
            dataKey="x"
            name="X"
            stroke="#999"
            tick={{ fill: '#666' }}
            label={{ value: 'Dimension 1', position: 'insideBottom', offset: -10, fill: '#666' }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Y"
            stroke="#999"
            tick={{ fill: '#666' }}
            label={{ value: 'Dimension 2', angle: -90, position: 'insideLeft', fill: '#666' }}
          />
          <ZAxis type="number" dataKey="article_count" range={[50, 400]} />

          {supportData.length > 0 && (
            <Scatter
              name="옹호"
              data={supportData}
              fill="#66bb6a"
              shape={<CustomDot />}
              isAnimationActive={true}
            />
          )}
          {neutralData.length > 0 && (
            <Scatter
              name="중립"
              data={neutralData}
              fill="#ffa726"
              shape={<CustomDot />}
              isAnimationActive={true}
            />
          )}
          {opposeData.length > 0 && (
            <Scatter
              name="비판"
              data={opposeData}
              fill="#ef5350"
              shape={<CustomDot />}
              isAnimationActive={true}
            />
          )}

          <Legend />
        </ScatterChart>
      </ResponsiveContainer>

      {/* 설명 */}
      <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          💡 가까이 위치한 토픽일수록 내용이 유사합니다. 원의 크기는 기사 수를, 색상은 평균
          논조를 나타냅니다.
        </Typography>
      </Box>
    </Box>
  );
}
