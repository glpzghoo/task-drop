import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  Star,
  TrendingUp,
  User,
} from 'lucide-react';
import { TaskApplications, Users } from '@/graphql/generated';
import { formatDistanceToNow } from 'date-fns';
import { mn } from 'date-fns/locale';
import { calculateCompletionRate, calculateResponseTime } from '@/lib/profile';
import UserPFP from './user-pfp';

const ProfileHeader = ({
  user,
  taskApplications,
}: {
  user: Users;
  taskApplications: TaskApplications[];
}) => {
  const completionRate = calculateCompletionRate(user);
  const responseTime = calculateResponseTime(taskApplications);
  return (
    <Card className="bg-background text-foreground mb-8 shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/3">
            <UserPFP user={user} />

            <div className="text-center text-xs flex flex-col gap-2 md:text-left">
              <h1 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              {user.city && user.state && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {user.city}, {user.state}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mt-1">
                <Calendar className="w-4 h-4" />
                <span>
                  Гишүүн болсон:{' '}
                  {formatDistanceToNow(new Date(Number(user.createdAt)), {
                    locale: mn,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-green-600 mt-1">
                <Clock className="w-4 h-4" />
                <span>
                  Сүүлд идэвхтэй:{' '}
                  {formatDistanceToNow(new Date(Number(user.lastActiveAt)), {
                    locale: mn,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Helper Stats */}
              {user.isHelper && (
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <User className="w-5 h-5" />
                    Туслагч
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{user.helperRating}</span>
                      <span className="text-muted-foreground">
                        ({user.helperRatingCount} үнэлгээ)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{user.tasksCompleted} ажил гүйцэтгэсэн</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      <span>{completionRate}% гүйцэтгэлийн хувь</span>
                    </div>
                    {responseTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-500" />
                        <span>{responseTime} хариулах хугацаа</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Poster Stats */}
              {user.isTaskPoster && (
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <Edit className="w-5 h-5" />
                    Ажил захиалагч
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{user.posterRating}</span>
                      <span className="text-muted-foreground">
                        ({user.posterRatingCount} үнэлгээ)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span>{user.tasksPosted} ажил нийтэлсэн</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Verifications */}
            <div>
              <h3 className="font-semibold mb-2">Баталгаажуулалт</h3>
              <div className="flex flex-wrap gap-2">
                {!user.emailVerified &&
                  !user.phoneVerified &&
                  user.backgroundCheckStatus !== 'approved' && (
                    <Badge className="flex items-center gap-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                      <Shield className="w-4 h-4" />
                      Баталгаажуулалт хийгдээгүй
                    </Badge>
                  )}
                {user.emailVerified && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Mail className="w-4 h-4" />
                    Имэйл баталгаажсан
                  </Badge>
                )}
                {user.phoneVerified && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Phone className="w-4 h-4" />
                    Утас баталгаажсан
                  </Badge>
                )}
                {user.backgroundCheckStatus === 'approved' && (
                  <Badge className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    <Shield className="w-4 h-4" />
                    Шалгалт батлагдсан
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button>
                <MessageSquare className="w-4 h-4 mr-2" />
                Зурвас илгээх
              </Button>
              <Button variant="outline">
                <Heart className="w-4 h-4 mr-2" />
                Хадгалах
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
