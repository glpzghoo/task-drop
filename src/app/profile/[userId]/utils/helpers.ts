import { Maybe, Task } from '@/graphql/generated';
import { formatDistanceToNow, isValid } from 'date-fns';
import { mn } from 'date-fns/locale';

const toDate = (ts?: string | null) => {
  if (!ts) return null;
  const n = Number(ts);
  if (!Number.isFinite(n)) return null;
  const d = new Date(n);
  return isValid(d) ? d : null;
};

const formatRelative = (d?: Date | null) => {
  if (!d) return 'Огноо байхгүй';
  return formatDistanceToNow(d, { addSuffix: true, locale: mn });
};

const formatDuration = (mins?: number | null) =>
  mins == null ? 'Хугацаа тодорхойгүй' : `${mins} мин`;

const formatMNT = (amt?: number | null) =>
  amt == null
    ? '—'
    : new Intl.NumberFormat('mn-MN', {
        style: 'currency',
        currency: 'MNT',
        maximumFractionDigits: 0,
      }).format(amt);

function isTask(t: Maybe<Task>): t is Task {
  return !!t && typeof t.id === 'string';
}

export { toDate, formatRelative, formatDuration, formatMNT, isTask };
