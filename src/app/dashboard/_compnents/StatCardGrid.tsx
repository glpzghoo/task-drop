import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, DollarSign, Star, Clock } from 'lucide-react';

export default function StatCardGrid({ stats }: { stats: any }) {
  const items = [
    {
      label: 'Tasks Completed',
      value: stats.tasksCompleted,
      icon: <CheckCircle className="text-green-500" />,
    },
    {
      label: 'Total Earned',
      value: `$${stats.totalEarned}`,
      icon: <DollarSign className="text-green-500" />,
    },
    {
      label: 'Average Rating',
      value: stats.averageRating,
      icon: <Star className="text-yellow-400 fill-current" />,
    },
    {
      label: 'Response Time',
      value: stats.responseTime,
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
                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-bold text-foreground">{item.value}</p>
              </div>
              <div className="w-8 h-8">{item.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
