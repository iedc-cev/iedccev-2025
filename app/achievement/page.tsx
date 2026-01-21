"use client"

import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Rocket, Award, Cpu, Users } from "lucide-react"

export default function AchievementPage() {
  return (
    <div className="pt-14">
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">
            IEDC Achievements
            <span className="block text-blue-600 mt-2">
              Building Innovation with Impact
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A journey of innovation, mentorship, technology, and student-driven excellence.
          </p>
        </div>
      </section>

      {/* Incubated Startups */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle icon={<Rocket />} title="Incubated Start-ups" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="rounded-xl border bg-white shadow-sm hover:shadow-lg transition-all"
              >
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-blue-600">Incubated</Badge>
                  <h3 className="text-xl font-semibold mb-2">{name}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle icon={<Award />} title="Awards & Recognition" />

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Best Faculty Mentorship Award – STRIDE Makeathon 2025 (KDISC)",
              "Best Facilitator Award – District Level, YIP (Young Innovators Programme)",
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-8 shadow-sm hover:shadow-md transition"
              >
                <p className="text-lg font-medium text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
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
                className="rounded-xl border p-6 bg-white shadow-sm hover:shadow-md transition"
              >
                <p className="font-medium text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
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
                className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-gray-900">{event}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle icon={<Users />} title="Ongoing Projects" />

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Block Innovation Cluster – Wildlife Mitigation Project",
              "PMKSY App for Panchayath Development",
              "TOWN Vibes – Exploring IEDC Town",
            ].map((project, index) => (
              <div
                key={index}
                className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <p className="font-medium text-gray-800">{project}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exposure */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">
            National & State-Level Exposure
          </h2>
          <p className="text-gray-700">
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
    <div className="flex items-center gap-3 mb-12">
      <div className="text-blue-600">{icon}</div>
      <h2 className="text-3xl font-semibold text-gray-900">{title}</h2>
      <div className="flex-1 h-px bg-gray-200 ml-4" />
    </div>
  )
}
