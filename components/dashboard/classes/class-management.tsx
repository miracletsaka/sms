"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Plus, Search, Users, DoorOpen, Clock, Sun, Moon, 
  GripVertical, Save, Trash2, Edit2, Calendar,
  TrendingUp, CheckCircle2, XCircle, AlertCircle,
  ChevronDown
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Prisma } from "@/generated/prisma"
import { createAcademicYear } from "@/app/actions/class-actions"
import { NewClassDialog } from "./new-class-dialog"

type AcademicYear = Prisma.AcademicYearGetPayload<{
   include:{
      classes:{
        include:{
          teachers:{
            include:{
              user:{
                include:{
                  user:true
                }
              }
            }
          }
        }
      }
    }
}>

const INITIAL_CLASSES = [
  {
    id: "c1",
    name: "Advanced Mathematics",
    code: "MATH-301",
    gradeLevel: "Grade 10",
    section: "A",
    room: "102",
    capacity: 30,
    enrolled: 28,
    schedule: "day",
    timeSlot: "08:00 - 10:00",
    status: "active",
    attendanceRate: 94,
    position: { x: 100, y: 100 },
    students: [
      { id: "s1", name: "Alice Johnson", status: "present" },
      { id: "s2", name: "Bob Smith", status: "present" },
      { id: "s3", name: "Carol White", status: "absent" },
      { id: "s4", name: "David Brown", status: "late" },
    ],
    instructors: [
      { id: "i1", name: "Dr. Sarah Williams", role: "Lead Instructor" },
      { id: "i2", name: "Prof. James Chen", role: "Teaching Assistant" },
    ],
  },
  {
    id: "c2",
    name: "Physics Laboratory",
    code: "PHY-201",
    gradeLevel: "Grade 11",
    section: "B",
    room: "Lab-3",
    capacity: 25,
    enrolled: 22,
    schedule: "day",
    timeSlot: "10:30 - 12:30",
    status: "active",
    attendanceRate: 88,
    position: { x: 380, y: 100 },
    students: [
      { id: "s5", name: "Emma Davis", status: "present" },
      { id: "s6", name: "Frank Miller", status: "present" },
      { id: "s7", name: "Grace Lee", status: "present" },
    ],
    instructors: [
      { id: "i3", name: "Dr. Michael Park", role: "Lead Instructor" },
    ],
  },
  {
    id: "c3",
    name: "Business Studies",
    code: "BUS-401",
    gradeLevel: "Grade 12",
    section: "C",
    room: "205",
    capacity: 35,
    enrolled: 30,
    schedule: "night",
    timeSlot: "18:00 - 20:00",
    status: "active",
    attendanceRate: 82,
    position: { x: 100, y: 300 },
    students: [
      { id: "s8", name: "Henry Wilson", status: "present" },
      { id: "s9", name: "Ivy Martinez", status: "absent" },
      { id: "s10", name: "Jack Taylor", status: "present" },
    ],
    instructors: [
      { id: "i4", name: "Prof. Lisa Anderson", role: "Lead Instructor" },
      { id: "i5", name: "Dr. Robert Kim", role: "Guest Lecturer" },
    ],
  },
  {
    id: "c4",
    name: "Computer Science",
    code: "CS-301",
    gradeLevel: "Grade 10",
    section: "D",
    room: "Lab-1",
    capacity: 28,
    enrolled: 26,
    schedule: "night",
    timeSlot: "20:30 - 22:30",
    status: "active",
    attendanceRate: 91,
    position: { x: 380, y: 300 },
    students: [
      { id: "s11", name: "Karen Zhang", status: "present" },
      { id: "s12", name: "Leo Garcia", status: "present" },
    ],
    instructors: [
      { id: "i6", name: "Dr. Amanda Foster", role: "Lead Instructor" },
    ],
  },
]

  const courses = [
  { id: "cs101", name: "CS 101 - Intro to Programming", color: "green", students: 87 },
  { id: "cs201", name: "CS 201 - Data Structures", color: "blue", students: 65 },
  { id: "cs301", name: "CS 301 - Algorithms", color: "purple", students: 52 },
  { id: "cs401", name: "CS 401 - Senior Project", color: "orange", students: 43 },
] 

