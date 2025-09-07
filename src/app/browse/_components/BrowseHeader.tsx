'use client';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  availableNow: boolean;
  setAvailableNow: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  tasksCount: number;
}

export default function BrowseHeader({
  availableNow,
  setAvailableNow,
  searchQuery,
  setSearchQuery,
  tasksCount,
}: Props) {
  return (
    <Card className="mb-6">
      <CardContent className="space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Боломжит даалгаврууд
            </h1>
            <p className="text-muted-foreground">
              {tasksCount} даалгаврын санал
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="sort" className="text-sm font-medium">
              Шүүх:
            </Label>
            <Select onValueChange={() => {}}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Эхлээд шинэ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Шинэ даалгавар</SelectItem>
                <SelectItem value="payment-high">Өндөр төлбөр</SelectItem>
                <SelectItem value="payment-low">Бага төлбөр</SelectItem>
                <SelectItem value="distance">Хамгийн ойр</SelectItem>
                <SelectItem value="duration">Хамгийн богино хугацаа</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="available-now">Одоо боломжтой</Label>
            <Switch
              id="available-now"
              checked={availableNow}
              onCheckedChange={setAvailableNow}
            />
          </div>
          <div className="relative grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Нохой салхилуулах, орчуулга..."
              className="pl-10"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
