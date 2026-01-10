import { pgTable, varchar, integer, boolean, timestamp, pgEnum,uuid } from "drizzle-orm/pg-core";

export const gatewayEnum = pgEnum("gateway", ["Razorpay", "Stripe"]);


// ! PAYMENT SCHEMA
export const payments = pgTable("payments", {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  auth_id: varchar("auth_id", { length: 255 }).notNull(),
  payment_id: varchar("payment_id", { length: 255 }).notNull(),
  order_id: varchar("order_id", { length: 255 }).notNull(),

  creditsPurchased: integer("credits_purchased").notNull(),

  amount: integer("amount").notNull(),

  currency: varchar("currency").default("INR"),

  gateway: gatewayEnum("gateway").default("Razorpay"),

  success: boolean("success").default(false),

  created_at: timestamp("created_at", { mode: "date", withTimezone: false })
    .defaultNow()
});
