import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum AccountStatus {
  Active = 'active',
  Banned = 'banned',
  Suspended = 'suspended'
}

export enum BackgroundCheckStatus {
  Approved = 'approved',
  Pending = 'pending',
  Rejected = 'rejected'
}

export enum DataType {
  Boolean = 'boolean',
  Decimal = 'decimal',
  Integer = 'integer',
  Json = 'json',
  String = 'string'
}

export type Mutation = {
  __typename?: 'Mutation';
  NewCategory: Categories;
  NewTask: Task;
  UpdateBio: Scalars['Boolean']['output'];
  UpdateTaskStatusBothSides: Scalars['Boolean']['output'];
  UploadPfp: Scalars['Boolean']['output'];
  createUser: Users;
  loginUser: Users;
  logoutUser: Scalars['Boolean']['output'];
  newTaskApplication: TaskApplications;
};


export type MutationNewCategoryArgs = {
  name: Scalars['String']['input'];
};


export type MutationNewTaskArgs = {
  description: Scalars['String']['input'];
  duration: Scalars['Int']['input'];
  estimatedCost: Scalars['Int']['input'];
  isRemote: Scalars['Boolean']['input'];
  isUrgent: Scalars['Boolean']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  requirements?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
  urgencyFee?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateBioArgs = {
  bio: Scalars['String']['input'];
};


export type MutationUpdateTaskStatusBothSidesArgs = {
  TaskApplicationId: Scalars['String']['input'];
  ratingGiven?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationUploadPfpArgs = {
  pfp: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationNewTaskApplicationArgs = {
  message: Scalars['String']['input'];
  proposedStartTime: Scalars['String']['input'];
  taskId: Scalars['String']['input'];
};

export enum ProficiencyLevel {
  Advanced = 'advanced',
  Beginner = 'beginner',
  Expert = 'expert',
  Intermediate = 'intermediate'
}

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<Users>;
  getCategories: Array<Categories>;
  getTaskById: Task;
  getTasks: Array<Maybe<Task>>;
  getUserById: Users;
  getUsers: Array<Maybe<Users>>;
};


export type QueryGetTaskByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export enum ReportReason {
  Fraud = 'fraud',
  InappropriateBehavior = 'inappropriate_behavior',
  NoShow = 'no_show',
  Other = 'other',
  PoorQuality = 'poor_quality',
  SafetyConcern = 'safety_concern'
}

export enum ReportStatus {
  Dismissed = 'dismissed',
  Investigating = 'investigating',
  Pending = 'pending',
  Resolved = 'resolved'
}

export type Task = {
  __typename?: 'Task';
  address?: Maybe<Scalars['String']['output']>;
  applications: Array<TaskApplications>;
  assignedTo?: Maybe<Scalars['String']['output']>;
  autoAssign?: Maybe<Scalars['Boolean']['output']>;
  category: Categories;
  categoryId: Scalars['String']['output'];
  city?: Maybe<Scalars['String']['output']>;
  completedAt?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  dueDate?: Maybe<Scalars['String']['output']>;
  estimatedDuration: Scalars['Int']['output'];
  helperFeedback?: Maybe<Scalars['String']['output']>;
  helperRating?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  isRemote: Scalars['Boolean']['output'];
  isUrgent: Scalars['Boolean']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  maxApplications?: Maybe<Scalars['Int']['output']>;
  paymentAmount: Scalars['Float']['output'];
  poster: Users;
  posterFeedback?: Maybe<Scalars['String']['output']>;
  posterId: Scalars['String']['output'];
  posterRating?: Maybe<Scalars['Float']['output']>;
  requirements?: Maybe<Scalars['String']['output']>;
  startedAt?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  status?: Maybe<TaskStatus>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  urgencyFee?: Maybe<Scalars['Float']['output']>;
  zipCode?: Maybe<Scalars['String']['output']>;
};

export enum TaskStatus {
  Archived = 'archived',
  Cancelled = 'cancelled',
  Completed = 'completed',
  InProgress = 'in_progress',
  Open = 'open'
}

export type UserReports = {
  __typename?: 'UserReports';
  adminNotes?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  evidenceUrls?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['String']['output'];
  reason: ReportReason;
  reportedUser: Users;
  reporteduserId: Scalars['String']['output'];
  reporter: Users;
  reporterId: Scalars['String']['output'];
  resolvedAt?: Maybe<Scalars['String']['output']>;
  status: ReportStatus;
  task?: Maybe<Task>;
  taskId?: Maybe<Scalars['String']['output']>;
};

export type UserSkills = {
  __typename?: 'UserSkills';
  category: Scalars['String']['output'];
  categoryId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  proficiencyLevel: ProficiencyLevel;
  skillName: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: Users;
  userId: Scalars['String']['output'];
  yearsExperience?: Maybe<Scalars['Int']['output']>;
};

export type Users = {
  __typename?: 'Users';
  accountStatus?: Maybe<AccountStatus>;
  address?: Maybe<Scalars['String']['output']>;
  availableNow?: Maybe<Scalars['Boolean']['output']>;
  backgroundCheckStatus?: Maybe<BackgroundCheckStatus>;
  bio?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  firstName: Scalars['String']['output'];
  helperRating?: Maybe<Scalars['Float']['output']>;
  helperRatingCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  isHelper?: Maybe<Scalars['Boolean']['output']>;
  isTaskPoster?: Maybe<Scalars['Boolean']['output']>;
  lastActiveAt?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  maxTravelDistance?: Maybe<Scalars['Int']['output']>;
  passwordHash: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  phoneVerified?: Maybe<Scalars['Boolean']['output']>;
  postedTasks?: Maybe<Array<Maybe<Task>>>;
  posterRating?: Maybe<Scalars['Float']['output']>;
  posterRatingCount?: Maybe<Scalars['Int']['output']>;
  preferredCategories?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  profileImageUrl?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  taskApplications?: Maybe<Array<Maybe<TaskApplications>>>;
  tasksCompleted?: Maybe<Scalars['Int']['output']>;
  tasksPosted?: Maybe<Scalars['Int']['output']>;
  totalEarned?: Maybe<Scalars['Float']['output']>;
  totalSpent?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['String']['output'];
  zipCode?: Maybe<Scalars['String']['output']>;
};

export enum ApplicationStatusEnum {
  Accepted = 'accepted',
  Pending = 'pending',
  Rejected = 'rejected',
  Withdrawn = 'withdrawn'
}

export type AvailabilitySchedules = {
  __typename?: 'availabilitySchedules';
  createdAt?: Maybe<Scalars['String']['output']>;
  dayOfWeek: Scalars['Int']['output'];
  endTime: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  startTime: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: Users;
  userId: Scalars['String']['output'];
};

export type Categories = {
  __typename?: 'categories';
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  sortOrder?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum MessageTypeEnum {
  File = 'file',
  Image = 'image',
  System = 'system',
  Text = 'text'
}

export type Messages = {
  __typename?: 'messages';
  attachmentUrl?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isRead: Scalars['Boolean']['output'];
  messageType: MessageTypeEnum;
  readAt?: Maybe<Scalars['String']['output']>;
  recipient: Users;
  recipientId: Scalars['String']['output'];
  sender: Users;
  senderId: Scalars['String']['output'];
  sentAt?: Maybe<Scalars['String']['output']>;
  task?: Maybe<Task>;
  taskId?: Maybe<Scalars['String']['output']>;
};

export type Notifications = {
  __typename?: 'notifications';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isEmailed: Scalars['Boolean']['output'];
  isPushed: Scalars['Boolean']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  readAt?: Maybe<Scalars['String']['output']>;
  relatedUser?: Maybe<Users>;
  relateduserId?: Maybe<Scalars['String']['output']>;
  task?: Maybe<Task>;
  taskId?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  user: Users;
  userId: Scalars['String']['output'];
};

export enum PaymentStatusEnum {
  Completed = 'completed',
  Failed = 'failed',
  Pending = 'pending',
  Processing = 'processing',
  Refunded = 'refunded'
}

export type Payments = {
  __typename?: 'payments';
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  netAmount?: Maybe<Scalars['Float']['output']>;
  payee: Users;
  payeeId: Scalars['String']['output'];
  payer: Users;
  payerId: Scalars['String']['output'];
  paymentMethod?: Maybe<Scalars['String']['output']>;
  platformFee?: Maybe<Scalars['Float']['output']>;
  processedAt?: Maybe<Scalars['String']['output']>;
  status: PaymentStatusEnum;
  stripeChargeId?: Maybe<Scalars['String']['output']>;
  stripePaymentIntentId?: Maybe<Scalars['String']['output']>;
  task: Task;
  taskId: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  urgencyFee?: Maybe<Scalars['Float']['output']>;
};

export type SystemSettings = {
  __typename?: 'systemSettings';
  createdAt?: Maybe<Scalars['String']['output']>;
  dataType: DataType;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

export type TaskApplications = {
  __typename?: 'taskApplications';
  appliedAt: Scalars['String']['output'];
  estimatedCompletionTime?: Maybe<Scalars['String']['output']>;
  helper: Users;
  helperId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
  proposedStartTime: Scalars['String']['output'];
  respondedAt?: Maybe<Scalars['String']['output']>;
  status: ApplicationStatusEnum;
  task: Task;
  taskId: Scalars['String']['output'];
};

export type TimeSessions = {
  __typename?: 'timeSessions';
  createdAt?: Maybe<Scalars['String']['output']>;
  durationMinutes?: Maybe<Scalars['Int']['output']>;
  endLatitude?: Maybe<Scalars['Float']['output']>;
  endLongitude?: Maybe<Scalars['Float']['output']>;
  endedAt?: Maybe<Scalars['String']['output']>;
  helper: Users;
  helperId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  startLatitude?: Maybe<Scalars['Float']['output']>;
  startLongitude?: Maybe<Scalars['Float']['output']>;
  startedAt: Scalars['String']['output'];
  status?: Maybe<TaskStatus>;
  task: Task;
  taskId: Scalars['String']['output'];
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'Users', id: string, lastName: string, email: string, firstName: string, emailVerified?: boolean | null } | null> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'Users', id: string, accountStatus?: AccountStatus | null, address?: string | null, availableNow?: boolean | null, backgroundCheckStatus?: BackgroundCheckStatus | null, bio?: string | null, email: string, firstName: string, lastName: string, phone: string, profileImageUrl?: string | null, dateOfBirth?: string | null, city?: string | null, state?: string | null, country?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, isHelper?: boolean | null, isTaskPoster?: boolean | null, maxTravelDistance?: number | null, preferredCategories?: Array<string | null> | null, helperRating?: number | null, helperRatingCount?: number | null, posterRating?: number | null, posterRatingCount?: number | null, tasksCompleted?: number | null, tasksPosted?: number | null, totalEarned?: number | null, totalSpent?: number | null, emailVerified?: boolean | null, phoneVerified?: boolean | null, createdAt: string, updatedAt: string, lastActiveAt?: string | null } | null };

export type GetUserByIdQueryVariables = Exact<{
  getUserByIdId: Scalars['ID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'Users', id: string, email: string, passwordHash: string, firstName: string, lastName: string, phone: string, profileImageUrl?: string | null, bio?: string | null, dateOfBirth?: string | null, address?: string | null, city?: string | null, state?: string | null, country?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, isHelper?: boolean | null, isTaskPoster?: boolean | null, availableNow?: boolean | null, maxTravelDistance?: number | null, preferredCategories?: Array<string | null> | null, helperRating?: number | null, helperRatingCount?: number | null, posterRating?: number | null, posterRatingCount?: number | null, tasksCompleted?: number | null, tasksPosted?: number | null, totalEarned?: number | null, totalSpent?: number | null, emailVerified?: boolean | null, phoneVerified?: boolean | null, backgroundCheckStatus?: BackgroundCheckStatus | null, accountStatus?: AccountStatus | null, createdAt: string, updatedAt: string, lastActiveAt?: string | null, postedTasks?: Array<{ __typename?: 'Task', id: string, posterId: string, categoryId: string, title: string, description: string, requirements?: string | null, isRemote: boolean, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, estimatedDuration: number, paymentAmount: number, isUrgent: boolean, urgencyFee?: number | null, status?: TaskStatus | null, assignedTo?: string | null, startedAt?: string | null, completedAt?: string | null, dueDate?: string | null, maxApplications?: number | null, autoAssign?: boolean | null, helperRating?: number | null, posterRating?: number | null, helperFeedback?: string | null, posterFeedback?: string | null, createdAt: string, updatedAt: string } | null> | null, taskApplications?: Array<{ __typename?: 'taskApplications', id: string, taskId: string, helperId: string, message: string, proposedStartTime: string, estimatedCompletionTime?: string | null, status: ApplicationStatusEnum, appliedAt: string, respondedAt?: string | null, task: { __typename?: 'Task', id: string, posterId: string, categoryId: string, title: string, description: string, requirements?: string | null, isRemote: boolean, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, estimatedDuration: number, paymentAmount: number, isUrgent: boolean, urgencyFee?: number | null, status?: TaskStatus | null, assignedTo?: string | null, startedAt?: string | null, completedAt?: string | null, dueDate?: string | null, maxApplications?: number | null, autoAssign?: boolean | null, helperRating?: number | null, posterRating?: number | null, helperFeedback?: string | null, posterFeedback?: string | null, createdAt: string, updatedAt: string, poster: { __typename?: 'Users', id: string, email: string, passwordHash: string, firstName: string, lastName: string, phone: string, profileImageUrl?: string | null, bio?: string | null, dateOfBirth?: string | null, address?: string | null, city?: string | null, state?: string | null, country?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, isHelper?: boolean | null, isTaskPoster?: boolean | null, availableNow?: boolean | null, maxTravelDistance?: number | null, preferredCategories?: Array<string | null> | null, helperRating?: number | null, helperRatingCount?: number | null, posterRating?: number | null, posterRatingCount?: number | null, tasksCompleted?: number | null, tasksPosted?: number | null, totalEarned?: number | null, totalSpent?: number | null, emailVerified?: boolean | null, phoneVerified?: boolean | null, backgroundCheckStatus?: BackgroundCheckStatus | null, accountStatus?: AccountStatus | null, createdAt: string, updatedAt: string, lastActiveAt?: string | null } } } | null> | null } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'categories', id: string, name: string, slug: string, description?: string | null, icon?: string | null, isActive: boolean, sortOrder?: number | null, createdAt?: string | null, updatedAt?: string | null }> };

export type GetTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksQuery = { __typename?: 'Query', getTasks: Array<{ __typename?: 'Task', id: string, posterId: string, categoryId: string, title: string, description: string, requirements?: string | null, isRemote: boolean, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, estimatedDuration: number, paymentAmount: number, isUrgent: boolean, urgencyFee?: number | null, status?: TaskStatus | null, assignedTo?: string | null, startedAt?: string | null, completedAt?: string | null, dueDate?: string | null, maxApplications?: number | null, autoAssign?: boolean | null, helperRating?: number | null, posterRating?: number | null, helperFeedback?: string | null, posterFeedback?: string | null, createdAt: string, updatedAt: string, poster: { __typename?: 'Users', id: string, email: string, firstName: string, lastName: string, phone: string, profileImageUrl?: string | null, bio?: string | null, dateOfBirth?: string | null, address?: string | null, city?: string | null, state?: string | null, country?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, isHelper?: boolean | null, isTaskPoster?: boolean | null, availableNow?: boolean | null, maxTravelDistance?: number | null, preferredCategories?: Array<string | null> | null, helperRating?: number | null, helperRatingCount?: number | null, posterRating?: number | null, posterRatingCount?: number | null, tasksCompleted?: number | null, tasksPosted?: number | null, totalEarned?: number | null, totalSpent?: number | null, emailVerified?: boolean | null, phoneVerified?: boolean | null, backgroundCheckStatus?: BackgroundCheckStatus | null, accountStatus?: AccountStatus | null, createdAt: string, updatedAt: string, lastActiveAt?: string | null }, category: { __typename?: 'categories', id: string, name: string, slug: string, description?: string | null, icon?: string | null, isActive: boolean, sortOrder?: number | null, createdAt?: string | null, updatedAt?: string | null } } | null> };

export type GetTaskByIdQueryVariables = Exact<{
  getTaskByIdId: Scalars['String']['input'];
}>;


export type GetTaskByIdQuery = { __typename?: 'Query', getTaskById: { __typename?: 'Task', id: string, posterId: string, categoryId: string, title: string, description: string, requirements?: string | null, isRemote: boolean, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, estimatedDuration: number, paymentAmount: number, isUrgent: boolean, urgencyFee?: number | null, status?: TaskStatus | null, assignedTo?: string | null, startedAt?: string | null, completedAt?: string | null, dueDate?: string | null, maxApplications?: number | null, autoAssign?: boolean | null, helperRating?: number | null, posterRating?: number | null, helperFeedback?: string | null, posterFeedback?: string | null, createdAt: string, updatedAt: string, poster: { __typename?: 'Users', id: string, email: string, firstName: string, lastName: string, phone: string, profileImageUrl?: string | null, bio?: string | null, dateOfBirth?: string | null, address?: string | null, city?: string | null, state?: string | null, country?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, isHelper?: boolean | null, isTaskPoster?: boolean | null, availableNow?: boolean | null, maxTravelDistance?: number | null, preferredCategories?: Array<string | null> | null, helperRating?: number | null, helperRatingCount?: number | null, posterRating?: number | null, posterRatingCount?: number | null, tasksCompleted?: number | null, tasksPosted?: number | null, totalEarned?: number | null, totalSpent?: number | null, emailVerified?: boolean | null, phoneVerified?: boolean | null, backgroundCheckStatus?: BackgroundCheckStatus | null, accountStatus?: AccountStatus | null, createdAt: string, updatedAt: string, lastActiveAt?: string | null }, category: { __typename?: 'categories', id: string, name: string, slug: string, description?: string | null, icon?: string | null, isActive: boolean, sortOrder?: number | null, createdAt?: string | null, updatedAt?: string | null }, applications: Array<{ __typename?: 'taskApplications', id: string, taskId: string, helperId: string, message: string, proposedStartTime: string, estimatedCompletionTime?: string | null, status: ApplicationStatusEnum, appliedAt: string, respondedAt?: string | null, helper: { __typename?: 'Users', id: string, email: string, passwordHash: string, firstName: string, lastName: string, phone: string, profileImageUrl?: string | null, bio?: string | null, dateOfBirth?: string | null, address?: string | null, city?: string | null, state?: string | null, country?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, isHelper?: boolean | null, isTaskPoster?: boolean | null, availableNow?: boolean | null, maxTravelDistance?: number | null, preferredCategories?: Array<string | null> | null, helperRating?: number | null, helperRatingCount?: number | null, posterRating?: number | null, posterRatingCount?: number | null, tasksCompleted?: number | null, tasksPosted?: number | null, totalEarned?: number | null, totalSpent?: number | null, emailVerified?: boolean | null, phoneVerified?: boolean | null, backgroundCheckStatus?: BackgroundCheckStatus | null, accountStatus?: AccountStatus | null, createdAt: string, updatedAt: string, lastActiveAt?: string | null } }> } };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'Users', id: string } };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'Users', id: string } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type UploadPfpMutationVariables = Exact<{
  pfp: Scalars['String']['input'];
}>;


export type UploadPfpMutation = { __typename?: 'Mutation', UploadPfp: boolean };

export type UpdateBioMutationVariables = Exact<{
  bio: Scalars['String']['input'];
}>;


export type UpdateBioMutation = { __typename?: 'Mutation', UpdateBio: boolean };

export type NewTaskMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  type: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  isRemote: Scalars['Boolean']['input'];
  isUrgent: Scalars['Boolean']['input'];
  duration: Scalars['Int']['input'];
  requirements?: InputMaybe<Scalars['String']['input']>;
  estimatedCost: Scalars['Int']['input'];
  urgencyFee?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NewTaskMutation = { __typename?: 'Mutation', NewTask: { __typename?: 'Task', title: string, id: string, posterId: string, categoryId: string, description: string, requirements?: string | null, isRemote: boolean, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, estimatedDuration: number, paymentAmount: number, isUrgent: boolean, urgencyFee?: number | null, status?: TaskStatus | null, assignedTo?: string | null, startedAt?: string | null, completedAt?: string | null, dueDate?: string | null, maxApplications?: number | null, autoAssign?: boolean | null, helperRating?: number | null, posterRating?: number | null, helperFeedback?: string | null, posterFeedback?: string | null, createdAt: string, updatedAt: string } };

export type NewTaskApplicationMutationVariables = Exact<{
  taskId: Scalars['String']['input'];
  message: Scalars['String']['input'];
  proposedStartTime: Scalars['String']['input'];
}>;


export type NewTaskApplicationMutation = { __typename?: 'Mutation', newTaskApplication: { __typename?: 'taskApplications', id: string } };


export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    lastName
    email
    firstName
    emailVerified
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
    accountStatus
    address
    availableNow
    backgroundCheckStatus
    bio
    email
    firstName
    lastName
    phone
    profileImageUrl
    dateOfBirth
    city
    state
    country
    zipCode
    latitude
    longitude
    isHelper
    isTaskPoster
    maxTravelDistance
    preferredCategories
    helperRating
    helperRatingCount
    posterRating
    posterRatingCount
    tasksCompleted
    tasksPosted
    totalEarned
    totalSpent
    emailVerified
    phoneVerified
    createdAt
    updatedAt
    lastActiveAt
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export function useCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserSuspenseQueryHookResult = ReturnType<typeof useCurrentUserSuspenseQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($getUserByIdId: ID!) {
  getUserById(id: $getUserByIdId) {
    id
    email
    passwordHash
    firstName
    lastName
    phone
    profileImageUrl
    bio
    dateOfBirth
    address
    city
    state
    country
    zipCode
    latitude
    longitude
    isHelper
    isTaskPoster
    availableNow
    maxTravelDistance
    preferredCategories
    postedTasks {
      id
      posterId
      categoryId
      title
      description
      requirements
      isRemote
      address
      city
      state
      zipCode
      latitude
      longitude
      estimatedDuration
      paymentAmount
      isUrgent
      urgencyFee
      status
      assignedTo
      startedAt
      completedAt
      dueDate
      maxApplications
      autoAssign
      helperRating
      posterRating
      helperFeedback
      posterFeedback
      createdAt
      updatedAt
    }
    helperRating
    helperRatingCount
    posterRating
    posterRatingCount
    tasksCompleted
    taskApplications {
      id
      taskId
      helperId
      message
      proposedStartTime
      estimatedCompletionTime
      status
      appliedAt
      respondedAt
      task {
        id
        posterId
        categoryId
        title
        description
        requirements
        isRemote
        address
        city
        state
        zipCode
        latitude
        longitude
        estimatedDuration
        paymentAmount
        isUrgent
        urgencyFee
        status
        assignedTo
        startedAt
        completedAt
        dueDate
        maxApplications
        autoAssign
        helperRating
        posterRating
        helperFeedback
        posterFeedback
        createdAt
        updatedAt
        poster {
          id
          email
          passwordHash
          firstName
          lastName
          phone
          profileImageUrl
          bio
          dateOfBirth
          address
          city
          state
          country
          zipCode
          latitude
          longitude
          isHelper
          isTaskPoster
          availableNow
          maxTravelDistance
          preferredCategories
          helperRating
          helperRatingCount
          posterRating
          posterRatingCount
          tasksCompleted
          tasksPosted
          totalEarned
          totalSpent
          emailVerified
          phoneVerified
          backgroundCheckStatus
          accountStatus
          createdAt
          updatedAt
          lastActiveAt
        }
      }
    }
    tasksPosted
    totalEarned
    totalSpent
    emailVerified
    phoneVerified
    backgroundCheckStatus
    accountStatus
    createdAt
    updatedAt
    lastActiveAt
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      getUserByIdId: // value for 'getUserByIdId'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables> & ({ variables: GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    name
    slug
    description
    icon
    isActive
    sortOrder
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetTasksDocument = gql`
    query GetTasks {
  getTasks {
    id
    posterId
    categoryId
    title
    description
    requirements
    isRemote
    address
    city
    state
    zipCode
    latitude
    longitude
    estimatedDuration
    paymentAmount
    isUrgent
    urgencyFee
    status
    assignedTo
    startedAt
    completedAt
    dueDate
    maxApplications
    autoAssign
    helperRating
    posterRating
    helperFeedback
    posterFeedback
    createdAt
    updatedAt
    poster {
      id
      email
      firstName
      lastName
      phone
      profileImageUrl
      bio
      dateOfBirth
      address
      city
      state
      country
      zipCode
      latitude
      longitude
      isHelper
      isTaskPoster
      availableNow
      maxTravelDistance
      preferredCategories
      helperRating
      helperRatingCount
      posterRating
      posterRatingCount
      tasksCompleted
      tasksPosted
      totalEarned
      totalSpent
      emailVerified
      phoneVerified
      backgroundCheckStatus
      accountStatus
      createdAt
      updatedAt
      lastActiveAt
    }
    category {
      id
      name
      slug
      description
      icon
      isActive
      sortOrder
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export function useGetTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksSuspenseQueryHookResult = ReturnType<typeof useGetTasksSuspenseQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const GetTaskByIdDocument = gql`
    query getTaskById($getTaskByIdId: String!) {
  getTaskById(id: $getTaskByIdId) {
    id
    posterId
    poster {
      id
      email
      firstName
      lastName
      phone
      profileImageUrl
      bio
      dateOfBirth
      address
      city
      state
      country
      zipCode
      latitude
      longitude
      isHelper
      isTaskPoster
      availableNow
      maxTravelDistance
      preferredCategories
      helperRating
      helperRatingCount
      posterRating
      posterRatingCount
      tasksCompleted
      tasksPosted
      totalEarned
      totalSpent
      emailVerified
      phoneVerified
      backgroundCheckStatus
      accountStatus
      createdAt
      updatedAt
      lastActiveAt
    }
    categoryId
    category {
      id
      name
      slug
      description
      icon
      isActive
      sortOrder
      createdAt
      updatedAt
    }
    title
    description
    requirements
    isRemote
    address
    city
    state
    zipCode
    latitude
    longitude
    estimatedDuration
    paymentAmount
    isUrgent
    urgencyFee
    status
    assignedTo
    startedAt
    completedAt
    dueDate
    maxApplications
    autoAssign
    helperRating
    posterRating
    helperFeedback
    posterFeedback
    createdAt
    updatedAt
    applications {
      id
      taskId
      helperId
      message
      proposedStartTime
      estimatedCompletionTime
      status
      appliedAt
      respondedAt
      helper {
        id
        email
        passwordHash
        firstName
        lastName
        phone
        profileImageUrl
        bio
        dateOfBirth
        address
        city
        state
        country
        zipCode
        latitude
        longitude
        isHelper
        isTaskPoster
        availableNow
        maxTravelDistance
        preferredCategories
        helperRating
        helperRatingCount
        posterRating
        posterRatingCount
        tasksCompleted
        tasksPosted
        totalEarned
        totalSpent
        emailVerified
        phoneVerified
        backgroundCheckStatus
        accountStatus
        createdAt
        updatedAt
        lastActiveAt
      }
    }
  }
}
    `;

/**
 * __useGetTaskByIdQuery__
 *
 * To run a query within a React component, call `useGetTaskByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskByIdQuery({
 *   variables: {
 *      getTaskByIdId: // value for 'getTaskByIdId'
 *   },
 * });
 */
export function useGetTaskByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTaskByIdQuery, GetTaskByIdQueryVariables> & ({ variables: GetTaskByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskByIdQuery, GetTaskByIdQueryVariables>(GetTaskByIdDocument, options);
      }
export function useGetTaskByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskByIdQuery, GetTaskByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskByIdQuery, GetTaskByIdQueryVariables>(GetTaskByIdDocument, options);
        }
export function useGetTaskByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTaskByIdQuery, GetTaskByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaskByIdQuery, GetTaskByIdQueryVariables>(GetTaskByIdDocument, options);
        }
export type GetTaskByIdQueryHookResult = ReturnType<typeof useGetTaskByIdQuery>;
export type GetTaskByIdLazyQueryHookResult = ReturnType<typeof useGetTaskByIdLazyQuery>;
export type GetTaskByIdSuspenseQueryHookResult = ReturnType<typeof useGetTaskByIdSuspenseQuery>;
export type GetTaskByIdQueryResult = Apollo.QueryResult<GetTaskByIdQuery, GetTaskByIdQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $firstName: String!, $lastName: String!, $password: String!, $phone: String!) {
  createUser(
    email: $email
    firstName: $firstName
    lastName: $lastName
    password: $password
    phone: $phone
  ) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      password: // value for 'password'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation loginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    id
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation logoutUser {
  logoutUser
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const UploadPfpDocument = gql`
    mutation UploadPfp($pfp: String!) {
  UploadPfp(pfp: $pfp)
}
    `;
export type UploadPfpMutationFn = Apollo.MutationFunction<UploadPfpMutation, UploadPfpMutationVariables>;

/**
 * __useUploadPfpMutation__
 *
 * To run a mutation, you first call `useUploadPfpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPfpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPfpMutation, { data, loading, error }] = useUploadPfpMutation({
 *   variables: {
 *      pfp: // value for 'pfp'
 *   },
 * });
 */
export function useUploadPfpMutation(baseOptions?: Apollo.MutationHookOptions<UploadPfpMutation, UploadPfpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadPfpMutation, UploadPfpMutationVariables>(UploadPfpDocument, options);
      }
export type UploadPfpMutationHookResult = ReturnType<typeof useUploadPfpMutation>;
export type UploadPfpMutationResult = Apollo.MutationResult<UploadPfpMutation>;
export type UploadPfpMutationOptions = Apollo.BaseMutationOptions<UploadPfpMutation, UploadPfpMutationVariables>;
export const UpdateBioDocument = gql`
    mutation UpdateBio($bio: String!) {
  UpdateBio(bio: $bio)
}
    `;
export type UpdateBioMutationFn = Apollo.MutationFunction<UpdateBioMutation, UpdateBioMutationVariables>;

/**
 * __useUpdateBioMutation__
 *
 * To run a mutation, you first call `useUpdateBioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBioMutation, { data, loading, error }] = useUpdateBioMutation({
 *   variables: {
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useUpdateBioMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBioMutation, UpdateBioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBioMutation, UpdateBioMutationVariables>(UpdateBioDocument, options);
      }
export type UpdateBioMutationHookResult = ReturnType<typeof useUpdateBioMutation>;
export type UpdateBioMutationResult = Apollo.MutationResult<UpdateBioMutation>;
export type UpdateBioMutationOptions = Apollo.BaseMutationOptions<UpdateBioMutation, UpdateBioMutationVariables>;
export const NewTaskDocument = gql`
    mutation NewTask($title: String!, $description: String!, $type: String!, $location: String, $isRemote: Boolean!, $isUrgent: Boolean!, $duration: Int!, $requirements: String, $estimatedCost: Int!, $urgencyFee: Int) {
  NewTask(
    title: $title
    description: $description
    type: $type
    location: $location
    isRemote: $isRemote
    isUrgent: $isUrgent
    duration: $duration
    requirements: $requirements
    estimatedCost: $estimatedCost
    urgencyFee: $urgencyFee
  ) {
    title
    id
    posterId
    categoryId
    description
    requirements
    isRemote
    address
    city
    state
    zipCode
    latitude
    longitude
    estimatedDuration
    paymentAmount
    isUrgent
    urgencyFee
    status
    assignedTo
    startedAt
    completedAt
    dueDate
    maxApplications
    autoAssign
    helperRating
    posterRating
    helperFeedback
    posterFeedback
    createdAt
    updatedAt
  }
}
    `;
export type NewTaskMutationFn = Apollo.MutationFunction<NewTaskMutation, NewTaskMutationVariables>;

/**
 * __useNewTaskMutation__
 *
 * To run a mutation, you first call `useNewTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newTaskMutation, { data, loading, error }] = useNewTaskMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      type: // value for 'type'
 *      location: // value for 'location'
 *      isRemote: // value for 'isRemote'
 *      isUrgent: // value for 'isUrgent'
 *      duration: // value for 'duration'
 *      requirements: // value for 'requirements'
 *      estimatedCost: // value for 'estimatedCost'
 *      urgencyFee: // value for 'urgencyFee'
 *   },
 * });
 */
export function useNewTaskMutation(baseOptions?: Apollo.MutationHookOptions<NewTaskMutation, NewTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewTaskMutation, NewTaskMutationVariables>(NewTaskDocument, options);
      }
export type NewTaskMutationHookResult = ReturnType<typeof useNewTaskMutation>;
export type NewTaskMutationResult = Apollo.MutationResult<NewTaskMutation>;
export type NewTaskMutationOptions = Apollo.BaseMutationOptions<NewTaskMutation, NewTaskMutationVariables>;
export const NewTaskApplicationDocument = gql`
    mutation NewTaskApplication($taskId: String!, $message: String!, $proposedStartTime: String!) {
  newTaskApplication(
    taskId: $taskId
    message: $message
    proposedStartTime: $proposedStartTime
  ) {
    id
  }
}
    `;
export type NewTaskApplicationMutationFn = Apollo.MutationFunction<NewTaskApplicationMutation, NewTaskApplicationMutationVariables>;

/**
 * __useNewTaskApplicationMutation__
 *
 * To run a mutation, you first call `useNewTaskApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewTaskApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newTaskApplicationMutation, { data, loading, error }] = useNewTaskApplicationMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      message: // value for 'message'
 *      proposedStartTime: // value for 'proposedStartTime'
 *   },
 * });
 */
export function useNewTaskApplicationMutation(baseOptions?: Apollo.MutationHookOptions<NewTaskApplicationMutation, NewTaskApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewTaskApplicationMutation, NewTaskApplicationMutationVariables>(NewTaskApplicationDocument, options);
      }
export type NewTaskApplicationMutationHookResult = ReturnType<typeof useNewTaskApplicationMutation>;
export type NewTaskApplicationMutationResult = Apollo.MutationResult<NewTaskApplicationMutation>;
export type NewTaskApplicationMutationOptions = Apollo.BaseMutationOptions<NewTaskApplicationMutation, NewTaskApplicationMutationVariables>;