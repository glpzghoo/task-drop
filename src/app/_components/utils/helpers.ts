import { UserRole } from '@/lib/get-user-role';

export const getUserRolePronoun = (value: UserRole): string => {
  if (value === 'poster') return 'Захиалагч';
  if (value === 'helper') return 'Гүйцэтгэгч';
  return 'Тодорхойгүй';
};

export const StarLabels: { [index: string]: string } = {
  0.5: 'Хэрэггүй',
  1: 'Хэрэггүй+',
  1.5: 'Хэцүүхэн',
  2: 'Хэцүүхэн+',
  2.5: 'Зүгээр',
  3: 'Зүгээр+',
  3.5: 'Сайн',
  4: 'Сайн+',
  4.5: 'Мундаг',
  5: 'Мундаг+',
};
