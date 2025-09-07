'use client';

import { postedTasks } from './mocks';
import Header from '../_components/header';
import DashboardHeader from './_compnents/DashboardHeader';
import StatCardGrid from './_compnents/StatCardGrid';
import DashboardTabs from './_compnents/DashboardTabs';
import { DashboardResponse, useDashboardQuery } from '@/graphql/generated';
import { Loader2 } from 'lucide-react';
import { getUserRole } from '@/lib/get-user-role';

export default function DashboardPage() {
  const { data, error, loading } = useDashboardQuery();
  const userRole = getUserRole();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className=" animate-spin" />
      </div>
    );
  if (error || !data?.dashboard)
    return (
      <div>
        <div className="min-h-screen">
          <Header />
          <div className=" min-h-screen flex flex-col justify-center items-center">
            Нэвтэрнэ үү!
          </div>
        </div>
      </div>
    );

  const response = data.dashboard as DashboardResponse;
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader response={response} userRole={userRole} />
        <StatCardGrid response={response} userRole={userRole} />
        <DashboardTabs postedTasks={postedTasks} userRole={userRole} />
      </div>
    </div>
  );
}
