import React from 'react'
import Image from 'next/image'
export default function page() {
  return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-2 flow-hidden">
        <div className="w-full max-w-7xl py-10 mx-auto flex flex-col justify-between rounded-3xl">
            <Image
            src="/posters/OnamAI.jpg" // path inside public/posters/
            alt="Background"
            fill   // makes the image cover the parent div
            className=" brightness-50"
            priority
          />
        </div>
          <div className="relative z-10 flex flex-col items-center justify-end min-h-[600px]">
            <a
              href="https://forms.gle/ryZ3ScEwUqAEzyxr5"
              className="bg-white px-6 py-2 text-md rounded-lg shadow-md text-black font-medium hover:bg-[#b6b5b5] hover:scale-95 active:scale-102 transition-all duration-50"
            >
              Submit Now
            </a>
          </div>
        </div>
  )
}
