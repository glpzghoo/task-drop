'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewTaskFormData, NewTaskSchema } from './zod-schema/new-task';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Categories,
  useGetCategoriesQuery,
  useNewTaskMutation,
} from '@/graphql/generated';
import { useEffect, useState } from 'react';
import CustomSnackBar from '@/lib/CustomSnackbar';

const initialDefaults: NewTaskFormData = {
  title: '',
  description: '',
  type: '',
  location: '',
  isRemote: false,
  duration: '30',
  estimatedCost: 0,
  isUrgent: false,
  requirements: '',
};

export default function TaskForm() {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    success: boolean;
  } | null>(null);
  const { data } = useGetCategoriesQuery();
  const [NewTask, { data: response, error }] = useNewTaskMutation();
  const form = useForm<NewTaskFormData>({
    resolver: zodResolver(NewTaskSchema),
    defaultValues: initialDefaults,
  });

  const onSubmit = async (data: NewTaskFormData) => {
    console.log('Submitting form with data:', data);
    try {
      await NewTask({
        variables: { ...data, duration: Number(data.duration) },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const categories =
    data?.getCategories.filter((c): c is Categories => c.id !== undefined) ||
    [];
  const isRemote = useWatch({ control: form.control, name: 'isRemote' });

  useEffect(() => {
    if (response) {
      setSnackbar({
        message: 'Даалгавар амжилттай нийтлэгдлээ.',
        success: true,
      });
      form.reset(initialDefaults);
    }
    if (error) {
      setSnackbar({
        message: error.message,
        success: false,
      });
    }
  }, [response]);
  return (
    <Card className="border-muted shadow-sm">
      {snackbar && (
        <CustomSnackBar
          value={snackbar.message}
          success={snackbar.success}
          onClose={() => setSnackbar(null)}
        />
      )}
      <CardHeader>
        <CardTitle>Даалгаврын мэдээлэл</CardTitle>
        <CardDescription>
          Тодорхой мэдээлэл нь зөв хүнийг татна.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              <h3 className="text-lg font-semibold">Суурь мэдээлэл</h3>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Гарчиг *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Жишээ: Нохой салхилуулах — 30 минут"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Юу хийх шаардлагатайг товч тодорхой бичнэ үү.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Төрөл *</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value || 'other'}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Даалгаврын төрөл сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.length > 0 &&
                            categories.map((category) => {
                              if (category.slug !== 'бусад') return null;
                              return (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              );
                            })}
                          {categories.length > 0 ? (
                            categories.map((category) => {
                              if (category.slug === 'бусад') return null;
                              return (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              );
                            })
                          ) : (
                            <SelectItem disabled value="nothing">
                              Сонголт алга
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дэлгэрэнгүй *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Заавар, шаардлага, байршлын мэдээлэл гэх мэт..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Remote toggle */}
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              <h3 className="text-lg font-semibold">Байршил ба горим</h3>
              <FormField
                control={form.control}
                name="isRemote"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="m-0">Байршил *</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormLabel htmlFor="remote" className="text-sm">
                        Цахимаар
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!isRemote ? (
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Жишээ: Баянбүрд"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">
                        Ерөнхий хэллэгийг оруулна (Жишээ: Баянбүрд).
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="p-4 rounded-md border text-sm">
                  <div className="font-medium">Цахим даалгавар</div>
                  <p className="text-muted-foreground">
                    Интернэттэй газраас гүйцэтгэх боломжтой.
                  </p>
                </div>
              )}
            </div>
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              <h3 className="text-lg font-semibold">Хугацаа ба төвөгшил</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Хугацаа *</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          value={field.value || '30'}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Хугацаа сонгох" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 минут</SelectItem>
                            <SelectItem value="30">30 минут</SelectItem>
                            <SelectItem value="45">45 минут</SelectItem>
                            <SelectItem value="60">1 цаг</SelectItem>
                            <SelectItem value="90">1.5 цаг</SelectItem>
                            <SelectItem value="120">2 цаг</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              <FormField
                control={form.control}
                name="estimatedCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Үнэлгээ *</FormLabel>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₮
                      </span>
                      <FormControl>
                        <Input
                          type="number"
                          inputMode="numeric"
                          placeholder="0"
                          className="pl-7 text-base"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          value={field.value || ''}
                        />
                      </FormControl>
                    </div>

                    <div className="text-sm text-muted-foreground mt-2">
                      <p className="text-xs">
                        Даалгавар хэр төвөгтэйгээс хамааруулан, зохимжтой үнийг
                        санал болгоорой
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isUrgent"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-1">
                      <FormLabel className="m-0">
                        Яаралтай болгож тэмдэглэх *
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Илүү хурдан хариу авах (бага хэмжээний нэмэлт төлбөртэй)
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              <h3 className="text-lg font-semibold">Нэмэлт шаардлага</h3>

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тусгай шаардлага (заавал биш)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Тусгай ур чадвар, багаж хэрэгсэл, гэрчилгээ гэх мэт..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                disabled={form.formState.isSubmitting}
                className="flex-1"
                type="submit"
              >
                {form.formState.isSubmitting
                  ? 'Нийтэлж байна...'
                  : 'Даалгавар нийтлэх'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
