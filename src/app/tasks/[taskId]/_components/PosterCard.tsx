import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, Phone, Shield, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Task } from '@/graphql/generated';
import { formatDistanceToNow } from 'date-fns';
import { mn } from 'date-fns/locale';

const PosterCard = ({ task }: { task: Task }) => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Захиалагч</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              className="  object-cover"
              src={task.poster.profileImageUrl || '/placeholder.svg'}
            />
            <AvatarFallback className="bg-gray-800 text-white">
              {task.poster.firstName[0]}
              {task.poster.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-white">
              {task.poster.firstName} {task.poster.lastName}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span>{task.poster.posterRating}</span>
              <span>({task.poster.posterRatingCount} үнэлгээ)</span>
            </div>
            <div className="text-sm text-gray-400">{task.poster.address}</div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Нийт байршуулсан ажил</span>
            <span className="text-white">{task.poster.tasksPosted}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Гишүүн болсон</span>
            <span className="text-white">
              {formatDistanceToNow(new Date(Number(task.poster.createdAt)), {
                locale: mn,
                addSuffix: true,
              })}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Хариу өгөх хугацаа</span>
            {/* <span className="text-white">{task.poster.responseTime}</span> */}
          </div>
        </div>

        {/* Баталгаажуулалт */}
        <div className="flex flex-wrap gap-2 mb-4">
          {task.poster.emailVerified && (
            <Badge
              variant="secondary"
              className="bg-gray-800 text-white text-xs"
            >
              <Mail className="w-3 h-3 mr-1" />
              Имэйл
            </Badge>
          )}
          {task.poster.phoneVerified && (
            <Badge
              variant="secondary"
              className="bg-gray-800 text-white text-xs"
            >
              <Phone className="w-3 h-3 mr-1" />
              Утас
            </Badge>
          )}
          {task.poster.backgroundCheckStatus === 'approved' && (
            <Badge
              variant="secondary"
              className="bg-green-900 text-green-100 text-xs"
            >
              <Shield className="w-3 h-3 mr-1" />
              Баталгаажсан
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 border-gray-700 text-white hover:bg-gray-800 bg-transparent"
          >
            Профайл харах
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-gray-700 text-white hover:bg-gray-800 bg-transparent"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Мессеж
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PosterCard;
