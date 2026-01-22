"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { staticEvents } from "@/components/staticEvents"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function EventsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [events] = useState(staticEvents)

  const liveEvents = events.filter((event) => event.is_live)
  const pastEvents = events.filter((event) => !event.is_live)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Reveal
      const heroLines = gsap.utils.toArray(".hero-line-inner")
      gsap.from(heroLines, {
        yPercent: 100,
        skewY: 3,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.1,
      })

      // Section Title Reveal
      const sectionTitles = gsap.utils.toArray(".section-title-inner")
      sectionTitles.forEach((title: any) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 95%",
            toggleActions: "play none none none",
          },
          yPercent: 100,
          skewY: 2,
          duration: 1.2,
          ease: "power4.out",
        })
      })

      // Live Cards Stagger
      const liveCards = gsap.utils.toArray(".live-card")
      if (liveCards.length > 0) {
        gsap.from(liveCards, {
          scrollTrigger: {
            trigger: ".live-events-grid",
            start: "top 90%",
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
        })
      }

      // Past Cards Stagger
      const pastCards = gsap.utils.toArray(".past-card")
      if (pastCards.length > 0) {
        gsap.from(pastCards, {
          scrollTrigger: {
            trigger: ".past-events-grid",
            start: "top 90%",
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
        })
      }

      // No Live Events Animation
      const noLiveEvents = containerRef.current?.querySelector(".no-live-events")
      if (noLiveEvents) {
        gsap.from(noLiveEvents, {
            scrollTrigger: {
                trigger: noLiveEvents,
                start: "top 95%",
                once: true,
            },
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        })
      }
      // Image Parallax
      const images = gsap.utils.toArray(".card-image-parallax")
      images.forEach((img: any) => {
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          y: -30,
          ease: "none",
        })
      })

      // Refresh ScrollTrigger to ensure correct positions
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 500)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const formatDate = (date?: string) => {
    if (!date) return "Date TBA"
    const parsed = new Date(date)
    return Number.isNaN(parsed.getTime())
      ? date
      : parsed.toLocaleDateString()
  }

  return (
    <div className="pt-16 md:pt-20" ref={containerRef}>
      {/* Hero Section */}
      <section className="py-16 md:py-24 text-black bg-gray-50/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-medium mb-6 leading-tight tracking-tight">
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">Events That Build Futures.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line-inner block text-[#1A4C96]">And Memories.</span>
            </span>
          </h1>
        </div>
      </section>

      {/* Live Events */}
      <section className="py-24 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-medium text-gray-900 mb-12 tracking-tight">
            <span className="block overflow-hidden">
              <span className="section-title-inner block">Live Events</span>
            </span>
          </h2>

          {liveEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 live-events-grid">
              {liveEvents.map((event) => (
                <div
                  key={event.id}
                  className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] live-card cursor-pointer"
                >
                  <Image
                    src={event.poster_url || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out italic card-image-parallax"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex gap-2">
                    <Badge className="bg-red-600 text-white border-none px-4 py-1.5 text-xs font-bold tracking-widest animate-pulse">
                      LIVE
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex flex-col gap-4">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-medium text-white leading-tight">
                          {event.title}
                        </h3>
                        {event.tagline && (
                          <p className="text-white/70 text-sm font-light tracking-wide line-clamp-2">
                            {event.tagline}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm font-light border-t border-white/10 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {formatDate(event.date)}
                        </div>
                        {event.venue && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {event.venue}
                          </div>
                        )}
                      </div>

                      <Button
                        className="w-full bg-white text-black hover:bg-gray-100 mt-2 rounded-2xl py-6 text-base font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 shadow-xl"
                        asChild
                      >
                        <a
                          href={event.registration_link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Discover More
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 no-live-events">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-medium mb-3 text-gray-900">
                <span className="block overflow-hidden">
                  <span className="section-title-inner block">No Live Events</span>
                </span>
              </h3>
              <p className="text-xl text-gray-600">
                Stay tuned for upcoming events!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-medium text-gray-900 mb-12 tracking-tight">
            <span className="block overflow-hidden">
              <span className="section-title-inner block">Past Events</span>
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 past-events-grid">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] past-card cursor-pointer"
              >
                <Image
                  src={event.poster_url || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out card-image-parallax"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex flex-col gap-3">
                    <div className="inline-flex self-start items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-white border border-white/10">
                      <Calendar className="h-3 w-3" />
                      {formatDate(event.date).toUpperCase()}
                    </div>
                    
                    <h3 className="text-xl font-medium text-white leading-tight">
                      {event.title}
                    </h3>

                    {event.aftermovie_link && (
                      <a 
                        href={event.aftermovie_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white text-[10px] font-medium tracking-widest transition-colors"
                      >
                        WATCH RECAP <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-20">
            <Button
              asChild
              className="group bg-black hover:bg-black text-white px-10 py-6 text-lg rounded-full overflow-hidden relative"
            >
              <Link href="https://www.instagram.com/iedc_cev" target="_blank" rel="noopener noreferrer">
                <span className="relative z-10 flex items-center gap-2 group-hover:scale-105 transition-transform duration-500">
                  EXPLORE OUR GALLERY
                  <ExternalLink className="h-5 w-5 translate-y-[-2px]" />
                </span>
                <div className="absolute inset-0 bg-[#1A4C96] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
