// DashboardLayout.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { TopNavbar } from "@/components/navigation/top-navbar"
import { Suspense } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Suspense fallback={null}>
      <div className="min-h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div
          className={`transition-all duration-300 ${
            sidebarOpen ? 'lg:pl-72' : 'lg:pl-20'
          }`}
        >
          <TopNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main>{children}</main>
        </div>
      </div>
    </Suspense>
  )
}