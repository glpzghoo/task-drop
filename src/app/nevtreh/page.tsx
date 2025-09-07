'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loginSchema, LoginSchemaType } from './zod-schema/login';
import CustomSnackBar from '@/lib/CustomSnackbar';
import { CurrentUserDocument, useLoginUserMutation } from '@/graphql/generated';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loginUser, { data, error }] = useLoginUserMutation();
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [snackbar, setSnackbar] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const onSubmit = async (values: LoginSchemaType) => {
    try {
      const response = await loginUser({
        variables: values,
        refetchQueries: [{ query: CurrentUserDocument }],
      });

      if (response.data?.loginUser) {
        router.push('/');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  useEffect(() => {
    if (data) {
      setSnackbar({ message: 'Амжилттай нэвтэрлээ!', success: true });
    }
    if (error) {
      setSnackbar({ message: error.message, success: false });
    }
  }, [data, error]);

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-4xl bg-card rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left panel */}
        <div className="hidden md:flex flex-col justify-center items-center bg-muted p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Тавтай морил!
          </h2>
          <p className="text-muted-foreground">
            Нэвтэрч даалгавруудаа шалгаарай
          </p>
        </div>

        {/* Right panel — Login Form */}
        <div className="p-6 sm:p-8">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-2xl text-center text-foreground">
              Нэвтрэх
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {snackbar && (
              <CustomSnackBar
                value={snackbar.message}
                success={snackbar.success}
                onClose={() => setSnackbar(null)}
              />
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Майл</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Нууц үг</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Нэвтрэх
                </Button>
              </form>
            </Form>
            <p className="text-sm text-center text-muted-foreground mt-4">
              Хаяг байхгүй юу?{' '}
              <Link href="/burtguuleh" className="underline text-primary">
                Бүртгүүлэх
              </Link>
            </p>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
