# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vite + React + TypeScript frontend project using SWC for fast refresh. The project is configured with:
- React 19 with React Router for routing
- TanStack Query (React Query) for server state management
- ESLint with TypeScript, React, and import sorting plugins
- Prettier for code formatting
- Path aliases (`@/` maps to `src/`)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking (for CI or manual check)
npm run typecheck

# Linting
npm run lint          # Check for lint errors
npm run lint:fix      # Auto-fix lint errors

# Formatting
npm run format:check  # Check formatting without modifying files
npm run format        # Format all files with Prettier
```

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on push/PR to `main`:
1. Lint check
2. Format check
3. Type check
4. Build

All checks must pass before merging.

## Project Architecture

### Entry Point & Routing
- `src/main.tsx`: Application entry point that sets up:
  - React Router with `createBrowserRouter`
  - QueryClient and QueryClientProvider for React Query
  - ReactQueryDevtools in development mode

### Application Structure
- `src/App.tsx`: Root layout component with navigation and `<Outlet />` for nested routes
- `src/pages/`: Page components mapped to routes
- `src/features/`: Feature-based modules (e.g., `features/todos/useTodos.ts`)
- `src/lib/`: Shared utilities (e.g., `lib/env.ts` for environment variables)

### State Management Pattern
- Use TanStack Query for server state (see `features/todos/useTodos.ts` as reference)
- Custom hooks pattern: create feature-specific hooks that use `useQuery`/`useMutation`
- Query keys should be organized by feature (e.g., `['todos']`, `['todos', id]`)

### Code Organization
- Features should be organized in `src/features/[feature-name]/`
- Each feature can contain components, hooks, types, and utilities
- Use path alias `@/` for imports from `src/` (e.g., `import Home from '@/pages/Home'`)

## ESLint Configuration

The project uses a flat config ESLint setup with:
- TypeScript ESLint recommended rules
- React and React Hooks plugins
- Simple import sort (auto-sorts imports on lint fix)
- Import plugin for module resolution

Key lint rules:
- `simple-import-sort/imports`: Automatically sorts imports
- `react-hooks/rules-of-hooks`: Enforces React Hooks rules
- `react-hooks/exhaustive-deps`: Warns about missing dependencies
