import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, DollarSign, MapPin } from 'lucide-react';

interface Props {
  category: string;
  isUrgent: boolean;
  isRemote: boolean;
  estimatedCost: number;
}

export default function TaskPreview({ category, isUrgent, isRemote, estimatedCost }: Props) {
  if (!estimatedCost) return null;

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle className="text-lg">Ажлын урьдчилсан харагдац</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            {isUrgent && (
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                Яаралтай
              </Badge>
            )}
            {isRemote && (
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                Цахимаар
              </Badge>
            )}
          </div>
          <h3 className="font-medium">Нохой салхилуулах - 30 минут</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {isRemote ? 'Цахимаар' : 'Улаанбаатар хотын төв'}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> 30 минут
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" /> ₮{estimatedCost}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
