import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Timer, Users } from 'lucide-react';
import { timeUntilDue } from '../utils/helpers';
import { Task } from '@/graphql/generated';

const QuickStats = ({ task }: { task: Task }) => {
  return (
    <Card className=" border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Түргэн статистик</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-medium">
                {task.applications.length} хүсэлт
              </div>
              <div className="text-sm text-gray-400">
                хамгийн их - {task.maxApplications}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
              <Timer className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-medium">
                {timeUntilDue(task.dueDate)}
              </div>
              <div className="text-sm text-gray-400">Дуусах хугацаа</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-medium">
                {task.estimatedDuration} минут
              </div>
              <div className="text-sm text-gray-400">Хугацааны ажил</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
