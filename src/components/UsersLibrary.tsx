"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Search, BookOpen } from "lucide-react"

import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { UserLibrary } from "../../types"

export default function UsersLibrary({ library }: { library: UserLibrary[] }) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter books based on search query
  const filteredBooks = library.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Render stars for ratings
  const renderRating = (rating?: number) => {
    if (!rating) return null

    return (
      <div className="flex">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-primary text-primary" />
        ))}
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-sidebar border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          My Library
        </h2>
        <p className="text-xs text-muted-foreground mt-1">{library.length} books in your collection</p>
      </div>

      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search books..."
            className="pl-8 h-9 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3">
          {library.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xs text-muted-foreground">No books found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {library.map((book) => (
                <div key={book.id} className="flex gap-3 group">
                  <div className="relative w-10 h-14 flex-shrink-0 bg-muted rounded overflow-hidden">
                    {book.coverImage ? (
                      <Image src={book.coverImage || "/placeholder.svg"} alt="" fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium line-clamp-1" title={book.title}>
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1" title={book.author}>
                      {book.author}
                    </p>
                    <div className="mt-1">{renderRating(book.rating)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-3 border-t">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Recently read</span>
          <Badge variant="outline" className="text-xs">
            {filteredBooks.length}
          </Badge>
        </div>
      </div>
    </div>
  )
}

