import { Building, BookOpen, Users, DollarSign, ArrowLeftRight, GraduationCap } from "lucide-react"

export const STAFF_MEMBERS = [
  {
    id: "1",
    name: "Alexandra Deff",
    role: "Department Head",
    avatar: "👩‍🏫",
    type: "admin",
    email: "alexandra@school.edu",
  },
  {
    id: "2",
    name: "Edwin Adenike",
    role: "Senior Instructor",
    avatar: "👨‍💼",
    type: "instructor",
    email: "edwin@school.edu",
  },
  {
    id: "3",
    name: "Isaac Oluwatemilorun",
    role: "Finance Officer",
    avatar: "👨‍💻",
    type: "finance",
    email: "isaac@school.edu",
  },
  { id: "4", name: "David Oshodi", role: "IT Administrator", avatar: "👨‍🔧", type: "admin", email: "david@school.edu" },
]

export const MODULE_CONFIGS = [
  {
    id: "roles",
    name: "Roles",
    icon: Users,
    color: "from-violet-600 to-violet-700",
    items: ["Instructor", "Department Head", "Admin", "Finance"],
  },
  {
    id: "departments",
    name: "Departments",
    icon: Building,
    color: "from-emerald-600 to-emerald-700",
    items: ["Computer Science", "Mathematics", "Physics", "Engineering"],
  },
  {
    id: "subjects",
    name: "Subjects",
    icon: BookOpen,
    color: "from-blue-600 to-blue-700",
    items: ["Data Structures", "Calculus", "Quantum Physics", "Digital Systems"],
  },
  {
    id: "classes",
    name: "Classes",
    icon: GraduationCap,
    color: "from-cyan-600 to-cyan-700",
    items: ["CS 101", "CS 201", "MATH 301"],
  },
  {
    id: "salary",
    name: "Salary",
    icon: DollarSign,
    color: "from-amber-600 to-amber-700",
    items: ["$90,000"],
  },
  {
    id: "transfers",
    name: "Transfers",
    icon: ArrowLeftRight,
    color: "from-rose-600 to-rose-700",
    items: [],
  },
]

export interface ClassItem {
  id: string
  name: string
  code: string
  capacity: number
  enrolled: number
  room: string
  gradeLevel: string
  section: string
}

export const CLASS_GRADES = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"]

export const INITIAL_CLASSES: ClassItem[] = [
  {
    id: "cls-1",
    name: "Advanced Mathematics",
    code: "MATH-401",
    capacity: 30,
    enrolled: 24,
    room: "Room 302",
    gradeLevel: "Grade 12",
    section: "A",
  },
  {
    id: "cls-2",
    name: "Computer Science Intro",
    code: "CS-101",
    capacity: 25,
    enrolled: 25,
    room: "Lab 1",
    gradeLevel: "Grade 10",
    section: "B",
  },
  {
    id: "cls-3",
    name: "Quantum Physics",
    code: "PHY-505",
    capacity: 20,
    enrolled: 12,
    room: "Science Hall",
    gradeLevel: "Grade 12",
    section: "A",
  },
]
