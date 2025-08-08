'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PostedTasksTab({ tasks }: { tasks: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Таны нийтэлсэн ажлууд</h2>
        <Button asChild>
          <Link href="/post">Шинэ ажил нийтлэх</Link>
        </Button>
      </div>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{task.title}</h3>
                    <Badge variant={task.status === 'active' ? 'default' : 'secondary'}>
                      {task.status === 'active' ? 'Идэвхтэй' : 'Хаагдсан'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{task.postedDate}-нд нийтэлсэн</span>
                    <span>{task.applications} хүсэлт</span>
                    {task.completedBy && <span>{task.completedBy} гүйцэтгэсэн</span>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600 mb-2">{task.payment}</div>
                  {task.status === 'active' && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Хүсэлтүүд харах
                      </Button>
                      <Button size="sm">Засварлах</Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
