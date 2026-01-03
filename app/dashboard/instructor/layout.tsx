"use client"

import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { InstructorSidebar } from "@/components/instructor/instructor-sidebar"
import { useState } from "react"
import { InstructorNavbar } from "@/components/instructor/instructor-navbar"
import SMSFooter from "@/components/dashboard/dashboard-footer"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true) // Changed to true by default for desktop
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="flex w-full h-screen bg-gray-100 text-gray-900">
      {/* Sidebar with toggle function */}
      <InstructorSidebar 
        isDarkMode={isDarkMode} 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      {/* Main Content Area */}
      <div 
        className={`
          flex-1 flex flex-col overflow-hidden
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}
        `}
      >
        {/* Navbar */}
        <InstructorNavbar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
          <SMSFooter />
        </main>
      </div>
      
      <Analytics />
    </div>
  )
}