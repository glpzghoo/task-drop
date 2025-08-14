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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Task } from '@/graphql/generated';
import { formatDistanceToNow } from 'date-fns';
import { mn } from 'date-fns/locale';

const TaskHeader = ({ task }: { task: Task }) => {
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [proposedStartTime, setProposedStartTime] = useState('');
  return (
    <Card className="bg-gray-900 border-gray-800 rounded-xl shadow-sm">
      <CardContent className="pt-6 space-y-6">
        {/* Толгой хэсэг */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            {/* Төрөл ба төлөв */}
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
                {task.status === 'open' ? 'Нээлттэй' : task.status}
              </Badge>
            </div>

            {/* Гарчиг */}
            <h1 className="text-2xl font-bold text-white">{task.title}</h1>

            {/* Мета мэдээлэл */}
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

          {/* Үнэ болон бусад */}
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

        {/* Үйлдлийн товчнууд */}
        <div className="flex flex-wrap gap-3 mt-4">
          {/* Өргөдөл илгээх цонх */}
          <Dialog
            open={showApplicationDialog}
            onOpenChange={setShowApplicationDialog}
          >
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 rounded-md">
                Даалгаварт хүсэлт илгээх
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border border-gray-800 text-white max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  Ажилд өргөдөл илгээх
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  {task.poster?.firstName || 'Захиалагч'}-д та энэ ажлыг хийхэд
                  тохиромжтой гэдгээ тайлбарлан илгээнэ үү.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5">
                {/* Мессеж */}
                <div>
                  <Label htmlFor="message">Таны мессеж</Label>
                  <Textarea
                    id="message"
                    placeholder="Сайн байна уу! Би энэ ажлыг хийх дуртай бөгөөд..."
                    value={applicationMessage}
                    onChange={(e) => setApplicationMessage(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white mt-2 focus:ring-2 focus:ring-primary"
                    rows={4}
                  />
                </div>

                {/* Эхлэх хугацаа */}
                <div>
                  <Label htmlFor="start-time">Хэзээ эхлэх боломжтой вэ?</Label>
                  <input
                    type="datetime-local"
                    id="start-time"
                    value={proposedStartTime}
                    onChange={(e) => setProposedStartTime(e.target.value)}
                    className="w-full mt-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Үйлдлийн товчнууд */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowApplicationDialog(false)}
                    className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                  >
                    Болих
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => setShowApplicationDialog(false)}
                  >
                    Илгээх
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Бусад товчнууд */}
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
