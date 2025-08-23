import { TaskStatus } from '@/graphql/generated';

export const formatCurrency = (amount?: number | null) => {
  if (amount == null) return '—';
  try {
    return new Intl.NumberFormat('mn-MN', {
      style: 'currency',
      currency: 'MNT',
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount}`;
  }
};

export const clamp = (text?: string | null, max = 150) => {
  if (!text) return '';
  return text.length > max ? text.slice(0, max - 1) + '…' : text;
};

export const getStatusConfig = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.Open:
      return { label: 'Нээлттэй', color: 'bg-green-500/10 text-green-500' };
    case TaskStatus['InProgress']:
      return { label: 'Хийгдэж байна', color: 'bg-blue-500/10 text-blue-500' };
    case TaskStatus['Completed']:
      return {
        label: 'Дууссан',
        color: 'bg-gray-500/10 text-gray-400 line-through',
      };
    case TaskStatus['Cancelled']:
      return { label: 'Цуцлагдсан', color: 'bg-red-500/10 text-red-500' };
    case TaskStatus['Disputed']:
      return { label: 'Маргаантай', color: 'bg-orange-500/10 text-orange-500' };
    case TaskStatus['Assigned']:
      return { label: 'Оноогдсон', color: 'bg-purple-500/10 text-purple-500' };
    case TaskStatus['Overdue']:
      return {
        label: 'Хугацаа хэтэрсэн',
        color: 'bg-pink-500/10 text-pink-500',
      };
    default:
      return { label: 'Тодорхойгүй', color: 'bg-muted text-muted-foreground' };
  }
};

export const statusStyles = {
  [TaskStatus.Completed]: {
    ring: 'ring-zinc-400/40',
    tint: 'bg-muted dark:bg-muted/40',
    stripe: 'before:bg-zinc-400',
    badge: 'bg-zinc-700/40 text-zinc-100 dark:bg-zinc-700/60 dark:text-zinc-50',
  },
  [TaskStatus.Cancelled]: {
    ring: 'ring-zinc-600/45',
    tint: 'bg-muted dark:bg-muted/40',
    stripe: 'before:bg-zinc-600',
    badge:
      'bg-zinc-800/60 text-zinc-200 dark:bg-zinc-800/70 dark:text-zinc-100',
  },
  [TaskStatus.Overdue]: {
    ring: 'ring-zinc-500/50',
    tint: 'bg-muted dark:bg-muted/40',
    stripe: 'before:bg-zinc-500',
    badge: 'bg-zinc-700/50 text-zinc-100 dark:bg-zinc-700/70 dark:text-zinc-50',
  },
  [TaskStatus.InProgress]: {
    ring: 'ring-zinc-300/45',
    tint: 'bg-muted dark:bg-muted/40',
    stripe: 'before:bg-zinc-300',
    badge: 'bg-zinc-700/40 text-zinc-100 dark:bg-zinc-700/60 dark:text-zinc-50',
  },
  [TaskStatus.Assigned]: {
    ring: 'ring-zinc-300/40',
    tint: 'bg-muted dark:bg-muted/40',
    stripe: 'before:bg-zinc-400',
    badge: 'bg-zinc-700/40 text-zinc-100 dark:bg-zinc-700/60 dark:text-zinc-50',
  },
  [TaskStatus.Disputed]: {
    ring: 'ring-zinc-500/45',
    tint: 'bg-muted dark:bg-muted/40',
    stripe: 'before:bg-zinc-500',
    badge: 'bg-zinc-700/50 text-zinc-100 dark:bg-zinc-700/70 dark:text-zinc-50',
  },
  [TaskStatus.Open]: {
    ring: 'ring-zinc-400/35',
    tint: 'bg-zinc-200/15 dark:bg-zinc-800/25', // keep Open lighter
    stripe: 'before:bg-zinc-400',
    badge: 'bg-zinc-700/30 text-zinc-100 dark:bg-zinc-700/50 dark:text-zinc-50',
  },
};
