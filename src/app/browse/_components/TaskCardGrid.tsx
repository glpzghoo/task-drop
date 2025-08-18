'use client';

import { motion } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, Clock, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Task } from '@/graphql/generated';
import { clamp, formatCurrency } from '../utils/helpers';

// Small helpers

export default function TaskCardGrid({
  tasks,
  loading,
}: {
  tasks: Task[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className=" flex items-center gap-5">
          <div>
            <Loader2 className=" animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-3xl font-semibold">Одоогоор ажил алга</div>
          <p className="text-muted-foreground">
            Шүүлтээ өөрчилж эсвэл дараа дахин шалгана уу.
          </p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="grid  gap-6">
        {tasks.map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.3) }}
            className="group"
          >
            <Card className="relative overflow-hidden border-border/60 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 transition-all duration-200 hover:shadow-lg hover:border-primary/40">
              {/* Clickable overlay */}
              <Link
                href={`/tasks/${task.id}`}
                className="absolute inset-0"
                aria-label="Дэлгэрэнгүй рүү очих"
              />

              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    {task.category?.name && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-medium"
                      >
                        {task.category?.name}
                      </Badge>
                    )}
                    {task.isUrgent && (
                      <Badge variant="destructive" className="text-[10px]">
                        ⚡
                      </Badge>
                    )}
                    {task.isRemote && (
                      <Badge variant="outline" className="text-[10px]">
                        🌐
                      </Badge>
                    )}
                  </div>

                  <div className="text-right leading-tight space-y-0.5">
                    <div className="text-xl font-bold text-green-500">
                      {formatCurrency(
                        (task as Task).paymentAmount ??
                          (task as Task).urgencyFee ??
                          undefined
                      )}
                    </div>
                    <div className="flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" />{' '}
                      <span>{task.estimatedDuration ?? 'Тодорхойгүй'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <CardTitle className="text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {task.title}
                  </CardTitle>
                  {task.description && (
                    <CardDescription className="mt-1 text-sm line-clamp-2">
                      {clamp(task.description, 160)}
                    </CardDescription>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin
                      className="h-4 w-4"
                      color={task.isRemote ? '#22c55e' : undefined}
                    />
                    {task.isRemote && (
                      <Badge variant="outline" className="text-[10px]">
                        Цахимаар
                      </Badge>
                    )}

                    <span className="truncate">
                      {task.address ?? 'Байршил үл мэдэгдэнэ'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex min-w-0 items-center gap-3 text-muted-foreground">
                    {task.poster && (
                      <div className="flex items-center gap-2 min-w-0">
                        <Avatar className="h-7 w-7">
                          <AvatarImage
                            src={(task.poster as any)?.avatarUrl ?? undefined}
                            alt="poster"
                          />
                          <AvatarFallback>
                            {`${task.poster.firstName?.[0] ?? '?'}${task.poster.lastName?.[0] ?? ''}`.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate">
                          {task.poster.firstName} {task.poster.lastName}
                        </span>
                      </div>
                    )}

                    {task.posterRating !== undefined && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5">
                            <Star
                              className="w-4 h-4 text-yellow-400 fill-current"
                              aria-hidden
                            />
                            <span className="tabular-nums">
                              {Number(task.posterRating).toFixed(1)}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>Захиалагчийн үнэлгээ</TooltipContent>
                      </Tooltip>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="pointer-events-auto"
                    >
                      <Link
                        href={`/tasks/${task.id}`}
                        className="inline-flex items-center gap-1"
                      >
                        Дэлгэрэнгүй <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <Button size="sm" className="pointer-events-auto">
                      Орох
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </TooltipProvider>
  );
}
