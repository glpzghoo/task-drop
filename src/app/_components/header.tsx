'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useCurrentUserQuery,
  useLogoutUserMutation,
} from '@/graphql/generated';
import { client } from '@/lib/ApolloClient';
import { Skeleton } from '@mui/material';
import { Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { data, loading } = useCurrentUserQuery();
  const [logout] = useLogoutUserMutation();

  const pathname = usePathname();
  const linkClass = (path: string) =>
    `hover:underline transition-colors ${
      pathname === path ? 'text-primary' : 'text-muted-foreground'
    }`;

  const Logout = async () => {
    try {
      await logout({ refetchQueries: ['CurrentUser'] });
    } catch {
      // catch deez nuts
    }
  };

  const refreshUser = async () => {
    try {
      await client.refetchQueries({
        include: ['CurrentUser'],
      });
    } catch (err) {
      console.error('Error refetching user:', err);
    }
  };

  return (
    <header className="border-b bg-background dark:bg-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">TaskDrop</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/browse" className={linkClass('/browse')}>
            Ажил хайх
          </Link>
          <Link href="/post" className={linkClass('/post')}>
            Ажил нийтлэх
          </Link>
          <Link href="/dashboard" className={linkClass('/dashboard')}>
            Хяналтын самбар
          </Link>
        </nav>
        {/* Mobile Nav */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                Цэс
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/browse">Ажил хайх</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/post">Ажил нийтлэх</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Хяналтын самбар</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {loading ? (
          <Skeleton className="h-4 w-[120px] rounded-md" />
        ) : data?.currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium text-foreground hover:underline">
              {data.currentUser?.firstName} {data.currentUser?.lastName}
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href={`/profile/${data.currentUser?.id}`}>Профайл</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={Logout}>Гарах</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link
                onClick={async () => {
                  await refreshUser();
                }}
                href="/nevtreh"
              >
                Нэвтрэх
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link
                onClick={async () => {
                  await refreshUser();
                }}
                href="/burtguuleh"
              >
                Бүртгүүлэх
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
