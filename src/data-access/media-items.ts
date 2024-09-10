import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { mediaItems, NewMediaItem } from '@/db/schema';

export const mediaItemsDataAccess = {
	getAll: async () => {
		return await db.select().from(mediaItems);
	},
	create: async (mediaItem: NewMediaItem) => {
		await db.insert(mediaItems).values(mediaItem);
	},
	getById: async (id: number) => {
		const result = await db
			.select()
			.from(mediaItems)
			.where(eq(mediaItems.id, id))
			.limit(1);
		return result[0] || null;
	},
	update: async (id: number, mediaItem: Partial<NewMediaItem>) => {
		await db.update(mediaItems).set(mediaItem).where(eq(mediaItems.id, id));
	},
	delete: async (id: number) => {
		await db.delete(mediaItems).where(eq(mediaItems.id, id));
	},
};
