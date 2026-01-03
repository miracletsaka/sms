"use client"

import type React from "react"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Save,
  Undo,
  Redo,
  Settings2,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  UserPlus,
  Shield,
} from "lucide-react"
import { FolderModule } from "@/components/stuff/folder-module"
import {
  CLASSROOM_MODULES,
  type ClassroomModuleData,
  type Student,
  type Instructor,
  type TimetablePeriod,
  type RoomResource,
  type AccessControl,
} from "@/lib/classroom-constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ClassroomManagementPage() {
  const params = useParams()
  const router = useRouter()
  const [modules, setModules] = useState<ClassroomModuleData[]>(CLASSROOM_MODULES)
  const [selectedFolder, setSelectedFolder] = useState<ClassroomModuleData | null>(null)
  const [openFolders, setOpenFolders] = useState(new Set<string>())
  const [draggedFolder, setDraggedFolder] = useState<ClassroomModuleData | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)

  const [editingItem, setEditingItem] = useState<any>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const [folderPositions, setFolderPositions] = useState<Record<string, { x: number; y: number }>>({
    students: { x: 80, y: 80 },
    timetable: { x: 340, y: 80 },
    instructors: { x: 600, y: 80 },
    resources: { x: 80, y: 320 },
    access: { x: 340, y: 320 },
  })

  const handleFolderClick = (folder: ClassroomModuleData) => {
    setSelectedFolder(folder)
    setShowAddForm(false)
    setEditingItem(null)
    setOpenFolders((prev) => {
      const next = new Set(prev)
      if (next.has(folder.id)) next.delete(folder.id)
      else next.add(folder.id)
      return next
    })
  }

  const handleDragStart = (e: React.DragEvent, folder: ClassroomModuleData) => {
    setDraggedFolder(folder)
    e.dataTransfer.effectAllowed = "move"
    const img = new Image()
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
    e.dataTransfer.setDragImage(img, 0, 0)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedFolder) return

    const canvas = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - canvas.left - 100
    const y = e.clientY - canvas.top - 40

    setFolderPositions((prev) => ({
      ...prev,
      [draggedFolder.id]: { x, y },
    }))
    setDraggedFolder(null)
    setHasChanges(true)
  }

  const handleDeleteItem = (moduleId: string, itemId: string) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          const detailKey = Object.keys(module.details)[0]
          return {
            ...module,
            details: {
              ...module.details,
              [detailKey]: module.details[detailKey].filter((item: any) => item.id !== itemId),
            },
          }
        }
        return module
      }),
    )
    setHasChanges(true)
  }

  const handleUpdateItem = (moduleId: string, itemId: string, updatedData: any) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          const detailKey = Object.keys(module.details)[0]
          return {
            ...module,
            details: {
              ...module.details,
              [detailKey]: module.details[detailKey].map((item: any) =>
                item.id === itemId ? { ...item, ...updatedData } : item,
              ),
            },
          }
        }
        return module
      }),
    )
    setEditingItem(null)
    setHasChanges(true)
  }

  const handleAddItem = (moduleId: string, newItem: any) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          const detailKey = Object.keys(module.details)[0]
          return {
            ...module,
            details: {
              ...module.details,
              [detailKey]: [...module.details[detailKey], { ...newItem, id: `${detailKey[0]}${Date.now()}` }],
            },
          }
        }
        return module
      }),
    )
    setShowAddForm(false)
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    // TODO: Connect to server actions for Prisma persistence
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setHasChanges(false)
    setSaving(false)
  }

  const getCurrentModuleData = () => {
    return modules.find((m) => m.id === selectedFolder?.id)
  }

  const currentModule = getCurrentModuleData()

  return (
    <div className="h-screen bg-[#FDFCF9] flex overflow-hidden font-sans text-gray-900 selection:bg-black selection:text-white">
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between shadow-sm z-30">
          <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-50 rounded-xl transition-colors group">
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
            </button>
            <div className="flex items-center gap-4 border-l border-gray-100 pl-6">
              <div className="text-3xl bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center border border-gray-100 shadow-inner">
                🏫
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Room 102 — Grade 10-A</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Configurator • Institutional Management
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
              <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all">
                <Undo className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all">
                <Redo className="w-4 h-4" />
              </button>
            </div>

            {hasChanges && (
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-full border border-amber-100 text-[10px] font-bold uppercase tracking-widest">
                <AlertCircle className="w-3 h-3" />
                Draft Mode
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className="px-6 py-2.5 bg-black text-white rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-black/10 disabled:opacity-30"
            >
              {saving ? (
                <span className="animate-spin border-2 border-white/30 border-t-white rounded-full w-4 h-4"></span>
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? "Syncing..." : "Publish Config"}
            </button>
          </div>
        </header>

        <main className="flex-1 relative bg-[#FDFCF9]" onDragOver={handleDragOver} onDrop={handleDrop}>
          {/* Blueprint Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none transition-opacity duration-1000"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="absolute top-8 right-8 flex flex-col gap-4 items-end z-10">
            <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-gray-100 shadow-xl min-w-[220px]">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Room Occupancy</p>
              <h3 className="text-2xl font-black tracking-tight text-black">82% Capacity</h3>
              <div className="mt-3 flex gap-1.5">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-md uppercase">
                  Optimal
                </span>
                <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[9px] font-black rounded-md uppercase tracking-tighter">
                  28 / 34 Seats
                </span>
              </div>
            </div>
          </div>

          <div className="relative w-full h-full p-12">
            {modules.map((module) => (
              <FolderModule
                key={module.id}
                folder={module}
                isOpen={openFolders.has(module.id)}
                isSelected={selectedFolder?.id === module.id}
                position={folderPositions[module.id]}
                onDragStart={(e) => handleDragStart(e, module)}
                onClick={() => handleFolderClick(module)}
              />
            ))}
          </div>
        </main>
      </div>

      <aside className="w-96 border-l border-gray-100 bg-white flex flex-col shadow-2xl z-40">
        <div className="p-8 border-b border-gray-50">
          <div className="flex items-center gap-3 mb-2">
            <Settings2 className="w-4 h-4 text-gray-400" />
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Class Inspector</h2>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Room 102 Configuration</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {currentModule ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentModule.color} flex items-center justify-center shadow-lg`}
                >
                  {currentModule.icon && <currentModule.icon className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">{currentModule.name}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Module Parameters</p>
                </div>
              </div>

              {/* Student Roster Management */}
              {currentModule.id === "students" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Enrolled Students</p>
                    <Button
                      size="sm"
                      onClick={() => setShowAddForm(true)}
                      className="h-7 px-3 text-[9px] font-black uppercase tracking-widest"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Student
                    </Button>
                  </div>

                  {showAddForm && (
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest">New Student</p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          const formData = new FormData(e.currentTarget)
                          handleAddItem("students", {
                            name: formData.get("name"),
                            grade: formData.get("grade"),
                            status: formData.get("status"),
                            enrollmentDate: new Date().toISOString().split("T")[0],
                            guardianContact: formData.get("contact"),
                          })
                          e.currentTarget.reset()
                        }}
                        className="space-y-3"
                      >
                        <Input name="name" placeholder="Student Name" className="h-8 text-xs" required />
                        <Input name="grade" placeholder="Grade (e.g., 10-A)" className="h-8 text-xs" required />
                        <Select name="status" defaultValue="Present" required>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Present">Present</SelectItem>
                            <SelectItem value="Absent">Absent</SelectItem>
                            <SelectItem value="Excused">Excused</SelectItem>
                            <SelectItem value="Late">Late</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input name="contact" placeholder="Guardian Contact" className="h-8 text-xs" required />
                        <div className="flex gap-2">
                          <Button type="submit" size="sm" className="flex-1 h-8 text-[9px] font-black uppercase">
                            Save
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setShowAddForm(false)}
                            className="flex-1 h-8 text-[9px] font-black uppercase"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {currentModule.details.students.map((student: Student) => (
                    <div
                      key={student.id}
                      className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-[11px] font-black tracking-tight">{student.name}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">{student.grade}</p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingItem(student)}
                            className="p-1.5 hover:bg-white rounded-lg transition-all"
                          >
                            <Edit2 className="w-3 h-3 text-gray-400" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem("students", student.id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-white text-[8px] font-black rounded-md uppercase border border-gray-100">
                          {student.status}
                        </span>
                        <span className="text-[8px] font-bold text-gray-400">{student.guardianContact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Timetable Management */}
              {currentModule.id === "timetable" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Schedule Periods</p>
                    <Button
                      size="sm"
                      onClick={() => setShowAddForm(true)}
                      className="h-7 px-3 text-[9px] font-black uppercase tracking-widest"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Period
                    </Button>
                  </div>

                  {showAddForm && (
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest">New Period</p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          const formData = new FormData(e.currentTarget)
                          handleAddItem("timetable", {
                            day: formData.get("day"),
                            time: formData.get("time"),
                            subject: formData.get("subject"),
                            instructorId: formData.get("instructorId"),
                            room: "Room 102",
                          })
                          e.currentTarget.reset()
                        }}
                        className="space-y-3"
                      >
                        <Select name="day" required>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Select Day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Monday">Monday</SelectItem>
                            <SelectItem value="Tuesday">Tuesday</SelectItem>
                            <SelectItem value="Wednesday">Wednesday</SelectItem>
                            <SelectItem value="Thursday">Thursday</SelectItem>
                            <SelectItem value="Friday">Friday</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input name="time" placeholder="Time (e.g., 08:00 - 09:30)" className="h-8 text-xs" required />
                        <Input name="subject" placeholder="Subject" className="h-8 text-xs" required />
                        <Input name="instructorId" placeholder="Instructor ID" className="h-8 text-xs" required />
                        <div className="flex gap-2">
                          <Button type="submit" size="sm" className="flex-1 h-8 text-[9px] font-black uppercase">
                            Save
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setShowAddForm(false)}
                            className="flex-1 h-8 text-[9px] font-black uppercase"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {currentModule.details.periods.map((period: TimetablePeriod, idx: number) => (
                    <div
                      key={period.id}
                      className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">
                            {period.day}
                          </p>
                          <p className="text-[11px] font-black tracking-tight">{period.subject}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">{period.time}</p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingItem(period)}
                            className="p-1.5 hover:bg-white rounded-lg transition-all"
                          >
                            <Edit2 className="w-3 h-3 text-gray-400" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem("timetable", period.id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Instructor Management */}
              {currentModule.id === "instructors" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Assigned Staff</p>
                    <Button
                      size="sm"
                      onClick={() => setShowAddForm(true)}
                      className="h-7 px-3 text-[9px] font-black uppercase tracking-widest"
                    >
                      <UserPlus className="w-3 h-3 mr-1" />
                      Add Instructor
                    </Button>
                  </div>

                  {showAddForm && (
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest">New Instructor</p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          const formData = new FormData(e.currentTarget)
                          handleAddItem("instructors", {
                            name: formData.get("name"),
                            role: formData.get("role"),
                            subject: formData.get("subject"),
                            email: formData.get("email"),
                            availability: ["Monday", "Wednesday", "Friday"],
                          })
                          e.currentTarget.reset()
                        }}
                        className="space-y-3"
                      >
                        <Input name="name" placeholder="Instructor Name" className="h-8 text-xs" required />
                        <Select name="role" required>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Lead Instructor">Lead Instructor</SelectItem>
                            <SelectItem value="Teaching Assistant">Teaching Assistant</SelectItem>
                            <SelectItem value="Guest Lecturer">Guest Lecturer</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input name="subject" placeholder="Subject" className="h-8 text-xs" required />
                        <Input name="email" type="email" placeholder="Email" className="h-8 text-xs" required />
                        <div className="flex gap-2">
                          <Button type="submit" size="sm" className="flex-1 h-8 text-[9px] font-black uppercase">
                            Save
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setShowAddForm(false)}
                            className="flex-1 h-8 text-[9px] font-black uppercase"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {currentModule.details.staff.map((instructor: Instructor) => (
                    <div
                      key={instructor.id}
                      className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-[11px] font-black tracking-tight">{instructor.name}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">{instructor.role}</p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingItem(instructor)}
                            className="p-1.5 hover:bg-white rounded-lg transition-all"
                          >
                            <Edit2 className="w-3 h-3 text-gray-400" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem("instructors", instructor.id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-bold text-gray-500">{instructor.subject}</p>
                        <p className="text-[8px] font-bold text-gray-400">{instructor.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Resource Management */}
              {currentModule.id === "resources" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Room Equipment</p>
                    <Button
                      size="sm"
                      onClick={() => setShowAddForm(true)}
                      className="h-7 px-3 text-[9px] font-black uppercase tracking-widest"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Resource
                    </Button>
                  </div>

                  {currentModule.details.equipment.map((resource: RoomResource) => (
                    <div
                      key={resource.id}
                      className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-[11px] font-black tracking-tight">{resource.name}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Qty: {resource.quantity}</p>
                        </div>
                        <span
                          className={`px-2 py-0.5 text-[8px] font-black rounded-md uppercase ${
                            resource.status === "Available"
                              ? "bg-emerald-50 text-emerald-600"
                              : resource.status === "In Use"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {resource.status}
                        </span>
                      </div>
                      <p className="text-[8px] font-bold text-gray-400">Last Checked: {resource.lastChecked}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Access Control Management */}
              {currentModule.id === "access" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Security Systems</p>
                    <Button
                      size="sm"
                      onClick={() => setShowAddForm(true)}
                      className="h-7 px-3 text-[9px] font-black uppercase tracking-widest"
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      Add Control
                    </Button>
                  </div>

                  {currentModule.details.controls.map((control: AccessControl) => (
                    <div
                      key={control.id}
                      className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="text-[11px] font-black tracking-tight">{control.type}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Last: {control.lastAccess}</p>
                        </div>
                        <span
                          className={`px-2 py-0.5 text-[8px] font-black rounded-md uppercase ${
                            control.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                          }`}
                        >
                          {control.status}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-bold text-gray-500 mb-1">Authorized Personnel:</p>
                        {control.authorizedPersonnel.map((person, idx) => (
                          <p key={idx} className="text-[8px] font-bold text-gray-400 pl-2">
                            • {person}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
              <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mb-6">
                <Settings2 className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em]">Ready for config</p>
              <p className="text-[9px] font-bold text-gray-400 uppercase mt-2 max-w-[140px]">
                Select a module to adjust room parameters
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
