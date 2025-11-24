import { Box, Typography } from '@mui/material';

interface BertopicVisualizationProps {
  imageUrl: string;
}

export default function BertopicVisualization({ imageUrl }: BertopicVisualizationProps) {

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography>🗺️</Typography>
        <Typography variant="h6" fontWeight="bold">
          토픽 클러스터 지도
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        BERTopic 분석을 통한 토픽 간 유사도 및 논조 분포
      </Typography>

      {/* 이미지 표시 */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#fafafa',
          borderRadius: 1,
          p: 2,
        }}
      >
        <img
          src={imageUrl}
          alt="BERTopic 토픽 클러스터 시각화"
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 4,
          }}
        />
      </Box>

      {/* 설명 */}
      <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          💡 가까이 위치한 토픽일수록 내용이 유사합니다. 백엔드에서 생성된 BERTopic 시각화 이미지입니다.
        </Typography>
      </Box>
    </Box>
  );
}
