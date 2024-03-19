import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { meetings } from "@/server/db/schema";

export const meetingRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.meetings.findFirst({
        where: (meetings, { eq }) => eq(meetings.id, input.id),
        with: {
          dates: true,
        },
      });
    }),
});
