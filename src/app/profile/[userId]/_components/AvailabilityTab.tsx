'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { mockUser } from '../mocks';
import { Separator } from '@/components/ui/separator';
import { Clock, MapPin } from 'lucide-react';
import { Users } from '@/graphql/generated';

const AvailabilityTab = ({ user }: { user: Users }) => {
  console.log(user);
  return (
    <TabsContent value="availability" className="space-y-6">
      <Card className="bg-background text-foreground">
        <CardHeader>
          <CardTitle>Ирцийн цагийн хуваарь</CardTitle>
          <CardDescription className="text-muted-foreground">
            Сараг ихэвчлэн ямар цагуудад ажилд авах боломжтой вэ
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {mockUser.availability.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/40"
              >
                <span className="font-medium">{day.day}</span>
                <span
                  className={
                    day.times === 'Not Available' ? 'text-muted-foreground' : 'text-foreground'
                  }
                >
                  {day.times === 'Not Available' ? 'Ирэх боломжгүй' : day.times}
                </span>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Цагийн бүс: Pacific Time (PT)</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <MapPin className="w-4 h-4" />
            <span>
              {mockUser.location.address}-ийн орчмоор {mockUser.maxTravelDistance} миль дотор
              ажиллана
            </span>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AvailabilityTab;
