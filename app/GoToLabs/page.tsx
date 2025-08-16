import React from 'react'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <Image
        src="/posters/gtl.jpg" // path inside public/posters/
        alt="Background"
        fill   // makes the image cover the parent div
        className="object-cover brightness-50 lg:object-fill"
        priority
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <a
          href="https://forms.gle/ZzuGWuCQGkyykTXa7"
          className="bg-white px-6 py-3 rounded-lg shadow-md text-black font-medium hover:bg-[#b6b5b5] hover:scale-95 active:scale-105 transition-all duration-100"
        >
          Register Now
        </a>
      </div>
    </div>
  )
}
