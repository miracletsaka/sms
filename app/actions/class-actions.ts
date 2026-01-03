"use server"

import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const classSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  capacity: z.number().int().positive("Capacity must be a positive number"),
  grade: z.string().min(1, "Grade is required"),
  room: z.string().optional(),
  description: z.string().optional(),
  academicYear: z.string().optional(),
})

export async function createClass(formData: z.infer<typeof classSchema>) {
  try {
    const validatedData = classSchema.parse(formData)

    const newClass = await prisma.class.create({
      data: validatedData,
    })

    revalidateTag("classes", "max")
    return { success: true, data: newClass }
  } catch (error) {
    console.error("[v0] Error creating class:", error)
    return { success: false, error: "Failed to create class" }
  }
}

export async function updateClassAction(id: string, formData: Partial<z.infer<typeof classSchema>>) {
  try {
    const updatedClass = await prisma.class.update({
      where: { id },
      data: formData,
    })

    revalidateTag("classes", "max")
    return { success: true, data: updatedClass }
  } catch (error) {
    console.error("[v0] Error updating class:", id, error)
    return { success: false, error: "Failed to update class" }
  }
}

export async function deleteClassAction(id: string) {
  try {
    await prisma.class.delete({
      where: { id },
    })

    revalidateTag("classes", "max")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting class:", id, error)
    return { success: false, error: "Failed to delete class" }
  }
}

"use server"

import { prisma } from "@/lib/prisma" // adjust import path
import { revalidatePath } from "next/cache"
import { CreateClassInput, Class } from "@/types/class"

export async function createClass(data: CreateClassInput): Promise<{ 
  success: boolean
  data?: Class
  error?: string 
}> {
  try {
    // Validate required fields
    if (!data.academicYearId || !data.name || !data.type) {
      return {
        success: false,
        error: "Missing required fields"
      }
    }

    // Validate capacity if provided
    if (data.capacity !== null && data.capacity <= 0) {
      return {
        success: false,
        error: "Capacity must be a positive number"
      }
    }

    // Check if academic year exists
    const academicYearExists = await prisma.academicYear.findUnique({
      where: { id: data.academicYearId }
    })

    if (!academicYearExists) {
      return {
        success: false,
        error: "Academic year not found"
      }
    }

    // Create the class
    const newClass = await prisma.class.create({
      data: {
        academicYear:{
          connect:{
            id: data.academicYearId
          }
        },
        type: data.type,
        name: data.name.trim(),
        section: data.section?.trim() || null,
        capacity: data.capacity,
        roomNumber: data.roomNumber?.trim() || null,
        status: "ACTIVE"
      }
    })

    // Revalidate the classes page
    revalidatePath("/classes") // adjust path as needed

    return {
      success: true,
      data: newClass as Class
    }

  } catch (error) {
    console.error("Error creating class:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create class"
    }
  }
}
