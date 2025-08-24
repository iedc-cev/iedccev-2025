import React from "react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full flex justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-full min-w-4xl relative">
          <Image
            src="/posters/OnamAI.jpg"
            alt="Background"
            fill
            className="object-center brightness-50 lg:object-cover"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-end justify-center min-h-screen pb-10">
        <a
          href="https://forms.gle/ryZ3ScEwUqAEzyxr5"
          className="bg-white p-3 flex items-center justify-center rounded-lg shadow-md text-black font-medium text-md hover:bg-[#b6b5b5] hover:scale-95 active:scale-105 transition-all duration-100"
        >
          Register Now
        </a>
      </div>
    </div>
  );
}
