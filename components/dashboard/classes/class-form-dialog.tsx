"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClass, updateClassAction } from "@/app/actions/class-actions"

const classSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  capacity: z.coerce.number().int().positive("Capacity must be a positive number"),
  grade: z.string().min(1, "Grade is required"),
  room: z.string().optional(),
  description: z.string().optional(),
  academicYear: z.string().optional(),
})

type ClassFormValues = z.infer<typeof classSchema>

interface ClassFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: any // In real app, type this as the Class model
}

export function ClassFormDialog({ open, onOpenChange, initialData }: ClassFormDialogProps) {
   const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: initialData?.name || "",
      capacity: initialData?.capacity || 30,
      grade: initialData?.grade || "",
      room: initialData?.room || "",
      description: initialData?.description || "",
      academicYear: initialData?.academicYear || "2024/2025",
    },
  })

  async function onSubmit(data: ClassFormValues) {
    setIsSubmitting(true)
    try {
      const result = initialData ? await updateClassAction(initialData.id, data) : await createClass(data)

      if (result.success) {
        
        onOpenChange(false)
        form.reset()
      } else {
        throw new Error(result.error as string)
      }
    } catch (error) {

    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#FDFCF9] border-[#E8E4D9]">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium tracking-tight text-[#2C2C2C]">
            {initialData ? "Edit Class" : "Create New Class"}
          </DialogTitle>
          <DialogDescription className="text-sm text-[#666666]">
            Enter the details for the class here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-xs uppercase tracking-widest text-[#999999]">
              Name
            </Label>
            <Input id="name" {...form.register("name")} className="col-span-3 border-[#E8E4D9] focus:ring-[#2C2C2C]" />
            {form.formState.errors.name && (
              <p className="col-start-2 col-span-3 text-xs text-red-500 mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="grade" className="text-right text-xs uppercase tracking-widest text-[#999999]">
              Grade
            </Label>
            <Input id="grade" {...form.register("grade")} className="col-span-3 border-[#E8E4D9]" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right text-xs uppercase tracking-widest text-[#999999]">
              Capacity
            </Label>
            <Input id="capacity" type="number" {...form.register("capacity")} className="col-span-3 border-[#E8E4D9]" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="room" className="text-right text-xs uppercase tracking-widest text-[#999999]">
              Room
            </Label>
            <Input id="room" {...form.register("room")} className="col-span-3 border-[#E8E4D9]" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right text-xs uppercase tracking-widest text-[#999999]">
              Info
            </Label>
            <Textarea
              id="description"
              {...form.register("description")}
              className="col-span-3 min-h-[80px] border-[#E8E4D9]"
            />
          </div>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
            className="bg-[#2C2C2C] text-white hover:bg-[#404040] font-normal uppercase tracking-widest text-xs h-10 px-8"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
