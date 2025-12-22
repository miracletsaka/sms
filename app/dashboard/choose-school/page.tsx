import { auth } from "@/app/authhandlers/auth";
import { SchoolSelector } from "@/components/school-selector";
import { prisma } from "@/lib/prisma";


export default async function ChooseSchoolPage() {
    const session = await auth();

    const userWithInstitutions = await prisma.user.findUnique({
        where: { id: session?.user?.id },
        select: { institutions: true },
    });

    const institutionIds = (userWithInstitutions?.institutions ?? []).map(i => i.institutionId);

    const institutions = await prisma.institution.findMany({
        where: { id: { in: institutionIds } },
    });

  return (
    <SchoolSelector defaultSchools={institutions} />
  )
}
