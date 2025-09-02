import z from 'zod';

export const NewTaskSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Гарчиг нь 2-100 тэмдэгт байх ёстой.' })
    .max(100),
  description: z
    .string()
    .min(10, { message: 'Дэлгэрэнгүй мэдээлэл 10-1000 тэмдэгт байх ёстой.' })
    .max(1000),
  type: z.string().min(1, { message: 'Төрөл сонгоно уу!' }).max(50),
  isRemote: z.boolean(),
  duration: z.enum(['15', '30', '45', '60', '90', '120'], {
    message: 'Хугацаа сонгоно уу.',
  }),
  estimatedCost: z.number().min(0),
  isUrgent: z.boolean(),
  urgencyFee: z.number().min(0).optional(),
  location: z.string().max(100).optional(),
  // advanced infos
  requirements: z.string().optional(),
  dueDate: z.string().optional(),
  maxApplications: z.number().optional(),
  autoAssign: z.boolean().optional(),
});

export type NewTaskFormData = z.infer<typeof NewTaskSchema>;
