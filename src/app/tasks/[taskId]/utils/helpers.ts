import { formatDistanceToNowStrict, isBefore } from 'date-fns';
import { mn } from 'date-fns/locale';

export function timeUntilDue(dueDate?: string | null) {
  if (!dueDate) return 'Дуусах цаг алга';
  const due = new Date(Number(dueDate));
  if (isNaN(due.getTime())) return 'Огноо буруу';
  if (isBefore(due, new Date())) return 'Хугацаа хэтэрсэн';

  // “2 цагийн дараа”
  return formatDistanceToNowStrict(due, { addSuffix: true, locale: mn });
}
