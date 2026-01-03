"use client"

import { useState } from "react"
import {
  Users,
  BookOpen,
  FileText,
  Calendar,
  TrendingUp,
  Clock,
  Award,
  Search,
  Bell,
  ChevronDown,
  MoreVertical,
  Plus,
  Filter,
  Edit,
  FileSpreadsheet,
  ClipboardCheck,
  BarChart3,
  Eye,
  Trash2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { GradeRecordingDialog } from "./grade-recording-dialog"
import { BulkGradeEntry } from "./bulk-grade-entry"
import { AttendanceTracker } from "./attendance-tracker"
import { toast } from "sonner"

interface Course {
  id: string
  code: string
  name: string
  semester: string
  enrolled: number
  capacity: number
  schedule: string
  color: string
}

interface Student {
  id: string
  name: string
  email: string
  avatar?: string
  courseId: string
  attendance: number
  grade: number | null
  status: "active" | "at-risk" | "excellent"
}

interface Assignment {
  id: string
  title: string
  courseId: string
  courseName: string
  dueDate: Date
  submitted: number
  total: number
  status: "pending" | "grading" | "completed"
}

interface TodayClass {
  id: string
  courseCode: string
  courseName: string
  time: string
  room: string
  enrolled: number
}

interface AttendanceRecord {
  studentId: string
  status: "present" | "absent" | "late" | null
}

const mockCourses: Course[] = [
  {
    id: "1",
    code: "CS101",
    name: "Introduction to Computer Science",
    semester: "Fall 2024",
    enrolled: 45,
    capacity: 50,
    schedule: "MWF 9:00-10:00 AM",
    color: "bg-blue-500",
  },
  {
    id: "2",
    code: "CS201",
    name: "Data Structures & Algorithms",
    semester: "Fall 2024",
    enrolled: 38,
    capacity: 40,
    schedule: "TTh 2:00-3:30 PM",
    color: "bg-green-500",
  },
  {
    id: "3",
    code: "CS301",
    name: "Database Management Systems",
    semester: "Fall 2024",
    enrolled: 32,
    capacity: 35,
    schedule: "MWF 11:00-12:00 PM",
    color: "bg-purple-500",
  },
  {
    id: "4",
    code: "CS401",
    name: "Software Engineering",
    semester: "Fall 2024",
    enrolled: 28,
    capacity: 30,
    schedule: "TTh 9:30-11:00 AM",
    color: "bg-orange-500",
  },
]

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Emma Johnson",
    email: "emma.j@school.edu",
    courseId: "1",
    attendance: 95,
    grade: 92,
    status: "excellent",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@school.edu",
    courseId: "1",
    attendance: 88,
    grade: 85,
    status: "active",
  },
  {
    id: "3",
    name: "Sophia Rodriguez",
    email: "sophia.r@school.edu",
    courseId: "1",
    attendance: 72,
    grade: 68,
    status: "at-risk",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.w@school.edu",
    courseId: "2",
    attendance: 92,
    grade: 88,
    status: "active",
  },
  {
    id: "5",
    name: "Olivia Brown",
    email: "olivia.b@school.edu",
    courseId: "2",
    attendance: 96,
    grade: 94,
    status: "excellent",
  },
]

const todayClasses: TodayClass[] = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    time: "9:00 AM",
    room: "Room 301",
    enrolled: 45,
  },
  {
    id: "2",
    courseCode: "CS301",
    courseName: "Database Management Systems",
    time: "11:00 AM",
    room: "Room 205",
    enrolled: 32,
  },
]

