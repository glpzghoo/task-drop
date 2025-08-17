import z from 'zod';

export const NewApplicationSchema = z.object({
  message: z.string().min(5, 'Дор хаяж 5 үсэг оруулна уу!').max(500),
  proposedStartTime: z.string().min(10).max(100),
});

export type NewApplicationType = z.infer<typeof NewApplicationSchema>;
