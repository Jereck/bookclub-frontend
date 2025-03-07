"use client"

import type React from "react"

import { useState } from "react"
import { fetchBook } from "@/utils/fetchBook"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, Search, AlertCircle, Plus } from "lucide-react"
import Image from "next/image"

interface Book {
  isbn?: string
  title: string
  author: string
  coverImage?: string
  publishedDate?: string
  description?: string
}

export default function AddBookForm({ onSubmit }: { onSubmit: (book: Book) => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchBy, setSearchBy] = useState<"isbn" | "title">("isbn")
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleFetchBook() {
    if (!searchQuery.trim()) {
      setError("Please enter a search term")
      return
    }

    setLoading(true)
    setError("")

    try {
      const result = await fetchBook(searchQuery, searchBy)
      if (result) {
        if (searchBy === "isbn") {
          setBooks([result]) // ISBN search returns one book
        } else {
          setBooks(result) // Title search returns multiple books
        }

        if (Array.isArray(result) && result.length === 0) {
          setError("No books found. Try a different search term or enter details manually.")
        }
      } else {
        setError("Book not found. Please enter details manually.")
        setBooks([])
      }
    } catch (err) {
      console.error(err)
      setError("Book not found. Please enter details manually.")
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(book: Book) {
    onSubmit(book)
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Add a Book</h2>
            <p className="text-muted-foreground mt-1">Search for a book by ISBN or title, or enter details manually</p>
          </div>

          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-4 pt-4">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <Select onValueChange={(value) => setSearchBy(value as "isbn" | "title")} defaultValue={searchBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Search Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="isbn">ISBN</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-3 flex gap-2">
                    <Input
                      type="text"
                      placeholder={searchBy === "isbn" ? "Enter ISBN (e.g., 9780451524935)" : "Enter Book Title"}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleFetchBook} disabled={loading} className="flex-shrink-0">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <Spinner /> Searching...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Search className="h-4 w-4" /> Find Book
                        </span>
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Loading State */}
                {loading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {[1, 2, 3].map((i) => (
                      <BookCardSkeleton key={i} />
                    ))}
                  </div>
                )}

                {/* Results */}
                {!loading && books.length > 0 && (
                  <div className="space-y-4 mt-4">
                    <h3 className="text-lg font-medium">Search Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {books.map((book, index) => (
                        <BookCard key={book.isbn || `${book.title}-${index}`} book={book} onSelect={handleSubmit} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4 pt-4">
              <ManualEntryForm onSubmit={handleSubmit} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

function BookCard({ book, onSelect }: { book: Book; onSelect: (book: Book) => void }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex gap-4 h-full">
          <div className="flex-shrink-0">
            {book.coverImage ? (
              <Image
                src={book.coverImage || "/placeholder.svg"}
                alt={`Cover of ${book.title}`}
                width={80}
                height={120}
                className="h-[120px] w-[80px] object-cover rounded-md shadow-sm"
              />
            ) : (
              <div className="h-[120px] w-[80px] bg-muted flex items-center justify-center rounded-md">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <h4 className="font-semibold line-clamp-2">{book.title}</h4>
              <p className="text-sm text-muted-foreground">By {book.author}</p>
              {book.publishedDate && (
                <p className="text-xs text-muted-foreground mt-1">Published: {book.publishedDate}</p>
              )}
              {book.description && <p className="text-xs mt-2 line-clamp-2">{book.description}</p>}
            </div>

            <Button onClick={() => onSelect(book)} className="mt-3 w-full" size="sm">
              <Plus className="h-4 w-4 mr-1" /> Add to Library
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BookCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Skeleton className="h-[120px] w-[80px] rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-8 w-full mt-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

function ManualEntryForm({ onSubmit }: { onSubmit: (book: Book) => void }) {
  const [book, setBook] = useState<Book>({
    title: "",
    author: "",
    isbn: "",
    publishedDate: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBook((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (book.title && book.author) {
      onSubmit(book)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Book Title <span className="text-destructive">*</span>
          </label>
          <Input
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="author" className="text-sm font-medium">
            Author <span className="text-destructive">*</span>
          </label>
          <Input
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="isbn" className="text-sm font-medium">
            ISBN
          </label>
          <Input
            id="isbn"
            name="isbn"
            value={book.isbn || ""}
            onChange={handleChange}
            placeholder="Enter ISBN (optional)"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="publishedDate" className="text-sm font-medium">
            Publication Date
          </label>
          <Input
            id="publishedDate"
            name="publishedDate"
            value={book.publishedDate || ""}
            onChange={handleChange}
            placeholder="e.g., 2023 or June 2023"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={book.description || ""}
          onChange={handleChange}
          placeholder="Enter book description (optional)"
          className="w-full min-h-[100px] px-3 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="coverImage" className="text-sm font-medium">
          Cover Image URL
        </label>
        <Input
          id="coverImage"
          name="coverImage"
          value={book.coverImage || ""}
          onChange={handleChange}
          placeholder="Enter image URL (optional)"
        />
      </div>

      <Button type="submit" className="w-full">
        <Plus className="h-4 w-4 mr-1" /> Add to Library
      </Button>
    </form>
  )
}

