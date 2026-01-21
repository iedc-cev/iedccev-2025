"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Auto close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Allowed routes (FIXED)
  const allowedRoutes = ["/", "/events", "/achievement"]
  if (!allowedRoutes.includes(pathname)) return null

  const linkClass = (path: string) =>
    `block px-4 py-3 rounded-md transition-colors ${
      pathname === path
        ? "text-[#1A4C96] font-semibold bg-blue-50"
        : "text-gray-700 hover:bg-gray-100 hover:text-[#1A4C96]"
    }`

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="IEDC CEV Logo"
              width={120}
              height={36}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={pathname === "/" ? "text-[#1A4C96] font-medium" : "text-gray-700 hover:text-[#1A4C96]"}>
              Home
            </Link>

            <Link href="/events" className={pathname === "/events" ? "text-[#1A4C96] font-medium" : "text-gray-700 hover:text-[#1A4C96]"}>
              Events
            </Link>

            <Link href="/achievement" className={pathname === "/achievement" ? "text-[#1A4C96] font-medium" : "text-gray-700 hover:text-[#1A4C96]"}>
              Achievements
            </Link>

            <a
              href="https://www.instagram.com/iedc_cev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#1A4C96]"
            >
              Gallery
            </a>

            <Link
              href="/join"
              className="bg-[#1A4C96] hover:bg-[#1A4C96]/90 text-white rounded-md px-4 py-2"
            >
              Join IEDC
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-2 py-4 space-y-1">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/events" className={linkClass("/events")}>Events</Link>
            <Link href="/achievement" className={linkClass("/achievement")}>Achievements</Link>

            <a
              href="https://www.instagram.com/iedc_cev"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Gallery
            </a>

            <div className="pt-2">
              <Link
                href="/join"
                className="block text-center bg-[#1A4C96] hover:bg-[#1A4C96]/90 text-white rounded-md px-4 py-3"
              >
                Join IEDC
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
