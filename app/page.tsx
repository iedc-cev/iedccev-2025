"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, IdCard } from "lucide-react";
import AnimatedBackground from "@/components/animated-background";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Leads } from "@/components/Team";
import { TypeAnimation } from 'react-type-animation';

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(0);

  // Interval/toggle refs for auto-slide
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);
  
  // Touch/swipe refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setPageCount(Leads.length);
  }, []);

  /**
   * Calculate scroll amount between adjacent cards reliably.
   */
  const getScrollAmount = () => {
    const scroller = scrollRef.current;
    if (!scroller) return 0;
    const cards = scroller.querySelectorAll('article');
    if (cards.length >= 2) {
      const first = cards[0] as HTMLElement;
      const second = cards[1] as HTMLElement;
      // Distance between centers/lefts accounts for gap from space-x-*
      return second.offsetLeft - first.offsetLeft;
    } else if (cards.length === 1) {
      const only = cards[0] as HTMLElement;
      return only.offsetWidth;
    }
    return 0;
  };

  /**
   * Scroll to a specific page.
   */
  const scrollToPage = (page: number) => {
    setActivePage(page);
  };

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller || pageCount === 0) return;

    const amount = getScrollAmount();
    const targetLeft = Math.max(0, Math.min(activePage, pageCount - 1)) * amount;
    
    scroller.scrollTo({
      left: targetLeft,
      behavior: 'smooth'
    });
  }, [activePage, pageCount]);

  const scrollLeft = () => scrollToPage(Math.max(activePage - 1, 0));
  const scrollRight = () => scrollToPage(Math.min(activePage + 1, pageCount - 1));

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPausedRef.current && pageCount > 0) {
        setActivePage(prev => (prev + 1) % pageCount);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [pageCount]);

  const handleMouseEnter = () => { isPausedRef.current = true; };
  const handleMouseLeave = () => { isPausedRef.current = false; };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isPausedRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50; // Minimum distance for swipe
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go to next card
        scrollRight();
      } else {
        // Swiped right - go to previous card
        scrollLeft();
      }
    }

    isPausedRef.current = false;
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div className="">
      {/* 🏠 Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="hero-text">
            <TypeAnimation
              className="text-5xl md:text-6xl font-medium text-gray-700 uppercase"
              sequence={['Create', 1000, 'Innovate', 1000, 'Explore', 1000]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              speed={50}
              deletionSpeed={80}
            />
          </div>
          <p className="hero-text text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto mt-6">
            Where ideas meet execution. Join the innovation revolution at IEDC CE Vadakara.
          </p>
          <div className="hero-text flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#1A4C96] hover:bg-[#1A4C96]/90 text-lg px-6 py-3 rounded-xl">
              <Link href="/join">
                Join IEDC
                <ArrowRight className="ml-3" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="text-lg px-6 py-3 border-[#1A4C96] text-[#1A4C96]">
              <Link href="/events">Register for Event</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 📝 About Section */}
      <section className="about-section py-24 bg-white overflow-hidden">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="about-content lg:w-1/2 space-y-8 text-left">
              {/* <div className="inline-block px-4 py-1.5 bg-[#1A4C96]/10 text-[#1A4C96] rounded-full text-sm font-semibold tracking-wide uppercase">
                Est. 2015
              </div> */}
              <h2 className="text-4xl sm:text-6xl font-medium text-gray-900 leading-tight">
                Engineering the <span className="text-[#1A4C96]">Future</span> of Innovation
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                IEDC CEV is a flagship student-led innovation hub at College of Engineering Vadakara. 
                We are more than just a community; we are an ecosystem that nurtures aspiring 
                makers and entrepreneurs to transform radical ideas into scalable real-world solutions.
              </p>

              <div className="pt-4">
                <Button size="lg" className="bg-[#1A4C96] hover:bg-[#1A4C96]/90 text-white px-8 py-6 rounded-2xl text-lg shadow-xl shadow-[#1A4C96]/20 transition-all hover:-translate-y-1" asChild>
                  <Link href="https://instagram.com/iedc_cev" target="_blank" rel="noopener noreferrer">
                    Explore Our Gallery <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="about-image lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#1A4C96]/20 to-transparent rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all opacity-0 group-hover:opacity-100" />
              <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                <video
                  src="/evol.webm"
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
              </div>
              {/* <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden sm:block z-10">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 uppercase">Active Hub</div>
                    <div className="text-xs text-gray-500">24/7 Innovation Lab</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* 👥 Team Preview Carousel */}
      <section className="team-section py-24 bg-gray-50/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="team-header flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl font-medium text-gray-900 mb-4 tracking-tight">Meet the <span className="text-[#1A4C96]">Minds</span></h2>
              <p className="text-xl text-gray-600 max-w-xl">The architects of innovation and the driving force behind the IEDC CEV community.</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={scrollLeft}
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full border-gray-200 hover:border-[#1A4C96] hover:text-[#1A4C96] transition-all"
              >
                <ArrowLeft className="size-6" />
              </Button>
              <Button
                onClick={scrollRight}
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full border-gray-200 hover:border-[#1A4C96] hover:text-[#1A4C96] transition-all"
              >
                <ArrowRight className="size-6" />
              </Button>
            </div>
          </header>

          <div 
            className="relative" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Scrollable team list with GSAP-controlled scrollLeft */}
            <div ref={scrollRef} className="overflow-hidden no-scrollbar touch-pan-y">
              <div className="team-card-container flex space-x-6 pb-8">
                {Leads.map((member, idx) => (
                  <article
                    key={member.name}
                    onClick={() => scrollToPage(idx)}
                    className="
                      team-card
                      flex-shrink-0
                      w-[280px] sm:w-[320px]
                      bg-white
                      rounded-[2.5rem]
                      overflow-hidden
                      shadow-none
                      hover:shadow-md
                      transition-all
                      duration-500
                      group
                      border border-gray-100
                      cursor-pointer
                    "
                  >
                    <div className="relative h-[380px] overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                        <div className="flex gap-4">
                          <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white hover:text-[#1A4C96] transition-all">
                            <FaInstagram className="size-5" />
                          </a>
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white hover:text-[#1A4C96] transition-all">
                            <FaLinkedin className="size-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 text-left">
                      <h3 className="text-xl font-medium font-montserrat text-gray-900 group-hover:text-[#1A4C96] transition-colors">{member.name}</h3>
                      <p className="text-[#1A4C96] italic font-medium font-poppins text-sm uppercase tracking-wider mt-2">{member.role}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
