'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sparkles, CheckCircle2, Loader2, Send, Info, X, Instagram } from 'lucide-react';
import gsap from 'gsap';

export default function ExecomPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-md">
        <h2 className="text-4xl font-medium tracking-tight text-gray-90">Registration Closed</h2>
        <p className="text-gray-500 text-md">
          The applications for IEDC Execom 2026 are now closed. Thank you for your interest!
        </p>
        <div className="pt-4 flex flex-col gap-3">
          <a
            href="https://www.instagram.com/iedc_cev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black/80 text-white rounded-md font-medium transition-all duration-300 hover:scale-102 hover:shadow-lg"
          >
            <Instagram className="w-5 h-5" />
            Follow us on Instagram
          </a>
          <Link
            href="/"
            className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}