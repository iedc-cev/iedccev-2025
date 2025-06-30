"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#1A4C96] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">IE</span>
            </div>
            <span className="font-bold text-xl text-gray-900">IEDC CEV</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#1A4C96] transition-colors">
              Home
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-[#1A4C96] transition-colors">
              Events
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-[#1A4C96] transition-colors">
              Gallery
            </Link>
            <Link href="/media" className="text-gray-700 hover:text-[#1A4C96] transition-colors">
              Media
            </Link>
            <Button className="bg-[#1A4C96] hover:bg-[#1A4C96]/90">Join IEDC</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-[#1A4C96]"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/events"
                className="block px-3 py-2 text-gray-700 hover:text-[#1A4C96]"
                onClick={() => setIsOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/gallery"
                className="block px-3 py-2 text-gray-700 hover:text-[#1A4C96]"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/media"
                className="block px-3 py-2 text-gray-700 hover:text-[#1A4C96]"
                onClick={() => setIsOpen(false)}
              >
                Media
              </Link>
              <div className="px-3 py-2">
                <Button className="w-full bg-[#1A4C96] hover:bg-[#1A4C96]/90">Join IEDC</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
