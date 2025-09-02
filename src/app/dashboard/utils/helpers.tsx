import { TaskStatus } from '@/graphql/generated';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Gavel,
  Star,
  User,
  XCircle,
} from 'lucide-react';

export const statusMeta: Record<
  TaskStatus,
  {
    label: string;
    tone: 'default' | 'warn' | 'bad' | 'good';
    icon: React.ElementType;
  }
> = {
  [TaskStatus.Open]: { label: 'Нээлттэй', tone: 'default', icon: Clock },
  [TaskStatus.Assigned]: { label: 'Хуваарилсан', tone: 'default', icon: User },
  [TaskStatus.InProgress]: {
    label: 'Хийгдэж байна',
    tone: 'warn',
    icon: Clock,
  },
  [TaskStatus.Completed]: {
    label: 'Дууссан',
    tone: 'good',
    icon: CheckCircle2,
  },
  [TaskStatus.Cancelled]: { label: 'Цуцлагдсан', tone: 'bad', icon: XCircle },
  [TaskStatus.Disputed]: { label: 'Маргаантай', tone: 'bad', icon: Gavel },
  [TaskStatus.Overdue]: {
    label: 'Хугацаа хэтэрсэн',
    tone: 'warn',
    icon: AlertTriangle,
  },
};

export const toDate = (v?: string | null) => {
  if (!v) return null;
  const num = Number(v);
  const d =
    Number.isFinite(num) && v.trim().length <= 13 ? new Date(num) : new Date(v);
  return isNaN(d.getTime()) ? null : d;
};

export const mnt = (n?: number | null) =>
  n == null ? '—' : `₮${Intl.NumberFormat('mn-MN').format(n)}`;
export const FLOW = [
  TaskStatus.Open,
  TaskStatus.Assigned,
  TaskStatus.InProgress,
  TaskStatus.Completed,
] as const;
type Flow = (typeof FLOW)[number];

export const resolveFlow = (s: TaskStatus): Flow =>
  s === TaskStatus.Open ||
  s === TaskStatus.Assigned ||
  s === TaskStatus.InProgress ||
  s === TaskStatus.Completed
    ? s
    : TaskStatus.InProgress;

export function RatingBlock({
  title,
  rating,
  feedback,
}: {
  title: string;
  rating?: number | null;
  feedback?: string | null;
}) {
  return (
    <div className="rounded-md border p-3">
      <div className="mb-1 text-xs text-muted-foreground">{title}</div>
      {rating ? (
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-semibold">{rating.toFixed(1)} / 5</span>
        </div>
      ) : (
        <div className="text-xs text-muted-foreground">Үнэлгээ алга</div>
      )}
      {feedback && <p className="mt-2 text-sm">{feedback}</p>}
    </div>
  );
}

export function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border bg-card p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}
