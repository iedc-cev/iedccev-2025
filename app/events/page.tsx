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
    <div className="pt-12">
      {/* Hero Section */}
      <section className="py-4 text-black">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-2">
            Events That Build Futures.{" "}
            <span className="text-blue-400">And Memories.</span>
          </h1>
        </div>
      </section>

      {/* Live Events */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">
            Live Events
          </h2>

          {liveEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {liveEvents.map((event) => (
                <div
                  key={event.id}
                  className="group rounded-md overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Poster */}
                  <div className="relative h-[420px]">
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
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-2xl font-bold">{event.title}</h3>
                      {event.tagline && (
                        <p className="text-sm opacity-90">{event.tagline}</p>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(event.date)}
                    </div>

                    {event.time && (
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                    )}

                    {event.venue && (
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.venue}
                      </div>
                    )}

                    <Button
                      className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:opacity-90"
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
            <div className="text-center py-10">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Live Events</h3>
              <p className="text-gray-600">
                Stay tuned for upcoming events!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-900 mb-12">
            Past Events
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-sm shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative">
                  <Image
                    src={event.poster_url || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-md md:text-xl font-medium mb-3">
                    {event.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {formatDate(event.date)}
                    </span>
                  </div>

                  {event.aftermovie_link ? (
                    <Button variant="outline" className="w-full" asChild>
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

          <div className="flex justify-center mt-8">
            <Link
              href="https://www.instagram.com/iedc_cev"
              className="bg-sky-900 px-6 py-2 rounded-sm text-white"
            >
              More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
