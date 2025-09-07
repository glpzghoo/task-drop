import { Card, CardContent } from '@/components/ui/card';
import { DashboardResponse } from '@/graphql/generated';
import { UserRole } from '@/lib/get-user-role';
import { CheckCircle, DollarSign, Star, Clock } from 'lucide-react';

type Props = {
  response: DashboardResponse;
  userRole: UserRole;
};
export default function StatCardGrid({ response }: Props) {
  const items = [
    {
      label: 'Даалгавар гүйцэтгэсэн',
      value: response.taskCompleted,
      icon: <CheckCircle className="text-green-500" />,
    },
    {
      label: 'Нийт орлого',
      value: `₮${response.totalEarned}`,
      icon: <DollarSign className="text-green-500" />,
    },
    {
      label: 'Дундаж үнэлгээ',
      value: response.avgRating,
      icon: <Star className="text-yellow-400 fill-current" />,
    },
    {
      label: 'Хариу өгч буй хугацаа',
      value: response.responseTime,
      icon: <Clock className="text-blue-500" />,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {items.map((item, idx) => (
        <Card key={idx}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {item.value}
                </p>
              </div>
              <div className="w-8 h-8">{item.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
