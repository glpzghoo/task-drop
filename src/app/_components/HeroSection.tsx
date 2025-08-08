import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          30 минут завтай юу?
          <br />
          <span className="text-secondary">Хэн нэгэнд туслаарай.</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          TaskDrop нь завгүй хүмүүсийг тусламж хэрэгтэй хүмүүстэй холбодог. Түргэн ажил гүйцэтгэж
          орлого олоорой.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-3">
            Ажил хайх
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-3">
            Ажил нийтлэх
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
