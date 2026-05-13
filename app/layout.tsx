import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "Recruit.",
  description: "Recruitment for creative people",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}