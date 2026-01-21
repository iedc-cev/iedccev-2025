"use client"

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react"
import { staticEvents } from "@/components/staticEvents"

export default function EventsPage() {
  const [events] = useState(staticEvents)

  const liveEvents = events.filter((event) => event.is_live)
  const pastEvents = events.filter((event) => !event.is_live)

  const formatDate = (date?: string) => {
    if (!date) return "Date TBA"
    const parsed = new Date(date)
    return isNaN(parsed.getTime())
      ? date
      : parsed.toLocaleDateString()
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 text-black bg-gray-50/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium mb-6 leading-tight tracking-tight">
            Events That Build Futures.{" "}
            <span className="text-[#1A4C96]">And Memories.</span>
          </h1>
        </div>
      </section>

      {/* Live Events */}
      <section className="py-24 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-medium text-gray-900 mb-12 tracking-tight">
            Live Events
          </h2>

          {liveEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveEvents.map((event) => (
                <div
                  key={event.id}
                  className="group rounded-[2rem] overflow-hidden border border-gray-100 shadow-none hover:shadow-md transition-all duration-500"
                >
                  {/* Poster */}
                  <div className="relative h-[320px] sm:h-[380px] md:h-[420px]">
                    <Image
                      src={event.poster_url || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Live Badge */}
                    <Badge className="absolute top-4 left-4 bg-red-600 animate-pulse">
                      LIVE
                    </Badge>

                    {/* Title */}
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                      <h3 className="text-xl sm:text-2xl font-medium">{event.title}</h3>
                      {event.tagline && (
                        <p className="text-xs sm:text-sm opacity-90 mt-1">{event.tagline}</p>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <CardContent className="p-4 sm:p-6 space-y-3">
                    <div className="flex items-center text-sm sm:text-base text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      {formatDate(event.date)}
                    </div>

                    {event.time && (
                      <div className="flex items-center text-sm sm:text-base text-gray-600">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        {event.time}
                      </div>
                    )}

                    {event.venue && (
                      <div className="flex items-center text-sm sm:text-base text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        {event.venue}
                      </div>
                    )}

                    <Button
                      className="w-full bg-[#1A4C96] hover:bg-[#1A4C96]/90 mt-2 text-sm sm:text-base"
                      asChild
                    >
                      <a
                        href={event.registration_link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Event Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-medium mb-3 text-gray-900">No Live Events</h3>
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
            Past Events
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-[2rem] shadow-none hover:shadow-md overflow-hidden transition-all duration-500 border border-gray-100 bg-white group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={event.poster_url || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-medium mb-3 line-clamp-2 group-hover:text-[#1A4C96] transition-colors">
                    {event.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      {formatDate(event.date)}
                    </span>
                  </div>

                  {event.aftermovie_link ? (
                    <Button variant="outline" className="w-full text-xs sm:text-sm border-[#1A4C96] text-[#1A4C96] hover:bg-[#1A4C96] hover:text-white" asChild>
                      <a
                        href={event.aftermovie_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Aftermovie
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button
              asChild
              className="bg-[#1A4C96] hover:bg-[#1A4C96]/90 px-8 py-6 text-lg rounded-xl shadow-xl shadow-[#1A4C96]/20"
            >
              <Link href="https://www.instagram.com/iedc_cev" target="_blank" rel="noopener noreferrer">
                View More Events
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
