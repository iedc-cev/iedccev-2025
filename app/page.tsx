"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Lightbulb, Wrench, Camera, Zap, ArrowRight, Play } from "lucide-react"
import AnimatedBackground from "@/components/animated-background"
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
    is_live: true,
  },
  {
    id: "2",
    title: "Startup Pitch Competition",
    description: "Students present their innovative startup ideas to industry experts.",
    date: "2024-07-20",
    time: "10:00 AM",
    venue: "Innovation Lab",
    poster_url: "/placeholder.svg?height=200&width=400",
    is_live: true,
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
  },
]

const staticTeamMembers = [
  {
    id: "1",
    name: "Arjun Krishnan",
    position: "Chief Executive Officer",
    photo_url: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "2",
    name: "Priya Nair",
    position: "Chief Technology Officer",
    photo_url: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "3",
    name: "Rahul Menon",
    position: "Head of Events",
    photo_url: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "4",
    name: "Sneha Pillai",
    position: "Media Head",
    photo_url: "/placeholder.svg?height=96&width=96",
  },
]

export default function HomePage() {
  const [events] = useState(staticEvents)
  const [teamMembers] = useState(staticTeamMembers)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Create. <span className="text-[#1A4C96]">Innovate.</span> <span className="text-gray-700">Explore.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Where ideas meet execution. Join the innovation revolution at IEDC CE Vadakara.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href='/join' className="bg-[#1A4C96] hover:bg-[#1A4C96]/90 text-lg px-4 py-3 text-white rounded-xl flex items-center justify-center hover:scale-[0.96]">
              Join IEDC
              <ArrowRight className="ml-3" />
            </Link>
            <Link
              href='#'
              className="text-lg px-8 py-3 border-[#1A4C96] text-[#1A4C96] hover:scale-[0.96] bg-transparent border rounded-sm"
            >
              Register for Event
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About IEDC CEV</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              IEDC CEV is a student-driven innovation hub where ideas meet execution. We foster entrepreneurship,
              creativity, and technological advancement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#1A4C96]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-[#1A4C96]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Startup Support</h3>
                <p className="text-gray-600">Mentorship and resources for budding entrepreneurs</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#1A4C96]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-[#1A4C96]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Workshops</h3>
                <p className="text-gray-600">Hands-on learning experiences and skill development</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#1A4C96]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-[#1A4C96]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Media</h3>
                <p className="text-gray-600">Creative content and storytelling initiatives</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[#1A4C96]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-[#1A4C96]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tech Vibes</h3>
                <p className="text-gray-600">Technology trends and innovation discussions</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/gallery">
                View Gallery
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* Events Preview */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
              <p className="text-xl text-gray-600">Don't miss out on our exciting events</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/events">View All Events</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image src={event.poster_url || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  {event.is_live && <Badge className="absolute top-4 left-4 bg-green-500">Live</Badge>}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.venue}</span>
                  </div>
                  <Button className="w-full bg-[#1A4C96] hover:bg-[#1A4C96]/90">
                    {event.is_live ? "Register Now" : "View Details"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Media */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Media</h2>
            <p className="text-xl text-gray-600">Stories we create, ideas we capture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative bg-gradient-to-br from-[#1A4C96] to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">🎙️ PodShow</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">Conversations with innovators and entrepreneurs</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Watch Episodes
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">🎥 Kadha Para Chill</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">Casual conversations and campus stories</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Watch Series
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">📲 Technalogya</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">Technology insights and digital trends</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Explore Tech
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/media">
                View All Media
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* Team Preview */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <h2 className="text-4xl text-gray-900 mb-2">Meet the Team</h2>
            <p className="text-xl text-gray-600">The minds behind the innovation</p>
          </div>

          <div className="overflow-x-auto">
            <div className="flex space-x-6 pb-4">
              {teamMembers.map((member) => (
                <div className="flex-shrink-0 w-64 text-center hover:shadow-lg transition-shadow border">
                  <div className="p-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                      <Image
                        src={member.photo_url || "/placeholder.svg"}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-gray-600 mb-4">{member.position}</p>
                    <div className="flex justify-center space-x-2">
                      <Button size="sm" variant="outline">
                        IG
                      </Button>
                      <Button size="sm" variant="outline">
                        LI
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>  */}
    </div>
  )
}
