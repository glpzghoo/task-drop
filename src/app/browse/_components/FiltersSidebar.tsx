'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface Props {
  availableNow: boolean;
  setAvailableNow: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}

export default function FiltersSidebar({
  availableNow,
  setAvailableNow,
  searchQuery,
  setSearchQuery,
}: Props) {
  return (
    <div className="lg:w-80">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Шүүлтүүр
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="available-now" className="text-sm font-medium">
                Одоо боломжтой
              </Label>
              <p className="text-xs text-muted-foreground">
                Шууд тохирох даалгавартай холбох
              </p>
            </div>
            <Switch
              id="available-now"
              checked={availableNow}
              onCheckedChange={setAvailableNow}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="search">Ажил хайх</Label>
            <div className="relative">
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Нөхөрсөг дүр зураг..."
                className="pl-10"
              />
            </div>
          </div>
          {['Ангилал', 'Байршил', 'Хугацаа', 'Төлбөр'].map((label) => (
            <div className="space-y-2" key={label}>
              <Label>{label}</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={`Бүх ${label}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Бүгд</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
