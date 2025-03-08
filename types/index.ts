export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionTier: string;
  readingGoal: number;
  readingGoalProgress: number;
  readingStreak: number;
  currentlyReading?: Book | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  library: UserLibrary[];
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUserData: () => Promise<void>;
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
  addedAt: string;
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
