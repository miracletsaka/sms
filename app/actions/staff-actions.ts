"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export type StaffFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  department: string
  qualification: string
  institutionId:string
  experience: string
  subjects: string
  joiningDate: string
  salary: string
}

export async function addStaffMember(formData: StaffFormData) {
  try {
    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: formData.email },
    })

    if (existingUser) {
      return {
        success: false,
        message: `A staff member with email ${formData.email} already exists.`,
      }
    }

    // Generate a temporary password (in production, send this via email)
    const tempPassword = Math.random().toString(36).slice(-8)
    const hashedPassword = await bcrypt.hash(tempPassword, 10)

    console.log("tem", tempPassword)

    // Parse the joining date
    const joiningDate = new Date(formData.joiningDate)

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        qualification: formData.qualification,
        password: hashedPassword,
        dateOfBirth: new Date(), // Default value, should be collected in form
        startOfWork: joiningDate,
        employeeNumber: `EMP-${Date.now()}`, // Generate unique employee number
        isActive: true,
      },
    })

     const userRoleRecord = await prisma.role.create({
          data: {
            role:{
              connect:{
                id:formData.role
              }
            }
          },
        })

     const userRole = await prisma.roleOnInstitutionToUserAssignedDep.create({
      data: {
        user: {
          connect:{
            id : newUser.id
          }},
        role:{
          connect:{
            id : userRoleRecord.id
          }} ,
        institution:{
          connect:{
            id : formData.institutionId
          }},
      },
    })

    await prisma.userDepartment.create({
      data:{
        user:{
          connect:{
            id:userRole.id
          }
        },
        department:{
          connect:{
            id:formData.department
          }
        }
      }
    })

    console.log("[v0] Staff member created successfully:", newUser.id)

    // Revalidate the staff management page
    revalidatePath("/staff-management")

    return {
      success: true,
      message: `Staff member ${formData.firstName} ${formData.lastName} has been successfully added.`,
      data: {
        id: newUser.id,
        tempPassword, // Return temp password (in production, send via email instead)
      },
    }
  } catch (error) {
    console.error("[v0] Error adding staff member:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to add staff member. Please try again.",
    }
  }
}

export async function getAllStaff(institutionId:string) {
  try {

    const institution = await prisma.institution.findUnique({
      where:{
        id:institutionId
      },
      include:{
        staff:{
           include:{
            user:{
              include:{
                institutions:{
                  include:{
                    department:{
                      include:{
                        department:true
                      }
                    }
                  }
                }
              }
            },
            department:{
              include:{
                department:true
              }
            },
            role:{
              include:{
                role:true
              }
            }
          }
        }
      }
    })


    return {
      success: true,
      data: institution?.staff,
    }
  } catch (error) {
    console.error("[v0] Error fetching staff:", error)
    return {
      success: false,
      message: "Failed to fetch staff members.",
      data: [],
    }
  }
}

export async function getStaffStats() {
  try {
    // Get total staff count
    const totalStaff = await prisma.user.count({
      where: {
        isActive: true,
      },
    })

    // Get total classes
    const totalClasses = await prisma.class.count()

    // Get total students
    const totalStudents = await prisma.student.count()

    // Get departments with staff count
    const departments = await prisma.department.findMany({
      select: {
        name: true,
        totalStaff: true,
      },
      take: 4,
    })

    return {
      totalStaff,
      activeClasses: totalClasses,
      totalStudents,
      departments: departments.map((dept) => ({
        name: dept.name,
        staffCount: dept.totalStaff,
      })),
    }
  } catch (error) {
    console.error("[v0] Error fetching staff stats:", error)
    // Return default values if database query fails
    return {
      totalStaff: 0,
      activeClasses: 0,
      totalStudents: 0,
      departments: [],
    }
  }
}

export async function updateStaffMember(id: string, data: Partial<StaffFormData>) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        qualification: data.qualification,
        startOfWork: data.joiningDate ? new Date(data.joiningDate) : undefined,
      },
    })

    revalidatePath("/staff-management")

    return {
      success: true,
      message: "Staff member updated successfully.",
      data: updatedUser,
    }
  } catch (error) {
    console.error("[v0] Error updating staff member:", error)
    return {
      success: false,
      message: "Failed to update staff member.",
    }
  }
}

export async function deleteStaffMember(id: string) {
  try {
    // Soft delete by setting isActive to false
    await prisma.user.update({
      where: { id },
      data: { isActive: false },
    })

    revalidatePath("/staff-management")

    return {
      success: true,
      message: "Staff member deleted successfully.",
    }
  } catch (error) {
    console.error("[v0] Error deleting staff member:", error)
    return {
      success: false,
      message: "Failed to delete staff member.",
    }
  }
}
