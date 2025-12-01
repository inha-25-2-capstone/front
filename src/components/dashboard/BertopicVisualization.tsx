import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Box, Chip, Dialog, IconButton, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { TopicSummary } from '@/types';

interface BertopicVisualizationProps {
  imageUrl?: string;
  topics?: TopicSummary[];
}

export default function BertopicVisualization({ imageUrl, topics }: BertopicVisualizationProps) {
  const navigate = useNavigate();
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // TODO: 임시 mock 데이터 (API 연동 후 제거)
  const mockTopics: TopicSummary[] = [
    { id: 1, name: '윤석열 탄핵', articleCount: 42, viewCount: 1200, stanceDistribution: { support: 30, neutral: 45, oppose: 25 } },
    { id: 2, name: '국회 예산안', articleCount: 28, viewCount: 800, stanceDistribution: { support: 20, neutral: 60, oppose: 20 } },
    { id: 3, name: '검찰 수사', articleCount: 35, viewCount: 950, stanceDistribution: { support: 15, neutral: 40, oppose: 45 } },
    { id: 4, name: '여야 협상', articleCount: 22, viewCount: 600, stanceDistribution: { support: 35, neutral: 50, oppose: 15 } },
    { id: 5, name: '경제 정책', articleCount: 18, viewCount: 450, stanceDistribution: { support: 40, neutral: 35, oppose: 25 } },
  ];
  const displayTopics = topics && topics.length > 0 ? topics : mockTopics;

  // 스탠스 분포를 퍼센트로 계산
  const getStancePercents = (dist: TopicSummary['stanceDistribution']) => {
    if (!dist) return { support: 0, neutral: 0, oppose: 0 };
    const total = dist.support + dist.neutral + dist.oppose;
    if (total === 0) return { support: 0, neutral: 0, oppose: 0 };
    return {
      support: Math.round((dist.support / total) * 100),
      neutral: Math.round((dist.neutral / total) * 100),
      oppose: Math.round((dist.oppose / total) * 100),
    };
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography>🗺️</Typography>
        <Typography variant="h6" fontWeight="bold">
          토픽 클러스터 지도
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
          p: 1,
          overflow: 'hidden',
          position: 'relative',
          minHeight: 200,
          maxHeight: 'calc(100vh - 350px)',
        }}
      >
        {imageUrl ? (
          <>
            <Box
              component="img"
              src={imageUrl}
              alt="BERTopic 토픽 클러스터 시각화"
              onClick={() => setIsZoomOpen(true)}
              sx={{
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 400px)',
                width: 'auto',
                height: 'auto',
                borderRadius: 1,
                cursor: 'zoom-in',
                transition: 'transform 0.3s ease',
                objectFit: 'contain',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            />
            <Tooltip title="클릭하여 확대" placement="top">
              <IconButton
                onClick={() => setIsZoomOpen(true)}
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': { bgcolor: 'white' },
                }}
                size="small"
              >
                <ZoomInIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            시각화 데이터를 불러오는 중...
          </Typography>
        )}
      </Box>

      {/* 확대 모달 */}
      <Dialog
        open={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        maxWidth={false}
        PaperProps={{
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none',
            maxWidth: '90vw',
            maxHeight: '90vh',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => setIsZoomOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': { bgcolor: 'white' },
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={imageUrl}
            alt="BERTopic 토픽 클러스터 시각화 (확대)"
            sx={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: 2,
              objectFit: 'contain',
            }}
          />
        </Box>
      </Dialog>

      {/* 토픽 칩 목록 */}
      {displayTopics.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            토픽 바로가기
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {displayTopics.map((topic) => {
              const stancePercents = getStancePercents(topic.stanceDistribution);
              return (
                <Tooltip
                  key={topic.id}
                  arrow
                  title={
                    <Box sx={{ p: 0.5 }}>
                      <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                        {topic.name}
                      </Typography>
                      <Typography variant="caption" display="block">
                        기사 {topic.articleCount}개
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                        <Typography variant="caption" sx={{ color: '#66bb6a' }}>
                          옹호 {stancePercents.support}%
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#9e9e9e' }}>
                          중립 {stancePercents.neutral}%
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#ef5350' }}>
                          비판 {stancePercents.oppose}%
                        </Typography>
                      </Box>
                    </Box>
                  }
                >
                  <Chip
                    label={topic.name}
                    size="small"
                    onClick={() => navigate(`/topics/${topic.id}`)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                      },
                    }}
                  />
                </Tooltip>
              );
            })}
          </Box>
        </Box>
      )}

      {/* 설명 */}
      <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          💡 가까이 위치한 토픽일수록 내용이 유사합니다. 서버에서 생성된 BERTopic 시각화
          이미지입니다.
        </Typography>
      </Box>
    </Box>
  );
}
