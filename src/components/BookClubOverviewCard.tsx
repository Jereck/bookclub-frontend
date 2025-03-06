import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BookClub } from "../../types";

export function BookClubOverviewCard({ bookClub, router }: { bookClub: BookClub | null; router: any }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Book Club
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {bookClub ? (
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
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
        ) : (
          <div className="text-center py-6">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-2">You&apos;re not in a book club yet</h3>
            <p className="text-muted-foreground mb-4">Join a club to discuss books with others</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button onClick={() => router.push("/bookclub/join")}>Join a Club</Button>
              <Button variant="outline" onClick={() => router.push("/bookclub/create")}>
                Create a Club
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}