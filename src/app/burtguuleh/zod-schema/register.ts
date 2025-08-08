import z from 'zod';

export const registerSchema = z
  .object({
    firstName: z.string().min(1, 'Нэр оруулна уу'),
    lastName: z.string().min(1, 'Овог оруулна уу'),
    email: z.email('Буруу имэйл хаяг'),
    phone: z.string().min(8, 'Утасны дугаар 8-аас дээш тэмдэгттэй байх ёстой'),
    password: z.string().min(6, 'Нууц үг 6-аас дээш тэмдэгттэй байх ёстой'),
    confirmPassword: z.string().min(6, 'Нууц үг 6-аас дээш тэмдэгттэй байх ёстой'),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    { message: 'Нууц үг тохирохгүй байна', path: ['confirmPassword'] }
  );

export type RegisterSchemaType = z.infer<typeof registerSchema>;
