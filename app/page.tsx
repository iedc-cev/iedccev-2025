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

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);  // Ref for scrolling container
  const cardsPerPage = 1;  // Always show 1 card per page
  const gap = 24;  // Matches space-x-6 (6 × 4px)

  const [pageCount, setPageCount] = useState(0);  // Total number of pages
  const [activePage, setActivePage] = useState(0);  // Currently active page

  /**
   * Set total page count once (number of leads).
   */
  useEffect(() => {
    setPageCount(Leads.length);
  }, []);

  /**
   * Calculate scroll amount for one card.
   */
  const getScrollAmount = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('article');
      if (card) {
        return card.clientWidth + gap;
      }
    }
    return 0;
  };

  /**
   * Scroll to specific page.
   */
  const scrollToPage = (page: number) => {
    const amount = getScrollAmount();
    scrollRef.current?.scrollTo({ left: page * amount, behavior: "smooth" });
    setActivePage(page);
  };

  /**
   * Go to previous or next person.
   */
  const scrollLeft = () => scrollToPage(Math.max(activePage - 1, 0));
  const scrollRight = () => scrollToPage(Math.min(activePage + 1, pageCount - 1));

  /**
   * Auto-slide every 5 seconds.
   */
  useEffect(() => {
    if (pageCount === 0) return;
    const interval = setInterval(() => {
      setActivePage(prev => {
        const next = (prev + 1) % pageCount;
        scrollToPage(next);
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [pageCount]);

  return (
    <div className="pt-16">
      {/* 🏠 Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-medium text-gray-900 mb-6 uppercase">
            Create. <span className="text-[#1A4C96]">Innovate.</span> <span className="text-gray-700">Explore.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Where ideas meet execution. Join the innovation revolution at IEDC CE Vadakara.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#1A4C96] hover:bg-[#1A4C96]/90 text-lg px-6 py-3 rounded-xl">
              {/* <Link href="/join">
                Join IEDC
                <ArrowRight className="ml-3" />
              </Link> */}
              <a href="https://www.instagram.com/iedc_cev">
                Join IEDC
                <ArrowRight className="ml-3" />
              </a>
            </Button>
            <Button asChild variant="outline" className="text-lg px-6 py-3 border-[#1A4C96] text-[#1A4C96]">
              <Link href="/events">Register for Event</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 📝 About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-medium text-gray-900 mb-4 flex justify-center items-center"><IdCard className="mr-2 size-8"/>Who Are We</h2>
          <video
            src="/aboutVideo.mp4"
            autoPlay
            muted
            loop
            className="w-[600px] mx-auto block rounded-xl shadow-lg my-14"
          />
          <p className="text-xl text-gray-600 max-w-6xl mx-auto">
            IEDC CEV is a dynamic, student-driven innovation hub where ideas come to life...
          </p>
          <div className="mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/">
                View Gallery <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 👥 Team Preview Carousel */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-2">Meet the Team</h2>
            <p className="text-lg sm:text-xl text-gray-600">The minds behind the innovation</p>
          </header>

          <div className="relative">
            {/* ◀️ Left arrow */}
            <Button
              onClick={scrollLeft}
              variant="ghost"
              size="icon"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full"
            >
              <ArrowLeft />
            </Button>

            {/* 📦 Scrollable team list */}
            <div ref={scrollRef} className="overflow-hidden scroll-smooth snap-x snap-mandatory">
              <div className="flex space-x-4 pb-4">
                {Leads.map((member) => (
                    <article
                      key={member.name}
                      className="
                        flex-shrink-0
                        w-80 sm:w-50 lg:w-[20rem]
                        snap-center
                        text-center 
                        hover:shadow-lg 
                        transition-shadow 
                        border rounded-sm
                      "
                    >
                      <div className="p-4 sm:p-6">
                        <div className="overflow-hidden mb-4">
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            width={280}
                            height={200}
                            className="object-cover w-full h-[300px] sm:h-[260px]"
                          />
                        </div>
                        <h3 className="text-base sm:text-lg font-medium mb-1">{member.name}</h3>
                        <p className="text-gray-600 mb-2 sm:mb-2 text-sm sm:text-base">{member.role}</p>
                        <div className="flex justify-center space-x-2">
                          <a href={member.social.facebook}><FaInstagram  className="size-6 mr-3 cursor-pointer hover:scale-105"/></a>
                          <a href={member.social.linkedin}><FaLinkedin className="size-6 ml-3 cursor-pointer hover:scale-105"/></a>
                        </div>
                      </div>
                    </article>
                  ))}


              </div>
            </div>

            {/* ▶️ Right arrow */}
            <Button
              onClick={scrollRight}
              variant="ghost"
              size="icon"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full"
            >
              <ArrowRight />
            </Button>
          </div>

          {/* 🔘 Dots */}
          {/* <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: pageCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToPage(idx)}
                className={`w-3 h-3 rounded-full ${idx === activePage ? 'bg-gray-800' : 'bg-gray-400'}`}
              />
            ))}
          </div> */}
        </div>
      </section>
      {/* Events Section */}
      {/* 
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-medium text-gray-900 mb-2">Upcoming Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {staticEvents.map((event) => (
              <div key={event.id} className="border rounded-lg p-4">
                <Image
                  src={event.poster_url}
                  alt={event.title}
                  width={400}
                  height={200}
                  className="mb-4 rounded-md"
                />
                <h3 className="text-lg font-medium">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <p className="text-sm text-gray-500">{event.date} | {event.time} | {event.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Media Section */}
      {/* 
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-medium text-gray-900 mb-2">Media</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Image src="/placeholder.svg" alt="Media 1" width={400} height={200} />
            <Image src="/placeholder.svg" alt="Media 2" width={400} height={200} />
            <Image src="/placeholder.svg" alt="Media 3" width={400} height={200} />
          </div>
        </div>
      </section>
      */}
    </div>
  );
}
