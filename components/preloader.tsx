'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <section className="fixed inset-0 z-50 bg-[#06042a] text-white flex items-center justify-center">
      <h1 className="text-8xl font-[Bangers]">
        Town Vibes
        </h1>
    </section>
  );
}
