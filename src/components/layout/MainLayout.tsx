import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: '280px',
          p: 4,
          overflow: 'auto',
          width: 'calc(100% - 280px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
