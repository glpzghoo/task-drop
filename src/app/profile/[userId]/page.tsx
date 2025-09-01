'use client';
import Header from '@/app/_components/header';
import ProfileTabs from './_components/ProfileTabs';
import ProfileHeader from './_components/ProfileHeader';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import {
  useGetUserPrivateInfoByIdQuery,
  useGetUserPublicInfoByIdQuery,
  Users,
} from '@/graphql/generated';
import UserProfileSkeleton from './_components/UserProfileSkeleton';
import { useEffect, useState } from 'react';

export default function UserProfilePage() {
  const params = useParams();
  const { userId } = params as { userId: string };

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUserId(localStorage.getItem('userId'));
  }, []);

  const isOwner = currentUserId === userId;

  const {
    data: publicData,
    loading: publicLoading,
    error: publicError,
  } = useGetUserPublicInfoByIdQuery({
    variables: { getUserPublicInfoByIdId: userId! },
    skip: !userId || typeof userId !== 'string' || isOwner,
  });
  const {
    data: privateData,
    loading: privateLoading,
    error: privateError,
  } = useGetUserPrivateInfoByIdQuery({
    variables: { getUserPrivateInfoByIdId: userId! },
    skip: !userId || typeof userId !== 'string' || !isOwner,
  });

  const loading = publicLoading || privateLoading;
  const error = publicError || privateError;
  const userData = isOwner
    ? privateData?.getUserPrivateInfoById
    : publicData?.getUserPublicInfoById;

  if (loading) {
    return (
      <div className="min-h-screen  text-foreground">
        <Header />
        <main className="w-full max-w-5xl mx-auto px-4 py-8">
          <UserProfileSkeleton />
        </main>
      </div>
    );
  }
  if (!userId || !userData || error) {
    return notFound();
  }

  const user: Users = userData as Users;
  return (
    <div className="min-h-screen  text-foreground">
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
