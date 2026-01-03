import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma";

export default async function page({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }) {

    const resolvedParams = await searchParams;

    const institutionId = Array.isArray(resolvedParams.q) ? resolvedParams.q[0] : resolvedParams.q;

    if (!institutionId) {
        redirect("/choose-school")
    }
    

    const existingInstitution = await prisma.roleOnInstitutionToUserAssignedDep.findUnique({
        where: { id: institutionId },
        include: { role: {
          include:{
            role:true
          }
        }  },
    });

    if (!existingInstitution) {
        redirect("/login")
    }

  const role = existingInstitution.role.role.name

  switch (role) {
    case "ADMIN":
      redirect(`/dashboard/administrator?q=${existingInstitution.institutionId}`)
    case "INSTRUCTOR":
      redirect(`/dashboard/instructor?q=${existingInstitution.institutionId}`)
    case "STUDENT":
      redirect(`/dashboard/finance?q=${existingInstitution.institutionId}`)
    default:
      redirect("/login")
  }
}
