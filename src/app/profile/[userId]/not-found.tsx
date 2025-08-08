'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">ҮҮҮПС. Хуудас андуурсан бололтой!</p>
      <div className="space-x-4">
        <button onClick={() => router.back()} className="px-4 py-2 border rounded">
          Буцах
        </button>
        <Link href="/">Нүүр хуудас</Link>
      </div>
    </div>
  );
}
