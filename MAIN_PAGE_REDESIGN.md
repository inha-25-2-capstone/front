# 메인 페이지 (대시보드) 재설계안

**작성일**: 2025-11-11
**기준**: API 명세서 v1.0

---

## 🎯 설계 목표

실제 백엔드 API 명세서에 맞춰 메인 페이지의 시각화 컴포넌트를 재구성하고, 사용자에게 정치 뉴스의 전체적인 흐름을 한눈에 보여주는 대시보드를 제공합니다.

---

## 📊 사용 가능한 API

### ✅ 실제 제공되는 API

```
1. GET /api/dashboard/summary
   - 대시보드 요약 데이터 (상단 4개 카드)
   - Query: date, press_id

2. GET /api/dashboard/topic_today
   - 상위 7개 토픽의 스탠스 분포
   - Query: date, press_id

3. GET /api/dashboard/bertopic_visualization
   - BERTopic 토픽 클러스터 시각화 데이터
   - 토픽 간 관계를 2D 공간에 표현

4. GET /api/press/topic-heatmap
   - 토픽-언론사 매트릭스 데이터 (히트맵)
   - Query: date, topic_ids (optional)
```

### ❌ 제공되지 않는 API (삭제 제안됨)

```
- GET /api/dashboard/keywords (핵심 키워드 트렌드)
- GET /api/dashboard/press-spectrum (언론사별 정치 스펙트럼)
- GET /api/dashboard/topics/stance-ratio (주요 토픽별 스탠스 비율)
```

---

## 🎨 새로운 메인 페이지 레이아웃

```
┌─────────────────────────────────────────────────────────────┐
│                         Header                               │
│                  (로고, 네비게이션)                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   DashboardSummary                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ 전체 기사 │  │ 전체 토픽 │  │ 옹호 비율 │  │ 비판 비율 │   │
│  │   150    │  │    7     │  │   42%    │  │   38%    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  🔥 오늘의 주요 토픽 Top 7                   │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐│
│  │   토픽 카드 1   │  │   토픽 카드 2   │  │   토픽 카드 3   ││
│  │  이재명 재판    │  │  의대 증원 논란  │  │  한동훈 리더십  ││
│  │                │  │                │  │                ││
│  │ 옹호 ████ 45%  │  │ 옹호 ██ 20%    │  │ 옹호 ██████ 55%││
│  │ 중립 ██ 20%    │  │ 중립 ████ 45%  │  │ 중립 ██ 25%    ││
│  │ 비판 ███ 35%   │  │ 비판 ███ 35%   │  │ 비판 ██ 20%    ││
│  └────────────────┘  └────────────────┘  └────────────────┘│
│                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐│
│  │   토픽 카드 4   │  │   토픽 카드 5   │  │   토픽 카드 6   ││
│  └────────────────┘  └────────────────┘  └────────────────┘│
│                                                              │
│  ┌────────────────┐                                         │
│  │   토픽 카드 7   │                                         │
│  └────────────────┘                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│            🗺️ BERTopic 토픽 클러스터 시각화                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │         ●토픽1        ●토픽3                        │   │
│  │                                                      │   │
│  │   ●토픽2                    ●토픽5                  │   │
│  │                                                      │   │
│  │              ●토픽4                   ●토픽7        │   │
│  │                        ●토픽6                       │   │
│  │                                                      │   │
│  │  [인터랙티브 2D 산점도 - 클릭하면 토픽 상세로 이동]  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  💡 가까운 토픽 = 유사한 주제, 크기 = 기사 수               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│          📊 언론사별 토픽 커버리지 히트맵                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           토픽1  토픽2  토픽3  토픽4  토픽5  토픽6  토픽7│   │
│  │ 조선일보   🟥    🟨    🟩    🟥    🟨    🟩    🟨 │   │
│  │ 한겨레     🟩    🟨    🟥    🟩    🟥    🟨    🟩 │   │
│  │ 중앙일보   🟨    🟨    🟨    🟨    🟨    🟨    🟨 │   │
│  │ JTBC      🟩    🟥    🟨    🟨    🟩    🟥    🟨 │   │
│  │ 연합뉴스   🟨    🟨    🟨    🟨    🟨    🟨    🟨 │   │
│  │                                                      │   │
│  │  🟥 = 비판적 (stance < -0.3)                        │   │
│  │  🟨 = 중립적 (-0.3 ≤ stance ≤ 0.3)                  │   │
│  │  🟩 = 옹호적 (stance > 0.3)                         │   │
│  │  ⬜ = 보도 없음                                      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         Footer                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 컴포넌트 구조

### 1. DashboardSummary (요약 카드 영역)

#### API 호출

```typescript
GET /api/dashboard/summary?date=2025-11-11
```

#### 예상 응답 구조

```typescript
{
  total_articles: number; // 전체 기사 수
  total_topics: number; // 전체 토픽 수
  avg_stance_score: number; // 평균 스탠스 점수 (-1 ~ 1)
  stance_distribution: {
    옹호_count: number;
    옹호_ratio: number; // 0.42 = 42%
    중립_count: number;
    중립_ratio: number;
    비판_count: number;
    비판_ratio: number;
  }
}
```

#### 컴포넌트 props

```typescript
interface DashboardSummaryProps {
  totalArticles: number;
  totalTopics: number;
  supportRatio: number; // 옹호 비율
  criticalRatio: number; // 비판 비율
}
```

#### 렌더링 예시

```tsx
<Grid container spacing={3}>
  <Grid item xs={12} sm={6} md={3}>
    <SummaryCard
      title="전체 기사"
      value={data.total_articles}
      icon={<ArticleIcon />}
      color="primary"
    />
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <SummaryCard
      title="전체 토픽"
      value={data.total_topics}
      icon={<TopicIcon />}
      color="secondary"
    />
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <SummaryCard
      title="옹호 비율"
      value={`${(data.stance_distribution.옹호_ratio * 100).toFixed(1)}%`}
      icon={<ThumbUpIcon />}
      color="success"
    />
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <SummaryCard
      title="비판 비율"
      value={`${(data.stance_distribution.비판_ratio * 100).toFixed(1)}%`}
      icon={<ThumbDownIcon />}
      color="error"
    />
  </Grid>
