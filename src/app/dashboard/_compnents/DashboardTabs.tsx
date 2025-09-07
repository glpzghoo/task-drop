'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActiveTasksTab from './ActiveTasksTab';
import HistoryTab from './HistoryTab';
import PostedTasksTab from './PostedTasksTab';
import EarningsTab from './EarningsTab';
import { useEffect, useState } from 'react';
import { UserRole } from '@/lib/get-user-role';

export default function DashboardTabs({
  postedTasks,
  userRole,
}: {
  postedTasks: any[];
  userRole: UserRole;
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
      <TabsList className="w-full flex">
        <TabsTrigger value="active">Идэвхтэй даалгаврууд</TabsTrigger>
        {userRole === 'helper' && (
          <TabsTrigger value="history">Гүйцэтгэсэн түүх</TabsTrigger>
        )}
        <TabsTrigger value="posted">Нийтэлсэн даалгаврууд</TabsTrigger>
        <TabsTrigger value="earnings">Орлого</TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        <ActiveTasksTab userRole={userRole} />
      </TabsContent>

      {userRole === 'helper' && (
        <TabsContent value="history">
          <HistoryTab />
        </TabsContent>
      )}

      <TabsContent value="posted">
        <PostedTasksTab tasks={postedTasks} />
      </TabsContent>

      <TabsContent value="earnings">
        <EarningsTab />
      </TabsContent>
    </Tabs>
  );
}
