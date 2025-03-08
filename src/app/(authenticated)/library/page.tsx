"use client";

import React, { useEffect, useState } from "react";
import { UserLibrary } from "../../../../types";
import { apiRequest } from "@/utils/api";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BookDetails from "../book/[id]/page";

const Library = () => {
  const [library, setLibrary] = useState<UserLibrary[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<UserLibrary | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const libraryResponse = (await apiRequest("/library")) as { library: UserLibrary[] };
        setLibrary(libraryResponse.library);
      } catch (error) {
        console.error("Error fetching library:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-semibold mb-6 text-center">📚 Your Library</h1>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      ) : library.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>No books in your library yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {library.map((userLibrary) => (
            <Dialog key={userLibrary.id}>
              <DialogTrigger asChild>
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedBook(userLibrary)}
                >
                  <div className="overflow-hidden rounded-lg shadow-md transition-all group-hover:shadow-xl">
                    <Image
                      src={userLibrary.book.coverImage || "/placeholder.svg"}
                      alt={userLibrary.book.title}
                      width={150}
                      height={200}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-md font-medium">{userLibrary.book.title}</h3>
                    <p className="text-sm text-gray-500">{userLibrary.book.author}</p>
                  </div>
                </div>
              </DialogTrigger>
              {selectedBook && (
                <DialogContent>
                  <DialogTitle className="text-xl font-semibold">{selectedBook.book.title}</DialogTitle>
                  <DialogDescription>ISBN: { selectedBook.book.isbn13 }</DialogDescription>
                  <BookDetails userLibrary={selectedBook} />
                </DialogContent>
              )}
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
