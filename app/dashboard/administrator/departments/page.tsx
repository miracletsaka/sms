import { DepartmentManagement } from "@/components/department/department-management"
import { prisma } from "@/lib/prisma"

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ q?: string }>
}) {
  const searchParams_ = await searchParams
  const institutionId = searchParams_.q || "your-default-institution-id"

  const institution = await prisma.institution.findUnique({
    where:{
      id : institutionId
    },
    include:{
      departments:{
         include: {
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
      }
    }
  })

  if(!institution){
    return
  }

  console.log("institution: ", institution)

 
  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <DepartmentManagement
        institution={institution} />
      </div>
  )
}
