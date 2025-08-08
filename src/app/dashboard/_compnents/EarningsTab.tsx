'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function EarningsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Орлогын тойм</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Энэ сар
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">$347</div>
            <p className="text-sm text-muted-foreground mb-4">
              12 ажлаас олсон орлого
            </p>
            <Progress value={68} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              Сарын зорилгын 68% ($500)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />7 хоногийн задрал
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex justify-between">
                <span className="text-sm">Энэ 7 хоног</span>
                <span className="font-medium text-foreground">$89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Өнгөрсөн 7 хоног</span>
                <span className="font-medium text-foreground">$124</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">2 долоо хоногийн өмнө</span>
                <span className="font-medium text-foreground">$98</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">3 долоо хоногийн өмнө</span>
                <span className="font-medium text-foreground">$76</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