</Grid>
```

---

### 2. TopTopicsList (Top 7 토픽 리스트)

#### API 호출

```typescript
GET /api/dashboard/topic_today?date=2025-11-11&press_id=all
```

#### 예상 응답 구조

```typescript
{
  date: string
  topics: [
    {
      topic_id: number
      topic_rank: number          // 1~7
      topic_title: string
      article_count: number
      main_article: {
        article_id: number
        title: string
        summary: string
        press_name: string
        img_url: string | null
      }
      stance_distribution: {
        옹호_count: number
        옹호_ratio: number
        중립_count: number
        중립_ratio: number
        비판_count: number
        비판_ratio: number
      }
    }
  ]
}
```

#### 컴포넌트 구조

```tsx
TopTopicsList
├── TopicCard (x7)
│   ├── TopicRankBadge           // 1위, 2위, ...
│   ├── TopicTitle               // 토픽 제목
│   ├── ArticleCount             // 기사 수: 15개
│   ├── MainArticleThumbnail     // 대표 기사 썸네일
│   ├── MainArticlePreview       // 대표 기사 미리보기
│   └── StanceDistributionBar    // 스탠스 분포 막대 그래프
│       ├── SupportBar (초록)
│       ├── NeutralBar (회색)
│       └── CriticalBar (빨강)
```

#### 카드 디자인 예시

```tsx
<Card
  sx={{
    cursor: 'pointer',
    '&:hover': { boxShadow: 6 },
  }}
  onClick={() => navigate(`/topics/${topic.topic_id}`)}
>
  <CardHeader
    avatar={<Chip label={`${topic.topic_rank}위`} color="primary" size="small" />}
    title={topic.topic_title}
    subheader={`기사 ${topic.article_count}개`}
  />

  {topic.main_article.img_url && (
    <CardMedia
      component="img"
      height="140"
      image={topic.main_article.img_url}
      alt={topic.main_article.title}
    />
  )}

  <CardContent>
    <Typography variant="body2" color="text.secondary" noWrap>
      {topic.main_article.summary}
    </Typography>

    <Box sx={{ mt: 2 }}>
      <Typography variant="caption" gutterBottom>
        스탠스 분포
      </Typography>
      <StanceDistributionBar distribution={topic.stance_distribution} />
    </Box>
  </CardContent>
