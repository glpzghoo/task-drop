'use client';

import { useState } from 'react';
import { tasks as mockTasks } from './mocks';
import Header from '../_components/header';
import BrowseHeader from './_components/BrowseHeader';
import FiltersSidebar from './_components/FiltersSidebar';
import AvailableNowBanner from './_components/AvailableNowBanner';
import TaskCardGrid from './_components/TaskCardGrid';

export default function BrowsePage() {
  const [availableNow, setAvailableNow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const tasks = mockTasks;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <BrowseHeader
          availableNow={availableNow}
          setAvailableNow={setAvailableNow}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tasksCount={tasks.length}
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
            <TaskCardGrid tasks={tasks} />
            <div className="text-center mt-8">
              <button className="btn-outline btn-lg">Цааш үзэх</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
