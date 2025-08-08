'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function DashboardHeader() {
  const [availableNow, setAvailableNow] = useState(false);

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Тавтай морил, Жон!</h1>
        <p className="text-muted-foreground">Ажлуудтай холбоотой шинэчлэлүүд энд байна</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="available-toggle" className="text-sm font-medium">
            Чөлөөтэй байна
          </Label>
          <Switch id="available-toggle" checked={availableNow} onCheckedChange={setAvailableNow} />
        </div>
        {availableNow && (
          <div className="flex items-center gap-2 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Чөлөөтэй</span>
          </div>
        )}
      </div>
    </div>
  );
}