</Card>
```

---

### 3. BertopicVisualization (토픽 클러스터 시각화)

#### API 호출

```typescript
GET /api/dashboard/bertopic_visualization?date=2025-11-11
```

#### 예상 응답 구조

```typescript
{
  date: string
  topics: [
    {
      topic_id: number
      topic_title: string
      x: number                  // 2D 좌표 (UMAP/t-SNE)
      y: number
      size: number               // 기사 수 (버블 크기)
      keywords: string[]         // 대표 키워드 5개
      cluster_score: number      // 클러스터 응집도
    }
  ],
  connections?: [               // 선택사항: 토픽 간 유사도
    {
      from_topic_id: number
      to_topic_id: number
      similarity: number
    }
  ]
}
```

#### 구현 방법

**Option 1: Plotly.js 사용 (추천)**

```tsx
import Plot from 'react-plotly.js';

function BertopicVisualization({ data }) {
  return (
    <Plot
      data={[
        {
          x: data.topics.map((t) => t.x),
          y: data.topics.map((t) => t.y),
          mode: 'markers+text',
          type: 'scatter',
          marker: {
            size: data.topics.map((t) => Math.sqrt(t.size) * 5),
            color: data.topics.map((t) => t.cluster_score),
            colorscale: 'Viridis',
            showscale: true,
            colorbar: { title: '응집도' },
          },
          text: data.topics.map((t) => t.topic_title),
          textposition: 'top center',
          hovertemplate:
            '<b>%{text}</b><br>' +
            '기사 수: %{marker.size}<br>' +
            '키워드: %{customdata}<br>' +
            '<extra></extra>',
          customdata: data.topics.map((t) => t.keywords.join(', ')),
        },
      ]}
      layout={{
        title: '토픽 클러스터 지도',
        xaxis: { title: 'Dimension 1', showgrid: false },
        yaxis: { title: 'Dimension 2', showgrid: false },
        hovermode: 'closest',
        height: 600,
      }}
      onClick={(event) => {
        const pointIndex = event.points[0].pointIndex;
        const topicId = data.topics[pointIndex].topic_id;
        navigate(`/topics/${topicId}`);
      }}
    />
  );
}
```

**Option 2: D3.js 사용 (커스터마이징 필요 시)**

```tsx
import * as d3 from 'd3';

function BertopicVisualization({ data }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    // 스케일 설정
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data.topics, (d) => d.x))
      .range([50, width - 50]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data.topics, (d) => d.y))
      .range([height - 50, 50]);

    // 원 그리기
    svg
      .selectAll('circle')
      .data(data.topics)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', (d) => Math.sqrt(d.size) * 2)
      .attr('fill', 'steelblue')
      .attr('opacity', 0.6)
      .on('click', (event, d) => {
        navigate(`/topics/${d.topic_id}`);
      });
  }, [data]);

  return <svg ref={svgRef} width={800} height={600} />;
}
```

#### 인터랙션

- **호버**: 토픽 제목, 키워드, 기사 수 표시
- **클릭**: 해당 토픽 상세 페이지로 이동
- **줌**: 마우스 휠로 확대/축소 (선택사항)

---

### 4. PressTopicHeatmap (언론사별 토픽 커버리지 히트맵)

#### API 호출

```typescript
GET /api/press/topic-heatmap?date=2025-11-11
```

#### 예상 응답 구조

```typescript
{
  date: string
  topics: [
    { topic_id: 1, topic_title: "이재명 재판", topic_rank: 1 },
    { topic_id: 2, topic_title: "의대 증원", topic_rank: 2 }
  ],
  press_list: [
    { press_id: 1, press_name: "조선일보" },
    { press_id: 2, press_name: "한겨레" }
  ],
  heatmap: [
    {
      press_id: 1,
      press_name: "조선일보",
      topics: [
        {
          topic_id: 1,
          stance_score: 0.75,        // -1 ~ 1 (비판 ~ 옹호)
          article_count: 8,
          avg_similarity: 0.82       // 해당 토픽과의 관련도
        },
        {
          topic_id: 2,
          stance_score: -0.45,
          article_count: 5,
          avg_similarity: 0.78
        }
      ]
    },
    {
      press_id: 2,
      press_name: "한겨레",
      topics: [
        { topic_id: 1, stance_score: -0.68, article_count: 12, avg_similarity: 0.88 },
        { topic_id: 2, stance_score: 0.52, article_count: 6, avg_similarity: 0.75 }
      ]
    }
  ]
}
```

#### 구현 방법

**Option 1: MUI DataGrid 활용**

```tsx
import { DataGrid } from '@mui/x-data-grid';

