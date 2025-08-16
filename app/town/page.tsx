'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TownPage() {
  const events = [
    { title: "Startup Pitch Day", date: "Aug 20, 2025" },
    { title: "Design Thinking Workshop", date: "Sep 5, 2025" },
  ];

  const SECTION_HEIGHT = 200;
  const { scrollY } = useScroll();

  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 100],
    [1, 0]
  );

  return (
    <div className="relative text-white bg-zinc-700 min-h-screen">
      {/* Back Button */}
      <div className="px-8 py-4 md:px-[10%] flex justify-between items-center">
        <Link href="/" className="flex flex-col items-start">
          <h1 className="font-semibold text-4xl">IEDC</h1>
          <span className="text-sm">CE VADAKARA</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 hover:scale-110">
          <ArrowLeft /> Back
        </Link>
      </div>

      {/* Hero section */}
      <Hero opacity={opacity} />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950 z-30"></div>
    </div>
  );
}

function Hero({ opacity }) {
  return (
    <motion.section
      style={{ opacity }}
      className="py-16 px-4 max-w-7xl min-h-[90vh] flex flex-col justify-center mx-auto text-center"
    >
      <h1 className="text-4xl font-medium mb-6">Welcome to Town</h1>
      <p className="text-md lg:text-lg text-gray-300 leading-relaxed">
        Town is our college’s incubation hub where innovative ideas take shape.
        We provide space, mentorship, and resources to empower aspiring entrepreneurs.
        Join us in shaping the future of startups.
      </p>
    </motion.section>
  );
}
