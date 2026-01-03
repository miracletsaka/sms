"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createDepartment(data: {
  name: string
  description: string
  head: string
  institutionId: string
  color?: string
  image?: string
  icon?: string
}) {

  console.log("data," , data)
  try {
    const department = await prisma.department.create({
      data: {
        name: data.name,
        description: data.description,
        head: data.head,
        institution:{
          connect:{
            id: data.institutionId
          }
        },
        totalStaff: 0,
        totalStudents: 0,
        color: data.color || "bg-blue-500",
        image: data.image,
        icon: data.icon || "BookOpen",
      },
      include: {
        institution: true,
        stuff: {
          include: {
            user: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    })
    revalidatePath("/departments")
    return { success: true, data: department }
  } catch (error) {
    console.error("Error creating department:", error)
    return { success: false, error: "Failed to create department" }
  }
}

export async function updateDepartment(
  id: string,
  data: {
    name: string
    description: string
    head: string
    color?: string
    image?: string
    icon?: string
  },
) {
  try {
    const department = await prisma.department.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        head: data.head,
        ...(data.color && { color: data.color }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.icon && { icon: data.icon }),
      },
      include: {
        institution: true,
        stuff: {
          include: {
            user: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    })
    revalidatePath("/departments")
    return { success: true, data: department }
  } catch (error) {
    console.error("Error updating department:", error)
    return { success: false, error: "Failed to update department" }
  }
}

export async function deleteDepartment(id: string) {
  try {
    await prisma.department.delete({
      where: { id },
    })
    revalidatePath("/departments")
    return { success: true }
  } catch (error) {
    console.error("Error deleting department:", error)
    return { success: false, error: "Failed to delete department" }
  }
}
