import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './Header';

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
