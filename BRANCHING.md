# Git Branching Strategy

이 프로젝트는 **Git Flow** 전략을 사용합니다.

## 📊 브랜치 구조

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

## 🌿 브랜치 설명

### 1. `main` (Production)
- **용도**: 프로덕션 환경 배포
- **배포**: Production (실제 서비스)
- **환경 변수**: `VITE_USE_MOCK_DATA=false`
- **보호**: ⚠️ 직접 push 금지, PR을 통해서만 merge
- **Merge 조건**:
  - `develop` 브랜치에서 충분히 테스트 완료
  - API 연동 완료
  - 모든 테스트 통과
  - 팀 리뷰 승인

### 2. `develop` (Staging)
- **용도**: 개발/통합 테스트 환경
- **배포**: Staging (Render)
- **환경 변수**: `VITE_USE_MOCK_DATA=true` (API 연동 전)
- **보호**: ⚠️ 직접 push 지양, PR을 통해서만 merge 권장
- **자동 배포**: ✅ `develop` 브랜치 push 시 자동으로 Render에 배포

### 3. `feature/*` (Feature Branches)
- **용도**: 개별 기능 개발
- **명명 규칙**: `feature/기능명` (kebab-case)
  - 예: `feature/add-topic-list`
  - 예: `feature/fix-login-bug`
  - 예: `feature/api-integration`
- **Base 브랜치**: `develop`에서 분기
- **Merge 대상**: `develop`으로 PR & merge

## 🚀 작업 프로세스

### 1. 새로운 기능 개발

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

### 2. 릴리즈 (Production 배포)

```bash
# 1. develop에서 충분히 테스트 완료 후
# 2. GitHub에서 PR 생성 (develop → main)
# 3. 팀 리뷰 및 최종 확인
# 4. main으로 merge
# 5. Production 자동 배포 (설정 시)
```

## 🔒 브랜치 보호 규칙 (권장)

GitHub Settings → Branches → Branch protection rules:

### `main` 브랜치
- ✅ Require pull request reviews before merging (1명 이상)
- ✅ Require status checks to pass before merging
  - CI: Lint, Format, Type Check, Build
- ✅ Require branches to be up to date before merging
- ✅ Do not allow bypassing the above settings

### `develop` 브랜치
- ✅ Require pull request reviews before merging (선택)
- ✅ Require status checks to pass before merging
  - CI: Lint, Format, Type Check, Build

## 📝 커밋 메시지 규칙

```
<type>: <subject>

<body> (선택)

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

### Type 종류
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `refactor`: 코드 리팩토링
- `style`: 코드 포맷팅 (기능 변경 없음)
- `docs`: 문서 수정
- `test`: 테스트 코드 추가/수정
- `chore`: 빌드 설정, 패키지 설치 등

### 예시
```
feat: add Top 7 topics section to MainPage

메인 페이지에 오늘의 토픽 TOP 7 섹션 추가
- TopicCard 컴포넌트 생성
- useTopics hook 통합
```

## 🎯 환경별 설정

| 환경 | 브랜치 | Mock 데이터 | API URL | 배포 |
|------|--------|-------------|---------|------|
| **Development** | `feature/*` | ✅ true | localhost | Local |
| **Staging** | `develop` | ✅ true | Mock | Render Auto |
| **Production** | `main` | ❌ false | Real API | Render Auto |

## ⚠️ 주의사항

1. **절대 main에 직접 push 금지!**
   - 반드시 `develop` → `main` PR을 통해서만 merge

2. **develop에도 가급적 직접 push 지양**
   - Feature 브랜치에서 개발 후 PR

3. **Pre-push 체크 필수**
   ```bash
   npm run format    # Prettier 포맷팅
   npm run typecheck # TypeScript 타입 체크
   npm run build     # 빌드 테스트
   ```

4. **Feature 브랜치 이름 규칙 준수**
   - ✅ `feature/add-login-page`
   - ❌ `myFeature`, `new-feature`, `test`

5. **작업 완료 후 브랜치 삭제**
   - Merge 후 로컬 및 원격 브랜치 정리
   ```bash
   git branch -d feature/my-feature
   git push origin --delete feature/my-feature
   ```

## 🔄 브랜치 동기화

### develop 브랜치 최신 상태 유지
```bash
git checkout develop
git pull origin develop
```

### feature 브랜치에 develop 최신 변경사항 반영
```bash
git checkout feature/my-feature
git rebase develop
# 또는
git merge develop
```

## 📚 참고 자료

- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
