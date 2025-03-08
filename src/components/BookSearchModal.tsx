import { useState } from "react";
import { fetchBook } from "@/utils/fetchBook";
import { apiRequest } from "@/utils/api";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Book } from "../../types";

export default function BookSearchModal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    setLoading(true);
    setError("");

    try {
      const results = await fetchBook(searchQuery, "title") as Book[];
      setBooks(results);
    } catch (err) {
      console.error("Error searching for book:", err);
      setError("No books found.");
    } finally {
      setLoading(false);
    }
  }

  async function addBookToLibrary(book: Book) {
    try {
      await apiRequest("/library/add", {
        method: "POST",
        body: JSON.stringify({ 
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          isbn13: book.isbn13,
          coverImage: book.coverImage,
          publisher: book.publisher,
          language: book.language,
          datePublished: book.datePublished,
          pages: book.pages,
        }),
      });

      alert("Book added to your library!");
    } catch (err) {
      console.error("Error adding book:", err);
      alert("Failed to add book.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-2">
          + Add Book
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold mb-2">Search for a Book</DialogTitle>
        <div className="flex gap-2">
          <Input
            placeholder="Enter book title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch} disabled={loading}>
            Search
          </Button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ScrollArea className="mt-4 max-h-64">
          {books.map((book) => (
            <div key={book.isbn} className="flex gap-4 items-center border-b pb-2 mb-2">
              <Image src={book.coverImage || "/placeholder.svg"} alt={book.title} width={50} height={75} className="rounded" />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{book.title}</h3>
                <p className="text-xs text-muted-foreground">{book.author}</p>
              </div>
              <Button size="sm" onClick={() => addBookToLibrary(book)}>
                Add
              </Button>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
