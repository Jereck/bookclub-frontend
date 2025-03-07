import { Users } from "lucide-react";
import { Button } from "./ui/button";

export function EmptyBookClub({ router }: { router: any }) {
  return (
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
  )
}
