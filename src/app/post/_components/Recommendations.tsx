import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Recommendations() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg">
          Илүү үр дүнтэй нийтлэх зөвлөмж
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
          <li>Юу хийх шаардлагатай, хэзээ хийхийг тодорхой бич</li>
          <li>Бүх шаардлагатай мэдээллийг урьдчилан оруул</li>
          <li>Зохистой төлбөр нь илүү сайн хариу татна</li>
          <li>Хэрэв боломжтой бол зургаар нэмэлт тайлбар хийнэ</li>
          <li>Туслагчдын хүсэлтэд хурдан хариу өг</li>
        </ul>
      </CardContent>
    </Card>
  );
}
