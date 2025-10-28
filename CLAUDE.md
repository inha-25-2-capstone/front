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

# AI 기반 객관적 뉴스 추천 서비스 - 프론트엔드 개발 가이드

## 📋 프로젝트 개요

**프로젝트명**: AI 기반 객관적 뉴스 추천 서비스

**목적**:
- 오늘의 국내 정치 뉴스 중 조회수가 높은 Top 7 뉴스 제공
- 사용자가 클릭한 정치 뉴스 토픽에 대한 기사를 제공
- 동일한 토픽 내 상반된 의견 기사 리스트 추천을 통해 다양한 관점 제공

**기술 스택**:
- Frontend: React, TypeScript, Material UI, Axios
- Backend: Flask (API 제공)
- Database: PostgreSQL
- AI: PyTorch, Hugging Face Transformers (koBERT, koBART)

---

## 🏗️ 프로젝트 구조

```
project-root/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── common/         # 공통 컴포넌트 (Button, Card, Badge 등)
│   │   ├── layout/         # 레이아웃 컴포넌트 (Header, Sidebar, Footer)
│   │   ├── article/        # 기사 관련 컴포넌트
│   │   ├── topic/          # 토픽 관련 컴포넌트
│   │   └── dashboard/      # 대시보드 컴포넌트
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── MainPage.tsx           # 메인 페이지 (스탠스 대시보드)
│   │   ├── TopicDetailPage.tsx    # 토픽 상세 페이지 (대표 기사)
│   │   ├── ArticleDetailPage.tsx  # 기사 상세 페이지 (후보 기사)
│   │   ├── ArticleListPage.tsx    # 전체 기사 목록 페이지
│   │   └── PressListPage.tsx      # 언론사별 분류 페이지
│   ├── hooks/              # Custom Hooks
│   ├── services/           # API 통신 로직
│   ├── types/              # TypeScript 타입 정의
│   ├── styles/             # 전역 스타일
│   ├── utils/              # 유틸리티 함수
│   ├── App.tsx
│   └── main.tsx
├── public/
└── package.json
```

## 📱 페이지 구성 및 기능

### 1. 메인 페이지 (스탠스 대시보드)

**경로**: `/`

**주요 기능**:
- Top 7 토픽 리스트 (카드 형태)
- 전체 스탠스 지수 요약
- 핵심 키워드 트렌드 (워드클라우드)
- 언론사별 정치 스펙트럼 시각화

**컴포넌트 구조**:
```
MainPage
├── Header
├── DashboardSummary (요약 카드 영역)
├── TopTopicsList (Top 7 토픽 리스트)
├── KeywordCloud (핵심 키워드 트렌드)
├── PressSpectrum (언론사별 스펙트럼)
└── Footer
```

**API 호출**:
- `GET /api/dashboard/summary`
- `GET /api/dashboard/keywords`
- `GET /api/dashboard/topics/stance-ratio`
- `GET /api/dashboard/press-spectrum`

---

### 2. 토픽 상세 페이지 (대표 기사 페이지)

**경로**: `/topics/:topic_id`

**주요 기능**:
- 대표 기사 카드 (상단)
- 해당 토픽의 전체 기사 리스트 (하단)
- 스탠스별 필터링 기능

**컴포넌트 구조**:
```
TopicDetailPage
├── Header
├── BackButton (토픽 목록으로)
├── MainArticleCard (대표 기사 카드)
│   ├── ArticleImage
│   ├── ArticleTitle
│   ├── ArticleSummary
│   ├── StanceBadge
│   └── ReadFullButton
└── RelatedArticlesList (관련 기사 리스트)
    ├── StanceFilter
    └── ArticleCard[]
```

**API 호출**:
- `GET /api/topics/:topic_id?include=main_article,stance_distribution`
- `GET /api/topics/:topic_id/articles?stance=전체&page=1&limit=20`

---

### 3. 기사 상세 페이지 (후보 기사 페이지)

**경로**: `/articles/:article_id`

**주요 기능**:
- 기사 본문 전체 표시 (좌측 메인 영역)
- 후보 기사 리스트 (우측 사이드바, 최대 3개)
- 스탠스별 필터링 기능

