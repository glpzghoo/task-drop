'use client';
import { Button } from '@/components/ui/button';
import { Loader2, Rocket } from 'lucide-react';
import CustomSnackBar from '@/lib/CustomSnackbar';
import { useState } from 'react';
import { useHelperStartTaskMutation } from '@/graphql/generated';

export default function StartWorkButton({ taskId }: { taskId: string }) {
  const [snack, setSnack] = useState<{
    message: string;
    success: boolean;
  } | null>(null);
  const [start, { loading }] = useHelperStartTaskMutation({
    onCompleted: () => setSnack({ message: 'Ажил эхэллээ.', success: true }),
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
        onClick={() => start({ variables: { taskId } })}
        disabled={loading}
        aria-busy={loading}
        className="text-yellow-500"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Rocket className="mr-2 h-4 w-4" />
        )}
        Эхлүүлэх
      </Button>
    </>
  );
}
