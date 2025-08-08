'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function AvailableNowBanner() {
  return (
    <Card className="mb-6 bg-green-50 border-green-200">
      <CardContent className="flex items-center gap-3">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        <div>
          <p className="font-medium text-green-800">Та одоо боломжтой!</p>
          <p className="text-sm text-green-600">
            Байрлалаа харгалзах ажлууд гарвал мэдэгдэнэ.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
