import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
