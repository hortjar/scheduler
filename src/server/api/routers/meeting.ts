import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { meetingDates, meetings } from "@/server/db/schema";
import { InferInsertModel, asc, desc } from "drizzle-orm";

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
  getAllPublic: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.meetings.findMany({
      where: (meetings, { eq }) => eq(meetings.private, false),
      with: {
        dates: true,
      },
      orderBy: [desc(meetings.createdAt)],
    });
  }),
  getAllForUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.meetings.findMany({
      where: (meetings, { eq }) => eq(meetings.creator_id, ctx.session.userId),
      with: {
        dates: true,
      },
      orderBy: [desc(meetings.createdAt)],
    });
  }),
  getByKey: publicProcedure
    .input(
      z.object({
        key: z.string().length(10),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.meetings.findFirst({
        where: (meetings, { eq }) => eq(meetings.urlKey, input.key),
        with: {
          dates: {
            orderBy: [asc(meetingDates.date)],
          },
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
        dates: z.array(z.date()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("mutating", input);
      const result = await ctx.db
        .insert(meetings)
        .values({
          name: input.name,
          coordinates: input.coordinates,
          private: input.private,
          virtual: input.virtual,
          creator_id: ctx.session.userId,
        })
        .returning({
          id: meetings.id,
          creatorKey: meetings.creatorKey,
          urlKey: meetings.urlKey,
        });

      const insertObject = input.dates.map(function (x): InferInsertModel<
        typeof meetingDates
      > {
        return {
          meetingId: result[0]!.id,
          date: x,
        };
      });
      await ctx.db.insert(meetingDates).values(insertObject);

      return result;
    }),
});
