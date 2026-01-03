"use client"

import { useState } from "react"
import {
  Home,
  Plus,
  ChevronRight,
  ChevronDown,
  BookOpen,
  FileText,
  ClipboardList,
  CalendarDays,
  BarChart3,
  Settings,
  User,
  Users,
  X,
  ChevronLeft,
} from "lucide-react"

interface InstructorSidebarProps {
  isDarkMode: boolean
  isOpen: boolean
  onToggle: () => void
}

export function InstructorSidebar({ isDarkMode, isOpen, onToggle }: InstructorSidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    courses: true,
    assignments: false,
    grades: false,
    attendance: false,
  })

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  const sidebarClass = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-200"
  const hoverClass = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
  const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white"

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
          z-50 ${sidebarClass} flex flex-col
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isOpen ? 'w-64' : 'lg:w-20'}
        `}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Header with Logo & Toggle */}
          <div className={`flex items-center justify-between h-16 px-4 border-b ${borderClass}`}>
            <div className={`flex items-center gap-3 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0'}`}>
              <div className="font-bold text-gray-600">
                <img src="/sms.png" alt="School Management System Logo" className="w-18 h-auto" />
              </div>
            </div>
            
            {/* Toggle button */}
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
          <div className={`p-4 border-b ${borderClass} overflow-y-auto flex-1`}>
            <div className={`flex items-center justify-between mb-3 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
              <h3 className="text-xs font-bold text-gray-600">Navigation</h3>
            </div>

            <div className="space-y-1">
              <div 
                className={`flex items-center gap-2 p-2 rounded bg-indigo-500 text-white cursor-pointer ${!isOpen ? 'lg:justify-center' : ''}`}
                title={!isOpen ? 'Dashboard' : undefined}
              >
                <Home className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <span className={`text-xs font-bold transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                  Dashboard
                </span>
              </div>

              <button
                onClick={() => toggleFolder("courses")}
                className={`flex items-center gap-2 p-2 rounded ${hoverClass} w-full text-left ${!isOpen ? 'lg:justify-center' : ''}`}
                title={!isOpen ? 'My Courses' : undefined}
              >
                {isOpen && (expandedFolders.courses ? <ChevronDown className="w-4 h-4 text-gray-600" /> : <ChevronRight className="w-4 h-4 text-gray-600" />)}
                <BookOpen className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <span className={`text-xs font-bold text-gray-600 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                  My Courses
                </span>
                <span className={`ml-auto text-xs font-bold text-gray-600 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                  4
                </span>
              </button>

              {expandedFolders.courses && isOpen && (
                <div className="ml-6 space-y-1">
                  <div className={`flex items-center gap-2 p-2 rounded ${hoverClass} cursor-pointer`}>
                    <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                    <span className="text-xs font-bold text-gray-600">CS 101 - Intro to Programming</span>
                  </div>
                  <div className={`flex items-center gap-2 p-2 rounded ${hoverClass} cursor-pointer`}>
                    <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <span className="text-xs font-bold text-gray-600">CS 201 - Data Structures</span>
                  </div>
                  <div className={`flex items-center gap-2 p-2 rounded ${hoverClass} cursor-pointer`}>
                    <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                    <span className="text-xs font-bold text-gray-600">CS 301 - Algorithms</span>
                  </div>
                  <div className={`flex items-center gap-2 p-2 rounded ${hoverClass} cursor-pointer`}>
                    <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0"></div>
                    <span className="text-xs font-bold text-gray-600">CS 401 - Senior Project</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => toggleFolder("assignments")}
                className={`flex items-center gap-2 p-2 rounded ${hoverClass} w-full text-left ${!isOpen ? 'lg:justify-center' : ''}`}
                title={!isOpen ? 'Assignments' : undefined}
              >
                {isOpen && (expandedFolders.assignments ? <ChevronDown className="w-4 h-4 text-gray-600" /> : <ChevronRight className="w-4 h-4 text-gray-600" />)}
                <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <span className={`text-xs font-bold text-gray-600 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                  Assignments
                </span>
                <span className={`ml-auto text-xs font-bold text-gray-600 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                  12
                </span>
              </button>

              <button
                onClick={() => toggleFolder("grades")}
                className={`flex items-center gap-2 p-2 rounded ${hoverClass} w-full text-left ${!isOpen ? 'lg:justify-center' : ''}`}
                title={!isOpen ? 'Grade Book' : undefined}
              >
                {isOpen && (expandedFolders.grades ? <ChevronDown className="w-4 h-4 text-gray-600" /> : <ChevronRight className="w-4 h-4 text-gray-600" />)}
                <ClipboardList className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <span className={`text-xs font-bold text-gray-600 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                  Grade Book
                </span>
              </button>

              <button
                onClick={() => toggleFolder("attendance")}
                className={`flex items-center gap-2 p-2 rounded ${hoverClass} w-full text-left ${!isOpen ? 'lg:justify-center' : ''}`}
                title={!isOpen ? 'Attendance' : undefined}
              >
                {isOpen && (expandedFolders.attendance ? <ChevronDown className="w-4 h-4 text-gray-600" /> : <ChevronRight className="w-4 h-4 text-gray-600" />)}
                <CalendarDays className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <span className={`text-xs font-bold text-gray-600 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                  Attendance
                </span>
              </button>

              <div 
                className={`flex items-center gap-2 p-2 rounded ${hoverClass} cursor-pointer ${!isOpen ? 'lg:justify-center' : ''}`}
                title={!isOpen ? 'Students' : undefined}
              >
                <Users className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <span className={`text-xs font-bold text-gray-600 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                  Students
                </span>
                <span className={`ml-auto text-xs font-bold text-gray-600 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                  247
                </span>
              </div>

              <div 
                className={`flex items-center gap-2 p-2 rounded ${hoverClass} cursor-pointer ${!isOpen ? 'lg:justify-center' : ''}`}
                title={!isOpen ? 'Analytics' : undefined}
              >
                <BarChart3 className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <span className={`text-xs font-bold text-gray-600 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                  Analytics
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`p-4 border-b ${borderClass} transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-gray-600">Quick Actions</h3>
              <button className={`p-1 rounded ${hoverClass}`}>
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="space-y-1">
              <button className="w-full bg-indigo-500 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-indigo-600 transition-colors">
                <Plus className="w-4 h-4 text-gray-600" />
                New Assignment
              </button>
              <button
                className={`w-full ${cardBgClass} border ${borderClass} px-3 py-2 rounded-lg text-xs font-bold text-gray-600 flex items-center gap-2 ${hoverClass} transition-colors`}
              >
                <CalendarDays className="w-4 h-4 text-gray-600" />
                Mark Attendance
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className={`mt-auto p-4 border-t ${borderClass}`}>
            <div className={`flex items-center gap-3 p-2 rounded ${hoverClass} cursor-pointer ${!isOpen ? 'lg:justify-center' : ''}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-600 text-white" />
              </div>
              <div className={`flex-1 min-w-0 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                <p className="text-xs font-bold text-gray-600 truncate">Dr. Sarah Johnson</p>
                <p className="text-xs font-bold text-gray-600 truncate">Computer Science</p>
              </div>
              <Settings className={`w-4 h-4 text-gray-600 flex-shrink-0 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`} />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}