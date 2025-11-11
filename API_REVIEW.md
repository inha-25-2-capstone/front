# API 명세서 검토 보고서

**검토일**: 2025-11-11
**프로젝트**: AI 기반 객관적 뉴스 추천 서비스

---

## 📋 검토 개요

본 문서는 백엔드 팀에서 제공한 RESTful API 명세서를 프론트엔드 요구사항과 비교 분석한 결과입니다.

---

## ✅ 잘 설계된 부분

### 1. RESTful 설계 원칙 준수

- 리소스 기반 URL 구조가 명확함
- HTTP Method를 적절히 사용 (GET, POST)

### 2. 유연한 필터링 옵션

- `include` 파라미터로 필요한 데이터만 선택 가능
- 불필요한 데이터 전송 방지로 성능 최적화

### 3. 배치 조회 API 제공

- `/batch` 엔드포인트로 여러 리소스를 한 번에 조회
- 네트워크 요청 수 감소로 성능 향상

### 4. 페이지네이션 지원

- 대용량 데이터 처리 고려
- `page`, `limit` 파라미터 지원

---

## ⚠️ 개선이 필요한 부분

### 1. API 엔드포인트 일관성 문제 🔴 HIGH PRIORITY

#### 현재 구조 (혼재)

```
GET /api/articles?article_id={article_id}
GET /api/topics?topic_id={topic_id}
GET /api/press?press_id={press_id}
```

#### 권장 구조 (RESTful 표준)

```
GET /api/articles/{article_id}
GET /api/topics/{topic_id}
GET /api/press/{press_id}
```

#### 이유

- RESTful 설계에서 리소스 ID는 **경로 파라미터**로 표현하는 것이 표준
- 쿼리 파라미터는 필터링/정렬/검색 용도로 사용
- URL의 의미가 명확해지고 캐싱에도 유리

#### 변경 예시

```typescript
// Before
GET /api/articles?article_id=123

// After
GET /api/articles/123
GET /api/articles/123?include=stance,topic,related_articles
```

---

### 2. 기사 API - 관련 기사 엔드포인트 중복 🟡 MEDIUM PRIORITY

#### 문제점

```
GET /api/articles?article_id={article_id}
    ↳ include: related_articles  ✅ 이미 여기서 조회 가능

GET /api/articles?article_id={article_id}/related  ❌ 중복된 엔드포인트
```

#### 제안

- `/related` 엔드포인트 삭제
- `include=related_articles` 파라미터로 통합하여 일관성 유지

#### 장점

- API 엔드포인트 수 감소
- 프론트엔드에서 하나의 호출로 모든 데이터 조회 가능
- 유지보수 용이

---

### 3. 토픽 API - 응답 필드 명확성 부족 🟡 MEDIUM PRIORITY

#### 현재 명세

```
GET /api/topics?topic_id={topic_id}
Response: main_article_info, main_stance
```

#### 문제점

- `main_article_info`가 어떤 필드들을 포함하는지 불명확
- 프론트엔드에서 타입 정의가 어려움

#### 권장 응답 구조 (TypeScript 형식)

```typescript
{
  topic_id: number
  topic_title: string
  topic_date: string  // ISO 8601 format
  topic_rank: number
  cluster_score: number
  article_count: number
  main_stance: "옹호" | "중립" | "비판"

  // include=main_article 일 때
  main_article?: {
    article_id: number
    title: string
    summary: string
    press_name: string
    published_at: string
    img_url: string | null
    stance: "옹호" | "중립" | "비판"
  }

  // include=stance_distribution 일 때
  stance_distribution?: {
    옹호_count: number
    중립_count: number
    비판_count: number
    total_count: number
  }

  // include=recommendations 일 때
  recommendations?: Array<{
    article_id: number
    title: string
    press_name: string
    stance: string
    similarity_score: number
  }>
}
```

---

### 4. 대시보드 API - 엔드포인트 네이밍 🟢 LOW PRIORITY

#### 현재

