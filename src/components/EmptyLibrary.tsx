import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Button } from "./ui/button";

export function EmptyLibrary() {
  const router = useRouter()
  return (
    <div className="text-center py-6">
      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
      <h3 className="text-lg font-medium mb-2">Your library is empty</h3>
      <p className="text-muted-foreground mb-4">Start adding books to your collection</p>
      <Button onClick={() => router.push("/library/add")}>Add Your First Book</Button>
    </div>
  )
}