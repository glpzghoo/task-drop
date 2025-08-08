import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Clock, MapPin } from 'lucide-react';

const FeaturedTasks = () => {
  const featuredTasks = [
    {
      id: 1,
      title: '30 минут нохой салхилуулах',
      description:
        'Максийг уулзалтынхаа үеэр хороололоор салхилуулах хүнд хэрэгтэй байна',
      location: 'Улаанбаатар хотын төв',
      duration: '30 минут',
      payment: '15,000₮',
      category: 'Амьтан асаргаа',
      urgent: true,
    },
    {
      id: 2,
      title: 'Имэйл орчуулга (Испани -> Англи)',
      description: '200 үгтэй бизнес имэйлийг хурдан орчуулах шаардлагатай',
      location: 'Цахимаар',
      duration: '15 минут',
      payment: '12,000₮',
      category: 'Орчуулга',
      urgent: false,
    },
    {
      id: 3,
      title: 'Оффисоос бичиг баримт авах',
      description:
        'Төв оффисоос гэрээний баримтуудыг аваад ирэх хүн хайж байна',
      location: 'Санхүүгийн дүүрэг',
      duration: '45 минут',
      payment: '25,000₮',
      category: 'Ажил хэрэг',
      urgent: true,
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Яг одоо боломжтой ажлууд</h2>
        <p className="text-muted-foreground">
          Одоогоор оролцож туслах эсвэл орлого олоорой
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {featuredTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge variant={task.urgent ? 'destructive' : 'secondary'}>
                  {task.category}
                </Badge>
                {task.urgent && (
                  <Badge
                    variant="outline"
                    className="text-red-600 border-red-600"
                  >
                    Яаралтай
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg">{task.title}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {task.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {task.duration}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-2xl font-bold text-green-600">
                    {task.payment}
                  </span>
                  <Button size="sm">Өргөдөл гаргах</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Бүх ажлуудыг үзэх
        </Button>
      </div>
    </section>
  );
};

export default FeaturedTasks;