export default function EnhancedClassesPage({ academicYear }:{ academicYear : AcademicYear[] }) {
  const [classes, setClasses] = useState(INITIAL_CLASSES)
  const [selectedSchedule, setSelectedSchedule] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClassId, setSelectedClassId] = useState(null)
  const [draggedClass, setDraggedClass] = useState(null)
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<AcademicYear>()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-gray100"
  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-100"
  const hoverClass = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch = 
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSchedule = selectedSchedule === "all" || cls.schedule === selectedSchedule
    return matchesSearch && matchesSchedule
  })

  useEffect(()=>{
    setSelectedAcademicYear(academicYear[academicYear.length - 1 ])
  },[])

  const selectedClass = classes.find((c) => c.id === selectedClassId)

  const handleDragStart = (e, cls) => {
    setDraggedClass(cls)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (!draggedClass) return

    const canvas = e.currentTarget.getBoundingClientRect()
    const x = Math.max(20, e.clientX - canvas.left - 120)
    const y = Math.max(20, e.clientY - canvas.top - 80)

    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === draggedClass.id ? { ...cls, position: { x, y } } : cls
      )
    )
    setDraggedClass(null)
  }

  const dayCounts = classes.filter((c) => c.schedule === "day").length
  const nightCounts = classes.filter((c) => c.schedule === "night").length


  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden font-sans">
      {/* Left Sidebar - Filters */}
      <aside className="w-80 bg-gray-100 backdrop-blur-xl border-r border-slate-200/60 shadow-2xl p-8 flex flex-col gap-8">
        <header>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`flex items-center gap-2 ${cardBgClass} border ${borderClass} max-w-[200px] md:max-w-xs`}
              >
                <div className={`w-2 h-2 rounded-full`}></div>
                <span className="text-xs font-bold text-gray-400 truncate">{selectedAcademicYear?.name}</span>
                <ChevronDown className="w-4 h-4 ml-auto flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[280px]">
              <DropdownMenuLabel className="text-xs font-bold text-gray-400">Select Academic Year</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {academicYear.map((academic) => (
                <DropdownMenuItem
                  key={academic.id}
                  onClick={() => setSelectedAcademicYear(academic)}
                  className="flex items-center gap-2"
                >
                  <div className={`w-2 h-2 rounded-full`}></div>
                  <span className="text-xs font-bold text-gray-400">{academic.name}</span>
                  {selectedAcademicYear?.id === academic.id && <span className="text-xs text-indigo-500">✓</span>}
                </DropdownMenuItem>
              ))}
             
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <section className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white/50 border-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-transparent h-11 text-sm"
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Schedule Type</h3>
            
            <button
              onClick={() => setSelectedSchedule("all")}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group",
                selectedSchedule === "all"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-white/50 hover:bg-white text-slate-700 border border-slate-200"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  selectedSchedule === "all" ? "bg-white/20" : "bg-slate-100"
                )}>
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold">All Classes</span>
              </div>
              <span className={cn(
                "text-xs font-black px-2.5 py-1 rounded-lg",
                selectedSchedule === "all" ? "bg-white/20" : "bg-slate-100"
              )}>
                {classes.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedSchedule("day")}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group",
                selectedSchedule === "day"
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30"
                  : "bg-white/50 hover:bg-white text-slate-700 border border-slate-200"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  selectedSchedule === "day" ? "bg-white/20" : "bg-amber-50"
                )}>
                  <Sun className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold">Day Classes</span>
              </div>
              <span className={cn(
                "text-xs font-black px-2.5 py-1 rounded-lg",
                selectedSchedule === "day" ? "bg-white/20" : "bg-amber-50 text-amber-600"
              )}>
                {dayCounts}
              </span>
            </button>

            <button
              onClick={() => setSelectedSchedule("night")}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group",
                selectedSchedule === "night"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-white/50 hover:bg-white text-slate-700 border border-slate-200"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  selectedSchedule === "night" ? "bg-white/20" : "bg-indigo-50"
                )}>
                  <Moon className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold">Night Classes</span>
              </div>
              <span className={cn(
                "text-xs font-black px-2.5 py-1 rounded-lg",
                selectedSchedule === "night" ? "bg-white/20" : "bg-indigo-50 text-indigo-600"
              )}>
                {nightCounts}
              </span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2">Quick Stats</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-600">Total Students</span>
                  <span className="text-sm font-black text-slate-900">
                    {classes.reduce((sum, c) => sum + c.enrolled, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-600">Avg Attendance</span>
                  <span className="text-sm font-black text-emerald-600">
                    {Math.round(classes.reduce((sum, c) => sum + c.attendanceRate, 0) / classes.length)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <NewClassDialog
          academicYears={selectedAcademicYear?.id}
          onCreateClass={handleCreateClass}
        />
      </aside>

      {/* Main Canvas - Drag & Drop Area */}
      <section 
        className="flex-1 relative overflow-hidden"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%234F46E5' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 mb-1">Active Management</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Drag & Drop to Reorganize
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl px-4 py-2 rounded-xl border border-slate-200 shadow-lg">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Viewing</p>
            <p className="text-sm font-black text-slate-900">
              {filteredClasses.length} {selectedSchedule === "all" ? "Classes" : `${selectedSchedule} Classes`}
            </p>
          </div>
        </div>

        <div className="absolute inset-0 pt-32 pb-6 px-6 overflow-auto">
          <div className="relative min-h-full">
            {filteredClasses.map((cls) => (
              <Card
                key={cls.id}
                draggable
                onDragStart={(e) => handleDragStart(e, cls)}
                onClick={() => setSelectedClassId(cls.id)}
                className={cn(
                  "absolute w-[240px] cursor-move bg-white/90 backdrop-blur-sm border-2 rounded-2xl p-5 transition-all hover:shadow-2xl group",
                  selectedClassId === cls.id
                    ? "border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105 z-20"
                    : "border-slate-200 hover:border-indigo-300 shadow-lg"
                )}
                style={{
                  left: `${cls.position.x}px`,
                  top: `${cls.position.y}px`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {cls.schedule === "day" ? (
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                      ) : (
                        <Moon className="w-3.5 h-3.5 text-indigo-500" />
                      )}
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                        {cls.code}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 leading-tight mb-1">
                      {cls.name}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-500">{cls.gradeLevel} • Sec {cls.section}</p>
                  </div>
                  <div className="cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-bold text-slate-400 uppercase leading-none">Enrolled</p>
                      <p className="text-xs font-black text-slate-900">
                        {cls.enrolled} / {cls.capacity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                      <DoorOpen className="w-3.5 h-3.5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-bold text-slate-400 uppercase leading-none">Room</p>
                      <p className="text-xs font-black text-slate-900">{cls.room}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-bold text-slate-400 uppercase leading-none">Time</p>
                      <p className="text-xs font-black text-slate-900">{cls.timeSlot}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Attendance</span>
                    <span className={cn(
                      "text-xs font-black",
                      cls.attendanceRate >= 90 ? "text-emerald-600" :
                      cls.attendanceRate >= 80 ? "text-amber-600" : "text-red-600"
                    )}>
                      {cls.attendanceRate}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        cls.attendanceRate >= 90 ? "bg-gradient-to-r from-emerald-500 to-teal-500" :
                        cls.attendanceRate >= 80 ? "bg-gradient-to-r from-amber-500 to-orange-500" :
                        "bg-gradient-to-r from-red-500 to-rose-500"
                      )}
                      style={{ width: `${cls.attendanceRate}%` }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Right Inspector - Class Details */}
      <aside className="w-[420px] bg-white/90 backdrop-blur-xl border-l border-slate-200/60 shadow-2xl overflow-y-auto">
        {selectedClass ? (
          <div className="p-8 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg",
                  selectedClass.schedule === "day"
                    ? "bg-gradient-to-br from-amber-400 to-orange-500"
                    : "bg-gradient-to-br from-indigo-600 to-blue-700"
                )}>
                  {selectedClass.schedule === "day" ? (
                    <Sun className="w-6 h-6 text-white" />
                  ) : (
                    <Moon className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-black tracking-tight text-slate-900">{selectedClass.name}</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedClass.code}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-indigo-500/30 font-bold h-9">
                  <Save className="w-3.5 h-3.5 mr-2" />
                  Save Changes
                </Button>
                <Button size="sm" variant="outline" className="border-2 border-slate-200 hover:bg-slate-50 rounded-xl font-bold h-9">
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button size="sm" variant="outline" className="border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-bold h-9">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <section className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Core Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Grade Level</p>
                  <p className="text-sm font-black text-slate-900">{selectedClass.gradeLevel}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Section</p>
                  <p className="text-sm font-black text-slate-900">{selectedClass.section}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Room</p>
                  <p className="text-sm font-black text-slate-900">{selectedClass.room}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Time Slot</p>
                  <p className="text-sm font-black text-slate-900">{selectedClass.timeSlot}</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Occupancy Status</h3>
              <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-200">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1">Current Enrollment</p>
                    <p className="text-3xl font-black text-slate-900">{selectedClass.enrolled}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500">of {selectedClass.capacity}</p>
                    <p className="text-lg font-black text-indigo-600">
                      {Math.round((selectedClass.enrolled / selectedClass.capacity) * 100)}%
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all"
                    style={{ width: `${(selectedClass.enrolled / selectedClass.capacity) * 100}%` }}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Attendance Metrics</h3>
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Overall Rate</p>
                      <p className="text-2xl font-black text-slate-900">{selectedClass.attendanceRate}%</p>
                    </div>
                  </div>
                  <span className={cn(
                    "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase",
                    selectedClass.attendanceRate >= 90 ? "bg-emerald-500 text-white" :
                    selectedClass.attendanceRate >= 80 ? "bg-amber-500 text-white" : "bg-red-500 text-white"
                  )}>
                    {selectedClass.attendanceRate >= 90 ? "Excellent" :
                     selectedClass.attendanceRate >= 80 ? "Good" : "Needs Attention"}
                  </span>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Student Roster</h3>
                <Button size="sm" className="h-7 px-3 text-[9px] font-black uppercase bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg">
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {selectedClass.students.map((student) => (
                  <div key={student.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between hover:border-slate-300 transition-all">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        student.status === "present" ? "bg-emerald-500" :
                        student.status === "late" ? "bg-amber-500" : "bg-red-500"
                      )} />
                      <p className="text-xs font-bold text-slate-900">{student.name}</p>
                    </div>
                    {student.status === "present" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : student.status === "late" ? (
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Instructors</h3>
              </div>
              <div className="space-y-2">
                {selectedClass.instructors.map((instructor) => (
                  <div key={instructor.id} className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                    <p className="text-sm font-black text-slate-900 mb-1">{instructor.name}</p>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{instructor.role}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">No Class Selected</h3>
              <p className="text-sm text-slate-500 max-w-xs">
                Click on a class card to view detailed information, manage students, and track attendance.
              </p>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}