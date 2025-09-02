'use client';
import { Button } from '@/components/ui/button';
import { useAcceptOfferMutation } from '@/graphql/generated';
import CustomSnackBar from '@/lib/CustomSnackbar';
import { useEffect, useState } from 'react';

const AcceptOffer = ({ taskApplicationId }: { taskApplicationId: string }) => {
  const [AcceptOffer, { loading, data, error }] = useAcceptOfferMutation();
  const [snackbar, setSnackbar] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const send = async () => {
    try {
      await AcceptOffer({
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
