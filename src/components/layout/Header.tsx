import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { text: '스탠스 대시보드', icon: <DashboardIcon />, path: '/' },
  { text: '전체 기사 목록', icon: <ArticleIcon />, path: '/articles' },
  { text: '언론사별 분류', icon: <NewspaperIcon />, path: '/press' },
  { text: 'API 문서', icon: <CodeIcon />, path: '/api-docs' },
];

export default function Header() {
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        color: '#000',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
        {/* 로고 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
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
          <Box>
            <Typography variant="h6" fontWeight="bold">
              AI 뉴스 추천
            </Typography>
            <Typography variant="caption" color="text.secondary">
              객관적 분석 서비스
            </Typography>
          </Box>
        </Box>

        {/* 네비게이션 메뉴 */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: isActive ? '#000' : 'transparent',
                  color: isActive ? '#fff' : '#000',
                  fontWeight: isActive ? 600 : 400,
                  '&:hover': {
                    bgcolor: isActive ? '#000' : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                {item.text}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
