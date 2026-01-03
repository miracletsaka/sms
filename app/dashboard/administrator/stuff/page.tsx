import StaffManagementDashboard from "@/components/stuff/StaffManagementDashboard";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function page({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }) {

    const resolvedParams = await searchParams;

    const institutionId = Array.isArray(resolvedParams.q) ? resolvedParams.q[0] : resolvedParams.q;

    if(!institutionId){
      redirect('/choose-choose')
    }

    const [ roles , departments ] = await prisma.$transaction([

      prisma.userRole.findMany(),
      prisma.department.findMany({
        where:{
          institutionId
        }
      })

    ])

    return(
        <div className="bg-gray-100">
             <StaffManagementDashboard
              departments={departments}
              institutionId = {institutionId}
              roles={roles} 
            />
        </div>
       
    )
}