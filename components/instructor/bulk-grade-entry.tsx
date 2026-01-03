"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Student {
  id: string
  name: string
  email: string
  courseId: string
  attendance: number
  grade: number | null
  status: "active" | "at-risk" | "excellent"
}

interface BulkGradeEntryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  students: Student[]
  assignmentTitle: string
  onSave: (grades: Record<string, number>) => void
}

export function BulkGradeEntry({ open, onOpenChange, students, assignmentTitle, onSave }: BulkGradeEntryProps) {
  const [grades, setGrades] = useState<Record<string, string>>({})

  const handleGradeChange = (studentId: string, value: string) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: value,
    }))
  }

  const handleSave = () => {
    const validGrades: Record<string, number> = {}
    Object.entries(grades).forEach(([studentId, grade]) => {
      const gradeNum = Number.parseFloat(grade)
      if (!isNaN(gradeNum) && gradeNum >= 0 && gradeNum <= 100) {
        validGrades[studentId] = gradeNum
      }
    })

    if (Object.keys(validGrades).length > 0) {
      onSave(validGrades)
      onOpenChange(false)
      setGrades({})
    }
  }

  const getGradeColor = (gradeStr: string) => {
    const grade = Number.parseFloat(gradeStr)
    if (isNaN(grade)) return ""
    if (grade >= 90) return "bg-green-100 border-green-300"
    if (grade >= 80) return "bg-blue-100 border-blue-300"
    if (grade >= 70) return "bg-yellow-100 border-yellow-300"
    return "bg-red-100 border-red-300"
  }

  const enteredCount = Object.values(grades).filter(
    (g) => g && Number.parseFloat(g) >= 0 && Number.parseFloat(g) <= 100,
  ).length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Bulk Grade Entry</DialogTitle>
          <DialogDescription>
            Enter grades for "{assignmentTitle}" - {students.length} students
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium">Progress</p>
              <p className="text-sm text-muted-foreground">
                {enteredCount} of {students.length} grades entered
              </p>
            </div>
            <Badge variant="secondary">{Math.round((enteredCount / students.length) * 100)}% Complete</Badge>
          </div>

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {students.map((student, index) => (
                <div key={student.id} className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`grade-${student.id}`} className="text-xs text-muted-foreground">
                      Grade:
                    </Label>
                    <Input
                      id={`grade-${student.id}`}
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      placeholder="0-100"
                      className={`w-24 ${getGradeColor(grades[student.id] || "")}`}
                      value={grades[student.id] || ""}
                      onChange={(e) => handleGradeChange(student.id, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
            <div className="text-sm text-blue-900 dark:text-blue-200">
              <strong>Tip:</strong> Use Tab key to quickly move between grade fields
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => setGrades({})}>
            Clear All
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={enteredCount === 0}>
              Save {enteredCount} Grade{enteredCount !== 1 ? "s" : ""}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
