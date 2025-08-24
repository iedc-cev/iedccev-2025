import React from "react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full bg-[">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/posters/OnamAI.jpg"
          alt="Background"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-end min-h-[80vh]">
        <a
          href="https://forms.gle/ZzuGWuCQGkyykTXa7"
          className="bg-white px-6 py-3 rounded-lg shadow-md text-black font-medium hover:bg-[#b6b5b5] hover:scale-95 active:scale-105 transition-all duration-100"
        >
          Register Now
        </a>
      </div>
    </div>
  );
}
