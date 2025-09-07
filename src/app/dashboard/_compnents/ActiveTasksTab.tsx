'use client';

import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Task, useGetUserTasksQuery } from '@/graphql/generated';
import { TaskStatusStepper } from '@/app/_components/Status_Stepper';
import { Button } from '@mui/material';
import DashboardTaskapplications from './DashboardTaskapplications';
import DashboardChangeStatus from './ChangeStatus';
import { TaskStatusPanel } from './TaskStatusPanel';
import { UserRole } from '@/lib/get-user-role';

export default function ActiveTasksTab({ userRole }: { userRole: UserRole }) {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Идэвхтэй даалгаврууд
        </h2>
        <Button>
          <Link href="/browse">Даалгавар хайх</Link>
        </Button>
      </div>

      {tasks.length > 0 ? (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="pt-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{task.title}</h3>
                    </div>
                  </div>
                </div>
                <div>
                  <TaskStatusPanel task={task} userRole={userRole} />
                </div>
                {(userRole == 'poster' || userRole === 'helper') && (
                  <DashboardChangeStatus
                    status={task.status}
                    taskId={task.id}
                    userRole={userRole}
                    markCompleted1={task.markCompleted1}
                    markCompleted2={task.markCompleted2}
                  />
                )}
                {userRole === 'poster' && task.status === 'open' && (
                  <>
                    <TaskStatusStepper status={task.status} />
                    <DashboardTaskapplications taskId={task.id} />
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">
              Идэвхтэй даалгавар алга
            </h3>
            <p className="text-muted-foreground mb-4">
              Орлого олохын тулд боломжит даалгавруудыг үзэх
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
