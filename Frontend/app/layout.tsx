import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import type React from "react" // Added import for React
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Workflow Diagram Generator",
  description: "Generate workflow diagrams from text prompts",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
    </ClerkProvider>
  )
}



import './globals.css'