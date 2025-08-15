import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActiveTasksTab from './ActiveTasksTab';
import HistoryTab from './HistoryTab';
import PostedTasksTab from './PostedTasksTab';
import EarningsTab from './EarningsTab';

export default function DashboardTabs({
  activeTasks,
  recentTasks,
  postedTasks,
}: {
  activeTasks: any[];
  recentTasks: any[];
  postedTasks: any[];
}) {
  return (
    <Tabs defaultValue="active" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="active">Идэвхтэй ажлууд</TabsTrigger>
        <TabsTrigger value="history">Гүйцэтгэсэн түүх</TabsTrigger>
        <TabsTrigger value="posted">Нийтэлсэн ажлууд</TabsTrigger>
        <TabsTrigger value="earnings">Орлого</TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        <ActiveTasksTab tasks={activeTasks} />
      </TabsContent>

      <TabsContent value="history">
        <HistoryTab tasks={recentTasks} />
      </TabsContent>

      <TabsContent value="posted">
        <PostedTasksTab tasks={postedTasks} />
      </TabsContent>

      <TabsContent value="earnings">
        <EarningsTab />
      </TabsContent>
    </Tabs>
  );
}
