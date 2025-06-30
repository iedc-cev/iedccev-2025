"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

// Static data for demo purposes
const staticImages = [
  {
    id: "1",
    title: "Tech Talk Opening",
    image_url: "/placeholder.svg?height=400&width=600",
    event_name: "Tech Talk 2024",
  },
  {
    id: "2",
    title: "Startup Presentations",
    image_url: "/placeholder.svg?height=400&width=600",
    event_name: "Startup Pitch Competition",
  },
  {
    id: "3",
    title: "Workshop Session",
    image_url: "/placeholder.svg?height=400&width=600",
    event_name: "AI & ML Workshop",
  },
  {
    id: "4",
    title: "Team Building Activity",
    image_url: "/placeholder.svg?height=400&width=600",
    event_name: "Town Vibes",
  },
  {
    id: "5",
    title: "Innovation Lab Tour",
    image_url: "/placeholder.svg?height=400&width=600",
    event_name: "Campus Events",
  },
  {
    id: "6",
    title: "Student Networking",
    image_url: "/placeholder.svg?height=400&width=600",
    event_name: "Town Vibes",
  },
]

export default function GalleryPage() {
  const [images] = useState(staticImages)
  const [selectedImage, setSelectedImage] = useState<(typeof staticImages)[0] | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const filteredImages =
    filter === "all" ? images : images.filter((img) => img.event_name?.toLowerCase().includes(filter.toLowerCase()))

  const eventNames = [...new Set(images.map((img) => img.event_name).filter(Boolean))]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#1A4C96] to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Gallery</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Moments that define our journey of innovation and creativity
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-[#1A4C96]" : ""}
            >
              All
            </Button>
            {eventNames.map((eventName) => (
              <Button
                key={eventName}
                variant={filter === eventName ? "default" : "outline"}
                onClick={() => setFilter(eventName || "")}
                className={filter === eventName ? "bg-[#1A4C96]" : ""}
              >
                {eventName}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredImages.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filteredImages.map((image) => (
                <Card
                  key={image.id}
                  className="break-inside-avoid overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative">
                    <Image
                      src={image.image_url || "/placeholder.svg"}
                      alt={image.title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-auto"
                    />
                    {image.event_name && (
                      <Badge className="absolute top-2 left-2 bg-[#1A4C96]">{image.event_name}</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{image.title}</h3>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="No images"
                  width={48}
                  height={48}
                  className="opacity-50"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Images Found</h3>
              <p className="text-gray-600">Gallery images will appear here soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <Image
              src={selectedImage.image_url || "/placeholder.svg"}
              alt={selectedImage.title}
              width={800}
              height={600}
              className="object-contain max-w-full max-h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
              {selectedImage.event_name && <Badge className="bg-[#1A4C96] mb-2">{selectedImage.event_name}</Badge>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