function PressTopicHeatmap({ data }) {
  // 데이터 변환
  const rows = data.press_list.map((press) => {
    const row = { id: press.press_id, press: press.press_name };

    const pressData = data.heatmap.find((h) => h.press_id === press.press_id);
    data.topics.forEach((topic) => {
      const topicData = pressData?.topics.find((t) => t.topic_id === topic.topic_id);
      row[`topic_${topic.topic_id}`] = topicData?.stance_score || null;
    });

    return row;
  });

  const columns = [
    { field: 'press', headerName: '언론사', width: 120 },
    ...data.topics.map((topic) => ({
      field: `topic_${topic.topic_id}`,
      headerName: topic.topic_title,
      width: 100,
      renderCell: (params) => {
        const score = params.value;
        if (score === null) return <Box sx={{ bgcolor: 'grey.200' }}>-</Box>;

        const color = getStanceColor(score);
        return (
          <Tooltip title={`스탠스: ${score.toFixed(2)}`}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                bgcolor: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {getStanceEmoji(score)}
            </Box>
          </Tooltip>
        );
      },
    })),
  ];

  return <DataGrid rows={rows} columns={columns} hideFooter />;
}

// 유틸리티 함수
function getStanceColor(score: number): string {
  if (score < -0.3) return '#ef5350'; // 비판 - 빨강
  if (score > 0.3) return '#66bb6a'; // 옹호 - 초록
  return '#ffa726'; // 중립 - 주황
}

function getStanceEmoji(score: number): string {
  if (score < -0.3) return '🔴';
  if (score > 0.3) return '🟢';
  return '🟡';
}
```

**Option 2: 커스텀 히트맵 (더 자유로운 디자인)**

```tsx
function PressTopicHeatmap({ data }) {
  return (
    <Box>
      {/* 헤더 - 토픽 제목들 */}
      <Grid container>
        <Grid item xs={2}>
          <Typography variant="caption" fontWeight="bold">
            언론사
          </Typography>
        </Grid>
        {data.topics.map((topic) => (
          <Grid item xs={1.4} key={topic.topic_id}>
            <Tooltip title={topic.topic_title}>
              <Typography
                variant="caption"
                noWrap
                align="center"
                sx={{ transform: 'rotate(-45deg)' }}
              >
                {topic.topic_title}
              </Typography>
            </Tooltip>
          </Grid>
        ))}
      </Grid>

      {/* 히트맵 바디 */}
      {data.heatmap.map((press) => (
        <Grid container key={press.press_id} sx={{ mb: 1 }}>
          <Grid item xs={2}>
            <Typography variant="body2">{press.press_name}</Typography>
          </Grid>
          {data.topics.map((topic) => {
            const cell = press.topics.find((t) => t.topic_id === topic.topic_id);
            return (
              <Grid item xs={1.4} key={topic.topic_id}>
                <Tooltip
                  title={
                    cell
                      ? `스탠스: ${cell.stance_score.toFixed(2)}\n기사: ${cell.article_count}개`
                      : '보도 없음'
                  }
                >
                  <Box
                    sx={{
                      height: 40,
                      bgcolor: cell ? getStanceColor(cell.stance_score) : 'grey.200',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.8 },
                    }}
                    onClick={() => {
                      if (cell) {
                        navigate(`/press/${press.press_id}/articles?topic=${topic.topic_id}`);
                      }
                    }}
                  >
                    {cell && (
                      <Typography variant="caption" color="white">
                        {cell.article_count}
                      </Typography>
                    )}
                  </Box>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
      ))}

      {/* 범례 */}
      <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: '#ef5350' }} />
          <Typography variant="caption">비판적</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: '#ffa726' }} />
          <Typography variant="caption">중립적</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: '#66bb6a' }} />
          <Typography variant="caption">옹호적</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: 'grey.300' }} />
          <Typography variant="caption">보도 없음</Typography>
        </Box>
      </Box>
    </Box>
  );
}
```

---

## 📦 필요한 라이브러리

```bash
# 시각화 라이브러리 (택 1)
npm install react-plotly.js plotly.js          # BERTopic 시각화용 (추천)
# 또는
npm install d3 @types/d3                       # 커스텀 시각화 필요 시

