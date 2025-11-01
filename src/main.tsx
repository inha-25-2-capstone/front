import './index.css';

import { Box, CircularProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from '@/components/layout/MainLayout';
import theme from '@/theme/theme';

// Lazy load pages
const MainPage = lazy(() => import('@/pages/MainPage'));
const ArticleListPage = lazy(() => import('@/pages/ArticleListPage'));
const ArticleDetailPage = lazy(() => import('@/pages/ArticleDetailPage'));
const PressListPage = lazy(() => import('@/pages/PressListPage'));
const PressArticlesPage = lazy(() => import('@/pages/PressArticlesPage'));
const TopicDetailPage = lazy(() => import('@/pages/TopicDetailPage'));

// Loading component
const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: 'articles',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ArticleListPage />
          </Suspense>
        ),
      },
      {
        path: 'articles/:articleId',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ArticleDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'press',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PressListPage />
          </Suspense>
        ),
      },
      {
        path: 'press/:pressId/articles',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PressArticlesPage />
          </Suspense>
        ),
      },
      {
        path: 'topics/:topicId',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <TopicDetailPage />
          </Suspense>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
