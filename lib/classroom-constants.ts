import { Users, GraduationCap, Package, Clock, ShieldCheck, Calendar, LayoutGrid } from "lucide-react"

export interface ClassroomModuleData {
  id: string
  name: string
  type: string
  icon: any
  color: string
  items: string[]
  details: any
}

export interface Student {
  id: string
  name: string
  grade: string
  status: "Present" | "Absent" | "Excused" | "Late"
  enrollmentDate: string
  guardianContact: string
}

export interface TimetablePeriod {
  id: string
  day: string
  time: string
  subject: string
  instructorId: string
  room: string
}

export interface Instructor {
  id: string
  name: string
  role: "Lead Instructor" | "Teaching Assistant" | "Guest Lecturer"
  subject: string
  email: string
  availability: string[]
}

export interface RoomResource {
  id: string
  name: string
  quantity: number
  status: "Available" | "In Use" | "Maintenance"
  lastChecked: string
}

export interface AccessControl {
  id: string
  type: "Electronic Lock" | "Biometric" | "Keycard" | "Manual"
  status: "Active" | "Inactive"
  authorizedPersonnel: string[]
  lastAccess: string
}

export const CLASSROOM_MODULE_TYPES: Record<string, { icon: any; label: string }> = {
  capacity: { icon: Users, label: "Capacity & Enrollment" },
  schedule: { icon: Calendar, label: "Class Schedule" },
  students: { icon: GraduationCap, label: "Student Roster" },
  resources: { icon: Package, label: "Room Resources" },
  sections: { icon: LayoutGrid, label: "Class Sections" },
}

export const CLASSROOM_MODULES: ClassroomModuleData[] = [
  {
    id: "students",
    name: "Student Roster",
    type: "students",
    icon: GraduationCap,
    color: "from-blue-500 to-indigo-600",
    items: ["28 Students Enrolled", "3 Pending", "1 Leave of Absence"],
    details: {
      students: [
        {
          id: "s1",
          name: "Alice Thompson",
          grade: "10-A",
          status: "Present",
          enrollmentDate: "2024-09-01",
          guardianContact: "+1 (555) 123-4567",
        },
        {
          id: "s2",
          name: "Benjamin Clark",
          grade: "10-A",
          status: "Excused",
          enrollmentDate: "2024-09-01",
          guardianContact: "+1 (555) 234-5678",
        },
        {
          id: "s3",
          name: "Catherine Lee",
          grade: "10-A",
          status: "Present",
          enrollmentDate: "2024-09-01",
          guardianContact: "+1 (555) 345-6789",
        },
      ] as Student[],
    },
  },
  {
    id: "timetable",
    name: "Time Table",
    type: "schedule",
    icon: Clock,
    color: "from-emerald-500 to-teal-600",
    items: ["Monday: 08:00 - 09:30", "Wednesday: 10:00 - 11:30", "Friday: 13:00 - 14:30"],
    details: {
      periods: [
        {
          id: "p1",
          day: "Monday",
          time: "08:00 - 09:30",
          subject: "Mathematics",
          instructorId: "i1",
          room: "Room 102",
        },
        {
          id: "p2",
          day: "Wednesday",
          time: "10:00 - 11:30",
          subject: "Physics",
          instructorId: "i1",
          room: "Room 102",
        },
        {
          id: "p3",
          day: "Friday",
          time: "13:00 - 14:30",
          subject: "Literature",
          instructorId: "i2",
          room: "Room 102",
        },
      ] as TimetablePeriod[],
    },
  },
  {
    id: "instructors",
    name: "Instructors",
    type: "capacity",
    icon: Users,
    color: "from-purple-500 to-pink-600",
    items: ["Lead: Dr. Aris Thorne", "Asst: Sarah Jenkins"],
    details: {
      staff: [
        {
          id: "i1",
          name: "Dr. Aris Thorne",
          role: "Lead Instructor",
          subject: "Advanced Calculus",
          email: "a.thorne@institution.edu",
          availability: ["Monday", "Wednesday", "Friday"],
        },
        {
          id: "i2",
          name: "Sarah Jenkins",
          role: "Teaching Assistant",
          subject: "Lab Support",
          email: "s.jenkins@institution.edu",
          availability: ["Tuesday", "Thursday", "Friday"],
        },
      ] as Instructor[],
    },
  },
  {
    id: "resources",
    name: "Room Resources",
    type: "resources",
    icon: Package,
    color: "from-amber-500 to-orange-600",
    items: ["32 Desktop PCs", "1 Smart Board", "2 High-Res Projectors"],
    details: {
      equipment: [
        { id: "r1", name: "Desktop PCs", quantity: 32, status: "Available", lastChecked: "2025-01-15" },
        { id: "r2", name: "Smart Board", quantity: 1, status: "In Use", lastChecked: "2025-01-15" },
        { id: "r3", name: "Projectors", quantity: 2, status: "Available", lastChecked: "2025-01-10" },
        { id: "r4", name: "Fiber Optic Hub", quantity: 1, status: "Available", lastChecked: "2025-01-01" },
      ] as RoomResource[],
    },
  },
  {
    id: "access",
    name: "Access Control",
    type: "sections",
    icon: ShieldCheck,
    color: "from-slate-700 to-slate-900",
    items: ["Electronic Lock: Active", "Camera Feed: Live"],
    details: {
      controls: [
        {
          id: "ac1",
          type: "Electronic Lock",
          status: "Active",
          authorizedPersonnel: ["Dr. Aris Thorne", "Sarah Jenkins", "Maintenance Staff"],
          lastAccess: "08:42 AM - Maintenance",
        },
        {
          id: "ac2",
          type: "Biometric",
          status: "Active",
          authorizedPersonnel: ["Dr. Aris Thorne", "Admin Staff"],
          lastAccess: "07:15 AM - Dr. Aris Thorne",
        },
      ] as AccessControl[],
    },
  },
]
