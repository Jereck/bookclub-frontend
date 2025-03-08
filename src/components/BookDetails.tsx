import React from "react";
import { UserLibrary } from "../../types";
import Image from "next/image";


const BookDetails = ({ userLibrary }: { userLibrary: UserLibrary}) => {
  return (
    <div className="p-4">
      <div className="flex gap-6">
        <Image
          src={userLibrary.book.coverImage || "/placeholder.svg"}
          alt={userLibrary.book.title}
          width={150}
          height={225}
          className="rounded-lg"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{userLibrary.book.title}</h2>
          <p className="text-md text-gray-500">{userLibrary.book.author}</p>
          <p className="mt-2 text-sm">
            <span className="font-semibold">Publisher:</span> {userLibrary.book?.publisher || "Unknown"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Language:</span> {userLibrary.book?.language || "Unknown"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Published:</span> {userLibrary.book?.datePublished || "N/A"}
          </p>
          <p className="mt-4 text-sm">{userLibrary.book?.overview || "No description available."}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Your Rating:</span> {userLibrary.rating || "Not rated"}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Added on:</span> {new Date(userLibrary.createdAt).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default BookDetails;