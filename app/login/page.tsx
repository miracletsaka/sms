"use client"

import { GraduationCap } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { Sociallogin } from "@/components/social-login"
import Footer from "@/components/footer"
import { Navigation } from "@/components/nav/navigation"

export default function loginPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      <Navigation />
      <div className="min-h-screen flex justify-center items-center w-full">
      {/* Left Side - login Form */}
      <div className="flex items-center justify-center p-8">
        <div
          className={`w-full max-w-5xl space-y-8 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Welcome Text */}
          <div className="space-y-2">
            <h1 className="text-sm font-bold text-gray-600">
              Welcome back
            </h1>
            <p className="text-xs font-bold text-gray-400">
              Sign in to continue to your dashboard
            </p>
          </div>

          <LoginForm />
          <Sociallogin />

          {/* Sign Up Link */}
          <p className="text-xs font-bold text-gray-400">
            Don't have account?{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-700">
              Register your institution
            </Link>
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  )
}
