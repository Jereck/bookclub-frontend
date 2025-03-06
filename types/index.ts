export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  coverImage?: string;
}

export interface UserLibrary {
  id: string;
  userId: string;
  bookId: string;
  rating?: number;
  book: Book;
}

export interface BookClub {
  id: string;
  name: string;
  creatorId: string;
  createdAt: string;
  members?: { userId: string }[];
}
