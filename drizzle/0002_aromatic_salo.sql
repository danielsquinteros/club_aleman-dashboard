DO $$ BEGIN
 CREATE TYPE "public"."media_item_type" AS ENUM('menu', 'event', 'general');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "club_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "media_items" ALTER COLUMN "type" TYPE media_item_type USING type::text::media_item_type;
--> statement-breakpoint
ALTER TABLE "media_items" ALTER COLUMN "type" SET DEFAULT 'general';