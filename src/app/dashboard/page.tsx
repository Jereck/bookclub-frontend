"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";
import { useAuthGuard } from "@/utils/auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import SideNav from "@/components/SideNav";
import { BookClub, User, UserLibrary } from "../../../types";

export default function BookClubDashboard() {
  useAuthGuard();
  const [user, setUser] = useState<User>();
  const [bookClub, setBookClub] = useState<BookClub | null>(null);
  const [library, setLibrary] = useState<UserLibrary[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await apiRequest("/user/profile") as User;
        setUser(userData);

        const club = await apiRequest("/bookclub/my-club") as BookClub;
        setBookClub(club);

        const { library } = await apiRequest("/library") as { library: UserLibrary[] };
        setLibrary(library);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-background">
      <SideNav library={library} user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Current Read</CardTitle>
                </CardHeader>
                <CardContent>
                  {user?.currentlyReading ? (
                    <div className="flex items-center gap-4">
                      <Image
                        src={user.currentlyReading.coverImage || "/placeholder.svg"}
                        alt={user.currentlyReading.title}
                        width={60}
                        height={90}
                        className="rounded"
                      />
                      <div>
                        <h3 className="font-medium">{user.currentlyReading.title}</h3>
                        <p className="text-sm text-muted-foreground">{user.currentlyReading.author}</p>
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{Math.round(((user?.currentPage || 0) / 300) * 100)}%</span>
                          </div>
                          <Progress value={((user?.currentPage || 0) / 300) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>No book currently being read.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Reading Goal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-3xl font-bold">
                      {user?.readingGoalProgress || 0} / {user?.readingGoal || 0}
                    </div>
                    <p className="text-sm text-muted-foreground">Books read this year</p>
                    <Progress
                      value={((user?.readingGoalProgress || 0) / (user?.readingGoal || 1)) * 100}
                      className="w-full h-2 mt-4"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Reading Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">{user?.readingStreak}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Days in a row</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <div className="border">
                { bookClub?.name }
                <Button>Join Book Club</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


// "use client"

// import { useEffect, useState } from "react"
// import { apiRequest } from "@/utils/api"
// import { useAuthGuard } from "@/utils/auth"
// import Image from "next/image"
// import {
//   BookOpen,
//   Users,
//   BarChart,
//   Calendar,
//   Bell,
//   Search,
//   Star,
//   ChevronRight,
//   Clock,
//   BookMarked,
//   TrendingUp,
//   Menu,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Separator } from "@/components/ui/separator"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Progress } from "@/components/ui/progress"
// import { UserLibrary, BookClub } from "../../../types"
// import SideNav from "@/components/SideNav"

// interface Book {
//   id: string
//   title: string
//   author: string
//   coverImage?: string
//   rating?: number
// }

// // Sample data
// const sampleBooks: Book[] = [
//   {
//     id: "1",
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     coverImage: "/placeholder.svg?height=60&width=40",
//     rating: 4,
//   },
//   {
//     id: "2",
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     coverImage: "/placeholder.svg?height=60&width=40",
//     rating: 5,
//   },
//   {
//     id: "3",
//     title: "1984",
//     author: "George Orwell",
//     coverImage: "/placeholder.svg?height=60&width=40",
//     rating: 4,
//   },
//   {
//     id: "4",
//     title: "The Hobbit",
//     author: "J.R.R. Tolkien",
//     coverImage: "/placeholder.svg?height=60&width=40",
//     rating: 5,
//   },
//   {
//     id: "5",
//     title: "Pride and Prejudice",
//     author: "Jane Austen",
//     rating: 3,
//   },
// ]

// const bookClubs: BookClub[] = [
//   {
//     id: "1",
//     name: "Fiction Fanatics",
//     members: 24,
//     currentBook: sampleBooks[0],
//     nextMeeting: "March 15, 2025 • 7:00 PM",
//   },
//   {
//     id: "2",
//     name: "Mystery Readers",
//     members: 18,
//     currentBook: sampleBooks[2],
//     nextMeeting: "March 20, 2025 • 6:30 PM",
//   },
//   {
//     id: "3",
//     name: "Sci-Fi & Fantasy Club",
//     members: 32,
//     currentBook: sampleBooks[3],
//   },
// ]

// const recentActivity = [
//   { id: 1, action: "Started reading", book: "Dune", time: "2 hours ago" },
//   { id: 2, action: "Finished", book: "Project Hail Mary", time: "Yesterday" },
//   { id: 3, action: "Joined book club", book: "Mystery Readers", time: "2 days ago" },
//   { id: 4, action: "Added to library", book: "The Midnight Library", time: "3 days ago" },
// ]

// export default function BookClubDashboard() {
//   useAuthGuard()
//   const [bookClub, setBookClub] = useState<BookClub | null>(null)
//   const [library, setLibrary] = useState<UserLibrary[]>([])
//   const [loading, setLoading] = useState(true)



//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const club = await apiRequest("/bookclub/my-club") as BookClub
//         setBookClub(club)

//         const { library } = await apiRequest("/library") as { library: UserLibrary[] }
//         setLibrary(library)
//       } catch (err) {
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchData()
//   }, [])

//   return (
//     <div className="flex h-screen bg-background">
//       <SideNav library={library} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 sticky top-0 z-10">
//           <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
//           <div className="flex items-center gap-4">
//             <Button variant="outline" size="icon">
//               <Bell className="h-4 w-4" />
//             </Button>
//             <Avatar>
//               <AvatarImage src="/placeholder-user.jpg" />
//               <AvatarFallback>JD</AvatarFallback>
//             </Avatar>
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 overflow-auto p-4 md:p-6">
//           <div className="grid gap-6">
//             {/* Reading Progress */}
//             <div className="grid gap-4 md:grid-cols-3">
//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium">Current Read</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center gap-4">
//                     <div className="relative w-16 h-24 flex-shrink-0 bg-muted rounded overflow-hidden">
//                       <Image src="/placeholder.svg?height=120&width=80" alt="" fill className="object-cover" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium">The Midnight Library</h3>
//                       <p className="text-sm text-muted-foreground">Matt Haig</p>
//                       <div className="mt-2 space-y-1">
//                         <div className="flex justify-between text-xs">
//                           <span>Progress</span>
//                           <span>65%</span>
//                         </div>
//                         <Progress value={65} className="h-2" />
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium">Reading Goal</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-col items-center justify-center h-full">
//                     <div className="text-3xl font-bold">12 / 24</div>
//                     <p className="text-sm text-muted-foreground">Books read this year</p>
//                     <Progress value={50} className="w-full h-2 mt-4" />
//                     <p className="text-xs text-muted-foreground mt-2">50% of annual goal</p>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium">Reading Streak</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-col items-center justify-center h-full">
//                     <div className="flex items-center gap-2">
//                       <TrendingUp className="h-5 w-5 text-primary" />
//                       <span className="text-3xl font-bold">14</span>
//                     </div>
//                     <p className="text-sm text-muted-foreground">Days in a row</p>
//                     <p className="text-xs text-primary mt-4">+3 days from last week</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Book Clubs */}
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-semibold">Your Book Clubs</h2>
//                 <Button size="sm">Join New Club</Button>
//               </div>

//               <div className="grid gap-4 md:grid-cols-3">
//                 {bookClubs.map((club) => (
//                   <Card key={club.id}>
//                     <CardHeader>
//                       <CardTitle>{club.name}</CardTitle>
//                       <CardDescription>{club.members} members</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="flex items-center gap-3">
//                         <div className="relative w-12 h-16 flex-shrink-0 bg-muted rounded overflow-hidden">
//                           {club.currentBook.coverImage ? (
//                             <Image
//                               src={club.currentBook.coverImage || "/placeholder.svg"}
//                               alt=""
//                               fill
//                               className="object-cover"
//                             />
//                           ) : (
//                             <div className="absolute inset-0 flex items-center justify-center">
//                               <BookOpen className="w-4 h-4 text-muted-foreground" />
//                             </div>
//                           )}
//                         </div>
//                         <div>
//                           <h3 className="text-sm font-medium">Current Book</h3>
//                           <p className="font-medium">{club.currentBook.title}</p>
//                           <p className="text-sm text-muted-foreground">{club.currentBook.author}</p>
//                         </div>
//                       </div>

//                       {club.nextMeeting && (
//                         <div className="mt-4 flex items-center text-sm">
//                           <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
//                           <span>Next meeting: {club.nextMeeting}</span>
//                         </div>
//                       )}
//                     </CardContent>
//                     <CardFooter>
//                       <Button variant="outline" size="sm" className="w-full">
//                         View Club
//                       </Button>
//                     </CardFooter>
//                   </Card>
//                 ))}
//               </div>
//             </div>

//             {/* Activity and Recommendations */}
//             <div className="grid gap-4 md:grid-cols-2">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Recent Activity</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {recentActivity.map((activity) => (
//                       <div key={activity.id} className="flex items-start gap-4">
//                         <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
//                         <div>
//                           <p className="text-sm">
//                             <span className="font-medium">{activity.action}</span> {activity.book}
//                           </p>
//                           <p className="text-xs text-muted-foreground">{activity.time}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="ghost" size="sm" className="w-full">
//                     View All Activity
//                     <ChevronRight className="ml-1 h-4 w-4" />
//                   </Button>
//                 </CardFooter>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Upcoming Events</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex items-start gap-4">
//                       <div className="bg-primary/10 text-primary p-2 rounded">
//                         <Calendar className="h-4 w-4" />
//                       </div>
//                       <div>
//                         <p className="font-medium">Fiction Fanatics Meeting</p>
//                         <p className="text-sm">March 15, 2025 • 7:00 PM</p>
//                         <Badge variant="outline" className="mt-2">
//                           Virtual
//                         </Badge>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-4">
//                       <div className="bg-primary/10 text-primary p-2 rounded">
//                         <Users className="h-4 w-4" />
//                       </div>
//                       <div>
//                         <p className="font-medium">Author Q&A: Sarah Johnson</p>
//                         <p className="text-sm">March 22, 2025 • 6:00 PM</p>
//                         <Badge variant="outline" className="mt-2">
//                           In Person
//                         </Badge>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="ghost" size="sm" className="w-full">
//                     View Calendar
//                     <ChevronRight className="ml-1 h-4 w-4" />
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </div>

//             {/* Recommendations */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Recommended For You</CardTitle>
//                 <CardDescription>Based on your reading history</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                   {[1, 2, 3, 4, 5, 6].map((i) => (
//                     <div key={i} className="flex flex-col items-center text-center">
//                       <div className="relative w-24 h-36 bg-muted rounded overflow-hidden mb-2">
//                         <Image
//                           src={`/placeholder.svg?height=180&width=120&text=Book${i}`}
//                           alt=""
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <h3 className="text-sm font-medium line-clamp-1">Book Title {i}</h3>
//                       <p className="text-xs text-muted-foreground line-clamp-1">Author Name</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Button variant="ghost" size="sm" className="w-full">
//                   View All Recommendations
//                   <ChevronRight className="ml-1 h-4 w-4" />
//                 </Button>
//               </CardFooter>
//             </Card>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

