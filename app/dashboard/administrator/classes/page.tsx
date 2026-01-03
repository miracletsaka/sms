import ClassesPage from "@/components/dashboard/classes/class-management";
import { prisma } from "@/lib/prisma";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ q?: string }>
}) {
  const searchParams_ = await searchParams
  const institutionId = searchParams_.q || "your-default-institution-id"
  
  const academicYear = await prisma.academicYear.findMany({

    where:{
      institutionId
    },
    include:{
      classes:{
        include:{
          teachers:{
            include:{
              user:{
                include:{
                  user:true
                }
              }
            }
          }
        }
      }
    }
  })

  return (
    <div>
      <ClassesPage academicYear={academicYear} />
    </div>
  )
}