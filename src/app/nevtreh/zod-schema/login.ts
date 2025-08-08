import z from 'zod';

export const loginSchema = z.object({
  email: z.email('Буруу имэйл хаяг'),
  password: z.string().min(6, 'Нууц үг 6-аас дээш тэмдэгттэй байх ёстой'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
