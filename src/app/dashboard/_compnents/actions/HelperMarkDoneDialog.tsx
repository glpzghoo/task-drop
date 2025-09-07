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
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useHelperMarkDoneMutation } from '@/graphql/generated';
import CustomSnackBar from '@/lib/CustomSnackbar';
import StarRating from '@/app/_components/StarRating';
import { Textarea } from '@/components/ui/textarea';

export default function HelperMarkDoneDialog({ taskId }: { taskId: string }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(4.5);
  const [feedback, setFeedback] = useState('');
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
              Ажлыг дуусгахын өмнө үнэлнэ үү.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-3">
            <Label className="text-sm">Таны үнэлгээ</Label>
            <div className=" bg-secondary flex justify-center gap-4">
              <StarRating rating={rating} setRating={setRating} />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setRating(5)}
              >
                5.0 хурдан
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRating(4.5)}
              >
                4.5
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRating(3.0)}
              >
                3.0
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRating(0.5)}
              >
                0.5
              </Button>
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
                markDone({
                  variables: { taskId, ratingGiven: rating, feedback },
                })
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
