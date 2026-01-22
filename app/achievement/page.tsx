"use client"

import { useEffect, useRef } from "react"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Rocket, Award, Cpu, Users } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AchievementPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Reveal
      const heroLines = gsap.utils.toArray(".hero-line-inner")
      gsap.from(heroLines, {
        yPercent: 100,
        skewY: 3,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.1,
      })

      // Section Title Reveal
      const sectionTitles = gsap.utils.toArray(".section-title-inner")
      sectionTitles.forEach((title: any) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 95%",
            toggleActions: "play none none none",
          },
          yPercent: 100,
          skewY: 2,
          duration: 1.2,
          ease: "power4.out",
        })
      })

      // Staggered Cards
      const cardSections = [".startup-card", ".award-card", ".infra-card", ".event-card", ".project-card"]
      cardSections.forEach(selector => {
        const cards = gsap.utils.toArray(selector)
        if (cards.length > 0) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: cards[0] as Element,
              start: "top 90%",
              once: true,
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          })
        }
      })

      // Refresh ScrollTrigger to ensure correct positions
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 500)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-14" ref={containerRef}>
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gray-50/50">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-medium mb-6 text-gray-900 tracking-tight">
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">IEDC Achievements</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line-inner block text-[#1A4C96] mt-2">
                Building Innovation with Impact
              </span>
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A journey of innovation, mentorship, technology, and student-driven excellence.
          </p>
        </div>
      </section>

      {/* Incubated Startups */}
      <section className="py-24 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Rocket />} title="Incubated Start-ups" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ["Finite Intelligence", "AI and Robotics based start-up"],
              ["Cybroque Technologies", "IT Solutions Start-up"],
              ["Lofritex", "IT Solutions Start-up"],
              ["TXTUDIO", "IT Solutions Start-up"],
              ["Made Webs", "IT Solutions Start-up"],
              ["Jumpspace Studio", "Architectural Studio"],
            ].map(([name, desc]) => (
              <div
                key={name}
                className="rounded-[2rem] border border-gray-100 bg-white shadow-none hover:shadow-md transition-shadow duration-500 group startup-card"
              >
                <CardContent className="p-8">
                  <Badge className="mb-4 bg-[#1A4C96] hover:bg-[#1A4C96]/90">Incubated</Badge>
                  <h3 className="text-xl font-medium mb-3 text-gray-900 group-hover:text-[#1A4C96] transition-colors">{name}</h3>
                  <p className="text-gray-600 leading-relaxed">{desc}</p>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Award />} title="Awards & Recognition" />

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Best Faculty Mentorship Award – STRIDE Makeathon 2025 (KDISC)",
              "Best Facilitator Award – District Level, YIP (Young Innovators Programme)",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[2rem] bg-white p-8 shadow-none hover:shadow-md transition-shadow duration-500 border border-gray-100 group award-card"
              >
                <p className="text-lg font-medium text-gray-900 leading-relaxed group-hover:text-[#1A4C96] transition-colors">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-24 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Cpu />} title="Infrastructure & Innovation" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "RFID Door & Attendance System at IEDC Room",
              "IEDC Room Automation System",
              "Smart Canteen",
              "NSS Blood Bank System",
             
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-[2rem] border border-gray-100 p-8 bg-white shadow-none hover:shadow-md transition-shadow duration-500 group infra-card"
              >
                <p className="font-medium text-gray-900 leading-relaxed group-hover:text-[#1A4C96] transition-colors">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Trophy />} title="Major Events Conducted" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "EVOLVIA – IEDC Flagship Event",
              "CONCLAVE",
            
            ].map((event, index) => (
              <div
                key={event}
                className="rounded-[2rem] bg-white p-8 shadow-none hover:shadow-md transition-shadow duration-500 border border-gray-100 group event-card"
              >
                <h3 className="font-medium text-gray-900 leading-relaxed group-hover:text-[#1A4C96] transition-colors">{event}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="py-24 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Users />} title="Ongoing Projects" />

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Block Innovation Cluster – Wildlife Mitigation Project",
             
              "TOWN Vibes – Exploring IEDC Town",
            ].map((project) => (
              <div
                key={project}
                className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-none hover:shadow-md transition-shadow duration-500 group project-card"
              >
                <p className="font-medium text-gray-900 leading-relaxed group-hover:text-[#1A4C96] transition-colors">{project}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exposure */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-medium mb-6 text-gray-900 tracking-tight">
            <span className="block overflow-hidden">
              <span className="section-title-inner block">National & State-Level Exposure</span>
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Participation in IEDC Summit, KSUM Innovation Tour, and Kerala
            Innovation Festival, strengthening ecosystem exposure and innovation culture.
          </p>
        </div>
      </section>
    </div>
  )
}

/* ---------- Helper ---------- */

function SectionTitle({
  icon,
  title,
}: Readonly<{
  icon: React.ReactNode
  title: string
}>) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="text-[#1A4C96] size-8">{icon}</div>
      <h2 className="text-4xl sm:text-5xl font-medium text-gray-900 tracking-tight">
        <span className="block overflow-hidden">
          <span className="section-title-inner block">{title}</span>
        </span>
      </h2>
      <div className="flex-1 h-px bg-gray-200 ml-6" />
    </div>
  )
}
