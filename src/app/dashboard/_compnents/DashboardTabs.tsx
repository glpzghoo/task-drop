'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActiveTasksTab from './ActiveTasksTab';
import HistoryTab from './HistoryTab';
import PostedTasksTab from './PostedTasksTab';
import EarningsTab from './EarningsTab';
import { useEffect, useState } from 'react';

export default function DashboardTabs({
  recentTasks,
  postedTasks,
}: {
  recentTasks: any[];
  postedTasks: any[];
}) {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem('dashboardActiveTab') || 'active'
  );

  useEffect(() => {
    localStorage.setItem('dashboardActiveTab', activeTab);
  }, [activeTab]);

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={setActiveTab}
      className="space-y-6"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="active">Идэвхтэй ажлууд</TabsTrigger>
        <TabsTrigger value="history">Гүйцэтгэсэн түүх</TabsTrigger>
        <TabsTrigger value="posted">Нийтэлсэн ажлууд</TabsTrigger>
        <TabsTrigger value="earnings">Орлого</TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        <ActiveTasksTab />
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
