'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from './OverviewTab';
import ReviewTab from './ReviewTab';
import TasksTab from './TasksTab';
import SkillsTab from './SkillsTab';
import AvailabilityTab from './AvailabilityTab';
import { GetUserByIdResponse } from '@/graphql/generated';

const ProfileTabs = ({
  user,
  taskApplications,
}: {
  user: GetUserByIdResponse['user'];
  taskApplications: GetUserByIdResponse['taskApplications'];
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
        <TabsTrigger value="tasks">Даалгаврын түүх</TabsTrigger>
        <TabsTrigger value="skills">Ур чадвар</TabsTrigger>
        <TabsTrigger value="availability">Ирц</TabsTrigger>
      </TabsList>

      {activeTab === 'overview' && (
        <OverviewTab user={user} taskApplications={taskApplications} />
      )}
      {activeTab === 'reviews' && (
        <ReviewTab user={user} taskApplications={taskApplications} />
      )}
      {activeTab === 'tasks' && <TasksTab user={user} />}
      {activeTab === 'skills' && <SkillsTab user={user} />}
      {activeTab === 'availability' && <AvailabilityTab user={user} />}
    </Tabs>
  );
};

export default ProfileTabs;
