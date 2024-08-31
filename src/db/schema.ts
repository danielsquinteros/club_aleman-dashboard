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
});

export const historyEventSchema = z.object({
	id: z.string(),
	year: z.number(),
	event: z.string(),
});

export type Member = z.infer<typeof memberSchema>;
export type NewMember = {
	firstName: string;
	lastName: string;
	secondSurname: string;
	role: MemberRole;
	joinDate: string;
	avatarUrl?: string;
};
export type MemberRole = z.infer<typeof memberRoleSchema>;
export type GalleryImage = z.infer<typeof galleryImageSchema>;
export type HistoryEvent = z.infer<typeof historyEventSchema>;
