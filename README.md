# AI 기반 객관적 뉴스 추천 서비스

> 오늘의 국내 정치 뉴스 중 조회수가 높은 Top 7 토픽을 제공하고, 동일한 토픽 내 상반된 의견 기사를 추천하여 다양한 관점을 제공하는 서비스입니다.

[![CI](https://github.com/inha-25-2-capstone/front/actions/workflows/ci.yml/badge.svg)](https://github.com/inha-25-2-capstone/front/actions/workflows/ci.yml)

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [개발 가이드](#-개발-가이드)
- [Git 브랜치 전략](#-git-브랜치-전략)
- [배포](#-배포)

---

## 🎯 프로젝트 개요

### 목적

- **객관적인 뉴스 소비**: 동일 토픽에 대한 다양한 관점 제공
- **스탠스 시각화**: 옹호/중립/비판 논조를 색상으로 구분
- **정보의 균형**: 편향되지 않은 정보 접근성 향상

### 주요 타겟

- 정치 뉴스에 관심 있는 일반 사용자
- 균형 잡힌 시각을 원하는 독자
- 언론사별 논조 차이를 확인하고 싶은 사람

---

## ✨ 주요 기능

### 1. 메인 페이지 (스탠스 대시보드)

- 📊 **통계 카드**: 전체 기사 수, 토픽 수, 언론사 수
- 🔥 **오늘의 토픽 TOP 8**: 가장 많이 다뤄진 정치 이슈
- 💬 **핵심 키워드 트렌드**: 워드클라우드 시각화
- 📈 **토픽별 스탠스 비율**: 옹호/중립/비판 비율 차트
- 🌡️ **언론사별 논조 분포**: 언론사별 스탠스 분포 시각화
- 🔥 **언론사 스탠스 히트맵**: 토픽별 언론사 논조
- 🧠 **BERTopic 시각화**: 토픽 클러스터 2D 시각화

### 2. 토픽 상세 페이지

- 🎯 **대표 기사**: 가장 많이 읽힌 기사
- 📰 **관련 기사 리스트**: 스탠스별 필터링 가능
- 🎨 **스탠스 분포**: 시각적 비율 표시

### 3. 기사 상세 페이지

- 📄 **기사 본문**: 전체 내용 표시
- 🎭 **스탠스 뱃지**: 옹호/중립/비판 색상 구분
- 📊 **AI 스탠스 분석**: Softmax 확률 및 Score 시각화
- 💡 **후보 기사**: 반대 논조 기사 최대 3개 추천
- 🔄 **관련 기사**: 동일 토픽 내 다른 기사

### 4. 전체 기사 목록

- 📋 **필터링**: 언론사, 스탠스, 날짜
- 🔀 **정렬**: 최신순, 조회수순
- 📄 **페이지네이션**: 20개씩 표시

### 5. 언론사별 분류

- 📰 **언론사 카드**: 가나다순 정렬
- 📊 **통계 정보**: 기사 수, 평균 스탠스 점수
- 🔗 **언론사별 기사 목록**: 개별 언론사 페이지

### 6. 공통 UI/UX

- ⏳ **스켈레톤 UI**: 데이터 로딩 중 사용자 친화적인 로딩 화면
- 🎨 **스탠스 색상 구분**: 옹호(초록), 중립(주황), 비판(빨강) 일관된 색상 체계

---

## 🛠 기술 스택

### Frontend

- **React 19** - UI 라이브러리
- **TypeScript** - 정적 타입 검사
- **Vite** - 빌드 도구 (SWC)
- **React Router** - 라우팅
- **TanStack Query (React Query)** - 서버 상태 관리
- **Material-UI (MUI)** - UI 컴포넌트 라이브러리
- **Axios** - HTTP 클라이언트

### Development Tools

- **ESLint** - 코드 품질 검사
- **Prettier** - 코드 포맷팅
- **GitHub Actions** - CI/CD 파이프라인

### Backend (별도 Repository)

- **Flask** - API 서버
- **PostgreSQL** - 데이터베이스
- **PyTorch** - AI 모델
- **Hugging Face Transformers** - koBERT, koBART

---

## 🚀 시작하기

### 필수 요구사항

- **Node.js**: v20 이상
- **npm**: v9 이상

### 설치 및 실행

```bash
# 1. Repository 클론
git clone https://github.com/inha-25-2-capstone/front.git
cd front

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env
# .env 파일을 열어서 필요한 값 입력

# 4. 개발 서버 실행
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 환경 변수 설정

`.env` 파일:

```bash
# API 서버 URL
VITE_API_URL=http://localhost:8000

# Mock 데이터 모드 (true = 더미 데이터 사용, false = 실제 API 호출)
VITE_USE_MOCK_DATA=true
```

**Mock 데이터 모드**:

- `true`: 백엔드 API 없이 더미 데이터로 UI 확인 가능
- `false`: 실제 백엔드 API 호출

---

## 📁 프로젝트 구조

```
front/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI 설정
├── src/
│   ├── components/             # 재사용 가능한 컴포넌트
│   │   ├── common/            # 공통 컴포넌트 (Button, Badge 등)
│   │   ├── layout/            # 레이아웃 (Header, Sidebar, Footer)
│   │   ├── article/           # 기사 관련 컴포넌트
│   │   ├── topic/             # 토픽 관련 컴포넌트
│   │   ├── press/             # 언론사 관련 컴포넌트
│   │   └── dashboard/         # 대시보드 컴포넌트
│   ├── pages/                 # 페이지 컴포넌트
│   │   ├── MainPage.tsx       # 메인 페이지 (스탠스 대시보드)
│   │   ├── TopicDetailPage.tsx # 토픽 상세 페이지
│   │   ├── ArticleDetailPage.tsx # 기사 상세 페이지
│   │   ├── ArticleListPage.tsx # 전체 기사 목록
│   │   ├── PressListPage.tsx  # 언론사 목록
│   │   └── PressArticlesPage.tsx # 언론사별 기사 목록
│   ├── hooks/                 # Custom Hooks (React Query)
│   │   ├── useArticles.ts     # 기사 관련 hooks
│   │   ├── useTopics.ts       # 토픽 관련 hooks
│   │   ├── usePress.ts        # 언론사 관련 hooks
│   │   └── useDashboard.ts    # 대시보드 관련 hooks
│   ├── services/              # API 통신 로직
│   │   ├── api-client.ts      # Axios 인스턴스
│   │   ├── article.service.ts # 기사 API
│   │   ├── topic.service.ts   # 토픽 API
│   │   ├── press.service.ts   # 언론사 API
│   │   └── dashboard.service.ts # 대시보드 API
│   ├── mocks/                 # Mock 데이터
│   │   └── data/
│   │       ├── articles.ts
│   │       ├── topics.ts
│   │       ├── press.ts
│   │       └── dashboard.ts
│   ├── types/                 # TypeScript 타입 정의
│   ├── utils/                 # 유틸리티 함수
│   ├── theme/                 # MUI 테마 설정
│   ├── App.tsx                # Root 컴포넌트
│   └── main.tsx               # Entry point
├── .env.example               # 환경 변수 예시
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 💻 개발 가이드

### 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 타입 체크
npm run typecheck

# Lint 검사
npm run lint

# Lint 자동 수정
npm run lint:fix

# 코드 포맷팅 체크
npm run format:check

# 코드 포맷팅 적용
npm run format
```

### Pre-push 체크리스트

커밋하기 전에 **반드시** 다음 명령어를 실행하세요:

```bash
npm run format    # 코드 포맷팅
npm run typecheck # TypeScript 타입 체크
npm run build     # 빌드 테스트
```

## 🌿 Git 브랜치 전략

### 브랜치 구조

```
main (Production)
  ↑
  │ (릴리즈 시 merge)
  │
develop (Staging)
  ↑
  │ (기능 완성 시 PR & merge)
  │
feature/* (개발 중)
```

### 브랜치 설명

| 브랜치       | 용도           | 배포 환경        | Mock 데이터 |
| ------------ | -------------- | ---------------- | ----------- |
| **main**     | 프로덕션       | Production       | false       |
| **develop**  | 개발/테스트    | Staging (Render) | true        |
| **feature/** | 개별 기능 개발 | Local            | true        |

### 작업 프로세스

#### 1. 새로운 기능 개발

```bash
# 1. develop 브랜치로 이동 및 최신화
git checkout develop
git pull origin develop

# 2. feature 브랜치 생성
git checkout -b feature/my-new-feature

# 3. 개발 작업 수행
# ... 코드 작성 ...

# 4. Pre-push 체크 (필수!)
npm run format
npm run typecheck
npm run build

# 5. 커밋 및 push
git add .
git commit -m "feat: add my new feature"
git push -u origin feature/my-new-feature

# 6. GitHub에서 PR 생성 (base: develop)
# 7. 팀 리뷰 후 merge
# 8. 로컬 브랜치 정리
git checkout develop
git pull origin develop
git branch -d feature/my-new-feature
```

#### 2. 릴리즈 (Production 배포)

```bash
# 1. develop에서 충분히 테스트 완료 후
# 2. GitHub에서 PR 생성 (develop → main)
# 3. 팀 리뷰 및 최종 확인
# 4. main으로 merge
# 5. Production 자동 배포
```

### 브랜치 보호 규칙

**main 브랜치**:

- ✅ PR을 통해서만 merge 가능
- ✅ 최소 1명 이상의 리뷰 필요
- ✅ CI 통과 필수 (Lint, Type Check, Build)

**develop 브랜치**:

- ✅ PR 권장
- ✅ CI 통과 필수

---

## 🚀 배포

### 환경별 배포 설정

| 환경           | 브랜치 | 플랫폼 | URL                                    | Mock 데이터 |
| -------------- | ------ | ------ | -------------------------------------- | ----------- |
| **Production** | `main` | Vercel | https://politics-news-front.vercel.app | false       |

### CI/CD 파이프라인

#### CI (GitHub Actions)

- **트리거**: Push/PR to `main`, `develop`
- **단계**:
  1. Lint 검사
  2. Format 검사
  3. Type 검사
  4. Build 테스트

#### CD (Vercel)

- **트리거**: Push to `main`
- **자동 배포**: Vercel 자동 배포

---

## 👥 팀

**인하대학교 2025-2 컴퓨터공학 종합설계 프로젝트**

- Frontend: [GitHub Repository](https://github.com/inha-25-2-capstone/front)
- Backend: [GitHub Repository](https://github.com/inha-25-2-capstone/back)
- AI: [GitHub Repository](https://github.com/inha-25-2-capstone/ai)

---
