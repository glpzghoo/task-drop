'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { DollarSign, AlertCircle, MapPin } from 'lucide-react';
import { useState } from 'react';

interface TaskFormProps {
  isRemote: boolean;
  setIsRemote: (value: boolean) => void;
  isUrgent: boolean;
  setIsUrgent: (value: boolean) => void;
  estimatedCost: number;
  setEstimatedCost: (value: number) => void;
}

export default function TaskForm({
  isRemote,
  setIsRemote,
  isUrgent,
  setIsUrgent,
  estimatedCost,
  setEstimatedCost,
}: TaskFormProps) {
  const [complexity, setComplexity] = useState('');

  const calculateEstimatedCost = (duration: string, complexity: string) => {
    const baseCosts: Record<string, number> = {
      '15': 12,
      '30': 20,
      '45': 28,
      '60': 35,
      '90': 50,
      '120': 65,
    };

    const multipliers: Record<string, number> = {
      simple: 1,
      moderate: 1.3,
      complex: 1.6,
    };

    const base = baseCosts[duration] || 20;
    const multiplier = multipliers[complexity] || 1;

    return Math.round(base * multiplier);
  };

  const handleDurationChange = (value: string) => {
    const cost = calculateEstimatedCost(value, complexity || 'simple');
    setEstimatedCost(cost);
  };

  const handleComplexityChange = (value: string) => {
    setComplexity(value);
  };

  return (
    <Card className="border-muted shadow-sm">
      <CardHeader>
        <CardTitle>Ажлын мэдээлэл</CardTitle>
        <CardDescription>Тодорхой мэдээлэл нь зөв хүнийг татдаг</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Гарчиг */}
        <div className="space-y-2">
          <Label htmlFor="title">Гарчиг *</Label>
          <Input id="title" placeholder="Жишээ: Нохой салхилуулах - 30 минут" />
          <p className="text-sm text-muted-foreground">
            Юу хийх шаардлагатайг товч тодорхой бичнэ үү.
          </p>
        </div>

        {/* Төрөл */}
        <div className="space-y-2">
          <Label>Төрөл *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Ажлын төрөл сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pet-care">Амьтан асаргаа</SelectItem>
              <SelectItem value="errands">Ажил хэрэг</SelectItem>
              <SelectItem value="delivery">Хүргэлт</SelectItem>
              <SelectItem value="cleaning">Цэвэрлэгээ</SelectItem>
              <SelectItem value="assembly">Суулгалт</SelectItem>
              <SelectItem value="writing">Бичих/Засах</SelectItem>
              <SelectItem value="translation">Орчуулга</SelectItem>
              <SelectItem value="data-entry">Мэдээлэл оруулах</SelectItem>
              <SelectItem value="tech-help">Техник тусламж</SelectItem>
              <SelectItem value="other">Бусад</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Тайлбар */}
        <div className="space-y-2">
          <Label htmlFor="description">Дэлгэрэнгүй *</Label>
          <Textarea
            id="description"
            placeholder="Заавар, шаардлага, байршлын мэдээлэл гэх мэт..."
            className="min-h-[120px]"
          />
          <p className="text-sm text-muted-foreground">Дэлгэрэнгүй, ойлгомжтой бичих тусам сайн</p>
        </div>

        {/* Байршил / Цахимаар */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Байршил</Label>
            <div className="flex items-center gap-2">
              <Label htmlFor="remote" className="text-sm">
                Цахимаар
              </Label>
              <Switch id="remote" checked={isRemote} onCheckedChange={setIsRemote} />
            </div>
          </div>
          {!isRemote ? (
            <div className="space-y-2">
              <Input placeholder="Хаяг эсвэл бүсчлэл" />
              <p className="text-sm text-muted-foreground">
                Туслагчид ерөнхий бүсийг харах бөгөөд яг хаяг харагдахгүй
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-md border text-sm">
              <div className="flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4" /> Цахим ажил
              </div>
              <p className="text-muted-foreground">Интернэттэй газраас гүйцэтгэх боломжтой</p>
            </div>
          )}
        </div>

        {/* Хугацаа ба төвөгшил */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Тооцоолсон хугацаа *</Label>
            <Select onValueChange={handleDurationChange}>
              <SelectTrigger>
                <SelectValue placeholder="Хугацаа сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 минут</SelectItem>
                <SelectItem value="30">30 минут</SelectItem>
                <SelectItem value="45">45 минут</SelectItem>
                <SelectItem value="60">1 цаг</SelectItem>
                <SelectItem value="90">1.5 цаг</SelectItem>
                <SelectItem value="120">2 цаг</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Ажлын төвөгшил</Label>
            <Select onValueChange={handleComplexityChange}>
              <SelectTrigger>
                <SelectValue placeholder="Төвөгшил сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Хялбар</SelectItem>
                <SelectItem value="moderate">Дунд</SelectItem>
                <SelectItem value="complex">Хүнд</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Төлбөр */}
        <div className="space-y-4">
          <Label>Төлбөр</Label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="number"
                  placeholder="0"
                  className="pl-10 text-lg"
                  value={estimatedCost || ''}
                  onChange={(e) => setEstimatedCost(Number(e.target.value))}
                />
              </div>
            </div>
            {estimatedCost > 0 && (
              <div className="text-sm text-muted-foreground">
                <p>Санал болгож буй: ₮{estimatedCost}</p>
                <p className="text-xs">Хугацаа ба төвөгшлөөс хамаарсан</p>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Зөв төлбөр нь сайн туслагчдыг хурдан татдаг
          </p>
        </div>

        {/* Яаралтай эсэх */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            <div>
              <Label htmlFor="urgent" className="font-medium">
                Яаралтай болгож тэмдэглэх
              </Label>
              <p className="text-sm text-muted-foreground">
                Илүү хурдан хариу авах (бага хэмжээний нэмэлт төлбөртэй)
              </p>
            </div>
          </div>
          <Switch id="urgent" checked={isUrgent} onCheckedChange={setIsUrgent} />
        </div>

        {/* Нэмэлт шаардлага */}
        <div className="space-y-2">
          <Label htmlFor="requirements">Тусгай шаардлага (заавал биш)</Label>
          <Textarea
            id="requirements"
            placeholder="Тусгай ур чадвар, багаж хэрэгсэл, гэрчилгээ гэх мэт..."
            rows={3}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <Button variant="outline" className="flex-1">
            Ноорог болгон хадгалах
          </Button>
          <Button className="flex-1">Ажил нийтлэх</Button>
        </div>
      </CardContent>
    </Card>
  );
}
