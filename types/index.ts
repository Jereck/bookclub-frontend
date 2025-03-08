export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionTier: string;
  readingGoal: number;
  readingGoalProgress: number;
  readingStreak: number;
  lastReadDate?: string | null;
  currentlyReading?: UserLibrary | null; // ✅ Fix: Matches Prisma, as it stores UserLibrary, not Book
  currentPage?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  library: UserLibrary[];
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUserData: () => Promise<void>;
  checkAuth: () => void;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string | null;
  isbn13?: string | null;
  coverImage: string | null;
  publisher?: string;
  language?: string;
  datePublished?: string;
  pages?: number;
  overview?: string;
}

export interface UserLibrary {
  id: string;
  book: Book;
  rating?: number;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  readingGoal: number;
  readingGoalProgress: number;
  readingStreak: number;
  lastReadDate?: string | null;
  currentlyReading?: Book | null;
  currentPage?: number;
}

export interface BookClub {
  id: string;
  name: string;
  creatorId: string;
  members: Membership[];
  createdAt: string;
}

export interface Membership {
  id: string;
  userId: string;
  bookClubId: string;
  joinedAt: string;
}