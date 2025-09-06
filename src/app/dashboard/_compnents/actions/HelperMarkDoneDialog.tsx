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
import { Loader2, Star, StarHalf, StarOff, CheckCircle2 } from 'lucide-react';
import { useHelperMarkDoneMutation } from '@/graphql/generated';
import CustomSnackBar from '@/lib/CustomSnackbar';

export default function HelperMarkDoneDialog({ taskId }: { taskId: string }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(4.5);
  const [hover, setHover] = useState<number | null>(null);
  const [snack, setSnack] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const [markDone, { loading }] = useHelperMarkDoneMutation({
    onCompleted: () => {
      setSnack({ message: 'Дууссанд тооцлоо.', success: true });
      setOpen(false);
    },
    onError: (e) => setSnack({ message: e.message, success: false }),
    awaitRefetchQueries: true,
    refetchQueries: ['GetUserTasks'],
  });

  const display = hover ?? rating;
  const starNode = (i: number) => {
    const filled = display >= i;
    const half = !filled && display >= i - 0.5;
    const Icon = filled ? Star : half ? StarHalf : StarOff;
    return (
      <button
        key={i}
        type="button"
        className="p-0.5"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setHover(e.clientX - r.left < r.width / 2 ? i - 0.5 : i);
        }}
        onMouseLeave={() => setHover(null)}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setRating(e.clientX - r.left < r.width / 2 ? i - 0.5 : i);
        }}
        aria-label={`${i} од`}
      >
        <Icon className="h-6 w-6 text-amber-500" />
      </button>
    );
  };

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
        variant="ghost"
        onClick={() => setOpen(true)}
        className="text-red-500"
      >
        <CheckCircle2 className="mr-2 h-4 w-4" /> Дуусгах
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Захиалагчийг үнэлэх</DialogTitle>
            <DialogDescription>
              Ажлыг дуусгахын өмнө 0.5 алхмаар үнэлнэ үү (сонголттой).
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
            <Button
              onClick={() =>
                markDone({ variables: { taskId, ratingGiven: rating } })
              }
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Илгээж
                  байна…
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
