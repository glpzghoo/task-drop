'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Gavel,
  XCircle,
  MapPin,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaskStatus, Task } from '@/graphql/generated';
import { formatDistanceToNowStrict, isBefore } from 'date-fns';
import { mn } from 'date-fns/locale';
import { UserRole } from '@/lib/get-user-role';
import {
  FLOW,
  InfoItem,
  mnt,
  RatingBlock,
  resolveFlow,
  statusMeta,
  toDate,
} from '../utils/helpers';
import { TaskStatusBadge } from '@/app/_components/TaskStatusBadge';

export function TaskStatusPanel({
  task,
  userRole,
}: {
  task: Task;
  userRole: UserRole;
}) {
  const meta = statusMeta[task.status];

  const flow = resolveFlow(task.status);
  const idx = FLOW.indexOf(flow);
  const pct = (idx / (FLOW.length - 1)) * 100;

  const due = toDate(task.dueDate);
  const completed = toDate(task.completedAt);

  const dueText = due
    ? isBefore(due, new Date())
      ? `Хугацаа хэтэрсэн • ${formatDistanceToNowStrict(due, { addSuffix: true, locale: mn })}`
      : formatDistanceToNowStrict(due, { addSuffix: true, locale: mn })
    : '—';

  const whoDisputed =
    task.status === TaskStatus.Disputed
      ? task.disputeReason1
        ? 'Захиалагч'
        : task.disputeReason2
          ? 'Гүйцэтгэгч'
          : 'Тодорхойгүй'
      : null;

  return (
    <Card className="border-muted">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Үйл явц</CardTitle>
          <TaskStatusBadge task={task} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Progress
            value={pct}
            className={cn(meta.tone === 'bad' && 'bg-destructive/20', 'h-2')}
          />
          <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
            <span>Нээлттэй</span>
            <span>Хуваарилсан</span>
            <span>Ажиллаж байна</span>
            <span>Дууссан</span>
          </div>
        </div>
        {task.status === TaskStatus.Disputed && (
          <Alert variant="destructive" className="border-destructive/40">
            <AlertTitle className="flex items-center gap-2">
              <Gavel className="h-4 w-4" /> Маргаан эхэлсэн — {whoDisputed}
            </AlertTitle>
            <AlertDescription className="mt-1 whitespace-pre-wrap">
              {task.disputeReason1 ||
                task.disputeReason2 ||
                'Шалтгаан оруулаагүй.'}
            </AlertDescription>
          </Alert>
        )}

        {task.status === TaskStatus.Overdue && (
          <Alert className="border-amber-400/40 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
            <AlertTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Хугацаа хэтэрсэн
            </AlertTitle>
            <AlertDescription className="mt-1">
              Дуусах хугацаа:{' '}
              {due
                ? formatDistanceToNowStrict(due, {
                    addSuffix: true,
                    locale: mn,
                  })
                : '—'}
            </AlertDescription>
          </Alert>
        )}

        {task.status === TaskStatus.Cancelled && (
          <Alert variant="destructive">
            <AlertTitle className="flex items-center gap-2">
              <XCircle className="h-4 w-4" /> Ажил цуцлагдсан
            </AlertTitle>
            <AlertDescription>
              Энэ ажлын гүйцэтгэл үргэлжлэхгүй.
            </AlertDescription>
          </Alert>
        )}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <InfoItem icon={Clock} label="Дуусах" value={dueText} />
          <InfoItem
            icon={User}
            label="Гүйцэтгэгч"
            value={
              task.assignee
                ? `${task.assignee.firstName} ${task.assignee.lastName}`
                : '—'
            }
          />
          <InfoItem
            icon={MapPin}
            label="Байршил"
            value={task.isRemote ? 'Алсаас' : task.address || '—'}
          />
          <InfoItem
            icon={CheckCircle2}
            label="Төлбөр"
            value={mnt(task.paymentAmount)}
          />
        </div>
        {task.status === TaskStatus.Completed && (
          <>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <RatingBlock
                title="Захиалагчийн үнэлгээ (helper → poster)"
                rating={task.posterRating}
                feedback={task.helperFeedback}
              />
              <RatingBlock
                title="Гүйцэтгэгчийн үнэлгээ (poster → helper)"
                rating={task.helperRating}
                feedback={task.posterFeedback}
              />
            </div>
            {completed && (
              <p className="text-xs text-muted-foreground">
                Дуусгасан:{' '}
                {formatDistanceToNowStrict(completed, {
                  addSuffix: true,
                  locale: mn,
                })}
              </p>
            )}
          </>
        )}
        <div className="text-[11px] text-muted-foreground">
          {userRole === 'helper' &&
            task.status === TaskStatus.InProgress &&
            'Дуусгахын өмнө захиалагчийг үнэлнэ үү.'}
          {userRole === 'poster' &&
            task.status === TaskStatus.Disputed &&
            'Маргааныг шийдсэний дараа төлвийг сэргээж болно.'}
        </div>
      </CardContent>
    </Card>
  );
}
