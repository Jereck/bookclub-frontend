"use client"

import { Suspense, useState } from "react";
import "./globals.css";
import { useAuthStore } from "@/stores/authStore";

import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { token, login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!token) {
    return (
      <html>
        <body>
          <Suspense>
            <div>
              <h1>Login</h1>
              <div className="flex flex-col max-w-6xl mx-auto gap-2">
                <input type='email' value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded-sm" />
                <input type='password' value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded-sm" />
                <button onClick={() => login(email, password)} >Login</button>
              </div>
            </div>
          </Suspense>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body>
        <Suspense>
          <Navbar />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
