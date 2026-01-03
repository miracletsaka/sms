import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function GET(request: NextRequest) {
  // Access the query parameter 'id' from the incoming request URL
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")

  console.log("Fetching institution with ID:", id)

  if (!id) {
    return NextResponse.json({ error: "Institution ID is required" }, { status: 400 })
  }

  const institutionData = await prisma.institution.findUnique({
    where: {
      id,
    },
  })

  console.log("Institution data retrieved:", institutionData)
  if (institutionData) {
    return NextResponse.json(institutionData)
  } else {
    return NextResponse.json({ error: "Institution not found" }, { status: 404 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("Request body:", body)
    const {
      institutionName,
      institutionType,
      address,
      city,
      state,
      country,
      phone,
      email,
      website,
      adminFirstName,
      adminLastName,
      adminEmail,
      adminPassword,
      adminConfirmPassword,
    } = body

    if (
      !institutionName ||
      !institutionType ||
      !address ||
      !city ||
      !country ||
      !phone ||
      !adminFirstName ||
      !adminLastName ||
      !adminEmail ||
      !adminPassword
    ) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 })
    }

    if (adminPassword !== adminConfirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 })
    }

    let adminUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    })

    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10)

      adminUser = await prisma.user.create({
        data: {
          firstName: adminFirstName,
          lastName: adminLastName,
          email: adminEmail,
          dateOfBirth: new Date(), // Placeholder, adjust as needed
          password: hashedPassword,
        },
      })
    }

    const newInstitution = await prisma.institution.create({
      data: {
        name: institutionName,
        institutionType: institutionType,
        address,
        state: state || "MALAWI",
        email: email || adminEmail,
        city,
        country,
        phone,
        website: website || null,
      },
    })

    let adminRole = await prisma.userRole.findUnique({
      where: { name: "ADMIN" },
    })

    if (!adminRole) {
      adminRole = await prisma.userRole.create({
        data: {
          name: "ADMIN",
          description: "Administrator role with full access",
          permissions: 255, // Full permissions (all bits set)
          icon: "Shield",
          color: "#ef4444",
          status: "ACTIVE",
        },
      })
    }

    const userRoleRecord = await prisma.role.create({
      data: {
        role:{
          connect:{
            id:adminRole.id
          }
        }
      },
    })

    await prisma.roleOnInstitutionToUserAssignedDep.create({
      data: {
        user: {
          connect:{
            id : adminUser.id
          }},
        role:{
          connect:{
            id : userRoleRecord.id
          }} ,
        institution:{
          connect:{
            id : newInstitution.id
          }},
      },
    })

    console.log("Institution created successfully:", newInstitution)

    return NextResponse.json(
      {
        success: true,
        institution: newInstitution,
        admin: {
          id: adminUser.id,
          email: adminUser.email,
          firstName: adminUser.firstName,
          lastName: adminUser.lastName,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error registering institution:", error)
    return NextResponse.json({ error: "Failed to register institution." }, { status: 500 })
  }
}
