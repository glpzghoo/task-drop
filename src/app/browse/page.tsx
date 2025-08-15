'use client';

import { useState } from 'react';
import Header from '../_components/header';
import BrowseHeader from './_components/BrowseHeader';
import FiltersSidebar from './_components/FiltersSidebar';
import AvailableNowBanner from './_components/AvailableNowBanner';
import TaskCardGrid from './_components/TaskCardGrid';
import { Task, useGetTasksQuery } from '@/graphql/generated';

export default function BrowsePage() {
  const { data, loading } = useGetTasksQuery();
  const [availableNow, setAvailableNow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const tasksToDisplay =
    data?.getTasks.filter(
      (t): t is Task =>
        t !== null && t.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <BrowseHeader
          availableNow={availableNow}
          setAvailableNow={setAvailableNow}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tasksCount={tasksToDisplay.length}
        />
        <div className="flex flex-col lg:flex-row gap-8">
          <FiltersSidebar
            availableNow={availableNow}
            setAvailableNow={setAvailableNow}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="flex-1">
            {availableNow && <AvailableNowBanner />}
            <TaskCardGrid tasks={tasksToDisplay} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
