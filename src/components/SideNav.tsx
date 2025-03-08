import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { BarChart, BookMarked, BookOpen, Calendar, Menu, Search, Star, Users } from 'lucide-react'
import { Separator } from './ui/separator'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { User, UserLibrary } from '../../types'
import BookSearchModal from './BookSearchModal'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

interface SideNavProps {
  library: UserLibrary[];
  user?: User;
}

const SideNav = ({ user }: SideNavProps) => {
  const { logout, library, fetchUserData } = useAuthStore()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  const logoutUser = () => {
    logout()
    window.location.href = "/"; // Redirect to landing page
  }

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
    <>
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <div
        className={`w-64 h-full flex-shrink-0 border-r bg-sidebar transition-all duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">BookBuddy</h1>
            <p className="text-xs text-muted-foreground">Your reading companion</p>
          </div>

          {/* Navigation */}
          <div className="p-3">
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/library')}>
                <BookMarked className="mr-2 h-4 w-4" />
                My Library
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Book Clubs
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart className="mr-2 h-4 w-4" />
                Reading Stats
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Events
              </Button>
              <Button onClick={logoutUser} variant="ghost" className="w-full justify-start">
                Log out
              </Button>
            </nav>
          </div>

          <Separator />

          {/* Library Section */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-3 border-b">
              <h2 className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                My Library
              </h2>
              <p className="text-xs text-muted-foreground mt-1">{library.length} books in your collection</p>
              <BookSearchModal />
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
                    {library.map((libraryBook) => (
                      <div key={libraryBook.id} className="flex gap-3 group">
                        <div className="relative w-10 h-14 flex-shrink-0 bg-muted rounded overflow-hidden">
                          {libraryBook.book.coverImage ? (
                            <Image src={libraryBook.book.coverImage || "/placeholder.svg"} alt="" fill className="object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium line-clamp-1" title={libraryBook.book.title}>
                            {libraryBook.book.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-1" title={libraryBook.book.author}>
                            {libraryBook.book.author}
                          </p>
                          <div className="mt-1">{renderRating(libraryBook.rating)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* User Profile */}
          <div className="p-3 border-t">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideNav