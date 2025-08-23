import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertCircle,
  Calendar,
  Clock,
  Heart,
  MapPin,
  MessageSquare,
  Share2,
} from 'lucide-react';
import { timeUntilDue } from '../utils/helpers';
import { Button } from '@/components/ui/button';
import { Task } from '@/graphql/generated';
import { formatDistanceToNow } from 'date-fns';
import { mn } from 'date-fns/locale';
import NewTaskApplicationDialog from './dialogs/NewApplication';

const TaskHeader = ({ task }: { task: Task }) => {
  return (
    <Card className="border-gray-800 rounded-xl shadow-sm">
      <CardContent className="pt-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-gray-800 text-white capitalize"
              >
                {task.category.name}
              </Badge>
              {task.isUrgent && (
                <Badge
                  variant="destructive"
                  className="bg-red-900 text-red-100 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  Яаралтай
                </Badge>
              )}
              <Badge
                variant="outline"
                className={`border-gray-700 text-gray-300 capitalize ${
                  task.status === 'open' && 'border-green-500 text-green-400'
                }`}
              >
                {task.status === 'open'
                  ? 'Нээлттэй'
                  : task.status === 'in_progress'
                    ? 'Гүйцэтгэж байгаа'
                    : task.status === 'completed'
                      ? 'Дууссан'
                      : task.status === 'assigned'
                        ? 'Хүн авсан'
                        : task.status}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold text-white">{task.title}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {task.address}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {task.estimatedDuration} минут
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDistanceToNow(new Date(Number(task.createdAt)), {
                  locale: mn,
                  addSuffix: true,
                })}{' '}
                нийтэлсэн
              </div>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-3xl font-bold text-white">
              {task.paymentAmount}₮
            </div>
            {task.isUrgent && (
              <div className="text-sm text-gray-400">
                +{task.urgencyFee}₮ яаралтай хөлс
              </div>
            )}
            <div className="text-xs text-gray-500 mt-2">
              {timeUntilDue(task.dueDate)}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          <NewTaskApplicationDialog task={task} />
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Захиалагчид мессеж бичих
          </Button>
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
          >
            <Heart className="w-4 h-4 mr-2" />
            Хадгалах
          </Button>
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Хуваалцах
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskHeader;
