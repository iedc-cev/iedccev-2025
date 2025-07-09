import React from 'react'

// app/components/VideoWithWavyBorder.js
export default function VideoWithWavyBorder() {
  return (
    <div className="relative w-80 h-80">
      <div className="absolute inset-0 z-0">
        <svg
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="
              M437,307Q412,364,358,402.5Q304,441,247,437Q190,433,144,399Q98,365,72,307.5Q46,250,63.5,190.5Q81,131,131.5,99Q182,67,247,58Q312,49,358.5,87.5Q405,126,437.5,188Q470,250,437,307Z
            "
            fill="#38bdf8"
          />
        </svg>
      </div>
      <video
        src="/sample.mp4"
        autoPlay
        muted
        loop
        className="absolute inset-4 z-10 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover rounded-2xl shadow-lg"
      />
    </div>
  );
}

