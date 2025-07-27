'use client'
import Link from "next/link"
import { Instagram, Youtube, Mail, MapPin } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation' 

export default function Footer() {
  const pathname = usePathname()

  // Hide footer on /join
  if (pathname === '/join' || pathname ===  '/eceee' || pathname ===  '/raspberrypi' || pathname ===  '/xylem) return null

  return (
    <footer className="bg-[#1c4f75] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image src='logo.png' alt='logo' width={150} height={150}/>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Innovation and Entrepreneurship Development Cell at College of Engineering Vadakara. Where ideas meet
              execution.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">College of Engineering Vadakara, Kerala</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/events" className="block text-gray-400 hover:text-white transition-colors">
                Events
              </Link>
              <Link href="/gallery" className="block text-gray-400 hover:text-white transition-colors">
                Gallery
              </Link>
              <a
                href="https://iedc.startupmission.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                IEDC Kerala
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="https://instagram.com/iedc_cev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </a>
              <a
                href="https://youtube.com/@iedccev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="h-4 w-4" />
                <span>YouTube</span>
              </a>
              <a
                href="mailto:iedc@cev.ac.in"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 IEDC CE Vadakara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
