interface Book {
  title: string;
  author: string;
  isbn: string | null;
  isbn13: string | null;
  coverImage: string | null;
  publisher?: string;
  language?: string;
  datePublished?: string;
  pages?: number;
  overview?: string;
}

export async function fetchBook(searchQuery: string, searchBy: "isbn" | "title"): Promise<Book[]> {
  const url = searchBy === "isbn"
    ? `http://localhost:5000/api/books/search?isbn=${searchQuery}`
    : `http://localhost:5000/api/books/search?title=${encodeURIComponent(searchQuery)}`;

  console.log("URL: ", url)

  const response = await fetch(url);

  console.log("Response: ", response)
  
  if (!response.ok) throw new Error("No books found.");

  return await response.json();
}
