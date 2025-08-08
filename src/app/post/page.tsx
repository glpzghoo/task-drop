'use client';

import { useState } from 'react';
import Header from '../_components/header';
import TitleSection from './_components/TitleSection';
import TaskPreview from './_components/TaskPreview';
import Recommendations from './_components/Recommendations';
import TaskForm from './_components/TaskForm';

export default function PostTaskPage() {
  const [isRemote, setIsRemote] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-10">
          <TitleSection />
          <TaskForm
            isRemote={isRemote}
            setIsRemote={setIsRemote}
            isUrgent={isUrgent}
            setIsUrgent={setIsUrgent}
            estimatedCost={estimatedCost}
            setEstimatedCost={setEstimatedCost}
          />
          <TaskPreview
            category="Амьтан асаргаа"
            isRemote={isRemote}
            isUrgent={isUrgent}
            estimatedCost={estimatedCost}
          />
          <Recommendations />
        </div>
      </main>
    </div>
  );
}
