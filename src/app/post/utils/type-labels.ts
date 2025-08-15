import { NewTaskFormData } from '../_components/zod-schema/new-task';

export const typeLabels: Record<NewTaskFormData['type'], string> = {
  'pet-care': 'Гэрийн тэжээвэр амьтан',
  errands: 'Даалгаврын гүйцэтгэл',
  delivery: 'Хүргэлт',
  cleaning: 'Цэвэрлэгээ',
  assembly: 'Бүтэц угсралт',
  writing: 'Бичвэр бичих',
  translation: 'Орчуулга',
  'data-entry': 'Өгөгдөл оруулах',
  'tech-help': 'Техникийн тусламж',
  other: 'Бусад',
};
