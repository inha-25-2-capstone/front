import { Box } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 70 : 280;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: `${sidebarWidth}px`,
          p: 4,
          overflow: 'auto',
          width: `calc(100% - ${sidebarWidth}px)`,
          transition: 'margin-left 0.3s ease, width 0.3s ease',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
