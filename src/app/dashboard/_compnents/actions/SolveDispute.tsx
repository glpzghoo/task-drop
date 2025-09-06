'use client';

import { useCallback, useEffect, useState } from 'react';
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
import { useSolveDisputeMutation } from '@/graphql/generated';
import CustomSnackBar from '@/lib/CustomSnackbar';
import { CheckCircle2, Loader2 } from 'lucide-react';

type Props = {
  taskId: string;
  canSolve?: boolean;
  onSolved?: () => void;
};

export default function SolveDispute({
  taskId,
  canSolve = true,
  onSolved,
}: Props) {
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const [solve, { data, error, loading, reset }] = useSolveDisputeMutation({
    awaitRefetchQueries: true,
    optimisticResponse: { solveDispute: true },
    refetchQueries: ['GetUserTasks'],
  });

  const handleConfirm = useCallback(async () => {
    try {
      await solve({ variables: { taskId } });
    } catch (e: any) {
      setSnack({
        message: e?.message ?? 'Сүлжээний алдаа. Дахин оролдоно уу.',
        success: false,
      });
    }
  }, [solve, taskId]);

  useEffect(() => {
    if (data?.solveDispute) {
      setSnack({ message: 'Маргаан шийдэгдлээ.', success: true });
      setOpen(false);
      onSolved?.();
    }
  }, [data, onSolved]);

  useEffect(() => {
    if (error)
      setSnack({ message: error.message ?? 'Алдаа гарлаа.', success: false });
  }, [error]);

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
          <Button
            variant="ghost"
            disabled={!canSolve || loading}
            aria-busy={loading}
            className="justify-start"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="mr-2 h-4 w-4" />
            )}
            Маргаан шийдвэрлэгдсэн
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="sm:max-w-[480px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Маргааныг шийдвэрлэсэн үү?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Та өөрийн талын маргааныг <b>цуцлах</b> гэж байна. Нөгөө тал
              маргаантай хэвээр бол даалгавар “Маргаантай” төлөвт үлдэнэ. Хоёр
              тал хоёулаа цуцалбал төлөв буцаад хэвийн байдалд орно.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Буцах</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={loading}>
              {loading ? 'Баталгаажуулж байна…' : 'Тийм, шийдэгдсэн'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
