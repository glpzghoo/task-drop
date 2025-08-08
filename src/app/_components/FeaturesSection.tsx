import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Shield, Zap } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="text-center">
          <CardHeader>
            <Clock className="w-12 h-12 text-secondary mx-auto mb-4" />
            <CardTitle>Хурдан ба Хялбар</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ажлуудын ихэнх нь 15-60 минут. Богинохон чөлөөт цагаа үр дүнтэй ашиглаарай.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <Zap className="w-12 h-12 text-secondary mx-auto mb-4" />
            <CardTitle>Шуурхай холболт</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              "Бэлэн" горимыг асаагаад орчин тойрны ажлуудад даруй холбогдоорой.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <Shield className="w-12 h-12 text-secondary mx-auto mb-4" />
            <CardTitle>Аюулгүй төлбөр</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Цаг хянах, баталгаатай төлбөрийн системтэй. Ажил дуусмагц шууд орлого олоорой.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeaturesSection;
