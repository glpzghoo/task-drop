import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          Өнөөдөр завтай юу?
          <br />
          <span className="text-secondary-foreground">
            Хэн нэгэнд ажил амжуулахад нь туслаарай.
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          TaskDrop нь завтай хүмүүсийг тусламж хэрэгтэй хүмүүстэй холбодог.
          Түргэн даалгавар гүйцэтгэж орлого олоорой.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/browse`}>
            <Button size="lg" className="text-lg px-8 py-3">
              Даалгавар хайх
            </Button>
          </Link>
          <Link href={`/post`}>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Даалгавар нийтлэх
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