**컴포넌트 구조**:
```
ArticleDetailPage
├── Header
├── MainContent (좌측)
│   ├── ArticleHeader
│   │   ├── Title
│   │   ├── PressInfo
│   │   ├── PublishedDate
│   │   └── StanceBadge
│   ├── ArticleImage
│   ├── ArticleContent
│   └── OriginalLink
└── Sidebar (우측)
    ├── SidebarTitle ("관련 기사")
    ├── StanceFilter
    └── RecommendedArticleCard[]
```

**API 호출**:
- `GET /api/articles/:article_id?include=stance,topic,related_articles`
- `GET /api/topics/:topic_id/recommendations`

---

### 4. 전체 기사 목록 페이지

**경로**: `/articles`

**주요 기능**:
- 모든 기사를 최신 순으로 정렬
- 필터링 (언론사, 토픽, 스탠스, 날짜)
- 페이지네이션

**컴포넌트 구조**:
```
ArticleListPage
├── Header
├── FilterBar
│   ├── PressFilter
│   ├── StanceFilter
│   ├── DatePicker
│   └── SortSelector
├── ArticleGrid
│   └── ArticleCard[]
└── Pagination
```

**API 호출**:
- `GET /api/articles?page=1&limit=20&sort=published_at:desc`

---

### 5. 언론사별 분류 페이지

**경로**: `/press`

**주요 기능**:
- 모든 언론사를 가나다 순으로 정렬
- 각 언론사 카드 클릭 시 해당 언론사 기사 목록으로 이동

**컴포넌트 구조**:
```
PressListPage
├── Header
├── PressGrid
│   └── PressCard[]
│       ├── PressName
│       ├── ArticleCount
│       └── AvgStanceScore
└── Footer
```

**API 호출**:
- `GET /api/press?sort=name:asc&include=statistics`

---

### 6. 언론사 기사 목록 페이지

**경로**: `/press/:press_id/articles`

**주요 기능**:
- 특정 언론사의 최신 기사 모음
- 필터링 및 정렬

**컴포넌트 구조**:
```
PressArticlesPage
├── Header
├── PressInfo
├── FilterBar
├── ArticleList
│   └── ArticleCard[]
└── Pagination


### 3. 개발 우선순위

**Phase 1 - 기본 구조**:
1. 프로젝트 폴더 구조 생성
2. 타입 정의 파일 작성
3. API 서비스 레이어 구현
4. 공통 컴포넌트 개발 (Button, Card, Badge 등)

**Phase 2 - 주요 페이지**:
1. 메인 페이지 (스탠스 대시보드)
2. 토픽 상세 페이지 (대표 기사)
3. 기사 상세 페이지 (후보 기사)

**Phase 3 - 추가 기능**:
1. 전체 기사 목록 페이지
2. 언론사별 분류 페이지
3. 필터링 및 정렬 기능
4. 페이지네이션

**Phase 4 - 최적화**:
1. 성능 최적화
2. 에러 처리 및 로딩 상태
3. 반응형 디자인
4. 접근성 개선

---

## 📝 개발 시 주의사항

1. **스탠스 색상 일관성**: 옹호(초록), 중립(회색), 비판(빨강) 색상을 모든 UI에서 일관되게 사용
2. **카드 디자인**: 모든 카드는 hover 효과와 클릭 가능한 커서를 포함
3. **이미지 처리**: 기사 이미지가 없을 경우 플레이스홀더 표시
4. **날짜 포맷**: 한국어 형식 사용 (예: 2025년 10월 14일)
5. **에러 처리**: API 호출 실패 시 사용자 친화적인 에러 메시지 표시
6. **로딩 상태**: 데이터 로딩 중 스켈레톤 UI 또는 스피너 표시
7. **반응형**: 모바일, 태블릿, 데스크톱 모두 지원
8. **접근성**: 시맨틱 HTML과 ARIA 속성 사용
9. **페이지네이션 구현**: 사용자가 현재 위치를 알 수 있도록 명확한 UI 제공
10. 상태 관리 및 데이터 캐싱: 불필요한 API 호출 방지를 위한 적절한 캐싱 전략 사용
11. 환경 변수 관리: API URL 등 환경별로 다른 값은 환경 변수로 관리
---