```
GET /api/dashboard/topic_today
```

#### 권장

```
GET /api/dashboard/top-topics
또는
GET /api/dashboard/topics/top
```

#### 이유

- `topic_today`보다 `top-topics`가 의미가 더 명확
- "오늘의 토픽"인지 "상위 토픽"인지 애매함
- REST API는 명사 복수형 사용이 일반적

---

### 5. 언론사 히트맵 API - 응답 구조 불명확 🔴 HIGH PRIORITY

#### 현재 명세

```
GET /api/press/topic-heatmap
Response: heatmap[][]
```

#### 문제점

- 2차원 배열만으로는 어떤 언론사, 어떤 토픽인지 알 수 없음
- 프론트엔드에서 데이터 매핑이 어려움
- 행/열이 무엇을 의미하는지 불명확

#### 권장 응답 구조

```typescript
{
  // 메타데이터
  date: string  // 조회 기준일
  generated_at: string  // 데이터 생성 시간

  // 토픽 리스트
  topics: [
    {
      topic_id: 1,
      topic_title: "이재명 대표 1심 선고",
      topic_rank: 1
    },
    {
      topic_id: 2,
      topic_title: "의대 증원 논란",
      topic_rank: 2
    }
  ],

  // 언론사 리스트
  press_list: [
    { press_id: 1, press_name: "조선일보" },
    { press_id: 2, press_name: "한겨레" },
    { press_id: 3, press_name: "중앙일보" }
  ],

  // 히트맵 데이터
  heatmap: [
    {
      press_id: 1,
      press_name: "조선일보",  // 편의를 위해 포함
      topics: [
        {
          topic_id: 1,
          stance_score: 0.8,      // -1 ~ 1 (비판 ~ 옹호)
          article_count: 5,
          avg_similarity: 0.85
        },
        {
          topic_id: 2,
          stance_score: -0.3,
          article_count: 3,
          avg_similarity: 0.72
        }
      ]
    },
    {
      press_id: 2,
      press_name: "한겨레",
      topics: [
        { topic_id: 1, stance_score: -0.6, article_count: 7, avg_similarity: 0.90 },
        { topic_id: 2, stance_score: 0.4, article_count: 4, avg_similarity: 0.68 }
      ]
    }
  ]
}
```

#### 프론트엔드 활용 예시

```typescript
// 히트맵 렌더링 시
heatmap.forEach((press) => {
  press.topics.forEach((topic) => {
    const color = getStanceColor(topic.stance_score);
    const cell = createHeatmapCell(press.press_name, topic.topic_id, color);
    // 렌더링 로직
  });
});
```

---

### 6. 누락된 API 🟡 MEDIUM PRIORITY

프론트엔드 요구사항(`CLAUDE.md`) 대비 누락된 항목:

#### 1) 검색 API (선택사항)

```
GET /api/search?q={keyword}&type=article|topic|press&page=1&limit=20
```

- 통합 검색 기능 제공
- 기사, 토픽, 언론사 통합 검색

#### 2) 키워드 트렌드 API

```
GET /api/dashboard/keywords?date={YYYY-MM-DD}&limit=20
```

**프론트엔드 요구사항에 포함된 내용:**

- `CLAUDE.md`의 MainPage에 "핵심 키워드 트렌드 (워드클라우드)" 기능 명시
- API 호출: `GET /api/dashboard/keywords`

**API 명세서 상태:**

- 문서 상단에 "핵심 키워드 트렌드 삭제" 제안 있음 ❌

**권장 응답 구조:**

```typescript
{
  date: string
  keywords: [
    {
      keyword: string
      frequency: number
      trend: "up" | "down" | "neutral"  // 전일 대비
      related_topics: number[]  // 관련 토픽 ID
    }
  ]
}
```

#### 3) 언론사별 스펙트럼 API

```
GET /api/dashboard/press-spectrum?date={YYYY-MM-DD}
```

**프론트엔드 요구사항:**

