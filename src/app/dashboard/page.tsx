'use client';

import { activeTasks, postedTasks, recentTasks, stats } from './mocks';
import Header from '../_components/header';
import DashboardHeader from './_compnents/DashboardHeader';
import StatCardGrid from './_compnents/StatCardGrid';
import DashboardTabs from './_compnents/DashboardTabs';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <DashboardHeader />

        {/* Stats Cards */}
        <StatCardGrid stats={stats} />

        {/* Main Content Tabs */}
        <DashboardTabs
          activeTasks={activeTasks}
          recentTasks={recentTasks}
          postedTasks={postedTasks}
        />
      </div>
    </div>
  );
}
