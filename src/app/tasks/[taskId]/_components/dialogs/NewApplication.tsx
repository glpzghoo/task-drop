import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Task, useNewTaskApplicationMutation } from '@/graphql/generated';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  NewApplicationSchema,
  NewApplicationType,
} from '../zod-schemas/new-application';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import CustomSnackBar from '@/lib/CustomSnackbar';

const NewTaskApplicationDialog = ({ task }: { task: Task }) => {
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [NewTaskApplication, { data, error }] = useNewTaskApplicationMutation();
  const [snackbar, setSnackbar] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const form = useForm<NewApplicationType>({
    resolver: zodResolver(NewApplicationSchema),
    defaultValues: {
      message: '',
      proposedStartTime: new Date().toISOString().slice(0, 16),
    },
  });

  const onSubmit = async (data: NewApplicationType) => {
    try {
      await NewTaskApplication({ variables: { ...data, taskId: task.id } });
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  useEffect(() => {
    if (data) {
      setSnackbar({ message: 'Амжилттай илгээлээ!', success: true });
    }
    if (error) {
      setSnackbar({
        message: 'Алдаа гарлаа: ' + error.message,
        success: false,
      });
    }
  }, [data, error]);

  return (
    <Dialog
      open={showApplicationDialog && task.status === 'open'}
      onOpenChange={setShowApplicationDialog}
    >
      {snackbar && (
        <CustomSnackBar
          value={snackbar.message}
          success={snackbar.success}
          onClose={() => setSnackbar(null)}
        />
      )}
      <DialogTrigger asChild>
        <Button
          disabled={task.status !== 'open'}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 rounded-md"
        >
          Даалгаварт хүсэлт илгээх
        </Button>
      </DialogTrigger>
      <DialogContent className=" border border-gray-800 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Ажилд хүсэлт илгээх
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {task.poster?.firstName || 'Захиалагч'}-д та энэ ажлыг хийхэд
            тохиромжтой гэдгээ тайлбарлан илгээнэ үү.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Таны мессеж</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Сайн байна уу! Би хамгийн сайн хйидэг ажил..."
                        className="bg-gray-800 border-gray-700 text-white mt-2 focus:ring-2 focus:ring-primary"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="proposedStartTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Хэзээнээс эхлэх боломжтой вэ?</FormLabel>
                    <FormControl>
                      <input
                        min={new Date().toISOString().slice(0, 16)}
                        type="datetime-local"
                        className="bg-gray-800 border-gray-700 text-white mt-2 rounded px-3 py-2"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {form.formState.isSubmitting ? 'Илгээж байна!' : 'Илгээх'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskApplicationDialog;
