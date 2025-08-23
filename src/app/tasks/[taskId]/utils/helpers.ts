import { Maybe, TaskStatus } from '@/graphql/generated';

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

export const getStatusConfig = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.Open:
      return { label: 'Нээлттэй', badge: 'border-green-500 text-green-400' };
    case TaskStatus.InProgress:
      return {
        label: 'Гүйцэтгэж байгаа',
        badge: 'border-blue-500 text-blue-400',
      };
    case TaskStatus.Completed:
      return {
        label: 'Дууссан',
        badge: 'border-gray-400 text-gray-400 line-through',
      };
    case TaskStatus.Assigned:
      return { label: 'Хүн авсан', badge: 'border-purple-400 text-purple-400' };
    case TaskStatus.Cancelled:
      return { label: 'Цуцлагдсан', badge: 'border-red-500 text-red-400' };
    case TaskStatus.Disputed:
      return {
        label: 'Маргаантай',
        badge: 'border-orange-500 text-orange-400',
      };
    case TaskStatus.Overdue:
      return {
        label: 'Хугацаа хэтэрсэн',
        badge: 'border-pink-500 text-pink-400 animate-pulse',
      };
    default:
      return { label: 'Тодорхойгүй', badge: 'border-gray-600 text-gray-400' };
  }
};
