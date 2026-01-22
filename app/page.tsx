"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import AnimatedBackground from "@/components/animated-background";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { Leads } from "@/components/Team";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(0);

  // Interval/toggle refs for auto-slide
  const isPausedRef = useRef(false);
  
  // Touch/swipe refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setPageCount(Leads.length);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Elements
      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5,
      });

      // Section Titles Reveal
      const sectionTitles = gsap.utils.toArray(".section-title-inner");
      sectionTitles.forEach((title: any) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 95%",
          },
          yPercent: 100,
          skewY: 2,
          duration: 1.2,
          ease: "power4.out",
        });
      });

      // About Image Parallax
      gsap.to(".about-image-inner", {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -50,
        ease: "none",
      });

      // Team Cards Stagger
      gsap.from(".team-card", {
        scrollTrigger: {
          trigger: ".team-section",
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Team Section Horizontal Parallax on Scroll
      gsap.to(".team-card-container", {
        scrollTrigger: {
          trigger: ".team-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        x: -40,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /**
   * Calculate scroll amount between adjacent cards reliably.
   */
  const getScrollAmount = () => {
    const scroller = scrollRef.current;
    if (!scroller) return 0;
    const cards = Array.from(scroller.querySelectorAll("article"));
    if (cards.length >= 2) {
      const first = cards[0];
      const second = cards[1];
      return second.offsetLeft - first.offsetLeft;
    } else if (cards.length === 1) {
      const only = cards[0];
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
    
    gsap.to(scroller, {
      scrollLeft: targetLeft,
      duration: 1.5,
      ease: "power4.out",
      overwrite: true
    });

    // Ensure all cards stay at full opacity and standard scale
    const cards = scroller.querySelectorAll('.team-card');
    cards.forEach((card) => {
      gsap.to(card, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
      });
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
    <div className="bg-[#fafafa]" ref={containerRef}>
      {/* 🏠 Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        
        {/* Background Large Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <h1 className="text-[20vw] font-black text-gray-900/[0.03] leading-none uppercase tracking-tighter">
            Innovation
          </h1>
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-12">
            <div className="max-w-3xl">
              
              <h1 className="hero-text text-6xl sm:text-7xl lg:text-[100px] font-bold leading-[0.95] tracking-tight text-gray-900 mb-8">
                Think Big.<br />
                <span className="text-[#1A4C96]">Build</span> Faster.
              </h1>
              
              <p className="hero-text text-xl md:text-2xl text-gray-500 mb-10 max-w-xl leading-relaxed">
                The most active student innovation hub at CEV. We turn radical ideas into real-world ventures.
              </p>

              <div className="hero-text flex flex-wrap justify-center md:justify-start gap-5">
                <Link
                  href="/join"
                  className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden font-bold text-white transition-all duration-500 bg-black rounded-full hover:bg-black shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                >
                  <span className="absolute inset-0 w-full h-full transition-all duration-500 ease-out bg-[#1A4C96] -translate-x-full group-hover:translate-x-0" />
                  <span className="relative flex items-center gap-3 text-sm tracking-widest uppercase">
                    Join the Hub <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </span>
                </Link>
                
                <Link 
                  href="/events"
                  className="group inline-flex items-center justify-center px-10 py-5 font-bold rounded-full border-2 border-gray-200 hover:border-[#1A4C96] transition-all duration-500 text-gray-900"
                >
                  <span className="text-sm tracking-widest uppercase flex items-center gap-3">
                    View Events <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform text-[#1A4C96]" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="hero-text hidden lg:flex flex-col items-center gap-6">
              <span className="text-xs font-bold uppercase tracking-[0.3em] vertical-text text-gray-400">Scroll to Explore</span>
              <div className="w-px h-24 bg-gradient-to-b from-gray-200 to-transparent" />
            </div>
          </div>
        </div>

        {/* Floating Abstract Element */}
        <div className="absolute right-[5%] top-[15%] w-32 h-32 md:w-64 md:h-64 border border-black/5 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none hidden md:block" />
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
                <span className="block overflow-hidden">
                  <span className="section-title-inner block">Engineering the <span className="text-[#1A4C96]">Future</span></span>
                </span>
                <span className="block overflow-hidden">
                  <span className="section-title-inner block">of Innovation</span>
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed about-text">
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
              <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-2 hover:rotate-0 transition-transform duration-500 about-image-inner">
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
              <h2 className="text-4xl sm:text-5xl font-medium text-gray-900 mb-4 tracking-tight">
                <span className="block overflow-hidden">
                  <span className="section-title-inner block">Meet the <span className="text-[#1A4C96]">Minds</span></span>
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-xl">The architects of innovation and the driving force behind the IEDC CEV community.</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={scrollLeft}
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full border-gray-200 hover:border-[#1A4C96] hover:text-[#1A4C96] hover:scale-110 transition-all nav-btn"
              >
                <ArrowLeft className="size-6" />
              </Button>
              <Button
                onClick={scrollRight}
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full border-gray-200 hover:border-[#1A4C96] hover:text-[#1A4C96] hover:scale-110 transition-all nav-btn"
              >
                <ArrowRight className="size-6" />
              </Button>
            </div>
          </header>

          <section 
            className="relative" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-label="Team members carousel"
          >
            {/* Scrollable team list with GSAP-controlled scrollLeft */}
            <div ref={scrollRef} className="overflow-hidden no-scrollbar touch-pan-y">
              <div className="team-card-container flex space-x-6 pb-8">
                {Leads.map((member, idx) => (
                  <article
                    key={member.name}
                    onClick={() => scrollToPage(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        scrollToPage(idx);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View ${member.name}'s profile`}
                    className="
                      team-card
                      flex-shrink-0
                      w-[280px] sm:w-[320px]
                      aspect-[3/4]
                      relative
                      rounded-[2.5rem]
                      overflow-hidden
                      group
                      cursor-pointer
                      will-change-transform
                    "
                  >
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-8 pt-0 z-20">
                      <div className="flex flex-col gap-3 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-700 ease-[0.23,1,0.32,1]">
                        <div className="space-y-1">
                          <h3 className="text-xl font-medium text-white leading-tight font-montserrat">
                            {member.name}
                          </h3>
                          <p className="text-[#3b82f6] text-xs font-semibold tracking-widest uppercase font-poppins">
                            {member.role}
                          </p>
                        </div>
                        
                        <div className="flex gap-4 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          <a 
                            href={member.social.facebook} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-white/10 backdrop-blur-md p-2.5 rounded-full hover:bg-white hover:text-black transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaInstagram className="size-4" />
                          </a>
                          <a 
                            href={member.social.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-white/10 backdrop-blur-md p-2.5 rounded-full hover:bg-white hover:text-black transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaLinkedin className="size-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
