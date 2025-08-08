const stats = {
  tasksCompleted: 47,
  totalEarned: 1247,
  averageRating: 4.9,
  responseTime: '< 5 min',
};

const activeTasks = [
  {
    id: 1,
    title: 'Алтан гөлөг салхилуулах',
    status: 'in-progress',
    payment: '$15',
    timeRemaining: '15 минут үлдлээ',
    location: 'Сиэтлийн төв',
    client: 'Сара М.',
  },
  {
    id: 2,
    title: 'Бизнес имэйл орчуулах',
    status: 'pending',
    payment: '$12',
    timeRemaining: '2 цаг үлдлээ',
    location: 'Онлайн',
    client: 'Майк Р.',
  },
];
const recentTasks = [
  {
    id: 1,
    title: 'IKEA номын тавиур組лог',
    completedDate: '2 цагийн өмнө',
    payment: '$35',
    rating: 5,
    client: 'Дэвид П.',
    feedback: 'Маш мэргэжлийн, хурдан ажилласан.',
  },
  {
    id: 2,
    title: 'Баримтаас мэдээлэл шивэх',
    completedDate: '1 өдрийн өмнө',
    payment: '$20',
    rating: 5,
    client: 'Лиза В.',
    feedback: 'Маш нарийн, хугацаанаасаа өмнө дууссан.',
  },
  {
    id: 3,
    title: 'Баримт бичиг авахаар явах',
    completedDate: '2 өдрийн өмнө',
    payment: '$25',
    rating: 4,
    client: 'Женнифер Л.',
    feedback: 'Байнгын харилцаатай, сайн ажилласан.',
  },
];

const postedTasks = [
  {
    id: 1,
    title: 'Гарааш цэвэрлэж, багаж хэрэгсэл ангилах',
    status: 'active',
    applications: 8,
    payment: '$45',
    postedDate: '3 цагийн өмнө',
  },
  {
    id: 2,
    title: 'Презентацын слайдыг хянах',
    status: 'completed',
    applications: 12,
    payment: '$25',
    postedDate: '1 долоо хоногийн өмнө',
    completedBy: 'Алекс К.',
  },
];

export { postedTasks, recentTasks, activeTasks, stats };
