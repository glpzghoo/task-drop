'use client';
import { TaskStatus } from '@/graphql/generated';
import { Button } from '@/components/ui/button';
import StartWorkButton from './actions/StartWorkButton';
import HelperMarkDoneDialog from './actions/HelperMarkDoneDialog';
import PosterConfirmAndRateDialog from './actions/PosterConfirmAndRateDialog';
import FinalizeIfSettledButton from './actions/FinalizeIfSettledButton';

type UserRole = 'poster' | 'helper';

export default function DashboardChangeStatus({
  status,
  taskId,
  userRole,
  markCompleted1,
  markCompleted2,
}: {
  status: TaskStatus;
  taskId: string;
  userRole: UserRole;
  markCompleted1?: boolean;
  markCompleted2?: boolean;
}) {
  if (userRole === 'helper' && status === TaskStatus.Assigned) {
    return <StartWorkButton taskId={taskId} />;
  }

  if (
    userRole === 'helper' &&
    status === TaskStatus.InProgress &&
    !markCompleted2
  ) {
    return <HelperMarkDoneDialog taskId={taskId} />;
  }

  if (
    userRole === 'poster' &&
    status === TaskStatus.InProgress &&
    !markCompleted1
  ) {
    return <PosterConfirmAndRateDialog taskId={taskId} />;
  }

  if (
    userRole === 'poster' &&
    status === TaskStatus.InProgress &&
    markCompleted1 &&
    markCompleted2
  ) {
    return <FinalizeIfSettledButton taskId={taskId} enabled />;
  }

  return (
    <Button variant="ghost" disabled>
      {status === TaskStatus.Completed && 'Дууссан'}
      {status === TaskStatus.Cancelled && 'Цуцлагдсан'}
      {status === TaskStatus.Disputed && 'Маргаантай'}
      {status === TaskStatus.Open && 'Нээлттэй'}
      {status === TaskStatus.Assigned && 'Хуваарилагдсан'}
      {status === TaskStatus.InProgress && 'Явцтай'}
      {status === TaskStatus.Overdue && 'Хугацаа хэтэрсэн'}
    </Button>
  );
}
