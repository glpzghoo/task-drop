export const mockTask = {
  id: 'task-456',
  title: 'Walk my golden retriever Max for 45 minutes',
  description:
    "I need someone reliable to walk my 3-year-old golden retriever Max while I'm at work. He's very friendly, well-trained, and loves meeting new people. The walk should be around the Capitol Hill neighborhood - there are great parks nearby. Max is used to a 45-minute walk and knows the route well. Please bring water for him if it's a hot day. I'll provide leash, waste bags, and any other supplies needed.",
  requirements:
    'Must be comfortable with medium-large dogs. Previous dog walking experience preferred. Please be punctual as I need to leave for work. Max is friendly but can be excited initially - just needs a calm, confident handler.',

  // Basic details
  category: {
    id: 'pet-care',
    name: 'Pet Care',
    slug: 'pet-care',
    icon: 'heart',
  },
  paymentAmount: 18.0,
  estimatedDuration: 45, // minutes
  isUrgent: true,
  urgencyFee: 4.5,
  isRemote: false,

  // Location
  address: 'Capitol Hill, Seattle, WA',
  city: 'Seattle',
  state: 'WA',
  latitude: 47.6205,
  longitude: -122.3212,

  // Status and timing
  status: 'open',
  createdAt: '2024-01-15T09:30:00Z',
  dueDate: '2024-01-15T14:00:00Z', // Today at 2 PM
  maxApplications: 8,
  autoAssign: false,

  // Poster information
  poster: {
    id: 'user-789',
    firstName: 'Jennifer',
    lastName: 'Martinez',
    profileImageUrl: '/placeholder.svg?height=60&width=60',
    posterRating: 4.8,
    posterRatingCount: 23,
    tasksPosted: 31,
    memberSince: 'June 2023',
    emailVerified: true,
    phoneVerified: true,
    backgroundCheckStatus: 'approved',
    responseTime: '< 10 min',
    location: 'Capitol Hill, Seattle',
  },

  // Applications
  applicationCount: 5,
  applications: [
    {
      id: 'app-1',
      helper: {
        id: 'user-123',
        firstName: 'Sarah',
        lastName: 'Chen',
        profileImageUrl: '/placeholder.svg?height=40&width=40',
        helperRating: 4.9,
        helperRatingCount: 127,
        tasksCompleted: 143,
        completionRate: 98.6,
        responseTime: '< 3 min',
      },
      message:
        "Hi Jennifer! I'd love to walk Max. I have over 5 years of experience with golden retrievers and live just a few blocks away in Capitol Hill. I'm available right now and can be there within 10 minutes. I always carry water and treats, and I'll send you updates during the walk!",
      appliedAt: '2024-01-15T09:45:00Z',
      proposedStartTime: '2024-01-15T10:30:00Z',
      status: 'pending',
    },
    {
      id: 'app-2',
      helper: {
        id: 'user-456',
        firstName: 'Mike',
        lastName: 'Johnson',
        profileImageUrl: '/placeholder.svg?height=40&width=40',
        helperRating: 4.7,
        helperRatingCount: 89,
        tasksCompleted: 95,
        completionRate: 96.8,
        responseTime: '< 5 min',
      },
      message:
        "Hello! I'm a professional dog walker with 3 years of experience. I know the Capitol Hill area very well and have walked many golden retrievers. I can start immediately and will make sure Max gets a great workout!",
      appliedAt: '2024-01-15T09:52:00Z',
      proposedStartTime: '2024-01-15T11:00:00Z',
      status: 'pending',
    },
  ],
};
