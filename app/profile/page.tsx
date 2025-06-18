"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, User, Mail, Phone, GraduationCap, Calendar, BadgeIcon as IdCard, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import jsPDF from "jspdf"
import QRCode from "qrcode"

export default function ProfilePage() {
  const { user, userProfile, loading, signOut } = useAuth()
  const [generatingPDF, setGeneratingPDF] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  const generateIDCard = async () => {
    if (!userProfile) return

    setGeneratingPDF(true)
    try {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [85.6, 53.98], // Credit card size
      })

      // Generate QR code
      const qrCodeDataURL = await QRCode.toDataURL(
        `IEDC Member: ${userProfile.name}\nID: ${userProfile.member_id}\nEmail: ${userProfile.email}`,
        { width: 100, margin: 1 },
      )

      // Background
      pdf.setFillColor(26, 76, 150) // IEDC Blue
      pdf.rect(0, 0, 85.6, 53.98, "F")

      // White content area
      pdf.setFillColor(255, 255, 255)
      pdf.rect(2, 2, 81.6, 49.98, "F")

      // IEDC Logo area (placeholder)
      pdf.setFillColor(26, 76, 150)
      pdf.rect(4, 4, 12, 8, "F")
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(8)
      pdf.text("IEDC", 6, 9)

      // Title
      pdf.setTextColor(26, 76, 150)
      pdf.setFontSize(10)
      pdf.setFont("helvetica", "bold")
      pdf.text("IEDC CE VADAKARA", 18, 8)
      pdf.setFontSize(6)
      pdf.setFont("helvetica", "normal")
      pdf.text("Innovation & Entrepreneurship Development Cell", 18, 11)

      // Member details
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(8)
      pdf.setFont("helvetica", "bold")
      pdf.text("Name:", 4, 18)
      pdf.setFont("helvetica", "normal")
      pdf.text(userProfile.name, 15, 18)

      pdf.setFont("helvetica", "bold")
      pdf.text("ID:", 4, 23)
      pdf.setFont("helvetica", "normal")
      pdf.text(userProfile.member_id, 15, 23)

      pdf.setFont("helvetica", "bold")
      pdf.text("Department:", 4, 28)
      pdf.setFont("helvetica", "normal")
      pdf.text(userProfile.department.substring(0, 20), 20, 28)

      pdf.setFont("helvetica", "bold")
      pdf.text("Semester:", 4, 33)
      pdf.setFont("helvetica", "normal")
      pdf.text(userProfile.semester.toString(), 18, 33)

      // QR Code
      pdf.addImage(qrCodeDataURL, "PNG", 65, 15, 15, 15)

      // Footer
      pdf.setFontSize(5)
      pdf.setTextColor(100, 100, 100)
      pdf.text("College of Engineering Vadakara", 4, 45)
      pdf.text("Kerala, India", 4, 48)

      // Save the PDF
      pdf.save(`${userProfile.member_id}_ID_Card.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setGeneratingPDF(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user || !userProfile) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <Alert>
          <AlertDescription>Please sign in to view your profile.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Member Profile</h1>
          <p className="text-xl text-gray-600">Welcome to IEDC CE Vadakara</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                    <p className="text-lg font-semibold">{userProfile.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <p className="text-lg">{userProfile.email}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Department</Label>
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      <p className="text-lg">{userProfile.department}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Semester</Label>
                    <p className="text-lg font-semibold">Semester {userProfile.semester}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Contact Number</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <p className="text-lg">{userProfile.contact_no}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Member Since</Label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <p className="text-lg">{new Date(userProfile.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Membership Card */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <IdCard className="h-5 w-5" />
                  <span>Membership</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge className="bg-[#1A4C96] text-white px-4 py-2 text-lg">Active Member</Badge>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">Membership ID</Label>
                  <p className="text-xl font-bold text-[#1A4C96] font-mono">{userProfile.member_id}</p>
                </div>

                <Button
                  onClick={generateIDCard}
                  className="w-full bg-[#1A4C96] hover:bg-[#1A4C96]/90"
                  disabled={generatingPDF}
                >
                  {generatingPDF ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download ID Card (PDF)
                    </>
                  )}
                </Button>

                <div className="pt-4 border-t">
                  <Button variant="outline" onClick={signOut} className="w-full">
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
