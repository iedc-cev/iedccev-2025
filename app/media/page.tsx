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
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="aspect-video relative">
                    <Image
                      src={item.thumbnail_url || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/50" asChild>
                        <a href={item.video_url} target="_blank" rel="noopener noreferrer">
                          <Play className="h-6 w-6 mr-2" />
                          Watch
                        </a>
                      </Button>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-[#1A4C96]">{item.series}</Badge>
                    {item.duration && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.duration}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href={item.video_url} target="_blank" rel="noopener noreferrer">
                        Watch Full Video
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
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
