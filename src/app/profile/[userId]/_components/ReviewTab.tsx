'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Star, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { TaskApplications, Users } from '@/graphql/generated';
import { mapApplicationsToReviews } from '@/lib/profile';

const ReviewTab = ({
  user,
  taskApplications,
}: {
  user: Users;
  taskApplications: TaskApplications[];
}) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const reviews = mapApplicationsToReviews(taskApplications, user);

  return (
    <TabsContent value="reviews" className="space-y-6">
      <Card className="bg-background text-foreground">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>
                Сэтгэгдлүүд ({user.helperRatingCount || reviews.length})
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Бусад хүмүүсийн {user.lastName}-ийн талаар хэлсэн сэтгэгдэл
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-bold">{user.helperRating}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {user.helperRatingCount || reviews.length} сэтгэгдэл
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {reviews.length > 0 ? (
              (showAllReviews ? reviews : reviews.slice(0, 3)).map((review) => (
                <div
                  key={review.id}
                  className="border-b border-border last:border-0 pb-6 last:pb-0"
                >
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{review.reviewer[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.reviewer}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{review.date}</span>
                          <span>•</span>
                          <span>{review.task}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {review.comment}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <ThumbsUp className="w-3 h-3" />
                      Ашигтай ({review.helpful || 0})
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">Сэтгэгдэл алга.</p>
            )}
          </div>

          {reviews.length > 3 && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                {showAllReviews
                  ? 'Цөөн үзүүлэх'
                  : `Бүх ${reviews.length} сэтгэгдлийг үзэх`}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ReviewTab;
