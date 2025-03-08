"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return
    
    if (!token) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [token, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {children}
    </>
  );
}
