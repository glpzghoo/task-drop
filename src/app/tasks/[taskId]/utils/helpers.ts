import { Maybe } from '@/graphql/generated';

const timeUntilDue = (dueDate: Maybe<string> | undefined) => {
  if (!dueDate) return 'Дуусах цаг алга';
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffMs < 0) return 'Overdue';
  if (diffHours < 1) return `${diffMinutes} минутын үлдсэн`;
  return `${diffHours} цаг ${diffMinutes} минутын үлдсэн`;
};

const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 60) return `${diffMinutes} минутын өмнө`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} цагийн өмнө`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} -өдрийн өмнө`;
};

export { timeUntilDue, formatTimeAgo };
