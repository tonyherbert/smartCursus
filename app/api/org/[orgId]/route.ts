import { prisma } from "@/src/lib/prisma";
import { orgRoute } from "@/src/lib/safe-route";
import { z } from "zod";

export const POST = orgRoute
  .params(
    z.object({
      orgId: z.string(),
    }),
  )
  .body(z.object({ name: z.string() }))
  .handler(async (req, { params, body }) => {
    await prisma.organization.update({
      where: {
        id: params.orgId,
      },
      data: {
        name: body.name,
      },
    });
  });
