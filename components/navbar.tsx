"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { X, ArrowRight } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import gsap from "gsap"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  
  // Track scroll for floating effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -10,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      })
      
      gsap.from(".nav-logo", {
        x: -10,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      })
    })
    return () => ctx.revert()
  }, [])

  // Allowed routes
  const allowedRoutes = ["/", "/events", "/achievement", "/gallery", "/media", "/expo", "/join"]
  if (!allowedRoutes.includes(pathname)) return null

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Achievements", href: "/achievement" },
    // { name: "Media", href: "/media" },
    { name: "Gallery", href: "https://instagram.com/iedc_cev" },
  ]

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ease-in-out ${
        scrolled 
          ? "py-3 px-4 md:px-10" 
          : "py-6 px-4 md:px-10"
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto transition-all duration-500 ease-in-out rounded-[2rem] ${
          scrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/20 px-6" 
            : "bg-transparent px-0"
        }`}
      >
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="nav-logo flex items-center group relative overflow-hidden">
            <div className="relative h-9 w-32 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="IEDC CEV Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`nav-item relative px-5 py-2 text-sm font-medium tracking-wide transition-colors duration-500 group ${
                  pathname === link.href ? "text-[#1A4C96]" : "text-gray-600 hover:text-black"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {/* Magnetic Dot Indicator */}
                {pathname === link.href && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1A4C96] rounded-full" />
                )}
                {/* Hover Background */}
                <div className="absolute inset-0 bg-gray-100/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out -z-0" />
              </Link>
            ))}

            <div className="nav-item pl-4">
              <Link
                href="/join"
                className="group relative inline-flex items-center justify-center px-7 py-3 overflow-hidden font-medium text-white transition-all duration-500 bg-black rounded-full hover:bg-black shadow-lg hover:shadow-black/20"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-500 ease-out bg-[#1A4C96] -translate-x-full group-hover:translate-x-0" />
                <span className="relative flex items-center gap-2 text-sm tracking-widest uppercase">
                  Join Hub <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="nav-item md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-gray-100 transition-colors group"
            aria-label="Toggle Menu"
          >
            <div className={`w-6 h-0.5 bg-black transition-all duration-500 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-0.5 bg-black transition-all duration-500 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Menu (Awwwards Style) */}
      <div 
        className={`fixed inset-0 bg-white z-[110] transition-all duration-700 ease-[0.85,0,0.15,1] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="h-full flex flex-col justify-center px-10 md:px-20 relative">
          {/* Close Button Inside Menu */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-10 right-10 w-16 h-16 border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>

          <div className="space-y-8">
            <p className="text-[#1A4C96] text-sm font-bold tracking-[0.3em] uppercase">Navigation</p>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, i) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="group flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-gray-300 text-2xl font-light mr-6 font-montserrat">0{i + 1}</span>
                  <span className="text-5xl md:text-7xl font-medium tracking-tight hover:text-[#1A4C96] transform group-hover:translate-x-4 transition-all duration-500">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="absolute bottom-20 left-10 md:left-20 right-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div className="space-y-4">
              <p className="text-gray-400 text-xs font-bold tracking-widest uppercase text-left">Connectivity</p>
              <div className="flex gap-8 text-xl">
                <a href="https://instagram.com/iedc_cev" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A4C96] transition-colors">Instagram</a>
                <a href="https://linkedin.com/company/iedc-cev" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A4C96] transition-colors">LinkedIn</a>
              </div>
            </div>
            
            <Link
              href="/join"
              onClick={() => setIsOpen(false)}
              className="group flex flex-col text-left"
            >
              <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-4">Start your journey</p>
              <span className="text-4xl md:text-5xl font-medium flex items-center gap-6 group-hover:text-[#1A4C96] transition-colors">
                Join our IEDC Hub <ArrowRight className="h-10 w-10 group-hover:translate-x-4 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
