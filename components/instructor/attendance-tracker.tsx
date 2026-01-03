"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, XCircle, Clock, Calendar } from "lucide-react"
import { toast } from "sonner"

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

interface AttendanceRecord {
  studentId: string
  status: "present" | "absent" | "late" | null
}

interface AttendanceTrackerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  courseCode: string
  courseName: string
  students: Student[]
  onSave: (attendance: AttendanceRecord[], date: Date) => void
}

export function AttendanceTracker({
  open,
  onOpenChange,
  courseCode,
  courseName,
  students,
  onSave,
}: AttendanceTrackerProps) {
  const [attendance, setAttendance] = useState<Record<string, AttendanceRecord["status"]>>({})
  const [sessionDate, setSessionDate] = useState(new Date())

  const handleStatusChange = (studentId: string, status: AttendanceRecord["status"]) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  const handleQuickMarkAll = (status: AttendanceRecord["status"]) => {
    const newAttendance: Record<string, AttendanceRecord["status"]> = {}
    students.forEach((student) => {
      newAttendance[student.id] = status
    })
    setAttendance(newAttendance)
  }

  const handleSave = () => {
    const records: AttendanceRecord[] = students.map((student) => ({
      studentId: student.id,
      status: attendance[student.id] || null,
    }))

    const markedCount = records.filter((r) => r.status !== null).length
    if (markedCount === 0) {
      toast.error("No attendance marked", {
        description: "Please mark attendance for at least one student",
      })
      return
    }

    onSave(records, sessionDate)
    onOpenChange(false)
    setAttendance({})
  }

  const presentCount = Object.values(attendance).filter((s) => s === "present").length
  const absentCount = Object.values(attendance).filter((s) => s === "absent").length
  const lateCount = Object.values(attendance).filter((s) => s === "late").length
  const unmarkedCount = students.length - presentCount - absentCount - lateCount

  const getStatusButton = (studentId: string, status: AttendanceRecord["status"]) => {
    const isActive = attendance[studentId] === status
    const baseClasses = "size-9 transition-all"

    switch (status) {
      case "present":
        return (
          <Button
            variant={isActive ? "default" : "outline"}
            size="icon"
            className={`${baseClasses} ${isActive ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50"}`}
            onClick={() => handleStatusChange(studentId, status)}
          >
            <CheckCircle2 className="size-4" />
          </Button>
        )
      case "absent":
        return (
          <Button
            variant={isActive ? "default" : "outline"}
            size="icon"
            className={`${baseClasses} ${isActive ? "bg-red-600 hover:bg-red-700" : "hover:bg-red-50"}`}
            onClick={() => handleStatusChange(studentId, status)}
          >
            <XCircle className="size-4" />
          </Button>
        )
      case "late":
        return (
          <Button
            variant={isActive ? "default" : "outline"}
            size="icon"
            className={`${baseClasses} ${isActive ? "bg-yellow-600 hover:bg-yellow-700" : "hover:bg-yellow-50"}`}
            onClick={() => handleStatusChange(studentId, status)}
          >
            <Clock className="size-4" />
          </Button>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="size-5" />
            Mark Attendance - {courseCode}
          </DialogTitle>
          <DialogDescription>{courseName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{presentCount}</div>
                <div className="text-xs text-muted-foreground">Present</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{absentCount}</div>
                <div className="text-xs text-muted-foreground">Absent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{lateCount}</div>
                <div className="text-xs text-muted-foreground">Late</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{unmarkedCount}</div>
                <div className="text-xs text-muted-foreground">Unmarked</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleQuickMarkAll("present")}>
                Mark All Present
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleQuickMarkAll("absent")}>
                Mark All Absent
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Session Date:</span>
            </div>
            <input
              type="date"
              value={sessionDate.toISOString().split("T")[0]}
              onChange={(e) => setSessionDate(new Date(e.target.value))}
              className="px-3 py-1.5 rounded-md border bg-background text-sm"
            />
          </div>

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-2">
              {students.map((student, index) => (
                <div key={student.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50">
                  <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-sm font-medium">
                    {index + 1}
                  </div>
                  <Avatar>
                    <AvatarFallback>
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusButton(student.id, "present")}
                    {getStatusButton(student.id, "late")}
                    {getStatusButton(student.id, "absent")}
                  </div>
                  {attendance[student.id] && (
                    <Badge
                      variant="secondary"
                      className={
                        attendance[student.id] === "present"
                          ? "bg-green-100 text-green-800"
                          : attendance[student.id] === "absent"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {attendance[student.id]}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
            <div className="text-sm text-blue-900 dark:text-blue-200">
              <strong>Tip:</strong> Click the buttons to quickly mark student attendance. Green = Present, Yellow =
              Late, Red = Absent
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {presentCount + absentCount + lateCount} of {students.length} students marked
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={unmarkedCount === students.length}>
              Save Attendance
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
