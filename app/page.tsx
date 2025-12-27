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
import gsap from "gsap"; // ✅ GSAP for smooth animations

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(0);

  // Interval/toggle refs for auto-slide
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

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
   * Smooth scroll using GSAP to a specific page.
   */
  const scrollToPage = (page: number) => {
    const amount = getScrollAmount();
    const targetLeft = Math.max(0, Math.min(page, pageCount - 1)) * amount;

    if (scrollRef.current) {
      gsap.killTweensOf(scrollRef.current);
      gsap.to(scrollRef.current, {
        scrollLeft: targetLeft,
        duration: 0.7,
        ease: "power2.out",
      });
      setActivePage(Math.max(0, Math.min(page, pageCount - 1)));
    }
  };

  const scrollLeft = () => scrollToPage(Math.max(activePage - 1, 0));
  const scrollRight = () => scrollToPage(Math.min(activePage + 1, pageCount - 1));

  /**
   * Auto-slide setup with pause support.
   */
  const startAutoSlide = () => {
    if (autoSlideRef.current || pageCount === 0) return;
    autoSlideRef.current = setInterval(() => {
      if (isPausedRef.current) return;
      setActivePage(prev => {
        const next = (prev + 1) % pageCount;
        scrollToPage(next);
        return next;
      });
    }, 1500);
  };

  const stopAutoSlide = () => {
    isPausedRef.current = true;
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [pageCount]);

  return (
    <div className="pt-16">
      {/* 🏠 Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <TypeAnimation
            className="text-5xl md:text-6xl font-medium font-[Arial] text-gray-700 uppercase"
            sequence={['Create', 1000, 'Innovate', 1000, 'Explore', 1000]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            speed={50}
            deletionSpeed={80}
          />
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto mt-6">
            Where ideas meet execution. Join the innovation revolution at IEDC CE Vadakara.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            IEDC CEV is a student-led innovation hub at College of Engineering Vadakara. We help aspiring makers and entrepreneurs turn ideas into real-world solutions through hands-on workshops, hackathons, mentoring, and industry collaborations. From validation and prototyping to pitching and launch, we provide resources, community, and guidance to accelerate your journey.
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
            <Button
              onClick={scrollLeft}
              variant="ghost"
              size="icon"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full"
            >
              <ArrowLeft />
            </Button>

            {/* Scrollable team list with GSAP-controlled scrollLeft */}
            <div ref={scrollRef} className="overflow-hidden scroll-smooth snap-x snap-mandatory">
              <div className="flex space-x-4 pb-4">
                {Leads.map((member, idx) => (
                  <article
                    key={member.name}
                    onClick={() => { stopAutoSlide(); scrollToPage(idx); }} // ✅ Stop auto-slide on card click
                    className="
                      flex-shrink-0
                      w-80 sm:w-45 lg:w-[18rem]
                      snap-center
                      text-center 
                      hover:shadow-lg 
                      transition-shadow 
                      border rounded-sm
                      cursor-pointer
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
                        <a href={member.social.facebook}><FaInstagram className="size-6 mr-3 cursor-pointer hover:scale-105"/></a>
                        <a href={member.social.linkedin}><FaLinkedin className="size-6 ml-3 cursor-pointer hover:scale-105"/></a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <Button
              onClick={scrollRight}
              variant="ghost"
              size="icon"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full"
            >
              <ArrowRight />
            </Button>
          </div>
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
