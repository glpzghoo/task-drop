import Applications from '@/app/_components/Applications';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TaskApplications, useGetApplicationsQuery } from '@/graphql/generated';
import { Button } from '@mui/material';

const DashboardTaskapplications = ({ taskId }: { taskId: string }) => {
  const { data } = useGetApplicationsQuery({ variables: { taskId } });

  const taskApplications = data?.getApplications as TaskApplications[];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Хүсэлтүүдийг харах</Button>
      </DialogTrigger>
      <DialogContent className=" w-10/12">
        <DialogTitle>Ирсэн хүсэлтүүд</DialogTitle>
        {taskApplications
          ? taskApplications.length > 0
            ? taskApplications.map((app: TaskApplications) => (
                <Applications application={app} key={app.id} />
              ))
            : 'Хүсэлт алга!'
          : 'Алдаа гарлаа'}
      </DialogContent>
    </Dialog>
  );
};

export default DashboardTaskapplications;
