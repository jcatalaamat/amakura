CREATE TABLE "booking" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"experienceTypeId" text NOT NULL,
	"date" text NOT NULL,
	"guests" integer DEFAULT 1 NOT NULL,
	"notes" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"locale" text DEFAULT 'es' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "contactMessage" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"interest" text,
	"message" text NOT NULL,
	"status" text DEFAULT 'unread' NOT NULL,
	"repliedBy" text,
	"repliedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experienceType" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"nameEs" text,
	"description" text,
	"descriptionEs" text,
	"icon" text,
	"category" text NOT NULL,
	"price" integer,
	"priceLabel" text,
	"duration" text,
	"maxGuests" integer,
	"active" boolean DEFAULT true NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolioProject" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"titleEs" text,
	"description" text NOT NULL,
	"descriptionEs" text,
	"image" text NOT NULL,
	"category" text NOT NULL,
	"tags" text,
	"status" text DEFAULT 'active' NOT NULL,
	"wide" boolean DEFAULT false NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "volunteerApplication" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"startDate" text,
	"endDate" text,
	"experience" text,
	"motivation" text NOT NULL,
	"skills" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"reviewedBy" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "block" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "comment" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "invite" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "post" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "report" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "block" CASCADE;--> statement-breakpoint
DROP TABLE "comment" CASCADE;--> statement-breakpoint
DROP TABLE "invite" CASCADE;--> statement-breakpoint
DROP TABLE "post" CASCADE;--> statement-breakpoint
DROP TABLE "report" CASCADE;--> statement-breakpoint
ALTER TABLE "userState" ALTER COLUMN "locale" SET DEFAULT 'es';--> statement-breakpoint
ALTER TABLE "userState" ALTER COLUMN "timeZone" SET DEFAULT 'America/Mexico_City';--> statement-breakpoint
CREATE INDEX "booking_email_idx" ON "booking" USING btree ("email");--> statement-breakpoint
CREATE INDEX "booking_date_idx" ON "booking" USING btree ("date");--> statement-breakpoint
CREATE INDEX "booking_status_idx" ON "booking" USING btree ("status");--> statement-breakpoint
CREATE INDEX "booking_userId_idx" ON "booking" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "booking_experienceTypeId_idx" ON "booking" USING btree ("experienceTypeId");--> statement-breakpoint
CREATE INDEX "contact_status_idx" ON "contactMessage" USING btree ("status");--> statement-breakpoint
CREATE INDEX "contact_createdAt_idx" ON "contactMessage" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "experience_category_idx" ON "experienceType" USING btree ("category");--> statement-breakpoint
CREATE INDEX "experience_active_idx" ON "experienceType" USING btree ("active");--> statement-breakpoint
CREATE INDEX "portfolio_category_idx" ON "portfolioProject" USING btree ("category");--> statement-breakpoint
CREATE INDEX "portfolio_sortOrder_idx" ON "portfolioProject" USING btree ("sortOrder");--> statement-breakpoint
CREATE INDEX "volunteer_status_idx" ON "volunteerApplication" USING btree ("status");--> statement-breakpoint
CREATE INDEX "volunteer_createdAt_idx" ON "volunteerApplication" USING btree ("createdAt");--> statement-breakpoint
ALTER TABLE "userPublic" DROP COLUMN "postsCount";