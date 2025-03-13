export async function fetchBook(searchQuery: string, searchBy: "isbn" | "title") {
  const url = searchBy === "isbn"
    ? `http://localhost:5000/books/search?isbn=${searchQuery}`
    : `http://localhost:5000/books/search?title=${encodeURIComponent(searchQuery)}`
  
  const response = await fetch(url)

  if (!response.ok) throw new Error("No book found")

  return await response.json()
}