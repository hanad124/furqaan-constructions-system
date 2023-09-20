"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/context/Provider";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <SessionProvider session={null}>{children}</SessionProvider>
      </body>
    </html>
  );
}
