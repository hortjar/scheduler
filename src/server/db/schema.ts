import { createId } from "@/lib/utils";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  json,
  pgTableCreator,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export const pgTable = pgTableCreator((name) => `scheduler_${name}`);

export const meetings = pgTable(
  "meeting",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    private: boolean("private").notNull().default(false).notNull(),
    creatorKey: uuid("creator_key").defaultRandom().notNull(),
    creator_id: varchar("creator_id"),
    urlKey: varchar("urlKey", { length: 10 })
      .notNull()
      .$defaultFn(() => createId()),
    virtual: boolean("virtual").default(false).notNull(),
    coordinates: json("coordinates").$type<Coordinates>(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name),
  })
);

export const meetingRelations = relations(meetings, ({ many }) => ({
  dates: many(meetingDates),
}));

export const meetingDates = pgTable("meeting_date", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: timestamp("date", { mode: "date" }).notNull(),
  meetingId: uuid("meetingId").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const meetingDateRelations = relations(meetingDates, ({ one }) => ({
  meeting: one(meetings, {
    fields: [meetingDates.meetingId],
    references: [meetings.id],
  }),
}));
