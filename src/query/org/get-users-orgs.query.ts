import { requiredAuth } from "@/src/lib/auth/helper";
import { prisma } from "@/src/lib/prisma";

export async function getUsersOrgs() {
  const user = await requiredAuth();
  const userOrganizations = await prisma.organization.findMany({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    select: {
      id: true,
      slug: true,
      name: true,
      image: true,
    },
  });

  return userOrganizations;
}
