CREATE TABLE IF NOT EXISTS "media_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"description" text,
	"type" varchar(50) NOT NULL,
	"uploaded_at" timestamp DEFAULT now() NOT NULL
);
