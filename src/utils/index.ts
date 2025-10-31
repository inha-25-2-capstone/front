/**
 * Utils 통합 Export
 *
 * 사용 예시:
 * import { formatToKoreanDate, getStanceColor, formatNumber } from '@/utils';
 */

// Date utilities
export {
  formatRelativeTime,
  formatToDotDate,
  formatToISODate,
  formatToKoreanDate,
  formatToKoreanDateTime,
} from './date';

// Number utilities
export {
  clamp,
  formatCompactNumber,
  formatKoreanNumber,
  formatNumber,
  formatPercent,
  formatViewCount,
  ratioToPercent,
} from './number';

// Stance utilities
export {
  getDominantStance,
  getStanceColor,
  getStanceLabel,
  getStanceLightColor,
  getStanceStatistics,
  STANCE_COLORS,
  STANCE_LABELS,
  STANCE_LIGHT_COLORS,
} from './stance';

// String utilities
export {
  capitalize,
  extractDomain,
  highlightText,
  normalizeWhitespace,
  stripHtml,
  truncate,
} from './string';
