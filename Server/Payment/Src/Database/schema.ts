import { pgTable, varchar, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const currencyEnum = pgEnum("currency", ["INR", "USD"]);
export const gatewayEnum = pgEnum("gateway", ["Razorpay", "Stripe"]);


// ! PAYMENT SCHEMA
export const payments = pgTable("payments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  user_id: varchar("user_id", { length: 255 }).notNull(),
  payment_id: varchar("payment_id", { length: 255 }).notNull(),
  order_id: varchar("order_id", { length: 255 }).notNull(),

  creditsPurchased: varchar("credits_purchased", { length: 255 }).notNull(),

  amount: integer("amount").notNull(),

  currency: currencyEnum("currency").default("INR"),

  gateway: gatewayEnum("gateway").default("Razorpay"),

  success: boolean("success").default(false),

  created_at: timestamp("created_at", { mode: "date", withTimezone: false })
    .defaultNow()
});
