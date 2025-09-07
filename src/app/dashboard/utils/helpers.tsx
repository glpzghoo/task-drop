import { TaskStatus } from '@/graphql/generated';
import { format } from 'date-fns';
import { mn } from 'date-fns/locale';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Gavel,
  Star,
  StarHalf,
  User,
  XCircle,
  Star as StarOutline,
} from 'lucide-react';
import { JSX } from 'react';

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

export function fmtMNT(v?: number | null) {
  const n = typeof v === 'number' ? v : 0;
  return new Intl.NumberFormat('mn-MN', {
    style: 'currency',
    currency: 'MNT',
    maximumFractionDigits: 0,
  }).format(n);
}

export function fmtDate(d?: string | null) {
  if (!d) return '—';
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return '—';
  return format(dt, 'yyyy.MM.dd HH:mm', { locale: mn });
}

export function Stars({ value }: { value?: string | number | null }) {
  if (value == null) return null;
  const v = typeof value === 'string' ? parseFloat(value) : value;
  if (!Number.isFinite(v)) return null;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        if (v >= i)
          return (
            <Star key={i} className="h-4 w-4 text-amber-500 fill-current" />
          );
        if (v >= i - 0.5)
          return <StarHalf key={i} className="h-4 w-4 text-amber-500" />;
        return (
          <StarOutline key={i} className="h-4 w-4 text-muted-foreground" />
        );
      })}
      <span className="text-sm text-muted-foreground ml-1">
        ({v.toFixed(1)}/5)
      </span>
    </div>
  );
}

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

export function StatusBadge({ status }: { status: TaskStatus }) {
  const map: Record<
    TaskStatus,
    { label: string; cls: string; icon?: JSX.Element }
  > = {
    [TaskStatus.Completed]: {
      label: 'Дууссан',
      cls: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      icon: <CheckCircle2 className="h-3.5 w-3.5 mr-1" />,
    },
    [TaskStatus.Cancelled]: {
      label: 'Цуцлагдсан',
      cls: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    },
    [TaskStatus.Disputed]: {
      label: 'Маргаантай',
      cls: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      icon: <Gavel className="h-3.5 w-3.5 mr-1" />,
    },
    [TaskStatus.Overdue]: {
      label: 'Хугацаа хэтэрсэн',
      cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
      icon: <AlertTriangle className="h-3.5 w-3.5 mr-1" />,
    },
    [TaskStatus.Open]: {
      label: 'Нээлттэй',
      cls: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300',
    },
    [TaskStatus.Assigned]: {
      label: 'Хуваарилагдсан',
      cls: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300',
    },
    [TaskStatus.InProgress]: {
      label: 'Явцтай',
      cls: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300',
    },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${s.cls}`}
    >
      {s.icon}
      {s.label}
    </span>
  );
}
