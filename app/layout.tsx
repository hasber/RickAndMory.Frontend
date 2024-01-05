import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import SearchAppBar from "@/organisms/appbar/AppBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick And Morty",
  description: "App de prueba",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchAppBar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
