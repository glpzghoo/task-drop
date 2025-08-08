'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, MessageSquare, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ActiveTasksTab({ tasks }: { tasks: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Идэвхтэй ажлууд
        </h2>
        <Button asChild>
          <Link href="/browse">Ажил хайх</Link>
        </Button>
      </div>

      {tasks.length > 0 ? (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{task.title}</h3>
                      <Badge
                        variant={
                          task.status === 'in-progress'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {task.status === 'in-progress'
                          ? 'Хийгдэж байна'
                          : 'Эхлээгүй'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {task.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {task.timeRemaining} үлдсэн
                      </div>
                      <span>Захиалагч: {task.client}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600 mb-2">
                      {task.payment}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Зурвас
                      </Button>
                      {task.status === 'in-progress' && (
                        <Button size="sm">Дууссан гэж тэмдэглэх</Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">
              Идэвхтэй ажил алга
            </h3>
            <p className="text-muted-foreground mb-4">
              Орлого олохын тулд боломжит ажлуудыг үзэх
            </p>
            <Button asChild>
              <Link href="/browse">Ажил хайх</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
