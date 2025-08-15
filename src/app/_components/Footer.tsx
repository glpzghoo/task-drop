import { Zap } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-background py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-foreground">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xl font-bold">TaskDrop</span>
            </div>
            <p className="text-muted-foreground">
              Түргэн ажлуудыг гүйцэтгэхэд хүмүүсийг холбодог платформ.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Туслагчдад</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/browse" className="hover:underline">
                  Даалгавар хайх
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:underline">
                  Хэрхэн Ажиллах вэ?
                </Link>
              </li>
              <li>
                <Link href="/earnings" className="hover:underline">
                  Орлого
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Даалгавар захиалагчдад</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/post" className="hover:underline">
                  Даалгавар нийтлэх
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:underline">
                  Үнийн мэдээлэл
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:underline">
                  Аюулгүй байдал
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Тусламж</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/help" className="hover:underline">
                  Тусламжийн төв
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Холбоо барих
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Нөхцөл
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 TaskDrop. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
