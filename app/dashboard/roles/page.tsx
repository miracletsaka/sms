import RoleManagementDashboard from "@/components/roles/role-page";
import { prisma } from "@/lib/prisma";

export default async function page() {

    const roles = await prisma.userRole.findMany({
        include:{
            users:true
        }
    })
    return <div>
        <RoleManagementDashboard initialRoles={roles} />
    </div>
}
