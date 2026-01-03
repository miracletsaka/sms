"use client"

/*
  assign roles,
  allocate departments
  assign to different classes
  removing staff
  adding staff
  adding salaries based of roles and departments
  handling transfers
  Engagement & Activity Index

*/ 

import { startTransition, useEffect, useState } from "react"
import {
  X,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  TrendingUp,
  Award,
  Mail,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import StaffMembersList from "./stuff-pagination"
import { addStaffMember, getAllStaff, getStaffStats } from "@/app/actions/staff-actions"
import { toast } from "sonner"
import { Department, Prisma, UserRole } from "@/generated/prisma"

//ebs21-mtsaka@mubas.ac.mw = tem ozc04kfo
type StaffMember =  Prisma.RoleOnInstitutionToUserAssignedDepGetPayload<{
    include:{
      user:{
        include:{
          institutions:{
            include:{
              department:{
                include:{
                  department:true
                }
              }
            }
          }
        }
      },
      department:{
        include:{
          department:true
        }
      },
      role:{
        include:{
          role:true
        }
      }
    }
}>

type StaffStats = {
  totalStaff: number
  activeClasses: number
  totalStudents: number
  departments: Array<{ name: string; staffCount: number }>
}

const StaffManagementDashboard = ({ 
  institutionId, 
  roles ,
  departments
}: {
  institutionId:string,
  roles : UserRole[],
  departments: Department[]
}) => {
  const [activeTab, setActiveTab] = useState("All Staff")
  const [showAddStaff, setShowAddStaff] = useState(true)
  const [selectedStaff, setSelectedStaff] = useState(0)
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "TEACHER",
    department: "",
    qualification: "",
    experience: "",
    institutionId,
    subjects: "",
    joiningDate: "",
    salary: "",
  })
   const [stats, setStats] = useState<StaffStats>({
    totalStaff: 0,
    activeClasses: 0,
    totalStudents: 0,
    departments: [],
  })
  const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const [staffResult, statsResult] = await Promise.all([getAllStaff(institutionId), getStaffStats()])

        if (staffResult.success && staffResult.data) {
          setStaffMembers(staffResult.data)
        }

        setStats(statsResult)
      } catch (error) {
        console.error("[v0] Error fetching staff data:", error)
        toast.error("Failed to load staff data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

   const transformedStaffMembers = staffMembers.map((staff) => ({
    id: staff.id,
    name: `${staff.user.firstName} ${staff.user.lastName}`,
    role: staff.user.qualification || "Staff Member",
    department: "General",
    image: staff.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${staff.user.email}`,
    experience: staff.user.startOfWork
      ? `${Math.floor((Date.now() - new Date(staff.user.startOfWork).getTime()) / (365 * 24 * 60 * 60 * 1000))} years`
      : "N/A",
    students: 0,
    rating: 4.5,
    studentRatio: "1:20",
    qualification: staff.user.qualification || "Not specified",
    subjects: "Not specified",
    email: staff.user.email,
    phone: staff.user.phone || "N/A",
  }))

  const pendingInvites = [
    {
      id: 1,
      name: "Michael Johnson",
      position: "Physics Teacher",
      department: "Science",
      status: "pending",
      inviteDate: "2 days ago",
      message: "Invited to join Science Department",
    },
    {
      id: 2,
      name: "Lisa Rodriguez",
      position: "Vice Principal",
      department: "Administration",
      status: "pending",
      inviteDate: "1 day ago",
      message: "Administrative position - Strategic planning",
    },
    {
      id: 3,
      name: "David Kumar",
      position: "Mathematics Teacher",
      department: "Mathematics",
      status: "accepted",
      inviteDate: "3 hours ago",
      message: "Accepted the invitation",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields")
      return
    }

    startTransition(async () => {
      try {

        const result = await addStaffMember(formData)

        if (result.success) {
          toast.success(result.message)

          const staffResult = await getAllStaff(institutionId)
          if (staffResult.success && staffResult.data) {
            setStaffMembers(staffResult.data)
          }

          // Refresh stats
          const statsResult = await getStaffStats()
          setStats(statsResult)

          // Reset form
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            role: "TEACHER",
            department: "",
            qualification: "",
            experience: "",
            institutionId,
            subjects: "",
            joiningDate: "",
            salary: "",
          })
        } else {
          toast.error(result.message || "Failed to add staff member")
        }
      } catch (error) {
        console.error("[v0] Error adding staff:", error)
        toast.error("Failed to add staff member. Please try again.")
      }
    })
  }

  const nextStaff = () => {
    setSelectedStaff((prev) => (prev + 1) % transformedStaffMembers.length)
  }

  const prevStaff = () => {
    setSelectedStaff((prev) => (prev - 1 + transformedStaffMembers.length) % transformedStaffMembers.length)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 mt-20 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading staff data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-20 w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-1 w-full">
        {/* Left Sidebar */}
        <div className="col-span-3 space-y-4">
          {/* Add Staff Form */}
          <div className="">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-bold font-bold text-sm">Add New Staff</span>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-2">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full text-gray-600 font-bold px-3 py-2 text-xs border border-slate-600 border-none shadow bg-white focus:outline-none font-semibold"
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full text-gray-600 font-bold px-3 py-2 text-xs border border-slate-600 border-none shadow bg-white focus:outline-none font-semibold"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-gray-600 font-bold px-3 py-2 text-xs border border-slate-600 border-none shadow bg-white focus:outline-none font-semibold"
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full text-gray-600 font-bold px-3 py-2 text-xs border border-slate-600 border-none shadow bg-white focus:outline-none font-semibold"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full rounded-sm text-gray-600 font-bold px-3 py-2 text-xs border border-slate-600 border-none shadow bg-white focus:outline-none font-semibold"
                >
                  <option>Select role--</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full rounded-sm text-gray-600 font-bold px-3 py-2 text-xs border border-slate-600 border-none shadow bg-white focus:outline-none font-semibold"
                >
                  <option>Select department--</option>
                  {departments.map(department => (
                    <option key={department.id} value={department.id}>{department.name}</option>
                  ))}
                </select>
                <Input
                  type="text"
                  name="qualification"
                  placeholder="Qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="w-full text-gray-600 font-bold px-3 py-2 text-xs border border-slate-600 border-none shadow bg-white focus:outline-none font-semibold"
                />
                <Input
                  type="number"
                  name="experience"
                  placeholder="Years of Experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full text-gray-600 font-bold px-3 py-2 text-xs border border-slate-600 border-none shadow bg-white focus:outline-none font-semibold"
                />
                <Input
                  type="text"
                  name="subjects"
                  placeholder="Subjects/Specialization"
                  value={formData.subjects}
                  onChange={handleInputChange}
                  className="w-full text-gray-600 font-bold px-3 py-2 text-xs border border-slate-600 border-none shadow bg-white focus:outline-none font-semibold"
                />
                <Input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  className="w-full text-gray-600 font-bold px-3 py-2 text-xs border border-slate-600 border-none shadow bg-white focus:outline-none font-semibold"
                />
                <Input
                  type="number"
                  name="salary"
                  placeholder="Salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full text-gray-600 font-bold px-3 py-2 text-xs border border-slate-600 border-none shadow bg-white focus:outline-none font-semibold"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-gray-600 font-bold py-2 text-xs font-bold transition-colors"
                >
                  Add Staff Member
                </button>
              </form>
            </div>

           <div className="">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-600 font-bold font-bold text-sm">The following where added but not yet accepted</span>
              </div>

              <div className="space-y-1">
                {pendingInvites.map((invite) => (
                  <div key={invite.id} className="bg-white shadow p-3 rounded-lg last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-gray-600 font-bold text-xs font-bold">{invite.name}</div>
                        <div className="text-gray-600 font-bold/60 text-xs font-semibold">{invite.position}</div>
                      </div>
                      {invite.status === "accepted" ? (
                        <CheckCircle className="text-green-500" size={16} />
                      ) : (
                        <AlertCircle className="text-amber-500" size={16} />
                      )}
                    </div>
                    <div className="text-gray-400 font-bold/70 text-xs font-semibold mb-2">Dept: {invite.department}</div>
                    <div className="text-gray-400 font-bold/60 text-xs font-semibold">{invite.message}</div>
                    <div className="text-gray-400 font-bold/50 text-xs mt-2">{invite.inviteDate}</div>
                  </div>
                ))}
              </div>
            </div>

        </div>
        {/* Main Content */}
        <div className="col-span-6 space-y-4">
          {/* Department Tabs */}
          <div className="flex items-center gap-1">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={`text-xs font-bold p-2 transition-colors ${
                  activeTab === dept.id ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-600 font-bold/60 hover:text-gray-600 font-bold"
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Staff Carousel */}
          <div className="relative  overflow-hidden group">
            <button
              onClick={prevStaff}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-gray-600 font-bold transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextStaff}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-gray-600 font-bold transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            <img
              src={staffMembers[selectedStaff].user.avatar || "https://neuroflow.lon1.digitaloceanspaces.com/imageshttps://neuroflow.lon1.digitaloceanspaces.com/images/mint.jpg"}
              alt={staffMembers[selectedStaff].user.firstName}
              className="w-full h-80 object-cover shadow-3xl rounded-lg shadow-green-200"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="bg-blue-600 text-gray-100 font-bold text-xs px-2 py-1 rounded-full font-bold">
                  {staffMembers[selectedStaff].user.department}
                </span>
                <span className="text-gray-100 font-bold/80 text-xs font-bold">
                  {staffMembers[selectedStaff].user.startOfWork?.toDateString()} experience
                </span>
              </div>
              <div className="text-gray-100 font-bold text-xl font-bold mb-1">{staffMembers[selectedStaff].user.firstName}</div>
              <div className="text-gray-100 font-bold/90 text-sm font-bold mb-3">{staffMembers[selectedStaff].role.role.name}</div>

              <div className="flex items-center gap-2 mb-3 text-xs">
                <span className="text-gray-100 font-bold/70 font-bold">Qualification:</span>
                <span className="text-gray-100 font-bold font-bold">{staffMembers[selectedStaff].user.qualification}</span>
              </div>

              <div className="flex items-center gap-2 mb-4 text-xs">
                <span className="text-gray-100 font-bold/70 font-bold">Subjects:</span>
                <span className="text-gray-100 font-bold font-bold">{staffMembers[selectedStaff].user.firstName}</span>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-gray-100 font-bold py-2 text-xs font-bold transition-colors flex items-center justify-center gap-2">
                  <Mail size={14} />
                  Contact
                </button>
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-gray-100 font-bold py-2 text-xs font-bold transition-colors ">
                  View Profile
                </button>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {staffMembers.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedStaff(idx)}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${idx === selectedStaff ? "bg-white" : "bg-white/30"}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          {/* Bottom Section */}
          <div className="col-span-3 space-y-4">
          {/* Department Overview */}
          <div className="">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-600 font-bold font-bold text-sm">Subjects</span>
            </div>
            <div className="space-y-1">
              {[
                { name: "Mathematics", staff: 8 },
                { name: "Science", staff: 12 },
                { name: "Languages", staff: 6 },
                { name: "Arts", staff: 5 },
              ].map((dept) => (
                <div
                  key={dept.name}
                  className="flex items-center justify-between p-2 bg-white rounded shadow"
                >
                  <span className="text-gray-600 font-bold/90 text-xs font-bold">{dept.name}</span>
                  <span className="text-gray-400 text-xs font-bold">{dept.staff} Staff</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="flex items-center gap-2 mb-3">
              <span className="text-gray-600 font-bold font-bold text-sm">Statistics</span>
            </div>
          <div className="bg-white shadow rounded p-4">
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 font-bold text-xs font-bold">Delivering hours</span>
                  <span className="text-green-400 text-xs font-bold">4.8/5</span>
                </div>
                <div className="w-full rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "96%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 font-bold text-xs font-bold">Attendance</span>
                  <span className="text-green-400 text-xs font-bold">94%</span>
                </div>
                <div className="w-full rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 font-bold text-xs font-bold">Course Completion & Mastery Rate</span>
                  <span className="text-green-400 text-xs font-bold">94%</span>
                </div>
                <div className="w-full rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 font-bold text-xs font-bold">Engagement & Activity Index</span>
                  <span className="text-green-400 text-xs font-bold">92%</span>
                </div>
                <div className="w-full rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-600 font-bold font-bold text-sm">Awards</span>
            </div>

            <div className="space-y-1">
              {[
                { name: "Dr. Sarah Mitchell", subject: "Mathematics", rating: 4.8, badge: "🏆" },
                { name: "Prof. James Anderson", subject: "Science", rating: 4.9, badge: "⭐" },
                { name: "Ms. Emily Chen", subject: "English", rating: 4.7, badge: "🎯" },
              ].map((performer, idx) => (
                <div key={idx} className="bg-white shadow p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{performer.badge}</span>
                      <div>
                        <div className="text-gray-600 font-bold text-xs font-bold">{performer.name}</div>
                        <div className="text-gray-600 font-bold/60 text-xs font-semibold">{performer.subject}</div>
                      </div>
                    </div>
                    <div className="bg-blue-600/20 text-yellow-400 px-2 py-1 rounded text-xs font-bold">
                      {performer.rating}⭐
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-3">
          <StaffMembersList 
            institutionId={institutionId}
            staffMembers={staffMembers} 
            /> 
        </div>
      </div>
    </div>
  )
}

export default StaffManagementDashboard
