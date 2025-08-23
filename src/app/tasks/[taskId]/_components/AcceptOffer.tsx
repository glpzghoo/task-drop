'use client';
import { Button } from '@/components/ui/button';
import { useUpdateTaskStatusBothSidesMutation } from '@/graphql/generated';
import CustomSnackBar from '@/lib/CustomSnackbar';
import { useEffect, useState } from 'react';

const AcceptOffer = ({ taskApplicationId }: { taskApplicationId: string }) => {
  const [UpdateTaskStatusBothSides, { loading, data, error }] =
    useUpdateTaskStatusBothSidesMutation();
  const [snackbar, setSnackbar] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const send = async () => {
    try {
      await UpdateTaskStatusBothSides({
        variables: { taskApplicationId },
        refetchQueries: ['getTaskById'],
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (data) {
      setSnackbar({ message: 'Амжилттай!', success: true });
    }
    if (error) {
      setSnackbar({ message: error.message, success: false });
    }
  }, [data, error]);

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
        disabled={loading}
        onClick={send}
        size="sm"
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Хүсэлт зөвшөөрөх
      </Button>
    </>
  );
};

export default AcceptOffer;
