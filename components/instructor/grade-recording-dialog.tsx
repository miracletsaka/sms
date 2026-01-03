"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Student {
  id: string
  name: string
  email: string
  courseId: string
  attendance: number
  grade: number | null
  status: "active" | "at-risk" | "excellent"
}

interface GradeRecordingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: Student | null
  onSave: (studentId: string, grade: number, feedback: string) => void
}

export function GradeRecordingDialog({ open, onOpenChange, student, onSave }: GradeRecordingDialogProps) {
  const [grade, setGrade] = useState<string>(student?.grade?.toString() || "")
  const [feedback, setFeedback] = useState("")

  const handleSave = () => {
    if (!student || !grade) return
    const gradeNum = Number.parseFloat(grade)
    if (gradeNum >= 0 && gradeNum <= 100) {
      onSave(student.id, gradeNum, feedback)
      onOpenChange(false)
      setGrade("")
      setFeedback("")
    }
  }

  if (!student) return null

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600"
    if (grade >= 80) return "text-blue-600"
    if (grade >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Record Grade</DialogTitle>
          <DialogDescription>Update grade for {student.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
            <Avatar className="size-12">
              <AvatarFallback className="text-lg">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{student.name}</p>
              <p className="text-sm text-muted-foreground">{student.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Current Grade</p>
              <p className={`text-2xl font-bold ${student.grade ? getGradeColor(student.grade) : ""}`}>
                {student.grade !== null ? `${student.grade}%` : "N/A"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">New Grade (0-100)</Label>
            <Input
              id="grade"
              type="number"
              min="0"
              max="100"
              step="0.1"
              placeholder="Enter grade..."
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Enter a value between 0 and 100</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback (Optional)</Label>
            <Textarea
              id="feedback"
              placeholder="Add comments or feedback for the student..."
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Label>Quick Grade:</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setGrade("100")}>
                A+ (100)
              </Button>
              <Button variant="outline" size="sm" onClick={() => setGrade("90")}>
                A (90)
              </Button>
              <Button variant="outline" size="sm" onClick={() => setGrade("80")}>
                B (80)
              </Button>
              <Button variant="outline" size="sm" onClick={() => setGrade("70")}>
                C (70)
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!grade || Number.parseFloat(grade) < 0 || Number.parseFloat(grade) > 100}
          >
            Save Grade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
