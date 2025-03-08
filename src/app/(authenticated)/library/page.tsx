"use client"

import { useEffect, useState } from "react"
import type { UserLibrary } from "../../../../types"
import { apiRequest } from "@/utils/api"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import BookDetails from "@/components/BookDetails"
import { useAuthStore } from "@/stores/authStore"
import { Button } from "@/components/ui/button"
import { BookOpen, Filter, Search, SortAsc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const Library = () => {
  const { library, fetchUserData } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [selectedBook, setSelectedBook] = useState<UserLibrary | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"title" | "author" | "recent">("recent")
  const [filteredLibrary, setFilteredLibrary] = useState<UserLibrary[]>([])

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData()
      setLoading(false)
    }

    fetchData()
  }, [fetchUserData])

  useEffect(() => {
    if (!library) return

    let result = [...library]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (item) =>
          item.book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.book.author.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "title") {
        return a.book.title.localeCompare(b.book.title)
      } else if (sortBy === "author") {
        return a.book.author.localeCompare(b.book.author)
      } else {
        // Sort by most recently added (assuming there's a createdAt field)
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      }
    })

    setFilteredLibrary(result)
  }, [library, searchQuery, sortBy])

  async function handleSetCurrentlyReading(bookId: string) {
    try {
      await apiRequest("/user/currently-reading", {
        method: "PUT",
        body: JSON.stringify({ bookId }),
      })
      await fetchUserData()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error setting book as currently reading:", error)
    }
  }

  function handleBookSelect(book: UserLibrary) {
    setSelectedBook(book)
    setIsDialogOpen(true)
  }

  const isCurrentlyReading = (bookId: string) => {
    return library.some((item) => item.id === bookId && item.book)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Your Library</h1>

        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SortAsc className="h-4 w-4" />
                <span className="hidden sm:inline">Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setSortBy("recent")}
                className={cn(sortBy === "recent" && "font-medium")}
              >
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("title")} className={cn(sortBy === "title" && "font-medium")}>
                Title
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("author")}
                className={cn(sortBy === "author" && "font-medium")}
              >
                Author
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Books</DropdownMenuItem>
              <DropdownMenuItem>Currently Reading</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>Want to Read</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="grid" className="mb-6">
        <TabsList className="grid w-[200px] grid-cols-2">
          <TabsTrigger value="grid">Grid</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-6">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-[220px] w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredLibrary.length === 0 ? (
            <EmptyLibrary searchQuery={searchQuery} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredLibrary.map((userLibrary) => (
                <BookCard
                  key={userLibrary.id}
                  userLibrary={userLibrary}
                  isCurrentlyReading={isCurrentlyReading(userLibrary.id)}
                  onClick={() => handleBookSelect(userLibrary)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4 p-3 border rounded-lg">
                  <Skeleton className="h-24 w-16 rounded" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredLibrary.length === 0 ? (
            <EmptyLibrary searchQuery={searchQuery} />
          ) : (
            <div className="space-y-3">
              {filteredLibrary.map((userLibrary) => (
                <BookListItem
                  key={userLibrary.id}
                  userLibrary={userLibrary}
                  isCurrentlyReading={isCurrentlyReading(userLibrary.id)}
                  onClick={() => handleBookSelect(userLibrary)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedBook && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{selectedBook.book.title}</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="md:col-span-1">
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={selectedBook.book.coverImage || "/placeholder.svg?height=450&width=300"}
                    alt={selectedBook.book.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="mt-4 space-y-2">
                  {isCurrentlyReading(selectedBook.id) ? (
                    <Button variant="outline" className="w-full" disabled>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Currently Reading
                    </Button>
                  ) : (
                    <Button onClick={() => handleSetCurrentlyReading(selectedBook.id)} className="w-full">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Set as Currently Reading
                    </Button>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <BookDetails userLibrary={selectedBook} />
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

interface BookCardProps {
  userLibrary: UserLibrary
  isCurrentlyReading: boolean
  onClick: () => void
}

const BookCard = ({ userLibrary, isCurrentlyReading, onClick }: BookCardProps) => {
  return (
    <div className="group cursor-pointer transition-all duration-200 hover:translate-y-[-4px]" onClick={onClick}>
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md group-hover:shadow-xl">
        <Image
          src={userLibrary.book.coverImage || "/placeholder.svg?height=450&width=300"}
          alt={userLibrary.book.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {isCurrentlyReading && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
              <BookOpen className="mr-1 h-3 w-3" />
              Reading
            </Badge>
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-medium line-clamp-1">{userLibrary.book.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{userLibrary.book.author}</p>
      </div>
    </div>
  )
}

interface BookListItemProps {
  userLibrary: UserLibrary
  isCurrentlyReading: boolean
  onClick: () => void
}

const BookListItem = ({ userLibrary, isCurrentlyReading, onClick }: BookListItemProps) => {
  return (
    <div
      className="flex gap-4 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={onClick}
    >
      <div className="relative h-24 w-16 overflow-hidden rounded shadow-sm flex-shrink-0">
        <Image
          src={userLibrary.book.coverImage || "/placeholder.svg?height=240&width=160"}
          alt={userLibrary.book.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{userLibrary.book.title}</h3>
          {isCurrentlyReading && (
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
              <BookOpen className="mr-1 h-3 w-3" />
              Reading
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{userLibrary.book.author}</p>
        <p className="text-xs text-muted-foreground mt-1">ISBN: {userLibrary.book.isbn13}</p>
      </div>
    </div>
  )
}

interface EmptyLibraryProps {
  searchQuery: string
}

const EmptyLibrary = ({ searchQuery }: EmptyLibraryProps) => {
  if (searchQuery) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No results found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn&apos;t find any books matching &quot;{searchQuery}&quot;. Try a different search term or browse all books.
        </p>
      </div>
    )
  }

  return (
    <div className="text-center py-16 px-4 border-2 border-dashed rounded-xl">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <BookOpen className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">Your library is empty</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Start adding books to your library to keep track of what you&apos;re reading, what you&apos;ve read, and what you want to
        read next.
      </p>
      <Button className="mt-4">Browse Books</Button>
    </div>
  )
}

export default Library

