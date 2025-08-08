'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Users } from '@/graphql/generated';

const AvailabilityTab = ({ user }: { user: Users }) => {
  return (
    <TabsContent value="availability" className="space-y-6">
      <Card className="bg-background text-foreground">
        <CardHeader>
          <CardTitle>Ирцийн цагийн хуваарь</CardTitle>
          <CardDescription className="text-muted-foreground">
            {`${user.firstName} ихэвчлэн ямар цагуудад ажилд авах боломжтой вэ`}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Хуваарийн мэдээлэл алга
          </p>

          {/* <Separator className="my-6" /> */}

          {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Цагийн бүс: Pacific Time (PT)</span>
          </div> */}

          {/* <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <MapPin className="w-4 h-4" />
            <span>
              {user.address || user.city}
              {user.maxTravelDistance &&
                `-ийн орчмоор ${user.maxTravelDistance} миль дотор ажиллана`}
            </span>
          </div> */}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AvailabilityTab;
