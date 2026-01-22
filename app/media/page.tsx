"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, ExternalLink } from "lucide-react"

// Static data for demo purposes
const staticMediaItems = [
  {
    id: "1",
    title: "Innovation in Kerala Startups",
    description: "Exploring the startup ecosystem in Kerala and opportunities for students.",
    thumbnail_url: "/placeholder.svg?height=200&width=400",
    video_url: "https://youtube.com/watch?v=sample1",
    series: "PodShow",
    duration: "45:30",
  },
  {
    id: "2",
    title: "Campus Life Chronicles",
    description: "A fun take on daily life at CE Vadakara and student experiences.",
    thumbnail_url: "/placeholder.svg?height=200&width=400",
    video_url: "https://youtube.com/watch?v=sample2",
    series: "Kadha Para Chill",
    duration: "25:15",
  },
  {
    id: "3",
    title: "Latest Tech Trends 2024",
    description: "Deep dive into emerging technologies and their applications.",
    thumbnail_url: "/placeholder.svg?height=200&width=400",
    video_url: "https://youtube.com/watch?v=sample3",
    series: "Technalogya",
    duration: "35:45",
  },
]

export default function MediaPage() {
  const [mediaItems] = useState(staticMediaItems)
  const [selectedSeries, setSelectedSeries] = useState<string>("all")

  const filteredItems =
    selectedSeries === "all" ? mediaItems : mediaItems.filter((item) => item.series === selectedSeries)

  const seriesNames = [...new Set(mediaItems.map((item) => item.series))]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#1A4C96] to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Media</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">Stories We Create. Ideas We Capture.</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSeries === "all" ? "default" : "outline"}
              onClick={() => setSelectedSeries("all")}
              className={selectedSeries === "all" ? "bg-[#1A4C96]" : ""}
            >
              All Series
            </Button>
            {seriesNames.map((series) => (
              <Button
                key={series}
                variant={selectedSeries === series ? "default" : "outline"}
                onClick={() => setSelectedSeries(series)}
                className={selectedSeries === series ? "bg-[#1A4C96]" : ""}
              >
                {series}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative rounded-[2.5rem] overflow-hidden aspect-video cursor-pointer"
                >
                  <Image
                    src={item.thumbnail_url || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                          {item.series}
                        </Badge>
                        <span className="text-[10px] text-white/60 font-medium tracking-widest flex items-center gap-1.5 uppercase">
                          <Clock className="h-3 w-3" /> {item.duration}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-medium text-white leading-tight">
                        {item.title}
                      </h3>
                      
                      <p className="text-white/60 text-sm font-light line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {item.description}
                      </p>

                      <a 
                        href={item.video_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-2 text-white font-medium text-xs tracking-[0.2em] transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-200"
                      >
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
                          <Play className="h-4 w-4 fill-current" />
                        </div>
                        WATCH NOW
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Media Content</h3>
              <p className="text-gray-600">Our media content will appear here soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Series */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Series</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative bg-gradient-to-br from-[#1A4C96] to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold">🎙️ PodShow</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  Deep conversations with innovators, entrepreneurs, and thought leaders. Exploring ideas that shape the
                  future.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Watch All Episodes
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold">🎥 Kadha Para Chill</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  Casual conversations and campus stories. A relaxed take on student life, innovation, and everything in
                  between.
                </p>
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
                  <h3 className="text-2xl font-bold">📲 Technalogya</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  Technology insights, digital trends, and the latest in tech innovation. Staying ahead of the curve.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Explore Tech Content
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
