import { BookData, OpenLibraryDoc } from "../../types";

export function parseOpenLibraryResponse(data: { docs?: OpenLibraryDoc[] }): BookData[] {
  if (!data || !data.docs || !Array.isArray(data.docs)) return [];

  return data.docs.map((doc: OpenLibraryDoc) => {
    const isbn = doc.ia?.find((id: string) => id.startsWith("isbn_"))?.replace("isbn_", "") || null;

    return {
      title: doc.title,
      author: doc.author_name?.[0] || "Unknown Author",
      isbn: isbn || null, // Use ISBN if available
      bookKey: doc.key.replace("/works/", ""), // Extract work key
      coverImage: doc.cover_edition_key
        ? `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-L.jpg`
        : null,
      firstPublishYear: doc.first_publish_year || null,
      language: doc.language || []
    };
  });
}
