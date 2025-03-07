"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { apiRequest } from "@/utils/api"
import { useAuthGuard } from "@/utils/auth"
import type { BookClub, UserLibrary } from "../../../types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, PlusCircle, Library } from "lucide-react"
import { BookClubOverviewCard } from "@/components/BookClubOverviewCard"
import { EmptyBookClub } from "@/components/EmptyBookClub"
import { EmptyLibrary } from "@/components/EmptyLibrary"
import { BookCard } from "@/components/BookCard"
import { RecentBooksCard } from "@/components/RecentBooksCard"

export default function Dashboard() {
  useAuthGuard()
  const router = useRouter()
  const [bookClub, setBookClub] = useState<BookClub | null>(null)
  const [library, setLibrary] = useState<UserLibrary[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    async function fetchData() {
      try {
        const club = await apiRequest("/bookclub/my-club") as BookClub
        setBookClub(club)

        const { library } = await apiRequest("/library") as { library: UserLibrary[] }
        setLibrary(library)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-8 max-w-6xl">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Reading Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your books and connect with fellow readers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/library/add")} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add Book</span>
          </Button>
          {!bookClub && (
            <Button onClick={() => router.push("/bookclub/create")} className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Create Club</span>
            </Button>
          )}
        </div>
      </header>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="library">My Library</TabsTrigger>
          <TabsTrigger value="club">Book Club</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <BookClubOverviewCard bookClub={bookClub} />
          <RecentBooksCard library={library} />
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Library className="h-5 w-5 text-primary" />
                    Your Library
                  </CardTitle>
                  <CardDescription>Books you&apos;ve added to your collection</CardDescription>
                </div>
                <Button onClick={() => router.push("/library/add")} size="sm" className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Book</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {library.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {library.map((entry) => (
                    <BookCard key={entry.id} entry={entry} />
                  ))}
                </div>
              ) : (
                <EmptyLibrary />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="club" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Book Club
              </CardTitle>
              <CardDescription>Connect with other readers and discuss books</CardDescription>
            </CardHeader>
            <CardContent>
              {bookClub ? (
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-muted/50 p-4 rounded-lg">
                    <div>
                      <h3 className="text-xl font-semibold">{bookClub.name}</h3>
                      <p className="text-muted-foreground flex items-center gap-1 mt-1">
                        <Users className="h-4 w-4" />
                        {bookClub.members?.length || 0} members
                      </p>
                    </div>
                    <Button onClick={() => router.push(`/bookclub/${bookClub.id}`)} className="flex items-center gap-2">
                      View Club
                    </Button>
                  </div>
                </div>
              ) : (
                <EmptyBookClub />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-[400px]" />

        <Card>
          <CardHeader className="bg-primary/5 border-b">
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <Skeleton className="h-7 w-48 mb-2" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-10 w-28" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary/5 border-b">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-8 w-20" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 p-3 border rounded-lg">
                  <Skeleton className="h-[90px] w-[60px] rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

