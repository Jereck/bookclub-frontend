export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  coverImage?: string;
  createdAt: string; // Added to match Prisma
}

export interface UserLibrary {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  rating?: number;
  userId: string;
  createdAt: string;
  book: Book;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  readingGoal: number;
  readingGoalProgress: number;
  readingStreak: number;
  lastReadDate?: string;
  currentlyReading?: Book;
  currentPage?: number;
}

export interface Membership {
  id: string;
  user: User; // Full user info instead of just userId
  userId: string;
  bookClubId: string;
  joinedAt: string;
}

export interface BookClub {
  id: string;
  name: string;
  creator: User; // Now holds full user info
  createdAt: string;
  members?: Membership[]; // Updated to hold full user details
}

export interface BookData {
  title: string; // Book title
  author: string; // Primary author
  isbn?: string | null; // ISBN if available
  bookKey: string; // OpenLibrary work key (fallback unique ID)
  coverImage?: string | null; // Cover image URL
  firstPublishYear?: number | null; // First published year
  language?: string[]; // Available languages
}

export interface OpenLibraryDoc {
  title: string;
  author_name?: string[];
  ia?: string[];
  cover_edition_key?: string;
  key: string;
  first_publish_year?: number;
  language?: string[];
}
