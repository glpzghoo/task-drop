'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { getSkills } from '@/lib/profile';
import { Users } from '@/graphql/generated';

const SkillsTab = ({ user }: { user: Users }) => {
  const skills = getSkills(user);

  return (
    <TabsContent value="skills" className="space-y-6">
      <Card className="bg-background text-foreground">
        <CardHeader>
          <CardTitle>Ур чадвар ба туршлага</CardTitle>
          <CardDescription className="text-muted-foreground">
            {`${user.firstName}-ийн баталгаажсан ур чадвар`}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {skills.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border bg-muted/40"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{skill}</h4>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 text-green-800 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                    >
                      <Shield className="w-3 h-3" />
                      Баталгаажсан
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Ур чадвар алга</p>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SkillsTab;
