import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { text: '스탠스 대시보드', icon: <DashboardIcon />, path: '/' },
  { text: '전체 기사 목록', icon: <ArticleIcon />, path: '/articles' },
  { text: '언론사별 분류', icon: <NewspaperIcon />, path: '/press' },
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
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <NewspaperIcon sx={{ fontSize: 24 }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #1a1a2e 0%, #4a5568 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            PoliView
          </Typography>
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
