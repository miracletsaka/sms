"use client"

import { useState } from "react"
import { Search, Bell, Users, Share2, Grid3x3, List, ChevronDown, Menu, BookOpen, ClipboardCheck, TrendingUp } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface InstructorNavbarProps {
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
  viewMode: "grid" | "list"
  setViewMode: (value: "grid" | "list") => void
  onMenuClick: () => void
}

const courses = [
  { id: "cs101", name: "CS 101 - Intro to Programming", color: "green", students: 87 },
  { id: "cs201", name: "CS 201 - Data Structures", color: "blue", students: 65 },
  { id: "cs301", name: "CS 301 - Algorithms", color: "purple", students: 52 },
  { id: "cs401", name: "CS 401 - Senior Project", color: "orange", students: 43 },
]

export function InstructorNavbar({
  isDarkMode,
  setIsDarkMode,
  viewMode,
  setViewMode,
  onMenuClick,
}: InstructorNavbarProps) {
  const [selectedCourse, setSelectedCourse] = useState(courses[0])

  const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-gray100"
  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-100"
  const hoverClass = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"

  // Calculate total students across all courses
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0)

  return (
    <div className={`${cardBgClass} border-b ${borderClass} px-4`}>
      <div className="flex items-center justify-between gap-4">
        {/* Left Section - Mobile Menu + Course Selector */}
        <div className="flex items-center gap-2 md:gap-4 flex-1">
          {/* Mobile Menu Button */}
          <button onClick={onMenuClick} className={`lg:hidden p-2 rounded ${hoverClass}`} aria-label="Toggle menu">
            <Menu className="w-5 h-5" />
          </button>

          {/* Class Selector Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`flex items-center gap-2 ${cardBgClass} border ${borderClass} max-w-[200px] md:max-w-xs`}
              >
                <div className={`w-2 h-2 rounded-full bg-${selectedCourse.color}-500`}></div>
                <span className="text-xs font-bold text-gray-400 truncate">{selectedCourse.name}</span>
                <ChevronDown className="w-4 h-4 ml-auto flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[280px]">
              <DropdownMenuLabel className="text-xs font-bold text-gray-400">Select Course</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {courses.map((course) => (
                <DropdownMenuItem
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className="flex items-center gap-2"
                >
                  <div className={`w-2 h-2 rounded-full bg-${course.color}-500`}></div>
                  <span className="text-xs font-bold text-gray-400">{course.name}</span>
                  <span className={`ml-auto text-xs font-bold ${mutedTextClass}`}>{course.students} students</span>
                  {selectedCourse.id === course.id && <span className="text-xs text-indigo-500">✓</span>}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-indigo-500 text-xs font-bold">View All Courses</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Semester Badge */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400">Semester:</span>
            <span className="text-xs font-bold text-gray-400">Spring 2024</span>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* View Mode Toggle */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-white dark:bg-gray-800 shadow-sm" : hoverClass}`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${viewMode === "list" ? "bg-white dark:bg-gray-800 shadow-sm" : hoverClass}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <button className={`p-2 rounded ${hoverClass}`}>
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className={`p-2 rounded ${hoverClass} relative`}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Share */}
          <button className={`hidden md:block p-2 rounded ${hoverClass}`}>
            <Share2 className="w-5 h-5" />
          </button>

          {/* Dark Mode Toggle */}
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded ${hoverClass}`}>
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

    </div>
  )
}