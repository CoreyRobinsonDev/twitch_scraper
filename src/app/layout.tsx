import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Twitch Chat Stats",
  description: "Stats for twitch stats",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <html lang="en">
    <body className={inter.className}>
        <Suspense fallback={<p>Loading...</p>}>
            {children}
        </Suspense>
    </body>
</html>
  
}
