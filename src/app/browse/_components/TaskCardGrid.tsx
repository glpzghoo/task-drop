'use client';

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star } from 'lucide-react';
import Link from 'next/link';

interface Task {
  id: number;
  title: string;
  urgent?: boolean;
  remote?: boolean;
  category?: string;
  payment: string;
  duration: string;
  description: string;
  location: string;
  distance?: string;
  postedBy?: string;
  rating?: number;
}

export default function TaskCardGrid({ tasks }: { tasks: Task[] }) {
  return (
    <div className="grid gap-6">
      {tasks.map((task) => (
        <Card key={task.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {task.category && (
                  <Badge variant="secondary">{task.category}</Badge>
                )}
                {task.urgent && <Badge variant="destructive">Яаралтай</Badge>}
                {task.remote && <Badge variant="outline">Цахимаар</Badge>}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {task.payment}
                </div>
                <div className="text-sm text-muted-foreground">
                  {task.duration}
                </div>
              </div>
            </div>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {task.location} {task.distance && `• ${task.distance}`}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {task.duration}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                {task.postedBy && <span>Захиалагч: {task.postedBy}</span>}
                {task.rating !== undefined && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{task.rating}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/tasks/${task.id}`}>Дэлгэрэнгүй</Link>
                </Button>
                <Button size="sm">Орох</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
