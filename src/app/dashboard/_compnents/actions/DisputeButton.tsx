'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import CustomSnackBar from '@/lib/CustomSnackbar';
import { useNewDisputeMutation } from '@/graphql/generated';
import { Gavel } from 'lucide-react';

type Props = { taskId: string };

const MIN_LEN = 10;
const MAX_LEN = 400;

export default function DisputeButton({ taskId }: Props) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [touched, setTouched] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const validationError = useMemo(() => {
    const t = reason.trim();
    if (!t) return 'Шалтгаан хоосон байна.';
    if (t.length < MIN_LEN)
      return `Хамгийн багадаа ${MIN_LEN} тэмдэгт оруулна уу.`;
    if (t.length > MAX_LEN)
      return `Хамгийн ихдээ ${MAX_LEN} тэмдэгт оруулна уу.`;
    return null;
  }, [reason]);

  const [dispute, { data, error, loading, reset }] = useNewDisputeMutation({
    awaitRefetchQueries: true,
    optimisticResponse: { newDispute: true },
    refetchQueries: ['GetUserTasks'],
  });

  const closeAndReset = useCallback(() => {
    setOpen(false);
    setReason('');
    setTouched(false);
    reset();
  }, [reset]);

  useEffect(() => {
    if (data?.newDispute) {
      setSnackbar({ message: 'Маргаан амжилттай илгээгдлээ.', success: true });
      closeAndReset();
    }
  }, [data, closeAndReset]);

  useEffect(() => {
    if (error) {
      setSnackbar({
        message: error.message ?? 'Алдаа гарлаа. Дахин оролдоно уу.',
        success: false,
      });
    }
  }, [error]);

  return (
    <>
      {snackbar && (
        <CustomSnackBar
          value={snackbar.message}
          success={snackbar.success}
          onClose={() => setSnackbar(null)}
        />
      )}

      <Dialog
        open={open}
        onOpenChange={(n) => (n ? setOpen(true) : closeAndReset())}
      >
        <DialogTrigger asChild>
          <Button variant="ghost">Маргаан үүсгэх</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[520px] w-[calc(100vw-2rem)] p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              <Gavel className="h-4 w-4" />
              Маргаан үүсгэх
            </DialogTitle>
            <DialogDescription className="text-xs">
              Маргааны шалтгаанаа тодорхой, богино байдлаар бичнэ үү.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-4 space-y-2">
            <Textarea
              autoFocus
              disabled={loading}
              value={reason}
              onChange={(e) => setReason(e.target.value.slice(0, MAX_LEN))}
              onBlur={() => setTouched(true)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                  e.preventDefault();
                  if (!validationError)
                    dispute({ variables: { reason: reason.trim(), taskId } });
                }
              }}
              placeholder="Жишээ: Гүйцэтгэлд дараах асуудлууд үүссэн..."
              aria-invalid={touched && !!validationError}
              className={`
                min-h-28 max-h-[45vh] resize-y
                ${touched && validationError ? 'border-destructive focus-visible:ring-destructive' : ''}
              `}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {touched && validationError
                  ? validationError
                  : '⌘/Ctrl + Enter илгээх'}
              </span>
              <span>
                {reason.length}/{MAX_LEN}
              </span>
            </div>
          </div>

          <DialogFooter className="px-6 py-3 border-t bg-muted/40 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={closeAndReset}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              Болих
            </Button>
            <Button
              onClick={() =>
                !validationError &&
                dispute({ variables: { reason: reason.trim(), taskId } })
              }
              disabled={!!validationError || loading}
              className="w-full sm:w-auto"
            >
              {loading ? 'Илгээж байна…' : 'Илгээх'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
