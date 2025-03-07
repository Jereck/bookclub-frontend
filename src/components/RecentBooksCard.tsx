import { BookMarked } from "lucide-react";
import { UserLibrary } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BookCard } from "./BookCard";
import { EmptyLibrary } from "./EmptyLibrary";

export function RecentBooksCard({ library, router }: { library: UserLibrary[]; router: any }) {
  const recentBooks = library.slice(0, 3)

  return (
    <Card>
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookMarked className="h-5 w-5 text-primary" />
            Recent Books
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => router.push("/library")} className="text-sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {recentBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentBooks.map((entry) => (
              <BookCard key={entry.id} entry={entry} compact />
            ))}
          </div>
        ) : (
          <EmptyLibrary router={router} />
        )}
      </CardContent>
    </Card>
  )
}