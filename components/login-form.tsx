"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, X, Mail } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface LoginFormProps {
  onClose: () => void
  onSwitchToRegister: () => void
}

export default function LoginForm({ onClose, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [useMagicLink, setUseMagicLink] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { signInWithEmail, signInWithGoogle, signInWithMagicLink } = useAuth()

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await signInWithEmail(email, password)
      onClose()
    } catch (error: any) {
      setError(error.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await signInWithMagicLink(email)
      setEmailSent(true)
    } catch (error: any) {
      setError(error.message || "Failed to send magic link. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError("")

    try {
      await signInWithGoogle()
    } catch (error: any) {
      setError(error.message || "Google login failed. Please try again.")
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div>
          <Card className="absolute top-20 left-[13%] w-full max-w-sm shadow-2xl sm:left-[40%]">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-xl">Check Your Email</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-center space-y-4 pb-6">
            <div className="w-16 h-16 bg-[#1A4C96]/10 rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-[#1A4C96]" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Magic Link Sent!</h3>
              <p className="text-sm text-gray-600 mb-4">
                We've sent a magic link to <strong>{email}</strong>. Click the link in your email to sign in.
              </p>
            </div>
            <Button variant="outline" onClick={() => setEmailSent(false)} className="w-full">
              Try Different Email
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <Card className="absolute top-20 left-[13%] w-full max-w-sm shadow-2xl sm:left-[40%]">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl">Sign In to IEDC CEV</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4 pb-6">
          <Button onClick={handleGoogleLogin} variant="outline" className="w-full h-10" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Button
              variant={!useMagicLink ? "default" : "outline"}
              size="sm"
              onClick={() => setUseMagicLink(false)}
              className={!useMagicLink ? "bg-[#1A4C96]" : ""}
            >
              Password
            </Button>
            <Button
              variant={useMagicLink ? "default" : "outline"}
              size="sm"
              onClick={() => setUseMagicLink(true)}
              className={useMagicLink ? "bg-[#1A4C96]" : ""}
            >
              Magic Link
            </Button>
          </div>

          {!useMagicLink ? (
            <form onSubmit={handlePasswordLogin} className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-9"
                />
              </div>

              {error && (
                <Alert variant="destructive" className="py-2">
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-[#1A4C96] hover:bg-[#1A4C96]/90 h-10" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={handleMagicLinkLogin} className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email-magic" className="text-sm">
                  Email Address
                </Label>
                <Input
                  id="email-magic"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9"
                />
                <p className="text-xs text-gray-500">We'll send you a magic link to sign in</p>
              </div>

              {error && (
                <Alert variant="destructive" className="py-2">
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-[#1A4C96] hover:bg-[#1A4C96]/90 h-10" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Magic Link
              </Button>
            </form>
          )}

          <div className="text-center text-sm pt-2">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Button variant="link" className="p-0 h-auto text-sm" onClick={onSwitchToRegister}>
              Register here
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
