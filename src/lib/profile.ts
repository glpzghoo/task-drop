import { TaskApplications, Users } from '@/graphql/generated';
import { formatDistanceToNow } from 'date-fns';
import { mn } from 'date-fns/locale';

export function calculateCompletionRate(user: Users): number {
  const completed = user.tasksCompleted ?? 0;
  const posted = user.tasksPosted ?? 0;
  if (posted === 0) return 0;
  return Math.round((completed / posted) * 100);
}

export function calculateResponseTime(
  apps?: TaskApplications[]
): string | null {
  if (!apps) return null;
  const deltas = apps
    .filter((a) => a.appliedAt && a.respondedAt)
    .map(
      (a) =>
        new Date(a.respondedAt as string).getTime() -
        new Date(a.appliedAt as string).getTime()
    );
  if (deltas.length === 0) return null;
  const avgMs = deltas.reduce((acc, cur) => acc + cur, 0) / deltas.length;
  const minutes = Math.round(avgMs / 60000);
  if (minutes < 60) return `${minutes} мин`;
  const hours = (minutes / 60).toFixed(1);
  return `${hours} цаг`;
}

export type RecentTask = {
  id: string;
  title: string;
  role: 'helper' | 'poster';
  date: string;
  payment: string;
  rating: number;
  client?: string;
  helper?: string;
  feedback?: string;
  duration?: string;
  category?: string;
};

export function mapApplicationsToRecentTasks(
  apps: TaskApplications[],
  user: Users
): RecentTask[] {
  console.log('Mapping applications to recent tasks:', apps, user);
  if (apps.length === 0) return [];
  return apps.map((app) => {
    const t = app.task;
    const role = t.posterId === user.id ? 'poster' : 'helper';
    const payment =
      t.paymentAmount !== undefined && t.paymentAmount !== null
        ? `$${t.paymentAmount}`
        : '';
    const rating =
      role === 'helper' ? (t.posterRating ?? 0) : (t.helperRating ?? 0);
    const feedback =
      role === 'helper' ? t.posterFeedback || '' : t.helperFeedback || '';
    const client =
      role === 'helper'
        ? `${t.poster.firstName} ${t.poster.lastName}`
        : undefined;
    const helper =
      role === 'poster'
        ? `${app.helper.firstName} ${app.helper.lastName}`
        : undefined;
    const date = t.createdAt
      ? formatDistanceToNow(new Date(Number(t.createdAt)), {
          locale: mn,
          addSuffix: true,
        })
      : '';
    return {
      id: t.id,
      title: t.title,
      role,
      date,
      payment,
      rating,
      client,
      helper,
      feedback,
      duration: t.estimatedDuration ? `${t.estimatedDuration} мин` : undefined,
      category: t.categoryId ? String(t.categoryId) : undefined,
    };
  });
}

export type Review = {
  id: string;
  rating: number;
  date: string;
  reviewer: string;
  task: string;
  comment: string;
  helpful?: number;
};

export function mapApplicationsToReviews(
  apps: TaskApplications[],
  user: Users
): Review[] {
  return apps
    .map((app) => {
      const t = app.task;
      const isHelper = t.posterId !== user.id;
      const rating = isHelper ? t.posterRating : t.helperRating;
      const comment = isHelper ? t.posterFeedback : t.helperFeedback;
      if (rating == null && !comment) return null;
      const reviewer = isHelper
        ? `${t.poster.firstName} ${t.poster.lastName}`
        : `${app.helper.firstName} ${app.helper.lastName}`;
      const date = t.createdAt
        ? formatDistanceToNow(new Date(t.createdAt), {
            locale: mn,
            addSuffix: true,
          })
        : '';
      return {
        id: app.id,
        rating: rating ?? 0,
        date,
        reviewer,
        task: t.title,
        comment: comment || '',
        helpful: 0,
      } as Review;
    })
    .filter((r): r is Review => r !== null);
}

export function getSkills(user: Users): string[] {
  return (user.preferredCategories ?? []).filter(
    (c): c is string => c !== null
  );
}
