'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

import { Task, TaskStatus, useTaskHistoryQuery } from '@/graphql/generated';

import {
  MapPin,
  Filter,
  ChevronDown,
  ChevronUp,
  Calendar,
  Coins,
  Tag,
  Users as UsersIcon,
} from 'lucide-react';

import { TaskStatusBadge } from '@/app/_components/TaskStatusBadge';
import { fmtDate, fmtMNT, Stars, StatusBadge } from '../utils/helpers';
import { getUserRolePronoun } from '@/app/_components/utils/helpers';

type SortBy = 'newest' | 'oldest' | 'pay' | 'rating';
const historyStatuses = [
  TaskStatus.Completed,
  TaskStatus.Cancelled,
  TaskStatus.Disputed,
  TaskStatus.Overdue,
] as const;

export default function HistoryTab() {
  const { data, loading, error } = useTaskHistoryQuery();

  const [query, setQuery] = useState('');
  const [enabled, setEnabled] = useState<Record<TaskStatus, boolean>>({
    [TaskStatus.Completed]: true,
    [TaskStatus.Cancelled]: true,
    [TaskStatus.Disputed]: true,
    [TaskStatus.Overdue]: true,
    [TaskStatus.Open]: false,
    [TaskStatus.Assigned]: false,
    [TaskStatus.InProgress]: false,
  });
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const all = (data?.taskHistory as Task[]) ?? [];

  const allowed = useMemo(() => {
    const s = new Set<TaskStatus>();
    historyStatuses.forEach((st) => {
      if (enabled[st]) s.add(st);
    });
    return s;
  }, [enabled]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const byText = (t: Task) =>
      !q ||
      t.title.toLowerCase().includes(q) ||
      (t.description?.toLowerCase()?.includes(q) ?? false) ||
      (t.address?.toLowerCase()?.includes(q) ?? false);

    const ratingOfHelper = (t: Task) => t.helperRating ?? 0;

    const rows = all
      .filter(
        (t) =>
          allowed.has(t.status) && byText(t) && ratingOfHelper(t) >= minRating
      )
      .sort((a, b) => {
        if (sortBy === 'pay')
          return (b.paymentAmount ?? 0) - (a.paymentAmount ?? 0);
        if (sortBy === 'rating')
          return (b.helperRating ?? 0) - (a.helperRating ?? 0);
        const ad = new Date(
          a.completedAt ?? a.updatedAt ?? a.createdAt
        ).getTime();
        const bd = new Date(
          b.completedAt ?? b.updatedAt ?? b.createdAt
        ).getTime();
        return sortBy === 'oldest' ? ad - bd : bd - ad;
      });

    return rows;
  }, [all, allowed, query, minRating, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const toggleStatus = (s: TaskStatus) =>
    setEnabled((prev) => ({ ...prev, [s]: !prev[s] }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-foreground">Ажлын түүх</h2>

        <div className="flex flex-wrap gap-2">
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Гарчиг, тайлбар, байршлаар хайх…"
            className="w-64"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="inline-flex items-center gap-2"
              >
                <Filter className="h-4 w-4" /> Шүүлтүүр
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Төлвүүд</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {historyStatuses.map((s) => (
                <DropdownMenuCheckboxItem
                  key={s}
                  checked={enabled[s]}
                  onCheckedChange={() => {
                    toggleStatus(s);
                    setPage(1);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <StatusBadge status={s} />
                  </div>
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Хамгийн бага үнэлгээ</DropdownMenuLabel>
              <div className="px-3 py-2">
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.5}
                  value={minRating}
                  onChange={(e) => {
                    setMinRating(Number(e.target.value));
                    setPage(1);
                  }}
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {minRating.toFixed(1)} / 5.0
                </div>
              </div>

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Эрэмбэлэлт</DropdownMenuLabel>
              <div className="px-3 py-2 grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant={sortBy === 'newest' ? 'default' : 'outline'}
                  onClick={() => setSortBy('newest')}
                >
                  Шинэ
                </Button>
                <Button
                  size="sm"
                  variant={sortBy === 'oldest' ? 'default' : 'outline'}
                  onClick={() => setSortBy('oldest')}
                >
                  Хуучин
                </Button>
                <Button
                  size="sm"
                  variant={sortBy === 'pay' ? 'default' : 'outline'}
                  onClick={() => setSortBy('pay')}
                >
                  Төлбөр
                </Button>
                <Button
                  size="sm"
                  variant={sortBy === 'rating' ? 'default' : 'outline'}
                  onClick={() => setSortBy('rating')}
                >
                  Үнэлгээ
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {loading && (
        <div className="text-sm text-muted-foreground">Уншиж байна…</div>
      )}
      {error && !loading && (
        <div className="text-sm text-destructive">Алдаа гарлаа.</div>
      )}

      {!loading && !error && (
        <>
          <div className="grid gap-4">
            {pageRows.map((task) => {
              const posterName =
                [task.poster?.firstName, task.poster?.lastName]
                  .filter(Boolean)
                  .join(' ') || '—';
              const helperName =
                [task.assignee?.firstName, task.assignee?.lastName]
                  .filter(Boolean)
                  .join(' ') || '—';
              const posterToHelper = task.helperRating;
              const helperToPoster = task.posterRating;

              return (
                <Collapsible key={task.id} className="border rounded-lg">
                  <div className="p-4 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <TaskStatusBadge task={task} />
                        {task.isUrgent && (
                          <Badge
                            variant="secondary"
                            className="text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-200"
                          >
                            <Tag className="h-3.5 w-3.5 mr-1" /> Яаралтай
                          </Badge>
                        )}
                        {task.isRemote ? (
                          <Badge variant="outline">Алсаас</Badge>
                        ) : null}
                      </div>

                      <h3 className="font-medium truncate">{task.title}</h3>
                      <p className="text-xs text-muted-foreground truncate">
                        <Calendar className="inline h-3.5 w-3.5 mr-1" />
                        {fmtDate(
                          task.completedAt ?? task.updatedAt ?? task.createdAt
                        )}{' '}
                        •
                        <UsersIcon className="inline h-3.5 w-3.5 mx-1" />
                        Захиалагч: {posterName}
                      </p>

                      <div className="mt-2 flex items-center gap-3">
                        {posterToHelper != null && (
                          <Stars value={posterToHelper} />
                        )}
                        <Separator orientation="vertical" className="h-4" />
                        <Coins className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">
                          {fmtMNT(task.paymentAmount)}
                        </span>
                      </div>
                    </div>

                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="shrink-0">
                        Дэлгэрэнгүй
                        <ChevronDown className="ml-1 h-4 w-4 data-[state=open]:hidden" />
                        <ChevronUp className="ml-1 h-4 w-4 hidden data-[state=open]:block" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent>
                    <Separator />
                    <Card>
                      <CardContent className="p-4 grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Тайлбар:</span>{' '}
                            <span className="text-muted-foreground">
                              {task.description || '—'}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Шаардлага:</span>{' '}
                            <span className="text-muted-foreground">
                              {task.requirements || '—'}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Гүйцэтгэгч:</span>{' '}
                            <span className="text-muted-foreground">
                              {helperName}
                            </span>
                          </div>
                          <div className="text-sm flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {task.isRemote ? (
                              <span className="text-muted-foreground">
                                Алсаас
                              </span>
                            ) : task.latitude != null &&
                              task.longitude != null ? (
                              <a
                                className="text-blue-600 hover:underline"
                                href={`https://maps.google.com/?q=${task.latitude},${task.longitude}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {task.address || 'Газрын зураг нээх'}
                              </a>
                            ) : (
                              <span className="text-muted-foreground">
                                {task.address || '—'}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium mb-1">
                              Захиалагчийн үнэлгээ (
                              {getUserRolePronoun('poster')} →{' '}
                              {getUserRolePronoun('helper')})
                            </div>
                            {posterToHelper != null ? (
                              <Stars value={posterToHelper} />
                            ) : (
                              <div className="text-xs text-muted-foreground">
                                Үнэлгээгүй
                              </div>
                            )}
                            <div className="text-sm italic text-foreground mt-1">
                              {task.posterFeedback ? (
                                `“${task.posterFeedback}”`
                              ) : (
                                <span className="text-muted-foreground">
                                  Сэтгэгдэл үлдээгээгүй
                                </span>
                              )}
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <div className="text-sm font-medium mb-1">
                              Гүйцэтгэгчийн үнэлгээ (
                              {getUserRolePronoun('helper')} →{' '}
                              {getUserRolePronoun('poster')})
                            </div>
                            {helperToPoster != null ? (
                              <Stars value={helperToPoster} />
                            ) : (
                              <div className="text-xs text-muted-foreground">
                                Үнэлгээгүй
                              </div>
                            )}
                            <div className="text-sm italic text-foreground mt-1">
                              {task.helperFeedback ? (
                                `“${task.helperFeedback}”`
                              ) : (
                                <span className="text-muted-foreground">
                                  Сэтгэгдэл үлдээгээгүй
                                </span>
                              )}
                            </div>
                          </div>

                          {(task.disputeReason1 || task.disputeReason2) && (
                            <>
                              <Separator />
                              <div className="text-sm">
                                <span className="font-medium">
                                  Маргааны шалтгаан:
                                </span>
                                <div className="mt-1 whitespace-pre-wrap text-muted-foreground">
                                  {task.disputeReason1 || task.disputeReason2}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Нийт: {filtered.length} • Хуудас {page}/{totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Өмнөх
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Дараах
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
