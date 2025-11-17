import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { useTopics } from '@/hooks';

const navItems = [
  { text: '스탠스 대시보드', icon: <DashboardIcon />, path: '/' },
  { text: '전체 기사 목록', icon: <ArticleIcon />, path: '/articles' },
  { text: '언론사별 분류', icon: <NewspaperIcon />, path: '/press' },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const location = useLocation();

  // Top 7 토픽 데이터 가져오기
  const { data: topicsData } = useTopics({ page: 1, limit: 7 });

  const sidebarWidth = isCollapsed ? 70 : 280;

  return (
    <Box
      sx={{
        width: sidebarWidth,
        height: '100vh',
        bgcolor: '#f8f9fa',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        overflow: 'auto',
        transition: 'width 0.3s ease',
      }}
    >
      {/* 헤더 */}
      <Box
        sx={{
          p: isCollapsed ? 2 : 3,
          bgcolor: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isCollapsed ? 'center' : 'flex-start',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: isCollapsed ? 0 : 0.5 }}>
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
          {!isCollapsed && (
            <Typography variant="h6" fontWeight="bold">
              AI 뉴스 추천
            </Typography>
          )}
        </Box>
        {!isCollapsed && (
          <Typography variant="caption" color="text.secondary">
            객관적 분석 서비스
          </Typography>
        )}
        <IconButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{
            mt: isCollapsed ? 1 : 2,
            alignSelf: isCollapsed ? 'center' : 'flex-end',
            position: isCollapsed ? 'static' : 'absolute',
            right: isCollapsed ? 'auto' : 8,
            top: isCollapsed ? 'auto' : 8,
          }}
          size="small"
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* 네비게이션 */}
      <Box sx={{ px: 2, py: 2 }}>
        {!isCollapsed && (
          <Typography variant="caption" color="text.secondary" sx={{ px: 2, fontWeight: 600 }}>
            페이지 선택
          </Typography>
        )}
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
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
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
                  <ListItemIcon
                    sx={{
                      color: isActive ? '#fff' : 'inherit',
                      minWidth: isCollapsed ? 0 : 40,
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!isCollapsed && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: isActive ? 600 : 400 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* 오늘의 TOP 7 토픽 */}
      {!isCollapsed && (
        <Box sx={{ px: 2, py: 2, flex: 1 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ px: 2, fontWeight: 600, mb: 1, display: 'block' }}
          >
            오늘의 TOP 7 토픽
          </Typography>
          <List>
            {topicsData?.data.map((topic, index) => (
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
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, width: '100%' }}>
                    <Typography variant="body2" fontWeight="600" color="text.secondary">
                      {index + 1}.
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.5, flex: 1 }}>
                      {topic.name}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
