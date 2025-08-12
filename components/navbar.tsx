"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { usePathname } from 'next/navigation' 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

 if (pathname !== '/' && pathname !== '/events') return null;

  return (
    <nav className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src='logo.png' alt='logo' width={130} height={130}/>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#1A4C96] transition-colors">
              Home
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-[#1A4C96] transition-colors">
              Events
            </Link>
            <Link href="/town" className="text-gray-700 hover:text-[#1A4C96] transition-colors">
              Town
            </Link>
            <a href="www.instagram.com/iedc_cev" className="text-gray-700 hover:text-[#1A4C96] transition-colors">
              Gallery
            </a>
            <Link  href='/join' className="bg-[#1A4C96] hover:bg-[#1A4C96]/90 text-white rounded px-4 py-2">Join IEDC</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <div className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </div>
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
                href="/town"
                className="block px-3 py-2 text-gray-700 hover:text-[#1A4C96]"
                onClick={() => setIsOpen(false)}
              >
                Town
              </Link>
              <a href="https://www.instagram.com/iedc_cev"
                className="block px-3 py-2 text-gray-700 hover:text-[#1A4C96]"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </a>
              <div className="px-3 py-2">
                <Link  href='/join' className="bg-[#1A4C96] hover:bg-[#1A4C96]/90 text-white rounded px-4 py-2">Join IEDC</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
