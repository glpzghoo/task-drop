'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import CustomSnackBar from '@/lib/CustomSnackbar';
import { useCancelTaskMutation, TaskStatus } from '@/graphql/generated';
import { XCircle, Loader2 } from 'lucide-react';

type Props = {
  taskId: string;
  /** Current task status; used to gate UI like the backend does */
  status?: TaskStatus;
  /** Whether current user is the poster (only poster can cancel) */
  isPoster?: boolean;
  /** Callback after successful cancel */
  onCancelled?: () => void;
};

export default function CancelButton({
  taskId,
  status,
  isPoster = true,
  onCancelled,
}: Props) {
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const blocked = useMemo(
    () =>
      new Set<TaskStatus>([
        TaskStatus.Completed,
        TaskStatus.Cancelled,
        TaskStatus.Disputed,
        TaskStatus.Overdue,
      ]),
    []
  );

  const canCancel = isPoster && (status ? !blocked.has(status) : true);

  const disabledReason = useMemo(() => {
    if (!isPoster) return 'Зөвхөн захиалагч цуцлах эрхтэй.';
    if (status && blocked.has(status)) {
      if (status === TaskStatus.Completed) return 'Аль хэдийн дууссан.';
      if (status === TaskStatus.Cancelled) return 'Аль хэдийн цуцлагдсан.';
      if (status === TaskStatus.Disputed)
        return 'Эхлээд маргааныг шийдвэрлэнэ үү.';
      if (status === TaskStatus.Overdue)
        return 'Хугацаа хэтэрсэн төлөвтэй байна.';
    }
    return '';
  }, [isPoster, status, blocked]);

  const [cancelTask, { data, error, loading, reset }] = useCancelTaskMutation({
    awaitRefetchQueries: true,
    optimisticResponse: { cancelTask: true },
    refetchQueries: ['GetUserTasks'],
  });

  const handleConfirm = useCallback(async () => {
    try {
      await cancelTask({ variables: { taskId } });
    } catch (e: any) {
      setSnack({
        message: e?.message ?? 'Сүлжээний алдаа. Дахин оролдоно уу.',
        success: false,
      });
    }
  }, [cancelTask, taskId]);

  useEffect(() => {
    if (data?.cancelTask) {
      setSnack({ message: 'Даалгавар цуцлагдлаа.', success: true });
      setOpen(false);
      onCancelled?.();
    }
  }, [data, onCancelled]);

  useEffect(() => {
    if (error)
      setSnack({ message: error.message ?? 'Алдаа гарлаа.', success: false });
  }, [error]);

  const triggerBtn = (
    <Button
      variant="ghost"
      disabled={!canCancel || loading}
      aria-busy={loading}
      className="justify-start"
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <XCircle className="mr-2 h-4 w-4" />
      )}
      Даалгавар цуцлах
    </Button>
  );

  return (
    <>
      {snack && (
        <CustomSnackBar
          value={snack.message}
          success={snack.success}
          onClose={() => setSnack(null)}
        />
      )}

      <AlertDialog
        open={open}
        onOpenChange={(next) => {
          if (!next) reset();
          setOpen(next);
        }}
      >
        <AlertDialogTrigger asChild>
          {disabledReason ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>{triggerBtn}</TooltipTrigger>
                <TooltipContent>{disabledReason}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            triggerBtn
          )}
        </AlertDialogTrigger>

        <AlertDialogContent className="sm:max-w-[480px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Даалгаврыг цуцлах уу?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Энэ үйлдлийг баталгаажуулснаар даалгаврын төлөв <b>“cancelled”</b>{' '}
              болно. Энэхүү үйлдлийг буцаах боломжгүй.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Буцах</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={loading}>
              {loading ? 'Цуцалж байна…' : 'Тийм, цуцлах'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
