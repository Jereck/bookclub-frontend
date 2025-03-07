import { OpenLibraryDoc } from "../../types";

interface Book {
  title: string;
  author: string;
  isbn: string | null;
  bookKey: string | null;
  coverImage: string | null;
}

export async function fetchBook(searchQuery: string, searchBy: "isbn" | "title") {
  const url = searchBy === "isbn"
    ? `https://openlibrary.org/api/books?bibkeys=ISBN:${searchQuery}&format=json&jscmd=data`
    : `https://openlibrary.org/search.json?title=${encodeURIComponent(searchQuery)}&limit=15`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data) throw new Error("No books found.");

  if (searchBy === "isbn") {
    const bookData = data[`ISBN:${searchQuery}`];
    if (!bookData) throw new Error("Book not found.");

    return {
      title: bookData.title,
      author: bookData.authors?.[0]?.name || "Unknown Author",
      isbn: searchQuery,
      bookKey: bookData.key || null, // Store Open Library Key
      coverImage: bookData.cover?.large || bookData.cover?.medium || null,
    };
  } else {
    if (!data.docs || data.docs.length === 0) throw new Error("No books found.");

    return data.docs
      .map((book: OpenLibraryDoc) => {
        // Extract ISBN
        const isbn = book.ia?.find((id) => id.startsWith("isbn_"))?.replace("isbn_", "") || null;

        // Extract Open Library Key
        const bookKey = book.key || null;

        return {
          title: book.title,
          author: book.author_name?.[0] || "Unknown Author",
          isbn: isbn,
          bookKey: bookKey,
          coverImage: book.cover_edition_key
            ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`
            : null,
        };
      })
      .filter((book: Book) => book !== null);
  }
}