- `CLAUDE.md`의 MainPage에 "언론사별 정치 스펙트럼 시각화" 기능 명시
- API 호출: `GET /api/dashboard/press-spectrum`

**API 명세서 상태:**

- 해당 엔드포인트 없음 ❌
- "언론사별 스탠스 분포 히트맵 → 언론사별 분류로 이동" 제안만 있음

**권장 응답 구조:**

```typescript
{
  date: string
  spectrum: [
    {
      press_id: number
      press_name: string
      avg_stance_score: number  // -1 ~ 1
      position: "진보" | "중도" | "보수"
      article_count: number
      옹호_ratio: number
      중립_ratio: number
      비판_ratio: number
    }
  ]
}
```

---

### 7. 정렬 옵션 일관성 ✅ GOOD

현재 잘 되어 있는 부분:

```
sort=published_at:desc
sort=rank:asc
sort=similarity_score:desc
```

모든 API에서 `field:direction` 형식으로 통일되어 있음.

---

### 8. 날짜 파라미터 네이밍 🟢 LOW PRIORITY

#### 현재 사용 중인 파라미터

```
date (YYYY-MM-DD)     # 특정 날짜
start_date            # 범위 시작
end_date              # 범위 종료
```

#### 문제점

- `date`와 `start_date/end_date`가 동시에 제공되면 어떻게 처리할지 불명확

#### 제안

```
# 우선순위 명시
1. date가 있으면 → 특정 날짜만 조회
2. start_date, end_date가 있으면 → 범위 조회
3. 둘 다 없으면 → 전체 또는 최신 N일

# 또는 date를 범위 조회로 통일
date=2025-01-01              # 특정 날짜
date=2025-01-01,2025-01-31   # 범위 (콤마 구분)
```

---

## 📊 프론트엔드 요구사항과의 불일치

### CLAUDE.md vs API 명세서 비교

| 프론트엔드 요구사항                      | 현재 API 명세         | 상태        | 우선순위 |
| ---------------------------------------- | --------------------- | ----------- | -------- |
| `GET /api/dashboard/summary`             | ✅ 있음               | OK          | -        |
| `GET /api/dashboard/keywords`            | ❌ 없음 (삭제 제안)   | **불일치**  | HIGH     |
| `GET /api/dashboard/topics/stance-ratio` | `/topic_today`로 있음 | 네이밍 다름 | LOW      |
| `GET /api/dashboard/press-spectrum`      | ❌ 없음               | **누락**    | HIGH     |
| `GET /api/topics/:topic_id`              | 쿼리 파라미터 방식    | 형식 다름   | MEDIUM   |
| `GET /api/articles/:article_id`          | 쿼리 파라미터 방식    | 형식 다름   | MEDIUM   |

---

## 🎯 우선순위별 수정 권장사항

### 🔴 High Priority (필수 - 개발 시작 전 수정)

1. **경로 파라미터 방식으로 변경**
   - `/api/articles?article_id={id}` → `/api/articles/{id}`
   - `/api/topics?topic_id={id}` → `/api/topics/{id}`
   - `/api/press?press_id={id}` → `/api/press/{id}`

2. **히트맵 API 응답 구조 명확히**
   - 2차원 배열 → 구조화된 객체 배열
   - 메타데이터 포함 (토픽 리스트, 언론사 리스트)

3. **프론트엔드 필수 API 추가 확인**
   - `GET /api/dashboard/keywords` (워드클라우드용)
   - `GET /api/dashboard/press-spectrum` (정치 스펙트럼용)

### 🟡 Medium Priority (권장 - 초기 개발 단계에서 반영)

4. **중복 엔드포인트 정리**
   - `/api/articles/{id}/related` 삭제
   - `include=related_articles` 파라미터로 통합

5. **응답 필드 타입 및 구조 상세 명세**
   - 모든 API의 응답 구조를 TypeScript 인터페이스 형태로 문서화
   - 필수/선택 필드 명시
   - 예시 응답 추가

