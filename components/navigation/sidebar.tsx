// Sidebar.tsx
"use client"

import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  DollarSign,
  MessageSquare,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Students", href: "/dashboard/students", icon: GraduationCap },
  { name: "Departments", href: "/dashboard/administrator/departments", icon: Building2 },
  { name: "Stuff", href: "/dashboard/administrator/stuff", icon: Users },
  { name: "Classes", href: "/dashboard/classes", icon: BookOpen },
  { name: "Attendance", href: "/dashboard/attendance", icon: Calendar },
  { name: "Finance", href: "/dashboard/finance", icon: DollarSign },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const institutionId = searchParams.get('q')

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-gray-100 flex flex-col
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isOpen ? 'w-72' : 'lg:w-20'}
        `}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo & Toggle Button */}
          <div className="flex items-center justify-between h-20 px-6">
            <div className={`flex items-center gap-3 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0'}`}>
              <div className="font-bold text-gray-900">
                <img src="/sms.png" alt="SMS Logo" className="w-18 h-auto" />
              </div>
            </div>
            
            {/* Toggle button - visible on all screens when open, only on desktop when closed */}
            <button
              onClick={onToggle}
              className={`
                p-2 rounded-lg hover:bg-gray-200 transition-colors
                ${isOpen ? 'block' : 'hidden lg:block lg:mx-auto'}
              `}
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={`${item.href}?q=${institutionId}`}
                  style={{
                    fontFamily: "'Inter', -apple-system, sans-serif",
                    letterSpacing: '-0.02em',
                    lineHeight: '1.3',
                  }}
                  className={`
                    text-xs font-bold group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                    ${!isOpen ? 'lg:justify-center' : ''}
                  `}
                  title={!isOpen ? item.name : undefined}
                >
                  <item.icon
                    className={`w-5 h-5 font-bold flex-shrink-0 ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  <span className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                    {item.name}
                  </span>
                  {isActive && isOpen && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Help section */}
          <div className={`p-4 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <HelpCircle className="w-8 h-8 text-blue-600 mb-2" />
              <p className="text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "Cambria, serif" }}>
                Need Help?
              </p>
              <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: "Cambria, serif" }}>
                Our support team is here for you
              </p>
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