export function InstructorDashboard() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [bulkGradeDialogOpen, setBulkGradeDialogOpen] = useState(false)
  const [bulkGradeAssignment, setBulkGradeAssignment] = useState<Assignment | null>(null)
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false)
  const [attendanceReportOpen, setAttendanceReportOpen] = useState(false)
  const [selectedCourseForAttendance, setSelectedCourseForAttendance] = useState<Course | null>(null)
  const [createAssignmentOpen, setCreateAssignmentOpen] = useState(false)
  const [assignmentDetailsOpen, setAssignmentDetailsOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "Midterm Project",
      courseId: "1",
      courseName: "CS101",
      dueDate: new Date(2024, 11, 25),
      submitted: 38,
      total: 45,
      status: "grading",
    },
    {
      id: "2",
      title: "Algorithm Analysis",
      courseId: "2",
      courseName: "CS201",
      dueDate: new Date(2024, 11, 28),
      submitted: 28,
      total: 38,
      status: "pending",
    },
    {
      id: "3",
      title: "Database Design",
      courseId: "3",
      courseName: "CS301",
      dueDate: new Date(2024, 11, 22),
      submitted: 32,
      total: 32,
      status: "completed",
    },
  ])

  const totalStudents = mockCourses.reduce((acc, course) => acc + course.enrolled, 0)
  const avgAttendance = Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)
  const pendingGrading = assignments.filter((a) => a.status === "grading").length

  const handleCreateAssignment = (newAssignment: {
    title: string
    description: string
    courseId: string
    dueDate: Date
    totalPoints: number
  }) => {
    const course = mockCourses.find((c) => c.id === newAssignment.courseId)
    if (!course) return

    const assignment: Assignment = {
      id: (assignments.length + 1).toString(),
      title: newAssignment.title,
      courseId: newAssignment.courseId,
      courseName: course.code,
      dueDate: newAssignment.dueDate,
      submitted: 0,
      total: course.enrolled,
      status: "pending",
    }

    setAssignments((prev) => [...prev, assignment])
    toast.success("Assignment Created", {
      description: `${newAssignment.title} has been created for ${course.code}`,
    })
  }

  const handleDeleteAssignment = (assignmentId: string) => {
    const assignment = assignments.find((a) => a.id === assignmentId)
    setAssignments((prev) => prev.filter((a) => a.id !== assignmentId))
    toast.success("Assignment Deleted", {
      description: `${assignment?.title} has been deleted`,
    })
  }

  const handleViewAssignmentDetails = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setAssignmentDetailsOpen(true)
  }

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "at-risk":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    }
  }

  const filteredStudents = students
    .filter((s) => !selectedCourse || s.courseId === selectedCourse)
    .filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const handleGradeSave = (studentId: string, grade: number, feedback: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const newStatus: Student["status"] = grade >= 85 ? "excellent" : grade >= 70 ? "active" : "at-risk"
          return { ...s, grade, status: newStatus }
        }
        return s
      }),
    )
    toast.success("Grade Updated", {
      description: `Grade recorded successfully for ${students.find((s) => s.id === studentId)?.name}${feedback ? " with feedback" : ""}`,
    })
  }

  const handleBulkGradeSave = (grades: Record<string, number>) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (grades[s.id] !== undefined) {
          const grade = grades[s.id]
          const newStatus: Student["status"] = grade >= 85 ? "excellent" : grade >= 70 ? "active" : "at-risk"
          return { ...s, grade, status: newStatus }
        }
        return s
      }),
    )
    toast.success("Grades Updated", {
      description: `Successfully recorded ${Object.keys(grades).length} grades`,
    })
  }

  const handleAttendanceSave = (attendance: AttendanceRecord[], date: Date) => {
    const presentStudents = attendance.filter((a) => a.status === "present").length
    const totalMarked = attendance.filter((a) => a.status !== null).length

    setStudents((prev) =>
      prev.map((s) => {
        const record = attendance.find((a) => a.studentId === s.id)
        if (record && record.status) {
          const attendanceAdjustment = record.status === "present" ? 2 : record.status === "late" ? 1 : -2
          const newAttendance = Math.min(100, Math.max(0, s.attendance + attendanceAdjustment))
          const newStatus: Student["status"] =
            newAttendance >= 90 && s.grade && s.grade >= 85
              ? "excellent"
              : newAttendance < 75 || (s.grade && s.grade < 70)
                ? "at-risk"
                : "active"
          return { ...s, attendance: newAttendance, status: newStatus }
        }
        return s
      }),
    )

    toast.success("Attendance Recorded", {
      description: `Marked ${totalMarked} students (${presentStudents} present) for ${date.toLocaleDateString()}`,
    })
  }

  const openAttendanceDialog = (course: Course) => {
    setSelectedCourseForAttendance(course)
    setAttendanceDialogOpen(true)
  }

  const openAttendanceReport = (course: Course) => {
    setSelectedCourseForAttendance(course)
    setAttendanceReportOpen(true)
  }

  const openGradeDialog = (student: Student) => {
    setSelectedStudent(student)
    setGradeDialogOpen(true)
  }

  const openBulkGradeDialog = (assignment: Assignment) => {
    setBulkGradeAssignment(assignment)
    setBulkGradeDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="size-5" />
              </div>
              <span className="text-lg font-bold">EduPortal</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="size-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="size-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="size-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">Dr. Jane Doe</span>
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container px-4 py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Dr. Doe</h1>
          <p className="text-muted-foreground">Here's what's happening with your courses today.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">Across {mockCourses.length} courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
              <TrendingUp className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgAttendance}%</div>
              <p className="text-xs text-muted-foreground">+2% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
              <FileText className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingGrading}</div>
              <p className="text-xs text-muted-foreground">Assignments to review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
              <Calendar className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayClasses.length}</div>
              <p className="text-xs text-muted-foreground">Next at {todayClasses[0]?.time}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your classes for today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {todayClasses.map((cls) => {
                    const course = mockCourses.find((c) => c.code === cls.courseCode)
                    return (
                      <div key={cls.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                            <Clock className="size-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{cls.courseCode}</p>
                            <p className="text-sm text-muted-foreground">
                              {cls.time} • {cls.room}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{cls.enrolled} students</Badge>
                          {course && (
                            <Button size="sm" variant="outline" onClick={() => openAttendanceDialog(course)}>
                              <ClipboardCheck className="size-4 mr-1" />
                              Mark
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Assignments</CardTitle>
                  <CardDescription>Assignments requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {assignments.slice(0, 3).map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex-1">
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {assignment.submitted}/{assignment.total}
                        </p>
                        <Badge variant={assignment.status === "completed" ? "default" : "secondary"}>
                          {assignment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {students.filter((s) => s.status === "at-risk").length > 0 && (
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="size-5" />
                    Students Requiring Attention
                  </CardTitle>
                  <CardDescription>Students with attendance or grade concerns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {students
                      .filter((s) => s.status === "at-risk")
                      .map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-destructive/10"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">Attendance: {student.attendance}%</p>
                            <p className="text-sm">Grade: {student.grade}%</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <Button>
                <Plus className="size-4 mr-2" />
                Add Course
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <Badge className={course.color}>{course.code}</Badge>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription>{course.semester}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Course</DropdownMenuItem>
                          <DropdownMenuItem>Manage Students</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openAttendanceDialog(course)}>
                            <ClipboardCheck className="size-4 mr-2" />
                            Mark Attendance
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openAttendanceReport(course)}>
                            <BarChart3 className="size-4 mr-2" />
                            Attendance Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Enrollment</span>
                      <span className="font-medium">
                        {course.enrolled}/{course.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className={`${course.color} h-2 rounded-full transition-all`}
                        style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                      />
                    </div>
                    <div className="pt-2 text-sm text-muted-foreground">{course.schedule}</div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-transparent"
                        variant="outline"
                        onClick={() => openAttendanceDialog(course)}
                      >
                        <ClipboardCheck className="size-4 mr-2" />
                        Attendance
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openAttendanceReport(course)}>
                        <BarChart3 className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="size-4 mr-2" />
                      {selectedCourse ? mockCourses.find((c) => c.id === selectedCourse)?.code : "All Courses"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedCourse(null)}>All Courses</DropdownMenuItem>
                    {mockCourses.map((course) => (
                      <DropdownMenuItem key={course.id} onClick={() => setSelectedCourse(course.id)}>
                        {course.code} - {course.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button>
                  <Plus className="size-4 mr-2" />
                  Add Student
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="px-4 py-3 font-medium">Student</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Attendance</th>
                        <th className="px-4 py-3 font-medium">Grade</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{student.email}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-secondary rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${student.attendance >= 90 ? "bg-green-500" : student.attendance >= 75 ? "bg-yellow-500" : "bg-red-500"}`}
                                  style={{ width: `${student.attendance}%` }}
                                />
                              </div>
                              <span className="text-sm">{student.attendance}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium">{student.grade ? `${student.grade}%` : "N/A"}</td>
                          <td className="px-4 py-3">
                            <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openGradeDialog(student)}>
                                  <Edit className="size-4 mr-2" />
                                  Update Grade
                                </DropdownMenuItem>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Send Message</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Assignments</h2>
              <Button onClick={() => setCreateAssignmentOpen(true)}>
                <Plus className="size-4 mr-2" />
                Create Assignment
              </Button>
            </div>
            <div className="grid gap-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{assignment.title}</CardTitle>
                        <CardDescription>{assignment.courseName}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            assignment.status === "completed"
                              ? "default"
                              : assignment.status === "grading"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {assignment.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewAssignmentDetails(assignment)}>
                              <Eye className="size-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="size-4 mr-2" />
                              Edit Assignment
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteAssignment(assignment.id)}
                            >
                              <Trash2 className="size-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Due Date</p>
                        <p className="font-medium">
                          {assignment.dueDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-sm text-muted-foreground">Submissions</p>
                        <p className="font-medium">
                          {assignment.submitted}/{assignment.total}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleViewAssignmentDetails(assignment)}>
                          <Eye className="size-4 mr-2" />
                          View Details
                        </Button>
                        {assignment.status === "grading" && (
                          <Button variant="outline" onClick={() => openBulkGradeDialog(assignment)}>
                            <FileSpreadsheet className="size-4 mr-2" />
                            Bulk Grade
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <GradeRecordingDialog
        open={gradeDialogOpen}
        onOpenChange={setGradeDialogOpen}
        student={selectedStudent}
        onSave={handleGradeSave}
      />

      <BulkGradeEntry
        open={bulkGradeDialogOpen}
        onOpenChange={setBulkGradeDialogOpen}
        students={bulkGradeAssignment ? students.filter((s) => s.courseId === bulkGradeAssignment.courseId) : []}
        assignmentTitle={bulkGradeAssignment?.title || ""}
        onSave={handleBulkGradeSave}
      />

      {selectedCourseForAttendance && (
        <>
          <AttendanceTracker
            open={attendanceDialogOpen}
            onOpenChange={setAttendanceDialogOpen}
            courseCode={selectedCourseForAttendance.code}
            courseName={selectedCourseForAttendance.name}
            students={students.filter((s) => s.courseId === selectedCourseForAttendance.id)}
            onSave={handleAttendanceSave}
          />
        </>
      )}
    </div>
  )
}
