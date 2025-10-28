import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { text: '스탠스 대시보드', icon: <DashboardIcon />, path: '/' },
  { text: '인기 기사 목록', icon: <ArticleIcon />, path: '/articles' },
  { text: '언론사별 분류', icon: <NewspaperIcon />, path: '/press' },
];

const topTopics = [
  { id: 1, title: '대통령 탄핵정책 논란', emoji: '🔴' },
  { id: 2, title: '국회/정당', emoji: '🟡' },
  { id: 3, title: '북한', emoji: '🔴' },
  { id: 4, title: '불법', emoji: '🟡' },
  { id: 5, title: '국정/외교', emoji: '🟢' },
  { id: 6, title: '헌법관련', emoji: '🟡' },
  { id: 7, title: '정치단체 대동령 자치위 논의', emoji: '🟡' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        bgcolor: '#f8f9fa',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        overflow: 'auto',
      }}
    >
      {/* 헤더 */}
      <Box sx={{ p: 3, bgcolor: '#ffffff', borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#000',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            AI
          </Box>
          <Typography variant="h6" fontWeight="bold">
            AI 뉴스 추천
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          객관적 분석 서비스
        </Typography>
      </Box>

      {/* 네비게이션 */}
      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ px: 2, fontWeight: 600 }}>
          페이지 선택
        </Typography>
        <List>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={isActive}
                  sx={{
                    borderRadius: 2,
                    my: 0.5,
                    bgcolor: isActive ? '#000' : 'transparent',
                    color: isActive ? '#fff' : 'inherit',
                    '&:hover': {
                      bgcolor: isActive ? '#000' : 'rgba(0, 0, 0, 0.04)',
                    },
                    '&.Mui-selected': {
                      bgcolor: '#000',
                      '&:hover': {
                        bgcolor: '#000',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? '#fff' : 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: isActive ? 600 : 400 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* 오늘의 TOP 7 토픽 */}
      <Box sx={{ px: 2, py: 2, flex: 1 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ px: 2, fontWeight: 600, mb: 1, display: 'block' }}
        >
          오늘의 TOP 7 토픽
        </Typography>
        <List>
          {topTopics.map((topic, index) => (
            <ListItem key={topic.id} disablePadding>
              <ListItemButton
                component={Link}
                to={`/topics/${topic.id}`}
                sx={{
                  borderRadius: 2,
                  my: 0.5,
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      minWidth: 24,
                    }}
                  >
                    <Typography variant="body2" fontWeight="600" color="text.secondary">
                      {index + 1}.
                    </Typography>
                    <Typography variant="body2">{topic.emoji}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                    {topic.title}
                  </Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
