import {
	pgTable,
	serial,
	varchar,
	date,
	text,
	integer,
	timestamp,
	pgEnum,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const eventStatusesEnum = pgEnum('event_status', [
	'upcoming',
	'ongoing',
	'completed',
	'cancelled',
]);

export const userRolesEnum = pgEnum('user_role', [
	'super_admin',
	'admin',
	'user',
]);

export const memberRolesEnum = pgEnum('member_role', [
	'member',
	'president',
	'vice_president',
	'secretary',
	'treasurer',
	'board_member',
	'honor_advisor',
	'honor_member',
]);

export const mediaItemTypesEnum = pgEnum('media_item_type', [
	'menu',
	'event',
	'general',
]);

export const mediaItemTypes = [
	{ label: 'Menu', value: 'menu' },
	{ label: 'Event', value: 'event' },
	{ label: 'General', value: 'general' },
];

export const memberRoles = [
	{ label: 'Member', value: 'member' },
	{ label: 'President', value: 'president' },
	{ label: 'Vice President', value: 'vice_president' },
	{ label: 'Secretary', value: 'secretary' },
	{ label: 'Treasurer', value: 'treasurer' },
	{ label: 'Board Member', value: 'board_member' },
	{ label: 'Honor Advisor', value: 'honor_advisor' },
	{ label: 'Honor Member', value: 'honor_member' },
];

export const eventStatuses = [
	{ label: 'Upcoming', value: 'upcoming' },
	{ label: 'Ongoing', value: 'ongoing' },
	{ label: 'Completed', value: 'completed' },
	{ label: 'Cancelled', value: 'cancelled' },
];

export const userRoles = [
	{ label: 'Super Admin', value: 'super_admin' },
	{ label: 'Admin', value: 'admin' },
	{ label: 'User', value: 'user' },
];

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	email: varchar('username', { length: 255 }).notNull(),
	password: varchar('password', { length: 255 }).notNull(),
	role: userRolesEnum('role').default('user').notNull(),
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.references(() => users.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date',
	}).notNull(),
});

export const members = pgTable('members', {
	id: serial('id').primaryKey(),
	firstName: varchar('first_name', { length: 255 }).notNull(),
	lastName: varchar('last_name', { length: 255 }).notNull(),
	secondSurname: varchar('second_surname', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).unique(),
	phoneNumber: varchar('phone_number', { length: 255 }),
	address: varchar('address', { length: 255 }),
	role: memberRolesEnum('role').default('member').notNull(),
	joinDate: date('join_date').notNull(),
	avatarUrl: varchar('avatar_url', { length: 255 }),
});

export const galleryImages = pgTable('gallery_images', {
	id: serial('id').primaryKey(),
	url: varchar('url', { length: 255 }).notNull(),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description'),
	uploadedAt: date('uploaded_at').defaultNow().notNull(),
});

export const events = pgTable('events', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description').notNull(),
	date: date('date').notNull(),
	location: varchar('location', { length: 255 }).notNull(),
	status: eventStatusesEnum('status').notNull(),
});

export const clubHistory = pgTable('club_history', {
	id: serial('id').primaryKey(),
	content: text('content').notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const mediaItems = pgTable('media_items', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	url: varchar('url', { length: 255 }).notNull(),
	description: text('description'),
	type: mediaItemTypesEnum('type').default('general').notNull(),
	uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserRole = User['role'];
export type UserId = User['id'];
export const userSchema = createInsertSchema(users).extend({
	password: z.string().min(8).optional(),
});

export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;
export type MemberRole = NewMember['role'];
export const memberSchema = createInsertSchema(members);

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type EventStatus = NewEvent['status'];
export const eventSchema = createInsertSchema(events);

export type GalleryImage = typeof galleryImages.$inferSelect;
export type NewGalleryImage = typeof galleryImages.$inferInsert;

export type ClubHistory = typeof clubHistory.$inferSelect;
export type NewClubHistory = typeof clubHistory.$inferInsert;

export type MediaItem = typeof mediaItems.$inferSelect;
export type NewMediaItem = typeof mediaItems.$inferInsert;
export type MediaItemType = NewMediaItem['type'];
export const mediaItemSchema = createInsertSchema(mediaItems);
