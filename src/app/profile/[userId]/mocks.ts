// Mock user data
const mockUser = {
  id: 'user-123',
  firstName: 'Sarah',
  lastName: 'Chen',
  email: 'sarah.chen@email.com',
  phone: '+1-206-555-0123',
  profileImageUrl: '/placeholder.svg?height=120&width=120',
  bio: 'Experienced pet care specialist and reliable helper. I love animals and have been caring for pets for over 5 years. Also great at organizing, cleaning, and general errands. Always punctual and communicative!',
  location: {
    city: 'Seattle',
    state: 'WA',
    address: 'Capitol Hill neighborhood',
    latitude: 47.6205,
    longitude: -122.3212,
  },

  // Helper stats
  isHelper: true,
  helperRating: 4.9,
  helperRatingCount: 127,
  tasksCompleted: 143,
  totalEarned: 3247.5,
  completionRate: 98.6,
  responseTime: '< 3 min',
  availableNow: true,
  maxTravelDistance: 15,

  // Poster stats
  isTaskPoster: true,
  posterRating: 4.8,
  posterRatingCount: 23,
  tasksPosted: 28,
  totalSpent: 892.3,

  // Account info
  memberSince: 'March 2023',
  lastActive: '2 minutes ago',
  emailVerified: true,
  phoneVerified: true,
  backgroundCheckStatus: 'approved',

  // Skills and categories
  skills: [
    {
      name: 'Dog Walking',
      category: 'Pet Care',
      level: 'Expert',
      verified: true,
    },
    {
      name: 'Pet Sitting',
      category: 'Pet Care',
      level: 'Advanced',
      verified: true,
    },
    {
      name: 'House Cleaning',
      category: 'Cleaning',
      level: 'Advanced',
      verified: false,
    },
    {
      name: 'Grocery Shopping',
      category: 'Errands',
      level: 'Intermediate',
      verified: false,
    },
    {
      name: 'Organization',
      category: 'Cleaning',
      level: 'Advanced',
      verified: false,
    },
  ],

  // Availability
  availability: [
    { day: 'Monday', times: '9:00 AM - 6:00 PM' },
    { day: 'Tuesday', times: '9:00 AM - 6:00 PM' },
    { day: 'Wednesday', times: '9:00 AM - 6:00 PM' },
    { day: 'Thursday', times: '9:00 AM - 6:00 PM' },
    { day: 'Friday', times: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', times: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', times: 'Not Available' },
  ],
};

// Mock recent tasks
const recentTasks = [
  {
    id: 1,
    title: 'Walk golden retriever Max',
    type: 'completed',
    role: 'helper',
    date: '2 days ago',
    payment: '$18',
    rating: 5,
    client: 'Jennifer L.',
    feedback:
      'Sarah was amazing with Max! He came back so happy and tired. Very professional and sent updates during the walk.',
    duration: '45 mins',
    category: 'Pet Care',
  },
  {
    id: 2,
    title: 'Deep clean apartment before guests',
    type: 'completed',
    role: 'helper',
    date: '5 days ago',
    payment: '$65',
    rating: 5,
    client: 'Mike R.',
    feedback:
      'Incredible attention to detail. The apartment looked spotless when I got home. Highly recommend!',
    duration: '3 hours',
    category: 'Cleaning',
  },
  {
    id: 3,
    title: 'Organize home office space',
    type: 'completed',
    role: 'poster',
    date: '1 week ago',
    payment: '$45',
    rating: 5,
    helper: 'David K.',
    feedback:
      'David did an excellent job organizing my chaotic office. Everything has a place now!',
    duration: '2 hours',
    category: 'Organization',
  },
  {
    id: 4,
    title: 'Pet sitting for weekend trip',
    type: 'completed',
    role: 'helper',
    date: '2 weeks ago',
    payment: '$120',
    rating: 5,
    client: 'Lisa W.',
    feedback:
      'Sarah took such good care of Bella and Charlie. Sent photos and updates throughout the weekend. Will definitely book again!',
    duration: '2 days',
    category: 'Pet Care',
  },
];

// Mock reviews
const reviews = [
  {
    id: 1,
    rating: 5,
    date: '3 days ago',
    reviewer: 'Jennifer L.',
    reviewerRating: 4.9,
    task: 'Dog walking',
    comment:
      'Sarah is absolutely wonderful with dogs! Max was so excited to see her and came back perfectly exercised. She sent me a cute photo during the walk and was very communicative. Highly recommend!',
    helpful: 8,
  },
  {
    id: 2,
    rating: 5,
    date: '1 week ago',
    reviewer: 'Mike R.',
    reviewerRating: 4.7,
    task: 'Apartment cleaning',
    comment:
      "Exceeded expectations! Sarah arrived on time, was very thorough, and left my place spotless. She even organized some areas I didn't ask for. Professional and friendly.",
    helpful: 12,
  },
  {
    id: 3,
    rating: 5,
    date: '2 weeks ago',
    reviewer: 'Lisa W.',
    reviewerRating: 5.0,
    task: 'Pet sitting',
    comment:
      'I was nervous leaving my cats for the first time, but Sarah made me feel completely at ease. She sent regular updates and photos, and my cats were clearly comfortable with her. Will definitely book again!',
    helpful: 15,
  },
  {
    id: 4,
    rating: 4,
    date: '3 weeks ago',
    reviewer: 'Alex K.',
    reviewerRating: 4.8,
    task: 'Grocery shopping',
    comment:
      'Sarah did a great job with my grocery list. She texted about substitutions and got everything I needed. Only minor issue was she was about 10 minutes late, but she communicated about it.',
    helpful: 6,
  },
];

export { mockUser, recentTasks, reviews };
