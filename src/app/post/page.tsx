import Header from '../_components/header';
import TitleSection from './_components/TitleSection';
import Recommendations from './_components/Recommendations';
import TaskForm from './_components/TaskForm';

export default function PostTaskPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-10">
          <TitleSection />
          <TaskForm />
          <Recommendations />
        </div>
      </main>
    </div>
  );
}
