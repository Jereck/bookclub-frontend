"use client";

import { Suspense, useEffect } from "react";
import "./globals.css";
import { useAuthStore } from "@/stores/authStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  return (
    <html lang="en">
      <body
        className={`antialiased`}
        suppressHydrationWarning
      >
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
