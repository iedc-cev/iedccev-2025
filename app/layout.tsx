import type React from "react"
import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SmoothScroll from "@/components/smooth-scroll"
import "./global.css"

const raleway = Raleway({ 
  subsets: ["latin"],
  variable: '--font-raleway',
})

export const metadata: Metadata = {
  title: "IEDC CE Vadakara - Innovation & Entrepreneurship",
  description:
    "Innovation and Entrepreneurship Development Cell at College of Engineering Vadakara. Create. Innovate. Explore.",
  keywords: "IEDC, Innovation, Entrepreneurship, College of Engineering Vadakara, Startup, Technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={raleway.variable}>
      <body className="font-raleway antialiased">
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
