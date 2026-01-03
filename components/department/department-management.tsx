"use client"

import type React from "react"

import { useEffect, useState, useTransition } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Mail,
  Lightbulb,
  Users,
  BookOpen,
  Users2,
  GraduationCap,
  Microscope,
  Music,
  X,
} from "lucide-react"
import { Prisma } from "@/generated/prisma"
import { createDepartment, updateDepartment, deleteDepartment } from "@/app/actions/departments"
import { useRouter } from "next/navigation"
import { EducationalCarousel } from "../instructor/stuff-carousel"

// 1. Define the selection criteria using Prisma.validator
const departmentWithStuff = Prisma.validator<Prisma.DepartmentDefaultArgs>()({
  include: {
    stuff: {
      include: {
        user: {
          include: {
            user: true,
          },
        },
      },
    },
  },
});

export type Department = Prisma.DepartmentGetPayload<typeof departmentWithStuff>;

export type Institution = Prisma.InstitutionGetPayload<{
  include: {
    departments: typeof departmentWithStuff;
  };
}>;

interface DepartmentContribution {
  id: string
  name: string
  description: string
  contribution: string
  impact: string
  color: string
}

export function DepartmentManagement({
  institution,
}: {
  institution: Institution
}) {
  const [departments, setDepartments] = useState<Department[]>([])
  const [isPending, startTransition] = useTransition()

  const [activeTab, setActiveTab] = useState<string>("Science")
  const [selectedDept, setSelectedDept] = useState<Department | null>(null)
  const [selectedStaff, setSelectedStaff] = useState(0)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingDept, setEditingDept] = useState<Department | null>(null)
  const [formData, setFormData] = useState<Partial<Department>>({})
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [imagePreview, setImagePreview] = useState<string>("")

  const router = useRouter()

  const iconOptions = ["BookOpen", "Users2", "GraduationCap", "Microscope", "Music"]
  const iconMap = {
    BookOpen,
    Users2,
    GraduationCap,
    Microscope,
    Music,
  }

  const colorOptions = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-cyan-500",
    "bg-orange-500",
  ]

  useEffect(() => {
    setDepartments(institution.departments)
    if (institution.departments.length > 0) {
      setSelectedDept(institution.departments[0])
      setActiveTab(institution.departments[0].name)
    }
  }, [institution.departments])

  const currentDept = departments.find((d) => d.name === activeTab) || selectedDept

  const departmentContributions: DepartmentContribution[] = [
    {
      id: "1",
      name: "Science",
      description: "Physics, Chemistry, Biology",
      contribution: "Develops experimental thinking, scientific inquiry, and STEM skills for innovation",
      impact: "Prepares students for careers in research, engineering, and technology",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "2",
      name: "Mathematics",
      description: "Algebra, Geometry, Calculus",
      contribution: "Builds logical reasoning, problem-solving, and quantitative analysis abilities",
      impact: "Essential foundation for engineering, finance, and technology fields",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "3",
      name: "English",
      description: "Literature, Grammar, Writing",
      contribution: "Enhances communication skills, critical thinking, and cultural awareness",
      impact: "Prepares students for leadership and global competitiveness",
      color: "from-green-500 to-green-600",
    },
    {
      id: "4",
      name: "Physical Education",
      description: "Sports, Fitness, Well-being",
      contribution: "Promotes physical health, discipline, teamwork, and mental wellness",
      impact: "Builds confident, healthy individuals with leadership qualities",
      color: "from-red-500 to-red-600",
    },
    {
      id: "5",
      name: "Arts & Culture",
      description: "Music, Visual Arts, Drama",
      contribution: "Unleashes creativity, self-expression, and cultural appreciation",
      impact: "Develops well-rounded students with artistic and cultural sensitivity",
      color: "from-pink-500 to-pink-600",
    },
  ]

  const departmentTips = [
    {
      title: "Clear Vision",
      description: "Each department has clear objectives and curriculum aligned with school standards",
      icon: "🎯",
    },
    {
      title: "Expert Guidance",
      description: "Qualified teachers lead departments with expertise and continuous professional development",
      icon: "👨‍🏫",
    },
    {
      title: "Student Focus",
      description: "Departments work together to ensure holistic development of every student",
      icon: "📚",
    },
    {
      title: "Quality Assurance",
      description: "Regular assessments and feedback ensure teaching excellence and learning outcomes",
      icon: "✓",
    },
  ]

  const nextStaff = () => {
    setSelectedStaff((prev) => (prev + 1) % (currentDept?.stuff?.length || 1))
  }

  const prevStaff = () => {
    const length = currentDept?.stuff?.length || 1
    setSelectedStaff((prev) => (prev - 1 + length) % length)
  }

  const nextContribution = () => {
    setCarouselIndex((prev) => (prev + 1) % departmentContributions.length)
  }

  const prevContribution = () => {
    setCarouselIndex((prev) => (prev - 1 + departmentContributions.length) % departmentContributions.length)
  }

  const handleAddDepartment = () => {
    if (formData.name && formData.description) {
      startTransition(async () => {
        const result = await createDepartment({
          name: formData.name as string,
          description: formData.description as string,
          head: formData.head || "TBD",
          institutionId:institution.id,
          color: formData.color || "bg-blue-500",
          icon: formData.icon || "BookOpen",
          image: formData.image as string,
        })

        if (result.success) {
          router.refresh()
          setShowAddForm(false)
          setFormData({})
          setImagePreview("")
        } else {
          alert(result.error)
        }
      })
    }
  }

  const handleEditDepartment = () => {
    if (editingDept && formData.name) {
      startTransition(async () => {
        const result = await updateDepartment(editingDept.id, {
          name: formData.name as string,
          description: formData.description as string,
          head: formData.head || "TBD",
          color: formData.color as string,
          icon: formData.icon as string,
          image: formData.image as string,
        })

        if (result.success) {
          router.refresh()
          setShowEditForm(false)
          setEditingDept(null)
          setFormData({})
          setImagePreview("")
        } else {
          alert(result.error)
        }
      })
    }
  }

  const handleDeleteDepartment = (id: string) => {
    if (confirm("Are you sure you want to delete this department?")) {
      startTransition(async () => {
        const result = await deleteDepartment(id)

        if (result.success) {
          const filtered = departments.filter((d) => d.id !== id)
          setDepartments(filtered)

          if (selectedDept?.id === id) {
            setSelectedDept(filtered[0] || null)
            setActiveTab(filtered[0]?.name || "")
          }
        } else {
          alert(result.error)
        }
      })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setImagePreview(result)
        setFormData({ ...formData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
       <EducationalCarousel />

      {/* Department Cards Carousel */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Departments Overview</h2>
          <button
            onClick={() => setShowAddForm(true)}
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 text-xs transition-colors disabled:opacity-50"
          >
            <Plus size={16} />
            Add Department
          </button>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {departments.map((dept, idx) => (
              <div
                key={dept.id}
                className="snap-center shrink-0 w-80 h-[500px] rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                <div className="h-full relative overflow-hidden">
                  {/* Background Image Area */}
                  <div className="absolute inset-0">
                    <img
                      src={dept.image || "https://www.computer.cleaning/media/office-departments.jpg"}
                      alt={dept.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2">{dept.name}</h3>

                    {/* Description */}
                    <p className="text-xs text-gray-200 mb-4 leading-relaxed">{dept.description}</p>

                    {/* Stats Row */}
                    <div className="flex gap-2 mb-4">
                      <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md flex items-center gap-1.5">
                        <Users size={12} className="text-white" />
                        <span className="text-xs font-medium">{dept.totalStaff} Staff</span>
                      </div>
                    </div>
                    {/* Edit/Delete buttons - subtle overlay */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingDept(dept)
                          setFormData(dept)
                          setShowEditForm(true)
                        }}
                        disabled={isPending}
                        className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-2 text-xs rounded-lg transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteDepartment(dept.id)
                        }}
                        disabled={isPending}
                        className="flex-1 bg-red-600/30 hover:bg-red-600/50 backdrop-blur-sm text-white font-bold py-2 text-xs rounded-lg transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Department Tabs & Staff Carousel */}
        <div className="col-span-12 lg:col-span-8">
          {/* Department Tabs */}
          <div className="mb-8">
            <div className="flex items-center gap-6 border-b border-gray-300 pb-4 overflow-x-auto">
              <div className="text-2xl">👥</div>
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => {
                    setActiveTab(dept.name)
                    setSelectedDept(dept)
                    setSelectedStaff(0)
                  }}
                  className={`text-xs font-bold pb-2 transition-colors whitespace-nowrap ${
                    activeTab === dept.name
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>
          </div>

          {/* Staff Carousel */}
          {(selectedDept?.stuff?.length ?? 0) > 0 ? (
            <div className="relative overflow-hidden group mb-8">
              <button
                onClick={prevStaff}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-gray-300 font-bold transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextStaff}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-gray-300 font-bold transition-colors"
              >
                <ChevronRight size={20} />
              </button>

              {/* Staff Image */}
              <img
                src={
                  selectedDept?.stuff[selectedStaff]?.user.user.avatar ||
                  "/placeholder.svg?height=400&width=600&query=teacher" ||
                  "/placeholder.svg"
                }
                alt={selectedDept?.stuff[selectedStaff]?.user.user.firstName}
                className="w-full h-80 object-cover rounded-lg shadow-3xl"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent rounded-lg"></div>

              {/* Staff Details */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="bg-blue-600 text-white font-bold text-xs px-2 py-1 rounded-full">
                    {selectedDept?.stuff[selectedStaff]?.user.user.department}
                  </span>
                  <span className="text-gray-300 font-bold text-xs">
                    {selectedDept?.stuff[selectedStaff]?.user.user.qualification}
                  </span>
                </div>
                <div className="text-white font-bold text-xl mb-1">
                  {selectedDept?.stuff[selectedStaff]?.user.user.firstName}
                </div>
                <div className="text-gray-300 font-bold text-sm mb-3">
                  {selectedDept?.stuff[selectedStaff]?.user.user.lastName}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                  <div className="bg-black/30 p-2 rounded">
                    <div className="text-gray-400 font-bold text-xs mb-1">Students</div>
                    <div className="text-white font-bold">
                      {selectedDept?.stuff[selectedStaff]?.user.user.firstName}
                    </div>
                  </div>
                  <div className="bg-black/30 p-2 rounded">
                    <div className="text-gray-400 font-bold text-xs mb-1">Ratio</div>
                    <div className="text-white font-bold">
                      {selectedDept?.stuff[selectedStaff]?.user.user.firstName}
                    </div>
                  </div>
                </div>

                {/* Qualification & Subjects */}
                <div className="flex items-center gap-2 mb-2 text-xs">
                  <span className="text-gray-400 font-bold">Qualification:</span>
                  <span className="text-white font-bold">
                    {selectedDept?.stuff[selectedStaff]?.user.user.qualification}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4 text-xs">
                  <span className="text-gray-400 font-bold">Subjects:</span>
                  <span className="text-white font-bold">
                    {selectedDept?.stuff[selectedStaff]?.user.user.qualification}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 text-xs rounded transition-colors flex items-center justify-center gap-2">
                    <Mail size={14} />
                    Contact
                  </button>
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2 text-xs rounded transition-colors">
                    View Profile
                  </button>
                </div>

                {/* Dot Navigation */}
                <div className="flex justify-center gap-2 mt-4">
                  {selectedDept?.stuff.map((_, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedStaff(idx)}
                      className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                        idx === selectedStaff ? "bg-white" : "bg-white/30"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center mb-8 shadow">
              <p className="text-gray-600 font-bold text-sm">No staff members in this department yet</p>
            </div>
          )}
        </div>

        {/* Right Column - Department Tips */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="text-blue-600" size={20} />
              <span className="text-gray-900 font-bold text-sm">How Departments Work</span>
            </div>

            <div className="space-y-4">
              {departmentTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="text-2xl mb-2">{tip.icon}</div>
                  <div className="text-gray-900 font-bold text-xs mb-1">{tip.title}</div>
                  <div className="text-gray-600 font-bold text-xs leading-relaxed">{tip.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Departments in School Section */}
      <div className="mt-12 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Core Departments in Our School</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-white rounded-lg p-4 shadow text-center hover:shadow-lg transition-shadow">
              <div className={`text-3xl mb-2 font-bold bg-gradient-to-br ${dept.color} bg-clip-text text-transparent`}>
                {dept.name[0]}
              </div>
              <h3 className="text-gray-900 font-bold text-xs mb-1">{dept.name}</h3>
              <p className="text-gray-600 font-bold text-xs mb-2">{dept.description}</p>
              <div className="text-blue-600 font-bold text-xs">{dept.totalStaff} Teachers</div>
            </div>
          ))}
        </div>
      </div>
      {/* Add Department Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-100 rounded-lg p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Department</h2>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setImagePreview("")
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold text-xs mb-2">Department Name</label>
                <input
                  type="text"
                  placeholder="e.g., Computer Science"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border-none shadow rounded text-gray-900 px-3 py-2 text-xs font-bold focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold text-xs mb-2">Description</label>
                <input
                  type="text"
                  placeholder="e.g., Programming, Web Development"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white border-none shadow rounded text-gray-900 px-3 py-2 text-xs font-bold focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold text-xs mb-2">Department Head Email</label>
                <input
                  type="email"
                  placeholder="sms@gmail.com"
                  value={formData.head || ""}
                  onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                  className="w-full bg-white border-none shadow rounded text-gray-900 px-3 py-2 text-xs font-bold focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold text-xs mb-2">Department Icon</label>
                <select
                  value={formData.icon || "BookOpen"}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full bg-white border-none shadow rounded text-gray-900 px-3 py-2 text-xs font-bold focus:border-blue-600 focus:outline-none"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold text-xs mb-2">Department Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setFormData({ ...formData, color })}
                      className={`h-10 rounded-lg transition-all ${color} ${
                        formData.color === color ? "ring-2 ring-gray-900 ring-offset-2" : ""
                      }`}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-bold text-xs mb-2">Department Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1 text-xs cursor-pointer"
                  />
                </div>
                {imagePreview && (
                  <div className="mt-2 relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setImagePreview("")
                        setFormData({ ...formData, image: undefined })
                      }}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setImagePreview("")
                  }}
                  disabled={isPending}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 text-xs rounded transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddDepartment}
                  disabled={isPending}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 text-xs rounded transition-colors disabled:opacity-50"
                >
                  {isPending ? "Adding..." : "Add Department"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Department Modal */}
      {showEditForm && editingDept && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-100 rounded-lg p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Department</h2>
              <button
                onClick={() => {
                  setShowEditForm(false)
                  setEditingDept(null)
                  setImagePreview("")
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold text-xs mb-2">Department Name</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border-none shadow rounded text-gray-900 px-3 py-2 text-xs font-bold focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold text-xs mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white border-none shadow rounded text-gray-900 px-3 py-2 text-xs font-bold focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold text-xs mb-2">Department Head Name</label>
                <input
                  type="text"
                  value={formData.head || ""}
                  onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                  className="w-full bg-white border-none shadow rounded text-gray-900 px-3 py-2 text-xs font-bold focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold text-xs mb-2">Department Icon</label>
                <select
                  value={formData.icon || "BookOpen"}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full bg-white border-none shadow rounded text-gray-900 px-3 py-2 text-xs font-bold focus:border-blue-600 focus:outline-none"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold text-xs mb-2">Department Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setFormData({ ...formData, color })}
                      className={`h-10 rounded-lg transition-all ${color} ${
                        formData.color === color ? "ring-2 ring-gray-900 ring-offset-2" : ""
                      }`}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold text-xs mb-2">Department Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1 text-xs cursor-pointer"
                  />
                </div>
                {(imagePreview || editingDept?.image) && (
                  <div className="mt-2 relative">
                    <img
                      src={imagePreview || editingDept?.image || ""}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setImagePreview("")
                        setFormData({ ...formData, image: undefined })
                      }}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowEditForm(false)
                    setEditingDept(null)
                    setImagePreview("")
                  }}
                  disabled={isPending}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 text-xs rounded transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditDepartment}
                  disabled={isPending}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 text-xs rounded transition-colors disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
