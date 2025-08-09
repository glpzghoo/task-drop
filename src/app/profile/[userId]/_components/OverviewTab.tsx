'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { TaskApplications, Users } from '@/graphql/generated';
import {
  calculateCompletionRate,
  calculateResponseTime,
  mapApplicationsToRecentTasks,
} from '@/lib/profile';
import { useParams } from 'next/navigation';
import EditBio from './EditBio';

const OverviewTab = ({
  user,
  taskApplications,
}: {
  user: Users;
  taskApplications: TaskApplications[];
}) => {
  const params = useParams();
  const { userId } = params as { userId: string };
  const currentUserId = localStorage.getItem('userId');
  const owner = userId === currentUserId;
  const completionRate = calculateCompletionRate(user);
  const responseTime = calculateResponseTime(taskApplications);
  const recentTasks = mapApplicationsToRecentTasks(
    taskApplications,
    user
  ).slice(0, 3);
  return (
    <TabsContent value="overview" className="space-y-6">
      {/* About & Quick Stats */}
      <div className="grid md:grid-cols-1 gap-6">
        {/* About */}
        <Card className="bg-background text-foreground">
          <CardHeader>
            <CardTitle className=" flex items-center justify-between">
              <div>Тухай</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className=" text-start whitespace-pre-wrap text-muted-foreground w-full h-full">
              {owner ? <EditBio bio={user.bio} /> : (user.bio ?? 'Био алга.')}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-background text-foreground">
          <CardHeader>
            <CardTitle>Товч статистик</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Гүйцэтгэлийн хувь</span>
              <div className="flex items-center gap-2">
                <Progress value={completionRate} className="w-20" />
                <span className="font-medium">{completionRate}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Хариу өгөх хугацаа</span>
              <span className="font-medium">
                {responseTime ? responseTime : 'Мэдээлэл алга'}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Зорчих зай</span>
              <span className="font-medium">
                {user.maxTravelDistance ?? 0} км хүртэл
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Сонгосон ангилал</span>
              <span className="font-medium">
                {user.preferredCategories?.filter(Boolean).join(', ') ||
                  'Ангилал алга'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-background text-foreground">
        <CardHeader>
          <CardTitle>Сүүлийн үйл ажиллагаа</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-muted rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-medium">{task.title}</h4>
                      {task.category && (
                        <Badge variant="secondary">{task.category}</Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={
                          task.role === 'helper'
                            ? 'text-blue-600 border-blue-600'
                            : 'text-purple-600 border-purple-600'
                        }
                      >
                        {task.role === 'helper' ? 'Гүйцэтгэгч' : 'Захиалагч'}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span>{task.date}</span>
                      {task.duration && <span>{task.duration}</span>}
                      <div className="flex items-center gap-1">
                        {[...Array(task.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 md:text-right">
                    <div className="font-medium text-green-600">
                      {task.payment}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                Сүүлийн үйл ажиллагаа алга.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default OverviewTab;
