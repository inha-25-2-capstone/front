import { Box, Typography } from '@mui/material';
import ArticleListItem from '@/components/article/ArticleListItem';

// 더미 데이터
const articles = [
  {
    id: 1,
    title: '대통령 탄핵정책 논란, 국회 긴급 회의 소집',
    press: 'JTBC뉴스',
    date: '2025.10.28',
    imageUrl: '',
    stance: 'oppose' as const,
  },
  {
    id: 2,
    title: '경제정책 발표, 내년도 예산안 통과 전망',
    press: 'KBS뉴스',
    date: '2025.10.28',
    imageUrl: '',
    stance: 'support' as const,
  },
  {
    id: 3,
    title: '국정감사 본격 시작, 주요 쟁점은?',
    press: 'MBC뉴스',
    date: '2025.10.28',
    imageUrl: '',
    stance: 'neutral' as const,
  },
  {
    id: 4,
    title: '부동산 정책 개편안 발표, 시장 반응은',
    press: 'SBS뉴스',
    date: '2025.10.27',
    imageUrl: '',
    stance: 'oppose' as const,
  },
  {
    id: 5,
    title: '투표율 상승세, 젊은 층 정치 참여 증가',
    press: '경향신문',
    date: '2025.10.27',
    imageUrl: '',
    stance: 'support' as const,
  },
  {
    id: 6,
    title: '노동법 개정안 국회 제출, 찬반 논란 가열',
    press: '동아일보',
    date: '2025.10.27',
    imageUrl: '',
    stance: 'neutral' as const,
  },
  {
    id: 7,
    title: '교육부 예산 삭감 논란, 교육계 반발',
    press: '매일경제',
    date: '2025.10.26',
    imageUrl: '',
    stance: 'oppose' as const,
  },
  {
    id: 8,
    title: '헌법재판소 중요 판결 앞두고 관심 집중',
    press: '연합뉴스',
    date: '2025.10.26',
    imageUrl: '',
    stance: 'neutral' as const,
  },
  {
    id: 9,
    title: '외교 정책 변화, 국제 관계 재편 전망',
    press: '조선일보',
    date: '2025.10.26',
    imageUrl: '',
    stance: 'support' as const,
  },
  {
    id: 10,
    title: '지방자치단체 예산안 통과, 주요 사업은',
    press: '중앙일보',
    date: '2025.10.25',
    imageUrl: '',
    stance: 'neutral' as const,
  },
  {
    id: 11,
    title: '환경정책 강화안 발표, 기업들 대응 나서',
    press: '한겨레',
    date: '2025.10.25',
    imageUrl: '',
    stance: 'support' as const,
  },
  {
    id: 12,
    title: '금융정책 변화 예고, 시장 영향 주목',
    press: '한국경제',
    date: '2025.10.25',
    imageUrl: '',
    stance: 'neutral' as const,
  },
];

export default function ArticleListPage() {
  return (
    <Box>
      {/* 페이지 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          인기 기사 목록
        </Typography>
        <Typography variant="body1" color="text.secondary">
          최신 정치 기사를 확인해보세요
        </Typography>
      </Box>

      {/* 기사 리스트 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {articles.map((article) => (
          <ArticleListItem key={article.id} {...article} />
        ))}
      </Box>
    </Box>
  );
}
