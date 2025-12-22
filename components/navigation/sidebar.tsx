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
} from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Students", href: "/dashboard/students", icon: GraduationCap },
  { name: "Teachers", href: "/dashboard/teacher", icon: Users },
  { name: "Classes", href: "/dashboard/classes", icon: BookOpen },
  { name: "Attendance", href: "/dashboard/attendance", icon: Calendar },
  { name: "Finance", href: "/dashboard/finance", icon: DollarSign },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const institutionId = searchParams.get('q');

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Logo */}
        <div className="flex items-center h-20 px-6">
          <div className="flex items-center gap-3">
            <div className="font-bold text-gray-900">
              {/* logo in png */}
              <img src="/sms.png" alt="SMS Logo" className="w-18 h-auto" />
            </div>
          </div>
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
                className={`text-xs font-bold max-w-2xl mx-auto group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`w-3 h-3 font-bold ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"}`}
                />
                {item.name}
                {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />}
              </Link>
            )
          })}
        </nav>

        {/* Help section */}
        <div className="p-4 ">
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
  )
}
