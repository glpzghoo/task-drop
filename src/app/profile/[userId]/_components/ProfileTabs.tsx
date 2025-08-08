'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from './OverviewTab';
import ReviewTab from './ReviewTab';
import TasksTab from './TasksTab';
import SkillsTab from './SkillsTab';
import AvailabilityTab from './AvailabilityTab';
import { TaskApplications, Users } from '@/graphql/generated';

const ProfileTabs = ({
  user,
  taskApplications,
}: {
  user: Users;
  taskApplications: TaskApplications[];
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-6 text-foreground"
    >
      <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-muted text-muted-foreground">
        <TabsTrigger value="overview">Тойм</TabsTrigger>
        <TabsTrigger value="reviews">Сэтгэгдэл</TabsTrigger>
        <TabsTrigger value="tasks">Ажлын түүх</TabsTrigger>
        <TabsTrigger value="skills">Ур чадвар</TabsTrigger>
        <TabsTrigger value="availability">Ирц</TabsTrigger>
      </TabsList>

      {activeTab === 'overview' && (
        <OverviewTab user={user} taskApplications={taskApplications} />
      )}
      {activeTab === 'reviews' && (
        <ReviewTab user={user} taskApplications={taskApplications} />
      )}
      {activeTab === 'tasks' && (
        <TasksTab user={user} taskApplications={taskApplications} />
      )}
      {activeTab === 'skills' && <SkillsTab user={user} />}
      {activeTab === 'availability' && <AvailabilityTab user={user} />}
    </Tabs>
  );
};

export default ProfileTabs;
