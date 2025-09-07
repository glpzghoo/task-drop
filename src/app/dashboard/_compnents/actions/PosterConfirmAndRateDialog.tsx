'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Loader2, BadgeCheck } from 'lucide-react';
import { usePosterConfirmAndRateMutation } from '@/graphql/generated';
import CustomSnackBar from '@/lib/CustomSnackbar';
import { Textarea } from '@/components/ui/textarea';

export default function PosterConfirmAndRateDialog({
  taskId,
}: {
  taskId: string;
}) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [snack, setSnack] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const [confirmRate, { loading }] = usePosterConfirmAndRateMutation({
    onCompleted: () => {
      setSnack({ message: 'Баталгаажуулж үнэллээ.', success: true });
      setOpen(false);
    },
    onError: (e) => setSnack({ message: e.message, success: false }),
    awaitRefetchQueries: true,
    refetchQueries: ['GetUserTasks'],
  });

  return (
    <>
      {snack && (
        <CustomSnackBar
          value={snack.message}
          success={snack.success}
          onClose={() => setSnack(null)}
        />
      )}

      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="text-green-600"
      >
        <BadgeCheck className="mr-2 h-4 w-4" /> Баталгаажуулж үнэлэх
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Гүйцэтгэгчийг үнэлэх (заавал)</DialogTitle>
            <DialogDescription>
              Хэр сэтгэл хангалуун байна вэ?
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-2">
            <Label className="text-sm">Таны үнэлгээ</Label>
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
            <div className="text-sm text-muted-foreground">
              {rating.toFixed(1)} / 5.0
            </div>
            <Textarea
              onChange={(e) => setFeedback(e.target.value)}
              disabled={loading}
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
            <Button
              onClick={() =>
                confirmRate({
                  variables: { taskId, ratingGiven: rating, feedback },
                })
              }
              disabled={loading || !rating}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Илгээж
                  байна…
                </>
              ) : (
                'Илгээх'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
