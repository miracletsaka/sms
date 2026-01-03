import { auth } from "@/app/authhandlers/auth";
import SMSFooter from "@/components/dashboard/dashboard-footer";
import Footer from "@/components/footer";
import { Navigation } from "@/components/nav/navigation";
import SchoolSelector from "@/components/school-selector";
import { prisma } from "@/lib/prisma";

export default async function ChooseSchoolPage() {
    const session = await auth();

    const userWithInstitutions = await prisma.user.findUnique({
        where: { id: session?.user?.id },
        include: { 
          institutions: 
          {
            include: {
             role:{
              include:{
                role:true
              }
            },
             institution: true 
            }}
         },
    });

    console.log("institution", userWithInstitutions?.institutions)

    if (!userWithInstitutions || userWithInstitutions.institutions.length === 0) {
        return (
            <>
                <Navigation />
                <div className="p-6">
                    <p className="text-red-600">No institutions found. Please contact an administrator.</p>
                </div>
            </>
        );
    }
    // return roles in as array
  return (
    <>
      <Navigation />
      <SchoolSelector 
      defaultSchools={userWithInstitutions?.institutions} />
      <SMSFooter />
      <Footer />
    </>
  )
}
