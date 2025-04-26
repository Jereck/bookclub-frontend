"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from '@/amplify_outputs.json'


Amplify.configure(outputs)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='flex flex-col min-h-screen justify-center items-center'>
        <Authenticator>
          {children}
        </Authenticator>
      </body>
    </html>
  );
}
