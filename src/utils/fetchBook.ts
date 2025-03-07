interface OpenLibraryDoc {
  title: string;
  author_name?: string[];
  isbn?: string[];
  cover_edition_key?: string;
}

export async function fetchBook(searchQuery: string, searchBy: "isbn" | "title") {
  let url = "";

  if (searchBy === "isbn") {
    url = `https://openlibrary.org/api/books?bibkeys=ISBN:${searchQuery}&format=json&jscmd=data`;
  } else {
    url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchQuery)}&limit=15`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (!data) {
    throw new Error("No books found.");
  }

  if (searchBy === "isbn") {
    const bookData = data[`ISBN:${searchQuery}`];
    if (!bookData) throw new Error("Book not found.");

    return {
      title: bookData.title,
      author: bookData.authors?.[0]?.name || "Unknown Author",
      isbn: searchQuery,
      coverImage: bookData.cover?.large || bookData.cover?.medium || null,
    };
  } else {
    if (!data.docs || data.docs.length === 0) throw new Error("No books found.");

    return data.docs.map((book: OpenLibraryDoc) => ({
      title: book.title,
      author: book.author_name?.[0] || "Unknown Author",
      isbn: book.isbn?.[0] || null,
      coverImage: book.cover_edition_key ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg` : null,
    }));
  }
}
