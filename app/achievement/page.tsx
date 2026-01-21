"use client"

import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Rocket, Award, Cpu, Users } from "lucide-react"
import Footer from "@/components/footer"

export default function AchievementPage() {
  return (
    <div className="pt-14">
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gray-50/50">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-medium mb-6 text-gray-900 tracking-tight">
            IEDC Achievements
            <span className="block text-[#1A4C96] mt-2">
              Building Innovation with Impact
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
            ].map(([name, desc], index) => (
              <div
                key={index}
                className="rounded-[2rem] border border-gray-100 bg-white shadow-none hover:shadow-md transition-all duration-500 group"
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
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-[2rem] bg-white p-8 shadow-none hover:shadow-md transition-all duration-500 border border-gray-100 group"
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
              "Where Is My College Bus App",
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-[2rem] border border-gray-100 p-8 bg-white shadow-none hover:shadow-md transition-all duration-500 group"
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
              "Smart India Hackathon 2024",
              "SSCS Arduino Contest 2025",
            ].map((event, index) => (
              <div
                key={index}
                className="rounded-[2rem] bg-white p-8 shadow-none hover:shadow-md transition-all duration-500 border border-gray-100 group"
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
              "PMKSY App for Panchayath Development",
              "TOWN Vibes – Exploring IEDC Town",
            ].map((project, index) => (
              <div
                key={index}
                className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-none hover:shadow-md transition-all duration-500 group"
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
            National & State-Level Exposure
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
}: {
  icon: React.ReactNode
  title: string
}) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="text-[#1A4C96] size-8">{icon}</div>
      <h2 className="text-4xl sm:text-5xl font-medium text-gray-900 tracking-tight">{title}</h2>
      <div className="flex-1 h-px bg-gray-200 ml-6" />
    </div>
  )
}
