'use client';
import Header from '@/app/_components/header';
import ProfileTabs from './_components/ProfileTabs';
import ProfileHeader from './_components/ProfileHeader';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useGetUserByIdQuery, Users } from '@/graphql/generated';
import UserProfileSkeleton from './_components/UserProfileSkeleton';

export default function UserProfilePage() {
  const params = useParams();
  const { userId } = params as { userId: string };

  const { data, loading, error } = useGetUserByIdQuery({
    variables: { getUserByIdId: userId! },
    skip: !userId || typeof userId !== 'string',
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="w-full max-w-5xl mx-auto px-4 py-8">
          <UserProfileSkeleton />
        </main>
      </div>
    );
  }

  if (!userId || !data?.getUserById || error) {
    return notFound();
  }

  const user: Users = data.getUserById as Users;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <ProfileHeader user={user} />

        {/* Profile Tabs */}
        <ProfileTabs user={user} />
      </main>
    </div>
  );
}
