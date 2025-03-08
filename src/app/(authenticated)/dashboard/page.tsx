"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookClub, User, UserLibrary } from "../../../../types";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import SideNav from "@/components/SideNav";

export default function BookClubDashboard() {
  const [user, setUser] = useState<User>();
  const [bookClub, setBookClub] = useState<BookClub | null>(null);
  const [library, setLibrary] = useState<UserLibrary[] | []>([]);
  const [loading, setLoading] = useState(true);  
  const [clubName, setClubName] = useState(""); // State for book club name
  const [creatingClub, setCreatingClub] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await apiRequest("/user/profile") as User;
        setUser(userData);

      // ✅ Try fetching book club, but catch errors gracefully
      try {
        const club = await apiRequest("/bookclub/my-club") as BookClub;
        setBookClub(club);
      } catch (clubError) {
        console.warn("User is not in a book club.", clubError);
        setBookClub(null); // Set to null instead of throwing an error
      }

        const libraryResponse = await apiRequest("/library") as { library: UserLibrary[] };
        setLibrary(libraryResponse.library);
      } catch (err) {
        console.error("Error fetching data:", err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function createBookClub() {
    if (!clubName.trim()) {
      alert("Please enter a book club name.");
      return;
    }

    setCreatingClub(true);
    try {
      const response = await apiRequest("/bookclub/create", {
        method: "POST",
        body: JSON.stringify({ name: clubName }),
      }) as BookClub;

      alert("Book club created!");
      setBookClub(response);
      setClubName("");
    } catch (err) {
      console.error("Error creating book club:", err);
      alert("Failed to create book club.");
    } finally {
      setCreatingClub(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-background">
      <SideNav user={user} library={library} />
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

            
            <div className="flex flex-col mb-4">
              <h2 className="text-xl font-semibold">Your Book Clubs</h2>
              { bookClub ? (
                <div>{ bookClub.name }</div>
              ):(
                <div className="flex flex-col">
                  <p className="text-muted-foreground">You are not in a book club yet.</p>
                  <div className="flex gap-4 mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Create Book Club</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle className="text-lg font-semibold">Create a Book Club</DialogTitle>
                        <Input
                          placeholder="Enter book club name"
                          value={clubName}
                          onChange={(e) => setClubName(e.target.value)}
                        />
                        <Button onClick={createBookClub} disabled={creatingClub}>
                          {creatingClub ? "Creating..." : "Create"}
                        </Button>
                      </DialogContent>
                    </Dialog>

                    <Button>Join Book Club</Button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}