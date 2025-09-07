'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { TaskStatus, Task } from '@/graphql/generated';
import { formatDistanceToNowStrict, isBefore } from 'date-fns';
import { mn } from 'date-fns/locale';
import { UserRole } from '@/lib/get-user-role';
import { InfoItem, mnt, RatingBlock, toDate } from '../utils/helpers';
import { TaskStatusBadge } from '@/app/_components/TaskStatusBadge';
import DisputeButton from './actions/DisputeButton';
import CancelButton from './actions/CancelButton';
import OverdueButton from './actions/OverdueButton';
import { TaskStatusStepper } from '@/app/_components/Status_Stepper';
import SolveDispute from './actions/SolveDispute';
import { getUserRolePronoun } from '@/app/_components/utils/helpers';

export function TaskStatusPanel({
  task,
  userRole,
}: {
  task: Task;
  userRole: UserRole;
}) {
  const due = toDate(task.dueDate);
  const completed = toDate(task.completedAt);

  const dueText = useMemo(() => {
    if (!due) return '—';
    const base = formatDistanceToNowStrict(due, {
      addSuffix: true,
      locale: mn,
    });
    return isBefore(due, new Date()) ? `Хугацаа хэтэрсэн • ${base}` : base;
  }, [due]);

  const whoDisputed = useMemo(() => {
    if (task.status !== TaskStatus.Disputed) return null;
    const poster = Boolean(task.disputeReason1?.trim());
    const helper = Boolean(task.disputeReason2?.trim());
    if (poster && helper) return 'Хоёулаа';
    if (poster) return 'Захиалагч';
    if (helper) return 'Гүйцэтгэгч';
    return 'Тодорхойгүй';
  }, [task.status, task.disputeReason1, task.disputeReason2]);

  const assigneeName = task.assignee
    ? `${task.assignee.firstName ?? ''} ${task.assignee.lastName ?? ''}`.trim() ||
      '—'
    : '—';

  const locationText = task.isRemote ? 'Алсаас' : task.address || '—';

  return (
    <Card className="border-muted">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Үйл явц</CardTitle>
          <TaskStatusBadge task={task} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <TaskStatusStepper status={task.status} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <InfoItem icon={Clock} label="Дуусах" value={dueText} />
          <InfoItem icon={User} label="Гүйцэтгэгч" value={assigneeName} />
          <InfoItem icon={MapPin} label="Байршил" value={locationText} />
          <InfoItem
            icon={CheckCircle2}
            label="Төлбөр"
            value={mnt(task.paymentAmount)}
          />
        </div>
        <div className="space-y-3">
          {task.status === TaskStatus.Disputed && (
            <Alert variant="destructive" className="border-destructive/40">
              <AlertTitle className=" flex justify-between">
                <div className="flex items-center gap-2">
                  <Gavel className="h-4 w-4" /> Маргаан эхэлсэн — {whoDisputed}
                </div>
                <SolveDispute taskId={task.id} />
              </AlertTitle>
              <AlertDescription className="mt-1 whitespace-pre-wrap">
                {task.disputeReason1?.trim() ||
                  task.disputeReason2?.trim() ||
                  'Маргааны шалтгаан оруулаагүй.'}
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
        </div>

        <div className="flex justify-center gap-4">
          <div>
            {task.status !== TaskStatus.Disputed ? (
              <DisputeButton taskId={task.id} />
            ) : (
              <div className="w-full rounded-md border border-transparent opacity-0 pointer-events-none" />
            )}
          </div>

          <div>
            {userRole === 'poster' && task.status !== TaskStatus.Overdue ? (
              <OverdueButton taskId={task.id} />
            ) : (
              <div className="w-full rounded-md border border-transparent opacity-0 pointer-events-none" />
            )}
          </div>

          <div>
            {userRole === 'poster' && task.status !== TaskStatus.Cancelled ? (
              <CancelButton taskId={task.id} />
            ) : (
              <div className="w-full rounded-md border border-transparent opacity-0 pointer-events-none" />
            )}
          </div>
        </div>

        {task.status === TaskStatus.Completed && (
          <>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <RatingBlock
                title={`Захиалагчийн үнэлгээ (${getUserRolePronoun('helper')} → ${getUserRolePronoun('poster')})`}
                rating={task.posterRating}
                feedback={task.helperFeedback}
              />
              <RatingBlock
                title={`Гүйцэтгэгчийн үнэлгээ (${getUserRolePronoun('poster')} → ${getUserRolePronoun('helper')})`}
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
      </CardContent>
    </Card>
  );
}
