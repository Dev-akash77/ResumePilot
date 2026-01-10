CREATE TYPE "public"."gateway" AS ENUM('Razorpay', 'Stripe');--> statement-breakpoint
CREATE TABLE "payments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "payments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"auth_id" varchar(255) NOT NULL,
	"payment_id" varchar(255) NOT NULL,
	"order_id" varchar(255) NOT NULL,
	"credits_purchased" integer NOT NULL,
	"amount" integer NOT NULL,
	"currency" varchar DEFAULT 'INR',
	"gateway" "gateway" DEFAULT 'Razorpay',
	"success" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
