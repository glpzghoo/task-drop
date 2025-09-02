'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Loader2, Star, StarHalf, StarOff } from 'lucide-react';

import {
  TaskStatus,
  useUpdateTaskStatusBothSidesMutation,
} from '@/graphql/generated';
import CustomSnackBar from '@/lib/CustomSnackbar';
import { Button } from '@/components/ui/button';

type UserRole = 'poster' | 'helper';
const isActionable = (s: TaskStatus) =>
  s === TaskStatus.Assigned || s === TaskStatus.InProgress;
export default function DashboardChangeStatus({
  status,
  taskId,
  userRole = 'helper',
}: {
  status: TaskStatus;
  taskId: string;
  userRole?: UserRole;
}) {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(4.5);
  const [hover, setHover] = useState<number | null>(null);

  const [update, { loading }] = useUpdateTaskStatusBothSidesMutation({
    onCompleted: () =>
      setSnackbar({ message: 'Төлөв амжилттай өөрчлөгдлөө!', success: true }),
    onError: (e) => setSnackbar({ message: e.message, success: false }),
  });

  const isHelperCompleting =
    status === TaskStatus.InProgress && userRole === 'helper';

  const disabled =
    loading || (status !== TaskStatus.Assigned && !isHelperCompleting);

  const actionLabel =
    status === TaskStatus.Assigned
      ? 'Эхлүүлэх'
      : isHelperCompleting
        ? 'Дуусгах'
        : 'Дууссан';

  const handlePrimary = () => {
    if (status === TaskStatus.Assigned) {
      update({ variables: { taskId }, refetchQueries: ['GetUserTasks'] });
      return;
    }
    if (isHelperCompleting) {
      setOpen(true);
      return;
    }
  };
  const handleConfirmRating = async () => {
    if (!rating) return;
    await update({
      variables: { taskId, ratingGiven: rating },
      refetchQueries: ['GetUserTasks'],
    });
    setOpen(false);
  };
  const display = hover ?? rating;
  const handleStarPointer = (
    e: React.MouseEvent<HTMLButtonElement>,
    starIndex: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeftHalf = e.clientX - rect.left < rect.width / 2;
    const v = isLeftHalf ? starIndex - 0.5 : starIndex;
    setRating(v);
  };

  const handleStarHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    starIndex: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeftHalf = e.clientX - rect.left < rect.width / 2;
    const v = isLeftHalf ? starIndex - 0.5 : starIndex;
    setHover(v);
  };

  const clearHover = () => setHover(null);

  const starNode = (i: number) => {
    const filled = display >= i;
    const half = !filled && display >= i - 0.5;
    const Icon = filled ? Star : half ? StarHalf : StarOff;
    return (
      <button
        key={i}
        type="button"
        className="p-0.5"
        onMouseMove={(e) => handleStarHover(e, i)}
        onMouseLeave={clearHover}
        onClick={(e) => handleStarPointer(e, i)}
        aria-label={`${i} од`}
      >
        <Icon className="h-6 w-6 text-amber-500" />
      </button>
    );
  };

  return (
    <>
      {snackbar && (
        <CustomSnackBar
          value={snackbar.message}
          success={snackbar.success}
          onClose={() => setSnackbar(null)}
        />
      )}

      <Button
        variant="outline"
        onClick={handlePrimary}
        disabled={disabled}
        aria-busy={loading}
        className={
          status === TaskStatus.Assigned
            ? 'text-yellow-500'
            : status === TaskStatus.InProgress
              ? 'text-red-500'
              : ''
        }
        title={
          disabled && status === TaskStatus.InProgress && userRole !== 'helper'
            ? 'Зөвхөн гүйцэтгэгч дуусгах эрхтэй'
            : undefined
        }
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Өөрчилж байна...
          </>
        ) : isActionable(status) ? (
          <>Төлөв өөрчлөх → {actionLabel}</>
        ) : (
          <>
            {status === TaskStatus.Completed && 'Дууссан'}
            {status === TaskStatus.Cancelled && 'Цуцлагдсан'}
            {status === TaskStatus.Disputed && 'Маргаантай'}
            {status === TaskStatus.Open && 'Нээлттэй'}
            {status === TaskStatus.Overdue && 'Хугацаа хэтэрсэн'}
          </>
        )}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Захиалагчийг үнэлэх</DialogTitle>
            <DialogDescription>
              Ажлыг дуусгахын өмнө захиалагчийг 0.5 алхмаар үнэлнэ үү.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-3">
            <Label className="text-sm">Таны үнэлгээ</Label>
            <div className="flex items-center gap-2">
              <div className="flex">{[1, 2, 3, 4, 5].map(starNode)}</div>
              <span className="text-sm text-muted-foreground">
                {display.toFixed(1)} / 5.0
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={5}
              step={0.5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full"
              aria-label="Rating slider"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Болих
            </Button>
            <Button onClick={handleConfirmRating} disabled={loading || !rating}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Илгээж байна...
                </>
              ) : (
                'Үнэлгээ илгээж дуусгах'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
