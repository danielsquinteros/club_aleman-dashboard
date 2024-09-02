import { z } from 'zod';

export const memberRoleSchema = z.enum([
	'member',
	'president',
	'vice_president',
	'secretary',
	'treasurer',
	'board_member',
	'honor_advisor',
	'honor_member',
]);

export const eventStatusSchema = z.enum([
	'upcoming',
	'ongoing',
	'completed',
	'cancelled',
]);

export const memberSchema = z.object({
	id: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	secondSurname: z.string(),
	role: memberRoleSchema,
	joinDate: z.string(),
	avatarUrl: z.string().optional(),
});

export const galleryImageSchema = z.object({
	id: z.string(),
	url: z.string(),
	title: z.string(),
	description: z.string().optional(),
	uploadedAt: z.string(),
});

export const eventSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	date: z.string(),
	location: z.string(),
	status: eventStatusSchema,
});

export const historyEventSchema = z.object({
	id: z.string(),
	year: z.number(),
	event: z.string(),
});

export type Member = z.infer<typeof memberSchema>;
export type NewMember = Omit<Member, 'id'>;
export type MemberRole = z.infer<typeof memberRoleSchema>;

export type Event = z.infer<typeof eventSchema>;
export type NewEvent = Omit<Event, 'id'>;
export type EventStatus = z.infer<typeof eventStatusSchema>;

export type GalleryImage = z.infer<typeof galleryImageSchema>;
export type NewGalleryImage = Omit<GalleryImage, 'id'>;

export type HistoryEvent = z.infer<typeof historyEventSchema>;
export type NewHistoryEvent = Omit<HistoryEvent, 'id'>;
