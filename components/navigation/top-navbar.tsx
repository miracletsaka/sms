"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, Menu, LogOut, User, Settings, ChevronDown } from "lucide-react"
import { signOut } from "next-auth/react"

interface TopNavbarProps {
  onMenuClick: () => void
}

export function TopNavbar({ onMenuClick }: TopNavbarProps) {
  return (
    // glass bg
    <header className="text-gray-400 bg-gray-100 sticky lg:fixed top-0 right-0 z-40 flex h-20 items-center gap-4 px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-gray-400 hover: hover:bg-gray-100"
        onClick={onMenuClick}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Search */}
      <div className="flex-1 max-w-2xl rounded-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search students, teachers, classes..."
            className="w-full bg-transparent pl-12 pr-4 py-3 bg-gray-50 placeholder:text-gray-400 rounded-xl text-sm  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            style={{ fontFamily: "Cambria, serif" }}
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Quick stats */}
        <div className="hidden xl:flex items-center gap-4 px-4 py-2 rounded-xl border border-blue-100">
          <div className="text-right">
            <p className="text-xs" style={{ fontFamily: "Cambria, serif" }}>
              Today's Attendance
            </p>
            <p className="text-sm font-bold " style={{ fontFamily: "Cambria, serif" }}>
              94.2%
            </p>
          </div>
          <div className="w-px h-8 bg-gray-300" />
          <div className="text-right">
            <p className="text-xs" style={{ fontFamily: "Cambria, serif" }}>
              Active Classes
            </p>
            <p className="text-sm font-bold " style={{ fontFamily: "Cambria, serif" }}>
              38/42
            </p>
          </div>
        </div>

        <div className="bg-white/50 flex items-center gap-1 text-zinc-500 p-2 rounded-2xl">
          {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-400 hover: hover:bg-gray-100 rounded-xl"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white border-gray-200">
            <DropdownMenuLabel className="" style={{ fontFamily: "Cambria, serif" }}>
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200" />
            <div className="p-4 text-sm" style={{ fontFamily: "Cambria, serif" }}>
              No new notifications
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 hover:bg-gray-100 rounded-xl px-3 py-2">
              <Avatar className="w-10 h-10 border-2 border-blue-200">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-gray-400 text-sm font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold " style={{ fontFamily: "Cambria, serif" }}>
                  Admin User
                </p>
                <p className="text-xs" style={{ fontFamily: "Cambria, serif" }}>
                  institution Admin
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200">
            <DropdownMenuLabel className="" style={{ fontFamily: "Cambria, serif" }}>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuItem className="text-gray-400 hover: hover:bg-gray-100">
              <User className="w-4 h-4 mr-2" />
              <span style={{ fontFamily: "Cambria, serif" }}>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-400 hover: hover:bg-gray-100">
              <Settings className="w-4 h-4 mr-2" />
              <span style={{ fontFamily: "Cambria, serif" }}>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuItem onClick={()=>signOut()} className="text-red-600 hover:text-red-700 hover:bg-gray-100">
              <LogOut className="w-4 h-4 mr-2" />
              <span style={{ fontFamily: "Cambria, serif" }}>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>

        
      </div>
    </header>
  )
}
