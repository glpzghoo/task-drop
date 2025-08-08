'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function HistoryTab({ tasks }: { tasks: any[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Саяхан дууссан ажлууд</h2>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{task.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {task.completedDate}-нд дуусгасан • Захиалагч: {task.client}
                  </p>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < task.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-700'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">({task.rating}/5)</span>
                  </div>
                  <p className="text-sm italic text-foreground">"{task.feedback}"</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{task.payment}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
