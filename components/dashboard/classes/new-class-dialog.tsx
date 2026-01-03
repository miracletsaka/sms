import { startTransition, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Sun, Moon, Users, DoorOpen, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { AcademicYear, ClassType, CreateClassInput } from "@/types/class"
import { createClass } from "@/app/actions/class-actions"
import { toast } from "sonner"

interface NewClassDialogProps {
  academicYears: AcademicYear[]
  onSuccess?: () => void
}

interface FormData {
  academicYearId: string
  type: ClassType
  name: string
  section: string
  capacity: string
  roomNumber: string
}

interface FormErrors {
  academicYearId?: string
  name?: string
  capacity?: string
  submit?: string
}

export function NewClassDialog({ onSuccess } : NewClassDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})  
  const [formData, setFormData] = useState<FormData>({
    academicYearId: "",
    type: "DAY",
    name: "",
    section: "",
    capacity: "",
    roomNumber: "",
  })

  const validateForm = () => {
     const newErrors: FormErrors = {}

    if (!formData.name || formData.name.trim().length === 0) {
      newErrors.name = "Class name is required"
    }
    if (formData.capacity && (isNaN(Number(formData.capacity)) || parseInt(formData.capacity) <= 0)) {
      newErrors.capacity = "Capacity must be a positive number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    startTransition(async () => {
      try {
        const payload: CreateClassInput = {
          academicYearId: formData.academicYearId,
          type: formData.type,
          name: formData.name.trim(),
          section: formData.section.trim() || null,
          capacity: formData.capacity ? parseInt(formData.capacity) : null,
          roomNumber: formData.roomNumber.trim() || null,
        }

        const result = await createClass(payload)

        if (result.success) {
          toast.success("Class created successfully!")
          
          // Reset form and close dialog
          setFormData({
            academicYearId: "",
            type: "DAY",
            name: "",
            section: "",
            capacity: "",
            roomNumber: "",
          })
          setErrors({})
          setOpen(false)
          
          // Call onSuccess callback if provided
          onSuccess?.()
        } else {
          toast.error(result.error || "Failed to create class")
          setErrors({ submit: result.error || "Failed to create class" })
        }
      } catch (error) {
        console.error("Unexpected error:", error)
        setErrors({ submit: "An unexpected error occurred" })
      }
    })
  }


  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl h-12 shadow-lg shadow-indigo-500/30 font-bold">
          <Plus className="w-4 h-4 mr-2" /> New Class
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] bg-gray-100 shadow-2xl p-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32" />
        
        <DialogHeader className="relative px-8 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div>
              <DialogTitle className="text-sm font-bold text-gray-600 uppercase tracking-tight text-slate-900">
                Create New Class
              </DialogTitle>
              <DialogDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Add a new class to your registry
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="relative px-8 py-6 space-y-6">
          {/* Class Type */}
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-700">
              Class Type <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleInputChange("type", "DAY")}
                className={cn(
                  "shadow bg-white h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2",
                  formData.type === "DAY"
                    ? "border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg shadow-amber-500/20"
                    : "border-slate-200 bg-slate-50 hover:border-amber-300"
                )}
              >
                <Sun className={cn(
                  "w-6 h-6",
                  formData.type === "DAY" ? "text-amber-600" : "text-slate-400"
                )} />
                <span className={cn(
                  "text-xs font-black uppercase tracking-wider",
                  formData.type === "DAY" ? "text-amber-600" : "text-slate-600"
                )}>
                  Day Class
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleInputChange("type", "NIGHT")}
                className={cn(
                  "shadow bg-white h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2",
                  formData.type === "NIGHT"
                    ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-lg shadow-indigo-500/20"
                    : "border-slate-200 bg-slate-50 hover:border-indigo-300"
                )}
              >
                <Moon className={cn(
                  "w-6 h-6",
                  formData.type === "NIGHT" ? "text-indigo-600" : "text-slate-400"
                )} />
                <span className={cn(
                  "text-xs font-black uppercase tracking-wider",
                  formData.type === "NIGHT" ? "text-indigo-600" : "text-slate-600"
                )}>
                  Night Class
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Class Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-700">
                Class Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g., Grade 10"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={cn(
                  "border-none shadow bg-white font-bold",
                  errors.name ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
                )}
              />
              {errors.name && (
                <p className="text-xs font-bold text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Section */}
            <div className="space-y-2">
              <Label htmlFor="section" className="text-xs font-black uppercase tracking-widest text-slate-700">
                Section
              </Label>
              <Input
                id="section"
                placeholder="e.g., A"
                value={formData.section}
                onChange={(e) => handleInputChange("section", e.target.value)}
                className="border-none shadow bg-white font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Capacity */}
            <div className="space-y-2">
              <Label htmlFor="capacity" className="text-xs font-black uppercase tracking-widest text-slate-700 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                Capacity
              </Label>
              <Input
                id="capacity"
                type="number"
                placeholder="e.g., 30"
                value={formData.capacity}
                onChange={(e) => handleInputChange("capacity", e.target.value)}
                className={cn(
                  "border-none shadow bg-white font-bold",
                  errors.capacity ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
                )}
              />
              {errors.capacity && (
                <p className="text-xs font-bold text-red-600">{errors.capacity}</p>
              )}
            </div>

            {/* Room Number */}
            <div className="space-y-2">
              <Label htmlFor="roomNumber" className="text-xs font-black uppercase tracking-widest text-slate-700 flex items-center gap-2">
                <DoorOpen className="w-3.5 h-3.5" />
                Room Number
              </Label>
              <Input
                id="roomNumber"
                placeholder="e.g., 101"
                value={formData.roomNumber}
                onChange={(e) => handleInputChange("roomNumber", e.target.value)}
                className="border-none shadow bg-white font-bold"
              />
            </div>
          </div>

          {errors.submit && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-sm font-bold text-red-600">{errors.submit}</p>
            </div>
          )}
        </div>

        <DialogFooter className="px-8 pb-8 pt-4 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
            className="h-12 px-6 rounded-xl border-2 border-slate-200 font-bold hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="h-12 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-indigo-500/30 font-bold"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create Class
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}