'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterSchemaType } from './zod-schema/register';
import { useCreateUserMutation } from '@/graphql/generated';
import CustomSnackBar from '@/lib/CustomSnackbar';
import { useState, useEffect } from 'react';

export default function RegisterPage() {
  const [createUser, { data, error }] = useCreateUserMutation();
  const [snackbar, setSnackbar] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (data) setSnackbar({ message: 'Амжилттай бүртгэгдлээ!', success: true });
    if (error) setSnackbar({ message: error.message, success: false });
  }, [data, error]);

  const onSubmit = async (values: RegisterSchemaType) => {
    try {
      await createUser({ variables: values });
    } catch {
      // catches nothing
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-4xl bg-card rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left side — info/branding */}
        <div className="hidden md:flex flex-col justify-center items-center bg-muted p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Тавтай морил!
          </h2>
          <p className="text-muted-foreground">
            Чөлөөт цагаа зөв зарцуулмаар байна уу? <br /> Эндээс эхэл!
          </p>
        </div>

        {/* Right side — form */}
        <div className="p-6 sm:p-8">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-2xl text-center text-foreground">
              Бүртгүүлэх
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Овог</FormLabel>
                        <FormControl>
                          <Input placeholder="Овог" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Нэр</FormLabel>
                        <FormControl>
                          <Input placeholder="Нэр" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Майл</FormLabel>
                      <FormControl>
                        <Input placeholder="Майл" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Утасны дугаар</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Утасны дугаар"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Нууц үг</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Нууц үг"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Нууц үг баталгаажуулах</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Дахин бичнэ үү"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  disabled={
                    form.formState.isSubmitting || !form.formState.isValid
                  }
                  type="submit"
                  className="w-full"
                >
                  Бүртгүүлэх
                </Button>
              </form>
            </Form>
            <p className="text-sm text-center text-muted-foreground mt-4">
              Хаягтай юу?{' '}
              <Link href="/nevtreh" className="underline text-primary">
                Нэвтрэх
              </Link>
            </p>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
