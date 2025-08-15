'use client';
import Link from 'next/link';
import Header from '@/app/_components/header';
import TaskHeader from './_components/TaskHeader';
import TaskDetails from './_components/TaskDetails';
import PosterCard from './_components/PosterCard';
import QuickStats from './_components/QuickStats';
import Instruction from './_components/Instruction';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Task, useGetTaskByIdQuery } from '@/graphql/generated';

export default function TaskDetailsPage() {
  const params = useParams();
  const { taskId } = params as { taskId: string };
  const { data, loading, error } = useGetTaskByIdQuery({
    variables: { getTaskByIdId: taskId },
    skip: !taskId || typeof taskId !== 'string',
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg">
          <Loader2 className=" animate-spin" />
        </p>
      </div>
    );
  }

  if (!data || !data.getTaskById || error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg">Даалгаврын мэдээлэл олдсонгүй.</p>
      </div>
    );
  }
  const task = data.getTaskById as Task;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/browse"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Буцах
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Header */}
            <TaskHeader task={task} />

            {/* Task Details Tabs */}
            <TaskDetails task={task} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Захиалагчийн мэдээлэл */}
            <PosterCard task={task} />

            {/* Түргэн статистик */}
            <QuickStats task={task} />

            {/* Аюулгүй байдлын зөвлөмж */}
            <Instruction />
          </div>
        </div>
      </div>
    </div>
  );
}
