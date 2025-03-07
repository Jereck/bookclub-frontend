"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UnauthenticatedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard"); // Redirect logged-in users away
    }
  }, [router]);

  return <>{children}</>;
}
