'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  MapPin,
  MessageSquare,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { Task, TaskStatus, useGetUserTasksQuery } from '@/graphql/generated';
import { getStatusConfig } from '@/app/browse/utils/helpers';
import { cn } from '@/lib/utils';
import { TaskStatusStepper } from '@/app/_components/Status_Stepper';
import { Button } from '@mui/material';
import DashboardTaskapplications from './DashboardTaskapplications';
import { timeUntilDue } from '@/app/tasks/[taskId]/utils/helpers';
import { getUserRole } from '@/lib/get-user-role';
import DashboardChangeStatus from './ChangeStatus';

export default function ActiveTasksTab() {
  const { data, loading, error } = useGetUserTasksQuery();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">
          Ачааллаж байна...
        </span>
      </div>
    );
  }

  if (error || !data?.getUserTasks) {
    return (
      <div className="flex items-center justify-center p-8 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive">
        Алдаа гарлаа. Дахин оролдоно уу.
      </div>
    );
  }

  const tasks = data?.getUserTasks as Task[];
  const userRole = getUserRole();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Идэвхтэй ажлууд
        </h2>
        <Button>
          <Link href="/browse">Даалгавар хайх</Link>
        </Button>
      </div>

      {tasks.length > 0 ? (
        <div className="grid gap-4">
          {tasks.map((task) => {
            const statusCfg = getStatusConfig(task.status);
            return (
              <Card key={task.id}>
                <CardContent className="pt-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{task.title}</h3>

                        <Badge
                          className={cn(
                            'text-[11px] px-3 py-1 rounded-full font-semibold',
                            task.status
                              ? statusCfg.color
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {statusCfg.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {task.address}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {timeUntilDue(task.dueDate)}
                        </div>
                        <span>Захиалагч: {task.poster.firstName}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600 mb-2">
                        ₮{task.paymentAmount}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outlined">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Зурвас
                        </Button>
                      </div>
                    </div>
                  </div>
                  <TaskStatusStepper status={task.status as TaskStatus} />
                  {userRole === 'helper' ? (
                    <DashboardChangeStatus
                      status={task.status as TaskStatus}
                      taskId={task.id}
                    />
                  ) : (
                    userRole === 'poster' && (
                      <DashboardTaskapplications taskId={task.id} />
                    )
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">
              Идэвхтэй даалгавар алга
            </h3>
            <p className="text-muted-foreground mb-4">
              Орлого олохын тулд боломжит ажлуудыг үзэх
            </p>
            <Button>
              <Link href="/browse">Даалгавар хайх</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
