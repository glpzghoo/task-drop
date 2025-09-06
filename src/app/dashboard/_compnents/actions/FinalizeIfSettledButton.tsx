'use client';
import { Button } from '@/components/ui/button';
import { useFinalizeIfSettledMutation } from '@/graphql/generated';
import CustomSnackBar from '@/lib/CustomSnackbar';
import { Loader2, FlagOffIcon } from 'lucide-react';
import { useState } from 'react';

export default function FinalizeIfSettledButton({
  taskId,
  enabled,
}: {
  taskId: string;
  enabled: boolean;
}) {
  const [snack, setSnack] = useState<{
    message: string;
    success: boolean;
  } | null>(null);
  const [finalize, { loading }] = useFinalizeIfSettledMutation({
    onCompleted: () =>
      setSnack({ message: 'Амжилттай дуусгалаа.', success: true }),
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
        onClick={() => finalize({ variables: { taskId } })}
        disabled={!enabled || loading}
        aria-busy={loading}
        variant="default"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FlagOffIcon className="mr-2 h-4 w-4" />
        )}
        Эцэслэх
      </Button>
    </>
  );
}
