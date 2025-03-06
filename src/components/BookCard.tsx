import Image from "next/image";
import { UserLibrary } from "../../types";
import { Badge, BookOpen, Star } from "lucide-react";

export function BookCard({ entry, compact = false }: { entry: UserLibrary; compact?: boolean }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md ${compact ? "" : "h-full"}`}
    >
      <div className="flex flex-col h-full">
        <div className={`flex ${compact ? "flex-row gap-3 p-3" : "flex-col p-4"}`}>
          {entry.book.coverImage ? (
            <Image
              src={entry.book.coverImage || "/placeholder.svg"}
              alt={entry.book.title}
              width={compact ? 60 : 120}
              height={compact ? 90 : 180}
              className={`${compact ? "h-[90px] w-[60px]" : "w-full h-[180px] object-contain mb-3"} rounded-md shadow-sm`}
            />
          ) : (
            <div
              className={`${compact ? "h-[90px] w-[60px]" : "w-full h-[180px] mb-3"} bg-muted flex items-center justify-center rounded-md`}
            >
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          )}

          <div className={`${compact ? "" : "mt-2"} flex-1`}>
            <h3 className={`font-semibold line-clamp-1 ${compact ? "text-sm" : "text-base"}`}>{entry.book.title}</h3>
            <p className={`text-muted-foreground ${compact ? "text-xs" : "text-sm"}`}>by {entry.book.author}</p>

            {entry.rating && (
              <div className="flex items-center mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`${compact ? "h-3 w-3" : "h-4 w-4"} ${i < entry.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                  />
                ))}
              </div>
            )}

            {!compact && entry.status && (
              <Badge variant="outline" className="mt-2">
                {entry.status}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}