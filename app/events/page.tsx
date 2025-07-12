"use client"

import Link from "next/link"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react"

// Static data for demo purposes
const staticEvents = [
  {
    id: "1",
    title: "Tech Talk 2024",
    description: "An inspiring session on emerging technologies and their impact on society.",
    date: "2024-07-15",
    time: "2:00 PM",
    venue: "Main Auditorium",
    poster_url: "/placeholder.svg?height=200&width=400",
    is_live: false,
    registration_link: "https://forms.google.com/tech-talk-2024",
  },
  {
    id: "2",
    title: "Startup Pitch Competition",
    description: "Students present their innovative startup ideas to industry experts.",
    date: "2024-07-20",
    time: "10:00 AM",
    venue: "Innovation Lab",
    poster_url: "/placeholder.svg?height=200&width=400",
    is_live: false,
    registration_link: "https://forms.google.com/startup-pitch",
  },
  {
    id: "3",
    title: "Workshop: AI & ML Basics",
    description: "Hands-on workshop covering fundamentals of Artificial Intelligence and Machine Learning.",
    date: "2024-06-10",
    time: "9:00 AM",
    venue: "Computer Lab",
    poster_url: "/placeholder.svg?height=200&width=400",
    is_live: false,
    aftermovie_link: "https://youtube.com/watch?v=sample",
  },
]

export default function EventsPage() {
  const [events] = useState(staticEvents)
  const liveEvents = events.filter((event) => event.is_live)
  const pastEvents = events.filter((event) => !event.is_live)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      {/* <section className="py-20 bg-gradient-to-br from-[#1A4C96] to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Events That Build Futures. <span className="text-blue-200">And Memories.</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Workshops. Talks. Tech. Treasure Hunts. Town Vibes.
          </p>
        </div>
      </section> */}

      {/* Live Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-semibold text-gray-900 mb-12">Live Events</h2>

          {liveEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {liveEvents.map((event) => (
                <div key={event.id} className="rounded-sm shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <Image
                      src={event.poster_url || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-green-500">Live</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-[#1A4C96] hover:bg-[#1A4C96]/90" asChild>
                      <a href={event.registration_link || "#"} target="_blank" rel="noopener noreferrer">
                        Register Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Live Events</h3>
              <p className="text-gray-600">Stay tuned for upcoming events!</p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-semibold text-gray-900 mb-12">Past Events</h2>

          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pastEvents.map((event) => (
                <div key={event.id} className="rounded-sm shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                    <h3 className="text-xl font-medium mb-3">{event.title}</h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>

                    {event.aftermovie_link ? (
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <a href={event.aftermovie_link} target="_blank" rel="noopener noreferrer">
                          Watch Aftermovie
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full bg-transparent" disabled>
                        Aftermovie Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Past Events</h3>
              <p className="text-gray-600">Our event history will appear here.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
