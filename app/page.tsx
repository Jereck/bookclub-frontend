"use client"

import { useAuthStore } from "@/stores/authStore";
import { apiRequest } from "@/utils/api";
import { fetchBook } from "@/utils/fetchBooks";
import Image from "next/image";
import { useEffect, useState } from "react";

type LibraryBook = {
  title: string;
  title_long: string;
  synopsis: string;
  publisher: string;
  pages: number;
  language: string;
  isbn: string;
  isbn10: string;
  isbn13: string;
  image: string;
  date_published: string;
  authors: string[];
}

type BookClub = {
  id: number;
  name: string;
}

export default function Home() {
  const { user } = useAuthStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [books, setBooks] = useState<LibraryBook[]>([])
  const [userLibrary, setUserLibrary] = useState<LibraryBook[]>([])
  const [userBookClubs, setUserBookClubs] = useState<BookClub[]>([])
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    async function fetchLibrary() {
      try {
        const library = await apiRequest("library") as LibraryBook[]
        setUserLibrary(library)
      } catch (error) {
        console.error("Error fetching library: ", error)
      }
    }
    async function fetchBookClubs() {
      try {
        const response = await apiRequest("bookclub") as BookClub[]
        console.log("Response: ", response)
        setUserBookClubs(response)
      } catch (error) {
        console.error("Error fetching book clubs: ", error)
      }
    }
    fetchLibrary()
    fetchBookClubs()
  }, [])

  async function handleSearch() {
    setLoading(true)
    try {
      const results = await fetchBook(searchQuery, "title")
      setBooks(results)
      console.log("Results: ", results[0])
    } catch (error) {
      console.error("Error fetching books: ", error)
    } finally {
      setLoading(false)
    }
  }

  async function addBookToLibrary(book: LibraryBook) {
    try {
      await apiRequest("library", {
        method: "POST",
        body: JSON.stringify(book)
      })

      alert("Book added to library")
    } catch (error) {
      console.error("Error adding book to library: ", error)
      alert("Failed to add book to library")
    }
  }

  console.log("User Book Clubs: ", userBookClubs)

  return (
    <div>
      <h2>Welcome, {user?.username}</h2>

      <div>
        <h2>Search Books:</h2>
        <input type="text" value={searchQuery} placeholder="Enter book title or ISBN13" onChange={(e) => setSearchQuery(e.target.value)} className="border rounded-sm w-[500px]" />
        <button onClick={handleSearch} disabled={loading} >Search</button>
      </div>

      <div>
        <h2>Your Library:</h2>
        <div className="grid grid-cols-12 gap-4">
          { userLibrary.map((book) => (
            <div key={book.isbn13} className="border p-2 rounded-sm my-2 flex flex-col col-span-4">
              <Image 
                src={book.image}
                alt={book.title}
                width={100}
                height={150}
              />
              <h3>{book.title}</h3>
              <p>{book.isbn13}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1>Your Book Clubs:</h1>
        <div>
          <ul>
            { userBookClubs.map((bookClub) => (
              <li key={bookClub.id}>
                <h3>{bookClub.name}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        { books.map((book) => (
          <div key={book.isbn13} className="border p-2 rounded-sm my-2 flex flex-col">
            <h3>{book.title}</h3>
            <p>{book.isbn13}</p>
            <p>{book.authors.join(", ")}</p>
            <button onClick={() => addBookToLibrary(book)}>Add to Library</button>
          </div>
        ))}
      </div>
    </div>
  );
}