6. **날짜 파라미터 우선순위 명확히**
   - `date`와 `start_date/end_date` 동시 사용 시 처리 규칙
   - 기본값 명시 (예: date 없으면 오늘 날짜)

### 🟢 Low Priority (개선 - 점진적으로 반영 가능)

7. **에러 응답 형식 정의**

```typescript
// 표준 에러 응답
{
  error: {
    code: string          // "NOT_FOUND", "INVALID_PARAMETER"
    message: string       // 사용자 친화적 메시지
    details?: any         // 추가 상세 정보
    timestamp: string
  }
}

// HTTP 상태 코드별 응답
// 400 Bad Request - 잘못된 요청 파라미터
// 404 Not Found - 리소스 없음
// 500 Internal Server Error - 서버 에러
```

8. **페이지네이션 응답 형식 통일**

```typescript
{
  data: [...],
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }
}
```

9. **API 버전 관리 전략**

```
/api/v1/articles/{id}
또는
/api/articles/{id} (버전 헤더: Accept: application/vnd.api+json; version=1)
```

---

## 🔄 변경 제안사항에 대한 의견

API 명세서 상단의 "변경사항 제안"에 대한 검토:

### 1. ✅ "인기 기사 목록" → "전체 기사 목록"

- 동의. 의미가 명확해짐

### 2. ✅ 조회수 정렬 삭제

- 동의. 명세서에 조회수 필드가 없음

### 3. ❌ 핵심 키워드 트렌드 삭제

- **반대**. 프론트엔드 요구사항에 포함됨 (`CLAUDE.md` MainPage)
- 워드클라우드 시각화는 UX 측면에서 중요

### 4. ❓ 주요 토픽별 스탠스 비율 삭제

- 프론트엔드에서 필요 여부 확인 필요
- 토픽 상세 페이지에서는 사용됨

### 5. ❌ 언론사별 스탠스 분포 히트맵 이동

- **부분 동의**. 히트맵은 유지하되, 언론사별 분류 페이지에도 추가
- 대시보드에서의 전체 조망과 상세 페이지의 분석을 모두 제공

### 6. ✅ 언론사별 비교 분석 삭제

- 동의. "논조 분포"로 충분

### 7. ✅ BERTopic 시각화 추가

- 동의. 토픽 모델링 결과를 시각적으로 제공하면 좋음
- 단, 프론트엔드 구현 난이도 고려 필요

---

## 🤝 백엔드 팀과 논의가 필요한 사항

### 즉시 논의 필요 (개발 시작 전)

1. RESTful 경로 파라미터 방식(`/articles/{id}`)으로 변경 가능한지?
2. 키워드 트렌드 API와 언론사별 스펙트럼 API를 정말 삭제할 것인지?
3. 히트맵 데이터 응답 구조 협의

### 초기 개발 단계에서 논의

4. 응답 필드 상세 스펙 (TypeScript 인터페이스)
5. 에러 응답 형식 통일
6. BERTopic 시각화 데이터 형식 및 프론트엔드 구현 방안

---

## 📋 체크리스트

백엔드 팀에 확인 요청:

- [ ] RESTful 경로 파라미터 적용 가능 여부
- [ ] `/api/dashboard/keywords` API 제공 여부
- [ ] `/api/dashboard/press-spectrum` API 제공 여부
- [ ] 히트맵 API 응답 구조 개선
- [ ] 모든 API의 응답 필드 상세 명세 제공
- [ ] 에러 응답 형식 정의
- [ ] BERTopic 시각화 데이터 형식 및 샘플 제공

---

## 📚 참고 자료

- [RESTful API 설계 가이드](https://restfulapi.net/)
- [HTTP 상태 코드](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)
- [프론트엔드 요구사항 (CLAUDE.md)](./CLAUDE.md)
- [BERTopic 시각화 가이드](https://maartengr.github.io/BERTopic/getting_started/visualization/visualization.html)

---

**작성자**: Claude Code
**최종 수정일**: 2025-11-11
