'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image'
import {motion,useScroll,useTransform} from 'framer-motion'

export default function TownPage() {
  const events = [
    { title: "Startup Pitch Day", date: "Aug 20, 2025" },
    { title: "Design Thinking Workshop", date: "Sep 5, 2025" },
  ];
  const {scrollY} = useScroll();

  const opacity = useTransform(scrollY,[0,1500+500],[1,0]);

  return (
    <div className="text-white bg-zinc-900 min-h-screen">
      {/* Back Button */}
      <div className="px-8 py-4 md:px-[10%] flex justify-between items-center">
        <Link href="/" className="flex flex-col items-start">
            {/* <Image src='logo.png' alt='logo' width={130} height={130}/> */}
            <h1 className='font-semibold text-4xl'>IEDC</h1>
            <span className='text-sm'>CE VADAKARA</span>
          </Link>
        <Link href="/" className="flex items-center gap-2 hover:scale-110">
          <ArrowLeft /> Back
        </Link>
      </div>

      {/* About */}
      <motion.section
      style={{opacity}}
       className="py-16 px-6 max-w-5xl min-h-[80vh] flex flex-col justify-center mx-auto text-center">
        <h1 className="text-4xl font- mb-6">Welcome to Town</h1>
        <p className="text-md lg:text-lg text-gray-300 leading-relaxed">
          Town is our college’s incubation hub where innovative ideas take shape.
          We provide space, mentorship, and resources to empower aspiring entrepreneurs.
          Join us in shaping the future of startups.
        </p>
      </motion.section>
      {/* Gallery */}
      {/* <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[1,2].map((img) => (
            <div key={img} className="overflow-hidden rounded-xl border border-gray-700">
              <img
                src={`/gallery/${img}.jpg`}
                alt={`Gallery ${img}`}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      Roadmap (Vertical Level Style)
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">Roadmap of Events</h2>
        <div className="relative flex flex-col items-center">
          <svg
            className="absolute left-1/2 -translate-x-1/2 z-0"
            height={events.length * 200}
            width="200"
          >
            <path
              d={`M100,0 Q150,100 100,200 T100,${events.length * 200}`}
              stroke="#facd15"
              strokeWidth="4"
              fill="none"
              strokeDasharray="10 10"
            />
          </svg>

          {events.map((event, index) => (
            <div
              key={index}
              className="flex flex-col items-center z-10 mb-20"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400 text-black font-bold border-4 border-gray-900 shadow-lg">
                {index + 1}
              </div>
              <h3 className="mt-4 font-semibold text-center">{event.title}</h3>
              <p className="text-gray-400 text-sm text-center">{event.date}</p>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
}
