import { env } from "@/env.mjs";
import { type Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
  tablesFilter: ["scheduler_*"],
  out: ".drizzle",
} satisfies Config;