# MUI DataGrid (히트맵용, 선택사항)
npm install @mui/x-data-grid

# 차트 라이브러리 (스탠스 분포 막대 그래프용, 선택사항)
npm install recharts
# 또는 CSS로 간단히 구현 가능
```

---

## 📐 전체 페이지 컴포넌트 구조

```tsx
MainPage (pages/MainPage.tsx)
├── Header (components/layout/Header.tsx)
├── Container
│   ├── Box (상단 여백)
│   ├── Typography (페이지 제목: "뉴스 스탠스 대시보드")
│   ├── DashboardSummary (components/dashboard/DashboardSummary.tsx)
│   │   └── SummaryCard[] (components/dashboard/SummaryCard.tsx)
│   ├── Divider
│   ├── TopTopicsList (components/dashboard/TopTopicsList.tsx)
│   │   └── TopicCard[] (components/dashboard/TopicCard.tsx)
│   │       ├── TopicRankBadge
│   │       ├── TopicTitle
│   │       ├── MainArticlePreview
│   │       └── StanceDistributionBar (components/common/StanceDistributionBar.tsx)
│   ├── Divider
│   ├── BertopicVisualization (components/dashboard/BertopicVisualization.tsx)
│   ├── Divider
│   └── PressTopicHeatmap (components/dashboard/PressTopicHeatmap.tsx)
└── Footer (components/layout/Footer.tsx)
```

---

## 🎯 API 호출 전략 (React Query 사용)

### Custom Hooks

```typescript
// hooks/useDashboard.ts
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/services/api';

export function useDashboardSummary(date?: string) {
  return useQuery({
    queryKey: ['dashboard', 'summary', date],
    queryFn: () => dashboardApi.getSummary(date),
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 10 * 60 * 1000, // 10분
  });
}

export function useTopTopics(date?: string) {
  return useQuery({
    queryKey: ['dashboard', 'topTopics', date],
    queryFn: () => dashboardApi.getTopTopics(date),
    staleTime: 5 * 60 * 1000,
  });
}

export function useBertopicVisualization(date?: string) {
  return useQuery({
    queryKey: ['dashboard', 'bertopic', date],
    queryFn: () => dashboardApi.getBertopicVisualization(date),
    staleTime: 30 * 60 * 1000, // 30분 (연산 비용 높을 수 있음)
    cacheTime: 60 * 60 * 1000,
  });
}

export function usePressTopicHeatmap(date?: string) {
  return useQuery({
    queryKey: ['dashboard', 'heatmap', date],
    queryFn: () => dashboardApi.getPressTopicHeatmap(date),
    staleTime: 5 * 60 * 1000,
  });
}
```

### MainPage 구현

```typescript
// pages/MainPage.tsx
import { useState } from 'react';
import { Container, Box, Typography, Divider, CircularProgress } from '@mui/material';
import {
  useDashboardSummary,
  useTopTopics,
  useBertopicVisualization,
  usePressTopicHeatmap
} from '@/hooks/useDashboard';

