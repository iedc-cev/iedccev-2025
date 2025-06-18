"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, X, Mail } from "lucide-react"
import { supabaseClient } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"

interface RegistrationFormProps {
  onClose: () => void
}

export default function RegistrationForm({ onClose }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    semester: "",
    contactNo: "",
    email: "",
    uniqueCode: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter()
  const { signInWithMagicLink } = useAuth()

  const departments = [
    "Computer Science Engineering",
    "Electronics and Communication Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical and Electronics Engineering",
  ]

  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"]

  const generateMemberId = (email: string) => {
    let hash = 0
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return `IEDC-${Math.abs(hash).toString(36).substring(0, 8)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validate unique code
      if (formData.uniqueCode !== "abhin") {
        setError("Invalid unique code. Please contact IEDC for the correct code.")
        setLoading(false)
        return
      }

      // Check if user already exists
      const { data: existingUser } = await supabaseClient
        .from("users")
        .select("email")
        .eq("email", formData.email)
        .single()

      if (existingUser) {
        setError("User with this email already exists. Please sign in instead.")
        setLoading(false)
        return
      }

      // Create user profile first
      const memberId = generateMemberId(formData.email)

      const { error: insertError } = await supabaseClient.from("users").insert({
        name: formData.name,
        email: formData.email,
        department: formData.department,
        semester: Number.parseInt(formData.semester),
        contact_no: formData.contactNo,
        member_id: memberId,
      })

      if (insertError) {
        throw insertError
      }

      // Send magic link for authentication
      await signInWithMagicLink(formData.email)
      setEmailSent(true)
    } catch (error: any) {
      setError(error.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="fixed top-16 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-40 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-xl">Registration Complete!</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-center space-y-4 pb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Check Your Email!</h3>
              <p className="text-sm text-gray-600 mb-4">
                Welcome to IEDC CEV! We've sent a magic link to <strong>{formData.email}</strong>. Click the link to
                complete your registration and access your profile.
              </p>
            </div>
            <Button onClick={onClose} className="w-full bg-[#1A4C96] hover:bg-[#1A4C96]/90">
              Got it!
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-40 p-4">
      <Card className="w-full max-w-2xl max-h-[calc(100vh-8rem)] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl">Join IEDC CEV</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="pb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department" className="text-sm font-medium">
                  Department
                </Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="semester" className="text-sm font-medium">
                  Semester
                </Label>
                <Select
                  value={formData.semester}
                  onValueChange={(value) => setFormData({ ...formData, semester: value })}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((sem) => (
                      <SelectItem key={sem} value={sem}>
                        Semester {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactNo" className="text-sm font-medium">
                  Contact Number
                </Label>
                <Input
                  id="contactNo"
                  type="tel"
                  required
                  value={formData.contactNo}
                  onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="uniqueCode" className="text-sm font-medium">
                  Unique Code
                </Label>
                <Input
                  id="uniqueCode"
                  type="text"
                  required
                  placeholder="Enter the unique code"
                  value={formData.uniqueCode}
                  onChange={(e) => setFormData({ ...formData, uniqueCode: e.target.value })}
                  className="h-10"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> After registration, we'll send you a magic link via email to complete your
                account setup. No password required!
              </p>
            </div>

            {error && (
              <Alert variant="destructive" className="py-3">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-[#1A4C96] hover:bg-[#1A4C96]/90 h-11 mt-6" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register & Send Magic Link
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
