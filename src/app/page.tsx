import Header from './_components/header';
import HeroSection from './_components/HeroSection';
import FeaturesSection from './_components/FeaturesSection';
import FeaturedTasks from './_components/FeaturedTasks';
import Footer from './_components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen  text-foreground">
      {/* Header */}
      <Header />
      <HeroSection />
      {/* Features */}
      <FeaturesSection />
      {/* Featured Tasks */}
      <FeaturedTasks />
      {/* Footer */}
      <Footer />
    </div>
  );
}
