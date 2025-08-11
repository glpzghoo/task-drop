'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { mapApplicationsToRecentTasks } from '@/lib/profile';
import { GetUserByIdResponse } from '@/graphql/generated';

const TasksTab = ({
  user,
  taskApplications,
}: {
  user: GetUserByIdResponse['user'];
  taskApplications: GetUserByIdResponse['taskApplications'];
}) => {
  const AllTasks = user.postedTasks;
  const tasks = mapApplicationsToRecentTasks(taskApplications, user);
  console.log(AllTasks);
  return (
    <TabsContent value="tasks" className="space-y-6">
      <Card className="bg-background text-foreground">
        <CardHeader>
          <CardTitle>Сүүлийн даалгаврууд</CardTitle>
          <CardDescription className="text-muted-foreground">
            {`${user.firstName}-ийн хамгийн сүүлд оролцсон даалгаврууд`}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-lg border border-border bg-muted/40"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-medium">{task.title}</h4>
                        {task.category && (
                          <Badge variant="secondary">{task.category}</Badge>
                        )}
                        {task.role === 'helper' ? (
                          <Badge
                            variant="outline"
                            className="text-blue-600 border-blue-600"
                          >
                            Гүйцэтгэгч
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-purple-600 border-purple-600"
                          >
                            Захиалагч
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>{task.date}</span>
                        {task.duration && <span>{task.duration}</span>}
                        {task.role === 'helper' && task.client && (
                          <span>{`Захиалагч: ${task.client}`}</span>
                        )}
                        {task.role === 'poster' && task.helper && (
                          <span>{`Гүйцэтгэгч: ${task.helper}`}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {[...Array(task.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                        <span className="text-sm text-muted-foreground">
                          ({task.rating}/5)
                        </span>
                      </div>

                      <p className="text-sm italic text-muted-foreground">
                        "{task.feedback}"
                      </p>
                    </div>

                    <div className="text-right whitespace-nowrap text-green-600 text-lg font-medium">
                      {task.payment}
                    </div>
                  </div>
                </div>
              ))
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
