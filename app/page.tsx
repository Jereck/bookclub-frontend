"use client"

import type React from "react"

import { useAuthStore } from "@/stores/authStore"
import { apiRequest } from "@/utils/api"
import { fetchBook } from "@/utils/fetchBooks"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, BookOpen, Users, PlusCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"

type LibraryBook = {
  title: string
  title_long: string
  synopsis: string
  publisher: string
  pages: number
  language: string
  isbn: string
  isbn10: string
  isbn13: string
  image: string
  date_published: string
  authors: string[]
}

type BookClub = {
  id: number
  name: string
}

export default function Home() {
  const { user } = useAuthStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [books, setBooks] = useState<LibraryBook[]>([])
  const [userLibrary, setUserLibrary] = useState<LibraryBook[]>([])
  const [userBookClubs, setUserBookClubs] = useState<BookClub[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [library, bookClubs] = await Promise.all([
          apiRequest("library") as Promise<LibraryBook[]>,
          apiRequest("bookclub") as Promise<BookClub[]>,
        ])

        setUserLibrary(library)
        setUserBookClubs(bookClubs)
      } catch (error) {
        console.error("Error fetching data: ", error)
      } finally {
        setInitialLoading(false)
      }
    }

    fetchData()
  }, [])

  async function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const results = await fetchBook(searchQuery, "title")
      console.log("Search Results: ", results)
      setBooks(results)
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
        body: JSON.stringify(book),
      })

      // Add to local state to avoid refetching
      setUserLibrary((prev) => [...prev, book])

      // Show toast notification instead of alert
      // toast({ title: "Success", description: "Book added to your library" })
    } catch (error) {
      console.error("Error adding book to library: ", error)
      // toast({ title: "Error", description: "Failed to add book to library", variant: "destructive" })
    }
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.username}</h1>
        <p className="text-muted-foreground">Manage your books and book clubs</p>
      </header>

      {/* Search Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by title or ISBN..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Searching...
                </span>
              ) : (
                <span className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Library Section */}
        <section>
          <div className="flex items-center mb-4">
            <BookOpen className="mr-2 h-5 w-5" />
            <h2 className="text-2xl font-semibold">Your Library</h2>
          </div>

          {initialLoading ? (
            <div className="grid grid-cols-1 gap-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Skeleton className="h-[100px] w-[70px] flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : userLibrary.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {userLibrary.map((book) => (
                <BookCard key={book.isbn13} book={book} actionButton={null} compact={true} />
              ))}
            </div>
          ) : (
            <Card className="bg-muted/40">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <BookOpen className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-2">Your library is empty</h3>
                <p className="text-muted-foreground text-center mb-4">Search for books and add them to your library</p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Book Clubs Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              <h2 className="text-2xl font-semibold">Your Book Clubs</h2>
            </div>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Club
            </Button>
          </div>

          {initialLoading ? (
            <div className="grid grid-cols-1 gap-4">
              {[...Array(2)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : userBookClubs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {userBookClubs.map((bookClub) => (
                <Card key={bookClub.id} className="hover:bg-accent/50 transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle>{bookClub.name}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" size="sm">
                      View Club
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-muted/40">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Users className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-2">No book clubs yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Create or join a book club to discuss books with others
                </p>
                <Button size="sm">Create a Book Club</Button>
              </CardContent>
            </Card>
          )}
        </section>
      </div>

      {/* Search Results Section */}
      {(loading || books.length > 0 || (searchQuery && books.length === 0)) && (
        <section className="mt-8">
          <Separator className="mb-6" />
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Search Results
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Skeleton className="h-[100px] w-[70px] flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.isbn13}
                  book={book}
                  actionButton={
                    <Button onClick={() => addBookToLibrary(book)} size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add to Library
                    </Button>
                  }
                />
              ))}
            </div>
          ) : searchQuery ? (
            <Card className="bg-muted/40">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Search className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-2">No books found</h3>
                <p className="text-muted-foreground text-center">Try searching with a different title or ISBN</p>
              </CardContent>
            </Card>
          ) : null}
        </section>
      )}
    </div>
  )
}

function BookCard({
  book,
  actionButton,
  compact = false,
}: {
  book: LibraryBook
  actionButton: React.ReactNode
  compact?: boolean
}) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className={`${compact ? "p-4" : "p-6"} flex-1`}>
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Image
              src={book.image || "/placeholder.svg?height=150&width=100"}
              alt={book.title}
              width={compact ? 70 : 100}
              height={compact ? 100 : 150}
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold line-clamp-2 mb-1">{book.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{book.authors?.join(", ") || "Unknown Author"}</p>
            {book.publisher && !compact && (
              <p className="text-xs text-muted-foreground mb-1">
                {book.publisher}, {new Date(book.date_published).getFullYear()}
              </p>
            )}
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline" className="text-xs">
                ISBN: {book.isbn13}
              </Badge>
              {book.pages && !compact && (
                <Badge variant="outline" className="text-xs">
                  {book.pages} pages
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      {actionButton && <CardFooter className={compact ? "pt-0 px-4 pb-4" : "pt-0"}>{actionButton}</CardFooter>}
    </Card>
  )
}

