'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NewTaskFormData } from './zod-schema/new-task';
import { typeLabels } from '../utils/type-labels';

const STORAGE_KEY = 'taskFormData';

export default function TaskPreview() {
  const [form, setForm] = useState<NewTaskFormData>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedForm = localStorage.getItem(STORAGE_KEY);
      if (storedForm) {
        setForm(JSON.parse(storedForm));
      }
    }
  }, []);
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle className="text-lg">
          Даалгаврын урьдчилсан харагдац
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {(form?.type && typeLabels[form?.type]) || 'Бүх категори'}
            </Badge>
            {form?.isUrgent && (
              <Badge
                variant="outline"
                className="text-orange-600 border-orange-600"
              >
                Яаралтай
              </Badge>
            )}
            {form?.isRemote && (
              <Badge
                variant="outline"
                className="text-blue-600 border-blue-600"
              >
                Цахимаар
              </Badge>
            )}
          </div>
          <h3 className="font-medium">
            {form?.title || ''} - {form?.duration || 0} минут
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {form?.isRemote ? 'Цахимаар' : 'Улаанбаатар хотын төв'}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {form?.duration || 0} минут
            </div>
            <div className="flex items-center gap-1">
              ₮{form?.estimatedCost || 0}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
