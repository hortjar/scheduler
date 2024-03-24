import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
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
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, {
          message: "Name must be at least 2 characters.",
        }),
        private: z.boolean().default(false),
        virtual: z.boolean().default(false),
        coordinates: z
          .object({
            latitude: z.number(),
            longitude: z.number(),
          })
          .optional(),
        dates: z.array(z.date()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("mutating", input);
      const result = await ctx.db.insert(meetings).values({
        name: input.name,
        coordinates: input.coordinates,
        private: input.private,
        virtual: input.virtual,
      });
      console.log(result);
      return result;
    }),
});