export default function MainPage() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const { data: summary, isLoading: loadingSummary } = useDashboardSummary(selectedDate);
  const { data: topTopics, isLoading: loadingTopics } = useTopTopics(selectedDate);
  const { data: bertopic, isLoading: loadingBertopic } = useBertopicVisualization(selectedDate);
  const { data: heatmap, isLoading: loadingHeatmap } = usePressTopicHeatmap(selectedDate);

  if (loadingSummary || loadingTopics) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* 날짜 선택기 */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            뉴스 스탠스 대시보드
          </Typography>
          <DatePicker
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
          />
        </Box>

        {/* 요약 카드 */}
        <DashboardSummary data={summary} />

        <Divider sx={{ my: 4 }} />

        {/* Top 7 토픽 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            🔥 오늘의 주요 토픽 Top 7
          </Typography>
          <TopTopicsList data={topTopics} />
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* BERTopic 시각화 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            🗺️ 토픽 클러스터 지도
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            가까이 있는 토픽은 유사한 주제를 다룹니다. 원의 크기는 기사 수를 나타냅니다.
          </Typography>
          {loadingBertopic ? (
            <Box display="flex" justifyContent="center" py={10}>
              <CircularProgress />
            </Box>
          ) : (
            <BertopicVisualization data={bertopic} />
          )}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* 언론사별 히트맵 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            📊 언론사별 토픽 커버리지 히트맵
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            각 언론사가 토픽을 어떻게 다루는지 한눈에 확인하세요. 색상은 논조를 나타냅니다.
          </Typography>
          {loadingHeatmap ? (
            <Box display="flex" justifyContent="center" py={10}>
              <CircularProgress />
            </Box>
          ) : (
            <PressTopicHeatmap data={heatmap} />
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
}
```

---

## 🎨 스타일 가이드

### 색상 팔레트

```typescript
// theme/colors.ts
export const stanceColors = {
  support: {
    main: '#66bb6a', // 옹호 - 초록
    light: '#81c784',
    dark: '#4caf50',
  },
  neutral: {
    main: '#ffa726', // 중립 - 주황
    light: '#ffb74d',
    dark: '#fb8c00',
  },
  critical: {
    main: '#ef5350', // 비판 - 빨강
    light: '#e57373',
    dark: '#f44336',
  },
  noData: {
    main: '#e0e0e0', // 데이터 없음 - 회색
    light: '#eeeeee',
    dark: '#bdbdbd',
  },
};

export function getStanceColor(score: number): string {
  if (score < -0.3) return stanceColors.critical.main;
  if (score > 0.3) return stanceColors.support.main;
  return stanceColors.neutral.main;
}

export function getStanceLabel(score: number): string {
  if (score < -0.3) return '비판';
  if (score > 0.3) return '옹호';
  return '중립';
}
```

### 반응형 디자인

```typescript
// 모바일: 토픽 카드 1열
// 태블릿: 토픽 카드 2열
// 데스크톱: 토픽 카드 3열

<Grid container spacing={3}>
  {topTopics.map(topic => (
    <Grid item xs={12} sm={6} md={4} key={topic.topic_id}>
      <TopicCard topic={topic} />
    </Grid>
  ))}
</Grid>
```

---

## 🚀 개발 우선순위

### Phase 1: 기본 구조 (1-2일)

- [x] DashboardSummary 컴포넌트
- [x] TopTopicsList 컴포넌트
- [x] 기본 레이아웃 및 네비게이션

### Phase 2: 핵심 기능 (2-3일)

- [ ] StanceDistributionBar 컴포넌트
- [ ] TopicCard 인터랙션 (클릭, 호버)
- [ ] 날짜 선택 기능

### Phase 3: 고급 시각화 (3-4일)

- [ ] BertopicVisualization 구현
- [ ] PressTopicHeatmap 구현
- [ ] 로딩 상태 및 에러 처리

### Phase 4: 최적화 (1-2일)

- [ ] 성능 최적화 (React.memo, useMemo)
- [ ] 모바일 반응형 개선
- [ ] 접근성 개선 (ARIA, 키보드 네비게이션)

---

## 🔍 백엔드 팀 확인 사항

### 즉시 확인 필요

1. ✅ `/api/dashboard/bertopic_visualization` 응답 데이터 구조 확정
   - 2D 좌표 계산 방식 (UMAP? t-SNE?)
   - keywords 필드 포함 여부
   - connections 필드 포함 여부

2. ✅ `/api/press/topic-heatmap` 응답 데이터 구조 확정
   - press_list 제공 여부
   - topics 제공 여부
   - 셀 데이터에 article_count 포함 여부

3. ✅ 성능 고려사항
   - BERTopic 시각화는 사전 계산인가? 실시간 계산인가?
   - 히트맵 데이터 크기 (언론사 수 x 토픽 수)
   - 캐싱 전략

### 샘플 데이터 요청

각 API의 실제 응답 예시를 JSON 형태로 제공해주시면 타입 정의 및 개발이 수월합니다.

---

**작성자**: Claude Code
**최종 수정일**: 2025-11-11
