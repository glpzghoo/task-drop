import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const UserProfileSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Profile Header Skeleton */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar + Basic Info */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="text-center md:text-left space-y-2">
                <Skeleton className="w-40 h-6" />
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-48 h-4" />
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Skeleton className="w-32 h-5" />
                <Skeleton className="w-56 h-4" />
                <Skeleton className="w-40 h-4" />
                <Skeleton className="w-48 h-4" />
              </div>
              <div className="space-y-3">
                <Skeleton className="w-32 h-5" />
                <Skeleton className="w-56 h-4" />
                <Skeleton className="w-40 h-4" />
                <Skeleton className="w-48 h-4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Skeleton */}
      <Card>
        <CardContent className="space-y-6 py-6">
          <Skeleton className="w-32 h-5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileSkeleton;
