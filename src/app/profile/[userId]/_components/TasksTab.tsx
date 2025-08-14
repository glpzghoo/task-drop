import { TabsContent } from '@/components/ui/tabs';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { Task, Users } from '@/graphql/generated';
import {
  formatDuration,
  formatMNT,
  formatRelative,
  isTask,
} from '../utils/helpers';
import { toDate } from 'date-fns';

const TasksTab = ({ user }: { user: Users }) => {
  const raw = user.postedTasks;

  const tasks: Task[] = (raw ?? []).filter(isTask).sort((a, b) => {
    const da = toDate(a.createdAt)?.getTime() ?? 0;
    const db = toDate(b.createdAt)?.getTime() ?? 0;
    return db - da;
  });

  return (
    <TabsContent value="tasks" className="space-y-6">
      <Card className="bg-background text-foreground">
        <CardHeader>
          <CardTitle>Сүүлийн даалгаврууд</CardTitle>
          <CardDescription className="text-muted-foreground">
            {`${user?.firstName ?? 'Хэрэглэгч'}-ийн хамгийн сүүлд нийтэлсэн даалгаврууд`}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task) => {
                const created = toDate(Number(task.createdAt));
                return (
                  <div
                    key={task.id}
                    className="p-4 rounded-lg border border-border bg-muted/40 hover:bg-muted/60 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-medium truncate">{task.title}</h4>
                          {task.isUrgent && (
                            <Badge variant="destructive">Яаралтай</Badge>
                          )}
                          {task.isRemote && (
                            <Badge variant="outline">Цахимаар</Badge>
                          )}
                        </div>

                        {task.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {task.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>{formatRelative(new Date(created))}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatDuration(task.estimatedDuration)}
                          </span>
                          {task.address && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {task.address}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-end justify-between md:justify-end gap-3 md:flex-col md:items-end">
                        <div className="text-right whitespace-nowrap text-green-600 text-lg font-semibold">
                          {formatMNT(task.paymentAmount)}
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link
                            href={`/tasks/${task.id}`}
                            className="inline-flex items-center gap-1"
                          >
                            Дэлгэрэнгүй <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-muted-foreground text-sm">Даалгавар алга.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default TasksTab;
